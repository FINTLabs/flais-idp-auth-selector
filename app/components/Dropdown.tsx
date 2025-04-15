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
  const menuRef = useRef<HTMLUListElement | null>(null);

  const filteredContracts = filterFn ? contracts.filter(filterFn) : contracts;
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

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

  useEffect(() => {
    if (isOpen && itemRefs.current[1]) {
      itemRefs.current[1].focus();
    }
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (!isOpen) return;

    const focusables = itemRefs.current;
    const currentIndex = focusables.findIndex((el) => el === document.activeElement);

    switch (event.key) {
      case "ArrowDown": {
        event.preventDefault();
        const next = (currentIndex + 1) % focusables.length;
        focusables[next]?.focus();
        break;
      }
      case "ArrowUp": {
        event.preventDefault();
        const previous = (currentIndex - 1 + focusables.length) % focusables.length;
        focusables[previous]?.focus();
        break;
      }
      case "Escape": {
        setIsOpen(false);
        break;
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative inline-block text-left w-full">
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        className="inline-flex justify-between w-full h-16 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible: ring-blue-500"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="dropdown-menu"
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
          <Box
            as="ul"
            id="dropdown-menu"
            ref={menuRef}
            role="menu"
            aria-label="Tilhørlighet"
            tabIndex={-1}
            onKeyDown={handleKeyDown}
            className="py-1 focus:outline-none">
            <DropdownItem
              text={placeholder}
              onSelect={() => setIsOpen(false)}
              ref={(el) => (itemRefs.current[0] = el)}
            />
            {filteredContracts.map((item, index) => (
              <DropdownItem
                key={item.cardId}
                contract={item}
                onSelect={() => {
                  setSelectedContract(item);
                  setIsOpen(false);
                }}
                isSelected={item.cardId === selectedContract?.cardId}
                ref={(el) => (itemRefs.current[index + 1] = el)}
              />
            ))}
          </Box>
        </Box>
      )}
    </div>
  );
};


