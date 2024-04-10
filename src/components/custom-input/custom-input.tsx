import {
  useMemo,
  useState,
  type FC,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
// components
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
// constants
import { OPERANDS } from "../../constants/input";
// types
import type { CustomInputProps } from "./custom-input.interface";
import type { SelectOption, Formula } from "../../types/select-option.types";
// styles
import {
  Label,
  Wrapper,
  Listbox,
  TagWrapper,
  OptionItem,
  InputWrapper,
} from "./custom-input.styled";

const CustomInput: FC<CustomInputProps> = ({ options, isLoading }) => {
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [formula, setFormula] = useState<Formula>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (OPERANDS.includes(value)) {
      setFormula((prev) => [...prev, value]);
      return setInputValue("");
    }

    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputValue === "" && formula.length > 0) {
      setFormula((prev) => prev.slice(0, -1));
    }
  };

  const handleSelectOption = (option: SelectOption) => {
    setFormula((prev) => [...prev, option]);
    setInputValue("");
  };

  const filteredOptions = useMemo(
    () =>
      inputValue
        ? options.filter((el) =>
            el.name.toLowerCase().includes(inputValue.toLowerCase()),
          )
        : options,
    [inputValue, options],
  );

  const optionsList = useMemo(() => {
    if (isLoading) {
      return (
        <li>
          <span>loading...</span>
        </li>
      );
    }
    if (!inputValue.length) {
      return null;
    }

    return filteredOptions.length > 0 ? (
      filteredOptions.map((option, index) => (
        <OptionItem key={index} onClick={() => handleSelectOption(option)}>
          <span>{option.name}</span>
          <span>{option.category}</span>
        </OptionItem>
      ))
    ) : (
      <li>
        <span>- no options -</span>
      </li>
    );
  }, [filteredOptions, inputValue.length, isLoading]);

  return (
    <Wrapper onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
      <Label>
        {inputValue && !focused ? <ErrorOutlineIcon /> : "Total: 0"}
      </Label>
      <InputWrapper>
        {formula.map((el, index) =>
          typeof el === "string" ? (
            <span>{el}</span>
          ) : (
            <TagWrapper key={index}>{el.name}</TagWrapper>
          ),
        )}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </InputWrapper>
      <Listbox>{optionsList}</Listbox>
    </Wrapper>
  );
};

export default CustomInput;
