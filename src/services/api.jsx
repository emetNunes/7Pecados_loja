import React, { useState, useEffect } from "react";

const API_URL = "https://api-7pecados.onrender.com";

/**
 * Função utilitária para chamadas à API
 * @param {string} path - caminho relativo da API
 * @param {object} options - options do fetch (method, body, headers)
 */
export async function fetchApi(path, options = {}) {
  const { body, ...restOptions } = options;

  const url = `${API_URL}${path}`;
  const token = localStorage.getItem("authToken");
  const defaultHeaders = {};

  if (body && typeof body === "object" && !(body instanceof FormData)) {
    defaultHeaders["Content-Type"] = "application/json";
  }
  if (token) {
    defaultHeaders["Authorization"] = `${token}`;
  }

  const mergedOptions = {
    ...restOptions,
    headers: {
      ...defaultHeaders,
      ...restOptions.headers,
    },
  };

  if (body && typeof body === "object" && !(body instanceof FormData)) {
    mergedOptions.body = JSON.stringify(body);
  } else if (body) {
    mergedOptions.body = body;
  }

  try {
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      let errorData = {
        message: `Erro ${response.status}: ${response.statusText}`,
      };
      try {
        errorData = await response.json();
      } catch (e) {}
      throw new Error(errorData?.message || `Erro ${response.status}`);
    }

    if (response.status === 204) return null;

    return await response.json();
  } catch (error) {
    console.error(`Erro na chamada da API para ${path}:`, error.message);
    throw error;
  }
}
