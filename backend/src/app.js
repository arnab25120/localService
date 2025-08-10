import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//test
app.get("/", (req, res) => {
  res.send("Hello");
});

//routes import
import userRouter from "./routes/user.routes.js";
import serviceRouter from "./routes/service.routes.js";
import adminRouter from "./routes/admin.routes.js";
import searchRouter from "./routes/search.routes.js";
app.use("/api/v1/users", userRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/search", searchRouter);

export { app };
