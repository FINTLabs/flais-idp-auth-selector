import {Contract} from "~/utils/contractsLoader";
import React, {useEffect, useState} from "react";
import {Button} from "@navikt/ds-react";


interface DropdownProps {
    contracts: Contract[];
    selectedContract: Contract | null;
    setSelectedContract: (contract: Contract | null) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
                                                      contracts,
                                                      selectedContract,
                                                      setSelectedContract
                                                  }) => {
    const [isOpen, setIsOpen] = useState(false);
    console.log(contracts);

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
        <div className="dropdown-container relative inline-block text-left">
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex justify-between w-64 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                aria-haspopup="true"
            >
                {selectedContract ? selectedContract.displayName : "Velg tilhørlighet"}
                <svg
                    className="ml-2 h-5 w-5"
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
                <div className="absolute mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <ul className="py-1">
                        <DropdownItem
                            text="Velg tilhørlighet"
                            onSelect={() => setIsOpen(false)}
                        />
                        {contracts
                            .filter((item) => item.type === "CUSTOMER")
                            .map((item) => (
                                <DropdownItem
                                    key={item.cardId}
                                    contract={item}
                                    onSelect={() => {
                                        setSelectedContract(item);
                                        setIsOpen(false);
                                    }}
                                />
                            ))}
                    </ul>
                </div>
            )}


                <p className="w-full text-left pr-4 py-2 mt-5 text-base text-gray-700 hover:bg-gray-100 flex items-center">
                    Andre påloggingsalternativer:
                </p>
            {contracts
                .filter((item) => item.type === "COMMON")
                .map((item) => (
                    <Button key={item.cardId} className="w-full">
                        {item.displayName}
                    </Button>
                ))
            }
        </div>
    );
};

interface DropdownItemProps {
    contract?: Contract;
    text?: string;
    onSelect: () => void;
    children?: React.ReactNode;
}

const DropdownItem: React.FC<DropdownItemProps> = ({contract, text, onSelect}) => (
    <li>
        <button
            className="w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100 flex items-center"
            onClick={onSelect}
        >
            {contract?.image && (
                <img
                    src={`data:${contract.image.mimeType};base64,${contract.image.base64Image}`}
                    alt={contract.displayName}
                    className="w-10 h-10 mr-3 rounded-full"
                />
            )}

            {text || contract?.displayName}
        </button>
    </li>
);
