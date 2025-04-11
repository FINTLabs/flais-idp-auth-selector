import {Contract} from "~/utils/contractsLoader";
import React, {useEffect, useRef, useState} from "react";
import {Box} from "@navikt/ds-react";
import {DropdownItem} from "~/components/DropdownItem";
import ArrowDown from "~/components/icons/ArrowDown";


interface DropdownProps {
  contracts: Contract[];
  selectedContract: Contract | null;
  setSelectedContract: (contract: Contract) => void;
  placeholder?: string;
  filterFn?: (contract: Contract) => boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
                                                    contracts,
                                                    selectedContract,
                                                    setSelectedContract,
                                                    placeholder = "Velg tilhørlighet",
                                                    filterFn,
                                                  }) => {

  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  const filteredContracts = filterFn ? contracts.filter(filterFn) : contracts;

  return (
    <div
      ref={containerRef}
      className="relative inline-block text-left w-full">
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
          placeholder
        )}
        </span>
        <ArrowDown/>
      </button>

      {isOpen && (
        <Box as="div" className="absolute w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <Box as="ul" className="py-1">
            <DropdownItem
              text={placeholder}
              onSelect={() => setIsOpen(false)}
            />
            {filteredContracts.map((item) => (
                <DropdownItem
                  key={item.cardId}
                  contract={item}
                  onSelect={() => {
                    setSelectedContract(item);
                    setIsOpen(false);
                  }}/>
              ))}
          </Box>
        </Box>
      )}
    </div>
  );
};


