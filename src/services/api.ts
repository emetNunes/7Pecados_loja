const API_URL: string = "https://api-7pecados.onrender.com";

interface ApiError {
  message: string;
}

type ApiOptions = Omit<RequestInit, 'body'> & {
  body?: BodyInit | null | Record<string, any>;
};

/**
 * Função reutilizável para fazer requisições à API.
 * @param path O caminho do endpoint (ex: "/user/login/").
 * @param options As opções do fetch (method, body, etc.).
 * @returns Os dados da resposta em JSON, tipados com o genérico T.
 * @throws Lança um erro se a requisição falhar.
 */

export async function fetchApi<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const { body, ...restOptions } = options;

  const url = `${API_URL}${path}`;
  const token = localStorage.getItem("authToken");

  const defaultHeaders: HeadersInit = {};

  if (body && typeof body === 'object' && !(body instanceof FormData)) {
    defaultHeaders["Content-Type"] = "application/json";
  }
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const mergedOptions: RequestInit = {
    ...restOptions,
    headers: {
      ...defaultHeaders,
      ...restOptions.headers,
    },
  };

  if (body && typeof body === 'object' && !(body instanceof FormData)) {
    mergedOptions.body = JSON.stringify(body);
  } else if (body) {
    mergedOptions.body = body as BodyInit | null | undefined;
  }

  try {
    const response = await fetch(url, mergedOptions);

    if (!response.ok) {
      let errorData: ApiError | { message: string };
      try {
        errorData = await response.json();
      } catch (e) {
        errorData = { message: `Erro ${response.status}: ${response.statusText}` };
      }
      throw new Error(errorData?.message || `Erro ${response.status}`);
    }

    if (response.status === 204) {
      return null as T;
    }

    return await response.json() as T;

  } catch (error) {
    console.error(`Erro na chamada da API para ${path}:`, (error as Error).message);
    throw error;
  }
}