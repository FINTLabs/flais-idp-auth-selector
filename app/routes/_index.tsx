import type {MetaFunction} from "@remix-run/node";
import {useLoaderData, useSearchParams, useSubmit} from "@remix-run/react";
import {contractsLoader, Contract} from "~/utils/contractsLoader";
import {useCallback} from "react";
import {Header} from "~/components/Header";
import {Customer} from "~/components/Customer";
import {Common} from "~/components/Common";

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
    const [searchParams] = useSearchParams();
    const submit = useSubmit();

    const submitContract = useCallback((contractId: string) => {
        if (!searchParams.get("target") || !searchParams.get("sid")) return;
        submit({ contractId, sid: searchParams.get("sid"), target: searchParams.get("target") }, { action: "/contract/redirect", method: "post" });
    }, [searchParams, submit]);

    const commonContracts = contracts.filter((contract) => contract.type === "COMMON");
    const customerContracts = contracts.filter((contract) => contract.type === "CUSTOMER");

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
                    border: "2px solid rgb(248, 236, 219)",
                    borderRadius: "4px",
                    padding: "2rem",
                }}
            >
                <Header />
                <Customer contracts={ customerContracts } submit={ submitContract } />
                <Common contracts={ commonContracts } submit={ submitContract } />
            </div>
        </div>
    );
}
