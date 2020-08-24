import express from "express";
import { BandController } from '../controller/BandController';

export const bandRouter = express.Router();

const bandController = new BandController();

bandRouter.post("/signup", bandController.signup);
bandRouter.post("/login", bandController.login);

/* acesso exclusivo do usuário administrador */
bandRouter.put("/approve", bandController.approve);
bandRouter.get("/all", bandController.getAllBands);