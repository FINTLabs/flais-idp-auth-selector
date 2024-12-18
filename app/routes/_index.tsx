import type {MetaFunction} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import {contractsLoader, Contract} from "~/utils/contractsLoader";

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

    return (
        <div>
            <h1>Contracts</h1>
            <ul>
                {contracts.map((contract) => (
                    <li key={contract.cardId}>{contract.displayName}</li>
                ))}
            </ul>
        </div>
    );
}
