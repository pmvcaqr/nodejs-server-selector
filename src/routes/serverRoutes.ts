import express from "express";
import { findLowestPriorityServer } from "../controllers/serverController";

const router = express.Router();

router.get("/servers/find-server", findLowestPriorityServer);

export default router;
