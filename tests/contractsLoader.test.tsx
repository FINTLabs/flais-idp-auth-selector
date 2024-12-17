import {contractsLoader, resetCache} from "~/utils/contractsLoader";
import {jest, beforeEach, describe, expect, it} from "@jest/globals";

describe("contractsLoader", () => {
    beforeEach(() => {
        jest.resetModules();
        resetCache();
    });

    it("should fetch and return contracts", async () => {

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve([
                        {
                            displayName: "Contract 1",
                            cardId: "cardId1",
                            type: "COMMON",
                            image: {base64: "", mimeType: ""}
                        },
                        {
                            displayName: "Contract 2",
                            cardId: "cardId2",
                            type: "CUSTOMER",
                            image: {base64: "", mimeType: ""}
                        },
                    ]),
            } as Response)
        ) as jest.MockedFunction<typeof fetch>;

        const data = await contractsLoader();
        expect(data).toHaveLength(2);
        expect(data[0].displayName).toBe("Contract 1");
    });

    it('should throw an error if fetch fails', async () => {
        global.fetch = jest.fn(() =>
        Promise.reject(new Error("Failed to fetch contracts from IDP"))
        );

        await expect(contractsLoader()).rejects.toThrow("Failed to fetch contracts from IDP");
    });
});


