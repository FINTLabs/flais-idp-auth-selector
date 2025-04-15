import React from "react";
import {Contract} from "~/utils/contractsLoader";

interface DropdownItemProps {
  contract?: Contract;
  text?: string;
  onSelect: () => void;
  children?: React.ReactNode;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({contract, text, onSelect}) => {
  if (!contract && !text) {
    throw new Error("DropdownItem må ha enten 'contract' eller 'text'");
  }
  return (
    <li>
      <button
        className="w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100 flex items-center"
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
};
