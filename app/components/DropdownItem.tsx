import {forwardRef} from "react";
import {Contract} from "~/utils/contractsLoader";

interface DropdownItemProps {
  contract?: Contract;
  text?: string;
  onSelect: () => void;
  isSelected?: boolean;
}

export const DropdownItem = forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({contract, text, onSelect, isSelected = false}, ref) => {
    if (!contract && !text) {
      throw new Error("DropdownItem må ha enten 'contract' eller 'text'");
    }
    return (
      <li role="none">
        <button
          role="menuitem"
          ref={ref}
          aria-current={isSelected ? "true" : undefined}
          className="w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100 focus:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 flex items-center"
          onClick={onSelect}
        >
          {contract?.image && (
            <div className="w-1/4 flex justify-center items-center">
              <img
                src={`data:${contract.image.mimeType};base64,${contract.image.base64Image}`}
                alt={contract.displayName}
                className="h-10 object-contain mx-auto"
              />
            </div>
          )}
          <span className="w-3/4"> {text || contract?.displayName}</span>
        </button>
      </li>
    );
  }
);

DropdownItem.displayName = "DropdownItem";
