import express, { json, urlencoded } from "express";

import authRouter from "./routes/auth/index.js";

import verifyRouter from "./routes/verify/index.js";
import uploadRouter from "./routes/upload/index.js";
import cors from "cors";
import serverless from "serverless-http";
import cookieParser from "cookie-parser";
import { Request, Response, NextFunction } from "express";

import bodyParser from "body-parser";

const port = 4000;
const app = express();
app.use(bodyParser.raw({ type: "multipart/form-data", limit: "10mb" }));
app.use(cookieParser());
app.use(urlencoded({ extended: false, limit: "50mb" }));
app.use(json({ limit: "50mb" }));

const allowedOrigins = ["http://localhost:3000", "https://hafapilar.com"];

// Middleware CORS yang diperbarui
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// Middleware untuk memvalidasi origin secara manual
const checkOrigin = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  const appOrigin = req.headers["x-app-origin"]; // Header kustom untuk React Native

  console.log("Origin:", origin, "App Origin:", appOrigin);

  if (
    allowedOrigins.includes(origin ?? "") || // Memeriksa jika origin termasuk yang diizinkan
    appOrigin === "react-native-app" // Pengecekan untuk React Native
  ) {
    next();
  } else {
    res.status(403).send("Origin not allowed");
  }
};

// Route configuration
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRouter);
app.use("/upload", uploadRouter);

app.use("/verify", verifyRouter);
if (process.env.NODE_ENV === "dev") {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

export const handler = serverless(app);
