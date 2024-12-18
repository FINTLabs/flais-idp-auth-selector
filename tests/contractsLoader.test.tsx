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

    it('should return cache on subsequent calls', async () => {
        const mockResponse = [
            {
                displayName: "Contract 1",
                cardId: "cardId1",
                type: "COMMON",
                image: {base64: "", mimeType: ""},
            }
        ];

        const fetchMock = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () =>
                    Promise.resolve(mockResponse),
            } as Response)
        );

        global.fetch = fetchMock;

        const firstCall = await contractsLoader();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(firstCall).toEqual(mockResponse);

        const secondCall = await contractsLoader();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(secondCall).toEqual(mockResponse);

    });

    it('should refresh the cache after CACHE_TTL expires', async () => {
        const mockResponse1 = [
            {
                displayName: "Contract 1",
                cardId: "cardId1",
                type: "COMMON",
                image: {base64: "", mimeType: ""},
            }
        ];
        const mockResponse2 = [
            {
                displayName: "Contract 2",
                cardId: "cardId2",
                type: "CUSTOMER",
                image: {base64: "", mimeType: ""},
            }
        ];

        let now = Date.now();
        jest.spyOn(global.Date, "now").mockImplementation(() => now);

        const fetchMock = jest.fn() as jest.MockedFunction<typeof fetch>;
        fetchMock
            .mockResolvedValueOnce({
                ok: true,
                json: () =>
                    Promise.resolve(mockResponse1),
            } as Response)
            .mockResolvedValueOnce({
                    ok: true,
                    json: () =>
                        Promise.resolve(mockResponse2),
                } as Response
            );

        global.fetch = fetchMock;

        const firstCall = await contractsLoader();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(firstCall).toEqual(mockResponse1);

        now += 30 * 1000;
        const secondCall = await contractsLoader();
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(secondCall).toEqual(mockResponse1);

        now += 31 * 1000;
        const thirdCall = await contractsLoader();
        expect(fetchMock).toHaveBeenCalledTimes(2);
        expect(thirdCall).toEqual(mockResponse2);

        jest.restoreAllMocks();
    })
});
