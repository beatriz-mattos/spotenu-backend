import { userRouter } from "./routes/UserRouter";
import { bandRouter } from "./routes/BandRouter";
import { AddressInfo } from "net";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

if (process.env.NODE_ENV !== "serverless") {
    dotenv.config();
};

export const app = express();

app.use(cors({ origin: true }));

app.use(express.json());

app.use("/user", userRouter);
app.use("/band", bandRouter);

export default app;

if (process.env.NODE_ENV !== "serverless") {
    const server = app.listen(process.env.PORT || 3003, () => {
        if (server) {
            const address = server.address() as AddressInfo;
            console.log(`Server is running in http://localhost:${address.port}`);
        }
        else {
            console.error(`Failure upon starting server.`);
        }
    });
};