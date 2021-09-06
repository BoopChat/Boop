const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");

require("./loginStrategies/googleStrategy");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

<<<<<<< HEAD
// after successful login with google strategy, user db record will be sent
// here in the req.user property.
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    //on successfull login with the provider a login Information cookie is created.
    res.cookie("loginCookie", JSON.stringify(req.user), {
      secure: false,
      httpOnly: true,
      expires: dayjs().add(1, "year").toDate(),
    });

    //access token cookie is also created.
    const token = jwt.sign({ id: req.user.id }, process.env.TOKEN_SECRET);
    res.cookie("tokenCookie", token, {
      secure: false,
      httpOnly: true,
    });

    //both cookies sent to redirected url
    res.status(301).redirect("http://localhost:3000");
  }
);

//login using cookie
router.get("/cookie", (req, res) => {
  //if cookie with user login information exists, use it to log in user.
  if (req.cookies.loginCookie) {
    const { id } = JSON.parse(req.cookies.loginCookie);

    //validate id in the database

    //create token using the user id.
    const token = jwt.sign({ id: id }, process.env.TOKEN_SECRET);

    //send user access token cookie
    res.cookie("tokenCookie", token, {
      secure: false,
      httpOnly: true,
    });

    return res.status(200).json({
      success: true,
      msg: "User Authenticated",
      //user data could be send here.
    });
  }

  res.status(200).json({
    success: false,
    msg: "Login with social provider",
  });
});

//verifies user is logged in by verifying the access tokenCookie.
router.get("/success", (req, res) => {
  if (!req.cookies.tokenCookie) {
    return res.status(200).json({
      success: false,
      msg: "Not Authenticated",
    });
  }

  const token = req.cookies.tokenCookie;
  const { id } = jwt.verify(token, process.env.TOKEN_SECRET);

  //the id to verify user in database and return the record.

  //if user is valid return sucessful login and user data.
  res.status(200).json({
    success: true,
    msg: "User Authenticated",
    // can send user data to front-end here
  });
});

//logout
router.get("/logout", (req, res) => {
  res.clearCookie("tokenCookie");
  res.status(200).json({
    success: true,
    msg: "Logged Out",
  });
=======
router.post("/google", async (req, res) => {
    const { token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID,
        });

        const { given_name, family_name, email, picture } = ticket.getPayload();

        //send info to data base using an upsert requests
        //return created or updated record so user id can be used for JWT.

        //testing data of return record
        const user = {
            id: "aslkdjhjd7363",
            first_name: given_name,
            last_name: family_name,
            email,
            picture,
        };

        const authToken = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);

        res.status(200).header("auth-token", authToken).json({
            status: "success",
            authToken,
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            error: err,
        });
    }
>>>>>>> d1162b131ae513f7a845f0317bea97deb73ba80e
});

// router.get("/google", async (req, res) => {
//   res.status(200).json({
//     status: "success",
//     msg: "hello from google",
//   });
// });
module.exports = router;
