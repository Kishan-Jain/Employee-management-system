// user registation
// user login
// update details
// upload avtar
// profile
// logout

import { EmployeeDetail } from "../models/userModels.js";
import { AccessRefreshTokenGenrator } from "../utils/accessRefreshTokenGenrator.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// custom methods
import { isSpace } from "../utils/customMethods.js";

export const loginPage = (req, res) => {
  res.render("main/home.ejs", { title: "Home", massage: false });
};

export const registerPage = (req, res) => {
  res.render("main/register.ejs", {
    title: "User registation",
    massage: false,
  });
};

export const registerUser = asyncHandler(async (req, res) => {
  // Check if the user is already authenticated
  if (req.user) {
    return res.redirect("/profile");
  }

  // Validate request body fields
  if (!req.body) {
    return res.render("main/register.ejs", {
      title: "User registration",
      message: "All fields are required",
    });
  }
  // Extract data from the request body
  const { username, fullname, email, empId, password, department, position } =
    req.body;

  // Check if any required fields are empty
  if (
    [username, fullname, email, empId, password, department, position].some(
      (field) => field?.toString().trim() === ""
    )
  ) {
    return res.render("main/register.ejs", {
      title: "User registration",
      message: "All fields are required",
    });
  }

  // Check for invalid values (e.g., spaces)
  if (
    [username, email, empId, password].some((field) => isSpace(field?.trim()))
  ) {
    return res.render("main/register.ejs", {
      title: "User registration",
      message: "Invalid value: spaces are not allowed",
    });
  }

  // Check if username already exists
  if (await EmployeeDetail.findOne({ username })) {
    return res.render("main/register.ejs", {
      title: "User registration",
      message: "Username already exists",
    });
  }

  // Check if empId already exists
  if (await EmployeeDetail.findOne({ empId })) {
    return res.render("main/register.ejs", {
      title: "User registration",
      message: "EmpId already exists",
    });
  }

  // Create a new user
  const newUser = new EmployeeDetail({
    username,
    fullname,
    email,
    empId,
    password,
    department,
    position,
  });

  try {
    await newUser.save({ validateBeforeSave: false });
    console.log("User created");
  } catch (error) {
    return res.render("main/register.ejs", {
      title: "User registration",
      message: `${error.code} - ${error.message}` || "All fields are required",
    });
  }

  // Retrieve the created user
  const createdUser = await EmployeeDetail.findById(newUser._id);

  if (!createdUser) {
    return res.render("main/register.ejs", {
      title: "User registration",
      message: "Something went wrong - User not created",
    });
  }

  // Render success message
  return res.status(200).render("main/home.ejs", {
    title: "Home",
    message: `User created successfully; Username: ${newUser.username}`,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  // Extract data from the request body
  const { username, password, saveInfo } = req.body;

  // Check if any required fields are empty
  if ([username, password, saveInfo].some((field) => field === "")) {
    return res.render("main/home.ejs", {
      title: "Home",
      message: "All fields are required",
    });
  }

  // Look up user data by username
  const userData = await EmployeeDetail.findOne({ username });
  if (!userData) {
    return res.render("main/home.ejs", {
      title: "Home",
      message: "User does not exist",
    });
  }

  // Verify user password
  if (!userData.IsPasswordCorrect(password)) {
    return res.render("main/home.ejs", {
      title: "Home",
      message: "Incorrect password",
    });
  }

  // Generate tokens and update database if 'saveInfo' is true
  if (saveInfo) {
    const { refreshToken, accessToken } =
      await AccessRefreshTokenGenrator(userData);

    try {
      await EmployeeDetail.findByIdAndUpdate(userData._id, {
        $set: {
          refreshToken: refreshToken,
          lastLogin: Date.now(),
        },
      });
    } catch (error) {
      return res.render("main/home.ejs", {
        title: "Home",
        message: "Database error",
      });
    }

    // Set cookies and redirect to profile page
    return res
      .status(200)
      .cookie("accessToken", accessToken, { secure: true })
      .cookie("refreshToken", refreshToken, { secure: true })
      .cookie("massage", `Welcome to ${userData.fullname}`)
      .redirect("/profile");
  } else {
    // Generate an access token without a refresh token
    const accessToken = userData.GenrateAccessToken();

    // Set a cookie and redirect to profile page
    return res
      .status(200)
      .cookie("accessToken", accessToken, { secure: true })
      .cookie("massage", `Welcome to ${userData.fullname}`)
      .redirect("/profile");
  }
});

export const setAvatar = asyncHandler(async (req, res) => {
  // user
  // localfilepath
  // upload to cloudnary
  // return to cookie

  
});

export const logout = asyncHandler(async (req, res) => {
  // check user authenticated or not by middleware
  // Invalidate the user's refresh token by setting it to undefined
  await EmployeeDetail.findByIdAndUpdate(req.user?._id, {
      $set: {
          refreshToken: undefined,
      },
  });

  // Clear cookies for refreshToken and accessToken
  return res
      .clearCookie("refreshToken")
      .clearCookie("accessToken")
      .redirect("/");
});


export const profile = asyncHandler(async (req, res) => {
  // Check if there is a cookie named 'massage'
  if (req.cookies?.massage) {
      const massage = req.cookies?.massage;

      // Clear the 'massage' cookie and render the profile page with a welcome message
      return res.clearCookie("massage").render("main/profile.ejs", {
          title: `Welcome to ${req.user?.fullname}`,
          massage: massage,
      });
  }

  // Note: The profile page is directly rendered if the user come by logged in page.
  // If already logged in, it will automatically redirect to the profile page.
  return res.render("main/profile.ejs", {
      title: `${req.user?.fullname} - ${req.user?.position}`,
      massage: false,
  });
});
