import { userRouter } from "./routes/UserRouter";
import { bandRouter } from "./routes/BandRouter";
import { AddressInfo } from "net";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/band", bandRouter);

const server = app.listen(3000, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    }
    else {
        console.error(`Failure upon starting server`);
    }
});