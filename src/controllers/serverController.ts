import { Request, Response } from "express";
import { getLowestPriorityServer } from "../services/serverServices";
import { IServer } from "../types/server";

export async function findLowestPriorityServer(req: Request, res: Response): Promise<void> {
  const servers: IServer[] = req.body.servers;
  if (!servers) {
    res.status(400).json({ message: "Please provide server list." });
  }

  try {
    const server = await getLowestPriorityServer(servers);
    res.status(200).json(server);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}
