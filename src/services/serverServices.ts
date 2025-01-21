import axios from "axios";
import { IServer } from "../types/server";


export async function isServerAvailable(url: string): Promise<boolean> {
  try {

    // req: request should timeout after 5 seconds
    const response = await axios.get(url, { timeout: 5000 });

    // req: status code of 200-299, it is considered online
    return response.status >= 200 && response.status < 300;
  } catch {
    return false;
  }
}

export async function getLowestPriorityServer(servers: IServer[]): Promise<IServer> {
  // req: All server GET requests should be run in parallel.
  const serverRequests = servers.map(async (server) => ({
    server,
    online: await isServerAvailable(server.url),
  }));

  const results = await Promise.all(serverRequests);

  const availableServers = results
    .filter((result) => result.online)
    .map((result) => result.server);

  if (availableServers.length === 0) {
    throw new Error("No available server.");
  }

  // req: return an online server with the lowest priority
  availableServers.sort((a, b) => a.priority - b.priority);
  return availableServers[0];
}
