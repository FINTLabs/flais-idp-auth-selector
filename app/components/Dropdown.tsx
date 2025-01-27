import {Contract} from "~/utils/contractsLoader";
import React, {useEffect, useState} from "react";
import {Box, Button, Link, Checkbox} from "@navikt/ds-react";
import {useFetcher} from "@remix-run/react";


interface DropdownProps {
    contracts: Contract[];
    selectedContract: Contract | null;
    setSelectedContract: (contract: Contract | null) => void;
}

type RedirectResponse = {
    url: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
                                                      contracts,
                                                      selectedContract,
                                                      setSelectedContract
                                                  }) => {
    const [isOpen, setIsOpen] = useState(false);
    const fetcher = useFetcher<RedirectResponse>();

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

    const handleRedirect = () => {
        if (!selectedContract) {
            console.log("No contract selected");
            return;
        }

        fetcher.submit(
            {
                id: selectedContract?.cardId || "",
                target: "https://idp.felleskomponent.no/nidp/saml2/spsend",
                sid: "123"
            },
            {
                method: "post",
                action: "/contract/redirect"
            }
        );
    };

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
                <Box as="div" className="absolute w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <Box as="ul" className="py-1">
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
                    </Box>
                </Box>
            )}

            <Box>
                <Checkbox value="remember_me" className="mt-5">Husk meg</Checkbox>
            </Box>
            <Button className="w-full">Fortsett</Button>

            <Box as="p" className="w-full text-left font-bold pr-4 py-2 mt-5 text-base text-gray-700 hover:bg-gray-100 flex items-center">
                Andre påloggingsalternativer:
            </Box>

            {contracts
                .filter((item) => item.type === "COMMON")
                .map((item) => (
                    <Link as="button" key={item.cardId} className="w-full text-left pr-4 py-1 text-base text-gray-700 hover:bg-gray-100 flex items-center uppercase" onClick={handleRedirect} style={{ textDecoration: "none", color: "black"}}>
                        {item.image && <img src={`data:${item.image.mimeType};base64,${item.image.base64Image}`} alt={item.displayName} className="w-8 h-8 mr-2"/>}{item.displayName}
                    </Link>
                ))
            }

            {fetcher.data?.url && (
                <a href={fetcher.data.url} target="_blank" rel="noopener noreferrer">
                    Gå til: {fetcher.data.url}
                </a>
            )}
        </div>
    );
};

interface DropdownItemProps {
    contract?: Contract;
    text?: string;
    onSelect: () => void;
    children?: React.ReactNode;
}

const DropdownItem: React.FC<DropdownItemProps> = ({contract, text, onSelect}) => {
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
};
