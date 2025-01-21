import { getLowestPriorityServer, isServerAvailable } from "../src/services/serverServices";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Server Service", () => {
  const servers = [
    { url: "https://does-not-work.perfume.new", priority: 1 },
    { url: "https://offline.scentronix.com", priority: 2 },
    { url: "http://app.scnt.me", priority: 3 },
    { url: "https://gitlab.com", priority: 4 },
  ];

  describe("isServerAvailable", () => {
    it("should return true if the specific server is online", async () => {
      mockedAxios.get.mockResolvedValueOnce({ status: 200 });
      const result = await isServerAvailable("https://example.com");
      expect(result).toBe(true);
    });

    it("should return false if the specific server is offline", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("Network error"));
      const result = await isServerAvailable("https://example.com");
      expect(result).toBe(false);
    });
  });

  describe("getLowestPriorityServer", () => {
    beforeAll(() => {
      mockedAxios.get.mockImplementation((url) => {
        switch (url) {
          case "https://does-not-work.perfume.new":
            return Promise.reject(new Error("Network error"));
          case "https://gitlab.com":
            return Promise.resolve({ status: 200 });
          case "http://app.scnt.me":
            return Promise.resolve({ status: 200 });
          case "https://offline.scentronix.com":
            return Promise.reject(new Error("Network error"));
          default:
            return Promise.reject(new Error("Unknown URL"));
        }
      });
    })

    it("should return the online server with the lowest priority", async () => {
      const result = await getLowestPriorityServer(servers);
      expect(result).toEqual({ url: "http://app.scnt.me", priority: 3 });
    });

    it("should throw an error if no servers are online", async () => {
      mockedAxios.get.mockRejectedValue(new Error("Network error"));
      await expect(getLowestPriorityServer(servers)).rejects.toThrow("No available server.");
    });
  });
});
