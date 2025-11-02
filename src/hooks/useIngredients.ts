import { useState, useEffect } from "react";
import { fetchApi } from "../services/api";

type Option = {
  value: string;
  label: string;
};

interface ApiIngredient {
  _id: string;
  name: string;
}

interface ApiResponse {
  total: number;
  page: number;
  pages: number;
  ingredient: ApiIngredient[];
}

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadIngredients = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchApi<ApiResponse>(
          "/admin/stock/ingredients/historic"
        );
        const formattedOptions: Option[] = data.ingredient.map(
          (ingredient) => ({
            value: ingredient._id,
            label: ingredient.name,
          })
        );
        setIngredients(formattedOptions);
      } catch (error) {
        if (error instanceof Error) {
          setError(`Erro ao carregar ingredientes: ${error.message}`);
        } else {
          setError("Ocorreu um erro desconhecido.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    loadIngredients();
  }, []);

  return { ingredients, isLoading, error };
};
