import {Contract} from "~/utils/contractsLoader";
import React, {useEffect, useState} from "react";
import {Box} from "@navikt/ds-react";
import {DropdownItem} from "~/components/DropdownItem";


interface DropdownProps {
  contracts: Contract[];
  selectedContract: Contract | null;
  setSelectedContract: (contract: Contract) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
                                                    contracts,
                                                    selectedContract,
                                                    setSelectedContract
                                                  }) => {

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !(event.target as HTMLElement).closest(".dropdown-container")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  return (
    <div className="dropdown-container relative inline-block text-left w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex justify-between w-full h-16 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        aria-haspopup="true"
      >
        <span className="flex items-center">
        {selectedContract ? (
          <>
            <img
              src={`data:${selectedContract.image.mimeType};base64,${selectedContract.image.base64Image}`}
              alt={selectedContract.displayName}
              className="h-8 mr-3 rounded-full"
            />
            {selectedContract.displayName}
          </>
        ) : (
          "Velg tilhørlighet"
        )}
        </span>
        <svg
          className="ml-2 h-5 w-5 self-center"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <Box as="div" className="absolute w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <Box as="ul" className="py-1">
            <DropdownItem
              text="Velg tilhørlighet"
              onSelect={() => setIsOpen(false)}
            />
            {contracts
              .filter((item) => item.type === "CUSTOMER")
              .map((item) => (
                <>
                  <DropdownItem
                    key={item.cardId}
                    contract={item}
                    onSelect={() => {
                      setSelectedContract(item);
                      setIsOpen(false);
                    }}/>
                </>
              ))}
          </Box>
        </Box>
      )}
    </div>
  );
};


