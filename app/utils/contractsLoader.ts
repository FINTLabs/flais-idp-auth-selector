export type Contract = {
    displayName: string;
    cardId: string;
    image: {
        base64: string;
        mimeType: string;
    }
    type: string;
}

type ContractTimestamp = number;

let cache: Contract[] | null = null;
let cacheTimestamp: ContractTimestamp | null = null;
const CACHE_TTL = 60 * 1000;

export async function contractsLoader() {
    const now = Date.now();

    if (cache && cacheTimestamp !== null && now - cacheTimestamp < CACHE_TTL) {
        return cache;
    }

    try {

        const response = await fetch("http://localhost:8080/api/idp-contracts");
        if (!response.ok) {
            console.error(`Failed to fetch contracts. Status: ${response.status}`);
            throw new Error("Failed to fetch contracts from IDP");
        }

        const data: Contract[] = await response.json();

        cache = data.filter(
            (contract) => contract.type === "COMMON" || contract.type === "CUSTOMER"
        );

        cacheTimestamp = now;
        return cache;
    } catch (error) {
        console.error("Failed to fetch contracts:", error);
        throw error;
    }
}

// Reset cache til bruk i testing så cache ikke fylles med data fra forrige test
export function resetCache() {
    cache = null;
    cacheTimestamp = null;
}
