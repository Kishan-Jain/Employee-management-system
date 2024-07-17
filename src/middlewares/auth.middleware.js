import jwt from "jsonwebtoken";
import { EmployeeDetail } from "../models/userModels.js";

export const CookieCheck = async (req, res, next) => {
  // Check if cookie or authorization header is present
  if (req.cookies?.accessToken || req.headers?.authorization) {
    const accessToken =
      req.cookies?.accessToken ||
      req.headers?.authorization?.replace("Bearer ", "").trim();

    if (!accessToken) {
      return res.redirect("/");
    }

    try {
      // Verify JWT token
      const decodeData = await jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET_KEY
      );
      if (!decodeData) {
        return res.redirect("/");
      }

      // Find user by ID and exclude password and refreshToken fields
      const user = await EmployeeDetail.findById(decodeData._id).select(
        "-password -refreshToken"
      );
      if (!user) {
        return res.redirect("/");
      }

      // Attach user to request object
      req.user = user;
      return res.redirect("/profile");
    } catch (error) {
      console.error("Authentication error:", error);
      return res.redirect("/");
    }
  }
  next();
};

export const LoginCheck = async (req, res, next) => {
  // Check if cookie or authorization header is present
  if (!req.cookies) {
    console.log("cookie not present");
    return res.redirect("/");
  }

  // Get token from cookie or authorization header
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.redirect("/");
  }

  try {
    // Verify JWT token
    const decodeData = await jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    if (!decodeData) {
      return res.redirect("/");
    }

    // Find user by ID and exclude password and refreshToken fields
    const user = await EmployeeDetail.findById(decodeData._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      return res.redirect("/");
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.redirect("/");
  }
};

export const CheckLogger = async (req, res, next) => {
  // Check if the user is authenticated
  if (!req.user) {
    return res.redirect("/");
    // redirect if not authenticated
  }

  // Retrieve user details from the database
  const userDetails = await EmployeeDetail.findById(req.user?._id).select(
    "-password -refreshToken"
  );
  if (!userDetails) {
    return res.redirect("/");
    // redirect if user details not found
  }

  // Check user permissions (HR department, Owner, or Admin)
  if (
    !(
      userDetails.department === "HR" ||
      userDetails.position === "Owner" ||
      userDetails.position === "Admin"
    )
  ) {
    return res.render("main/home.ejs", {
      title: "Home",
      message: "User not allowed to log in",
    });
    // redirect if permissions are not met
  }

  // Update req.user with retrieved user details
  req.user = userDetails;
  next(); // Proceed to the next middleware
};
