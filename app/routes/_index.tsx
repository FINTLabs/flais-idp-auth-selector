import type {MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {contractsLoader, Contract} from "~/utils/contractsLoader";
import {Box} from "@navikt/ds-react";
import {useState} from "react";
import {Logo} from "~/components/Logo";
import {Dropdown} from "~/components/Dropdown";

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
                <Box padding="5" maxWidth="text" as="article">
                    <Logo src="/images/novari_logo_small.png" width={250}/>
                    <Dropdown
                        contracts={contracts}
                        selectedContract={selectedContract}
                        setSelectedContract={setSelectedContract}
                    />
                </Box>
            </div>
        </div>
    );
}
