import express from "express";

// import controllers
import { loginPage, loginUser, registerPage, registerUser, profile, logout } from "../controllers/mainController.js";

// import middlewares
import { CheckLogger, CookieCheck, LoginCheck } from "../middlewares/auth.middleware.js";


const mainRouter = express.Router();

// Route for user registration
mainRouter.route("/register").get(CookieCheck, registerPage);
mainRouter.route("/register").post(registerUser);

// Route for user login
mainRouter.route("/").get(CookieCheck, loginPage);
mainRouter.route("/").post(loginUser);

// Route for user profile (requires login)
mainRouter.route("/profile").get(LoginCheck, CheckLogger, profile);

// Route for user logout (requires login)
mainRouter.route("/logout").post(LoginCheck, logout);

export { mainRouter };
