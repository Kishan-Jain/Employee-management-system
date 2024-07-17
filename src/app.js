import express from "express";
import cookieParser from "cookie-parser";

// define important vareables
const app = express();

// middileware for fetch data to template
app.use(express.urlencoded({ extended: true, limit: "150kb" }));
app.use(express.json({ limit: "30kb" }));

// session use
app.use(cookieParser());

// setting for ejs and views
app.set("view engine", "ejs");
app.set("views", "./views");

// public files : like images
app.use(express.static("public"));

// set templates engine and static files routes
app.use(express.static("static"));
app.use(express.static("profile/static"));

// difine routes
import { mainRouter } from "./routes/mainRoutes.js";

app.use("/", mainRouter);

export { app };
