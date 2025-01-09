import type {MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {contractsLoader, Contract} from "~/utils/contractsLoader";
import {Box} from "@navikt/ds-react";
import NovariLogo from "../images/novari_logo_small.png";
import {useEffect, useState} from "react";

export const meta: MetaFunction = () => {
    return [
        {title: "Flais IDP Auth Selector"},
        {name: "description", content: "Flais IDP Auth Selector"},
    ];
};

export async function loader() {
    return await contractsLoader();
}

export default function Index() {
    const contracts = useLoaderData<Contract[]>() ?? [];
    const [selected, setSelected] = useState<Contract | null>(null);
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
        };
    }, []);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "f0f0f0",
            }}
        >
            <div
                style={{
                    borderStyle: "solid",
                    borderWidth: "2px",
                    borderColor: "rgb(248, 236, 219)",
                    padding: "2rem",
                    textAlign: "center",
                }}
            >
                <Box padding="4" maxWidth="text" as="article">
                    <img src={NovariLogo} alt="Novari logo" width={250}/>

                    <div className="dropdown-container relative inline-block text-left">
                        <button
                            type="button"
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex justify-between w-56 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                            aria-haspopup="true"
                        >
                            {selected ? selected.displayName : "Velg tilhørlighet"}
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
                            <div
                                className="absolute mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                                <ul className="py-1">
                                    {contracts.map((item) => (
                                        <li key={item.cardId}>
                                            <button
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                                                onClick={() => {
                                                    setSelected(item);
                                                    setIsOpen(false);
                                                }}
                                            >
                                                <img
                                                    src={`data:${item.image.mimeType};base64,${item.image.base64Image}`}
                                                    alt={item.displayName}
                                                    className="w-10 h-10 mr-3 rounded-full"
                                                />
                                                {item.displayName}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </Box>
            </div>
        </div>
    );
}
