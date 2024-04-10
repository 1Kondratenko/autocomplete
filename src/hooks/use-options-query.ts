import { useQuery } from "react-query";
import { SelectOption } from "../types/select-option.types";

export const useOptionsQuery = () => {
  const fetchData = async (): Promise<SelectOption[]> => {
    const response = await fetch(
      "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete",
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json() as Promise<SelectOption[]>;
  };

  return useQuery<SelectOption[], Error>("data", fetchData);
};
