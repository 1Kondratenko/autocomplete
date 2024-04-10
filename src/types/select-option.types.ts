export type SelectOption<TValue = string> = {
  id: string;
  name: string;
  value: TValue;
  category: string;
  inputs?: string;
};

export type Formula = (string | SelectOption)[];
