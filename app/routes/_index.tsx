import type {MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {contractsLoader, Contract} from "~/utils/contractsLoader";
import {useState} from "react";
import {Dropdown} from "~/components/Dropdown";
import {Header} from "~/components/Header";

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
    const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

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
                <Header />
                <Dropdown
                    contracts={contracts}
                    selectedContract={selectedContract}
                    setSelectedContract={setSelectedContract}
                />
            </div>
        </div>
    );
}
