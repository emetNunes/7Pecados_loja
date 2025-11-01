import { useState, useMemo, useRef, useEffect } from "react";
import { Input, Button } from "@heroui/react";
import { ChevronDownIcon, CheckIcon } from "lucide-react";

type Option = {
  value: string;
  label: string;
};

type SearchableDropdownProps = {
  options: Option[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
};

export const SearchableDropdown = ({
  options,
  value,
  onChange,
  placeholder = "Selecione um item...",
  searchPlaceholder = "Pesquisar...",
}: SearchableDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm]);

  const selectedLabel = useMemo(() => {
    return options.find((opt) => opt.value === value)?.label || placeholder;
  }, [options, value, placeholder]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: Option) => {
    onChange(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <Button
        className="w-full flex justify-between items-center"
        variant="bordered"
        onClick={handleToggle}
      >
        <span>{selectedLabel}</span>
        <ChevronDownIcon
          className={`h-5 w-5 text-default-600 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </Button>
      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-base rounded-lg shadow-xl border border-default-200">
          <div className="p-2 border-b border-default-200">
            <Input
              ref={searchInputRef}
              type="text"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
              variant="bordered"
            />
          </div>
          <ul className="max-h-60 overflow-y-auto p-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className="p-2 rounded-md text-default-700 hover:bg-default-100 cursor-pointer flex justify-between items-center"
                  onClick={() => handleSelectOption(option)}
                >
                  <span>{option.label}</span>

                  {option.value === value && (
                    <CheckIcon className="h-5 w-5 text-primary" />
                  )}
                </li>
              ))
            ) : (
              <li className="p-2 text-default-600 text-center">
                Nenhum item encontrado
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};
