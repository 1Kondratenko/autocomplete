import { FC } from "react";
import { ContentWrapper } from "./autocomplete-container.styled";
import { useOptionsQuery } from "../../hooks/use-options-query";
import type { AutocompleteContainerInterface } from "./autocomplete-container.interface";
import CustomInput from "../../components/custom-input";

const AutocompleteContainer: FC<AutocompleteContainerInterface> = () => {
  const { data, isLoading } = useOptionsQuery();

  return (
    <ContentWrapper>
      <CustomInput options={data ?? []} isLoading={isLoading} />
    </ContentWrapper>
  );
};

export default AutocompleteContainer;
