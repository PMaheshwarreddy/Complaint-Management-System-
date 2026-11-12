import passport from "passport";
import AsyncHandler from "express-async-handler";
import { User } from "../models/UserModel.js";
import { frontendUrls, pageSize } from "../constants.js";
import { GetComplaintId } from "../utils/getCompliantId.js";

// User authentication
export const Userauth = (req, res, next) => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return res.status(503).send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Google OAuth Not Configured</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f1f5f9; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 1rem; }
            .card { background: white; padding: 2.5rem; border-radius: 16px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1); max-width: 480px; text-align: center; }
            h2 { color: #dc2626; margin-top: 0; }
            p { color: #475569; line-height: 1.6; }
            code { background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 4px; font-weight: 600; color: #0f172a; }
            .btn { display: inline-block; margin-top: 1.5rem; padding: 0.75rem 1.5rem; background: #2563eb; color: white; border-radius: 8px; text-decoration: none; font-weight: 600; transition: background 0.2s; }
            .btn:hover { background: #1d4ed8; }
          </style>
        </head>
        <body>
          <div class="card">
            <h2>⚙️ Google OAuth Not Configured</h2>
            <p>To enable live Google Sign-In, please provide your <code>GOOGLE_CLIENT_ID</code> and <code>GOOGLE_CLIENT_SECRET</code> in <code>backend/.env</code>.</p>
            <p>You can also use the instant <strong>Offline Demo Roles</strong> directly on the login page to preview all dashboards.</p>
            <a href="${frontendUrls.home}" class="btn">← Back to Application</a>
          </div>
        </body>
      </html>
    `);
  }
  try {
    passport.authenticate("google", {
      scope: ["email", "profile"],
    })(req, res, next);
  } catch (error) {
    console.log(error);
  }
};

export const UserCallBack = (req, res, next) => {
  passport.authenticate("google", {
    successRedirect: frontendUrls.home,
    failureRedirect: frontendUrls.loginError,
    failWithError: true,
  })(req, res, next);
};
//User Logout
export const UserLogout = (req, res) => {
  req.logout(() => {
    req.session.destroy((err) => {
      if (err) {
        // return res.json({
        //   success: false,
        //   message: "Could not log out, please try again",
        // });
        // console.log('cant logout user')
      } else {
        res.clearCookie("connect.sid");
      }
      return res.redirect(frontendUrls.home);
    });
  });
};

const toogleBlock = async (id, res, value) => {
  const result = await User.updateOne({ googleId: id }, { IsBlock: value });

  if (result.matchedCount === 0) {
    throw new Error("User not found");
  }
  return res.status(200).json({
    status: "success",
    message: value ? "User blocked successfully" : "User unblocked successfully",
  });
};

//Block User by admin
export const BlockUser = AsyncHandler(async (req, res) => {
  return await toogleBlock(req.params.id, res, true);
});

//Unblock User by admin
export const unblockUser = AsyncHandler(async (req, res) => {
  return await toogleBlock(req.params.id, res, false);
});


export const createUser = AsyncHandler(async (req, res) => {
  const { email, role } = req.body;
  if (!email || !role) throw new Error("Invalid request");
  const parsedRole = parseInt(role);
  const domain = req.body.domain ? parseInt(req.body.domain) : undefined;
  const options = {
    domain,
    email,
    userType: parsedRole,
    googleId: GetComplaintId(),
    flag: true,
  };
  const user = await User.findOne({ email });
  if (user) throw new Error("User already exists");
  await User.create(options);
  res.status(200).json({
    status: "success",
    message: "User created successfully",
  });
  res.status(400).json({
    status: "failed",
    message: "User not created",
  });
});

//User Information access by admin
export const getUser = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ googleId: id });
  if (!user) {
    throw new Error("Invalid Id,Please try Again!");
  }
  res.json(user);
});

const formatUser = (user, googleUser) => {
  const _user = user.toObject();

  const role = user.userType;
  delete _user.userType;
  delete _user.__v;
  delete _user._id;
  delete _user.createdAt;
  delete _user.updatedAt;
  delete _user.googleId;
  return {
    ..._user,
    role,
    image: googleUser.photos[0].value,
  };
};

export const pingUser = AsyncHandler(async (req, res) => {
  if (req.user) {
    const user = await User.findOne({ googleId: req.user.id });
    if (!user) {
      return res.status(404).json({ message: "User not found in database" });
    }
    res.json(formatUser(user, req.user));
  } else {
    res.status(401).json({ message: "User not found" });
  }
});

const userQuery = async (page, filter = {}, sortFilter = { createdAt: 1 }) => {
  return await User.find(filter)
    .sort(sortFilter)
    .skip(pageSize * (page - 1))
    .limit(pageSize);
};

const formatUserPreview = (user) => {
  const {
    displayName,
    email,
    userType: role,
    isBlocked,
    domain,
    rollNo,
  } = user;
  return {
    displayName,
    email,
    role,
    isBlocked,
    domain,
    rollNo,
  };
};

//All User Information access by admin
export const getUsers = AsyncHandler(async (req, res) => {
  const { suburl } = req.params;
  const { page } = req.query;
  const parsedPage = parseInt(page);
  if (!suburl) return res.status(400).json({ message: "Invalid URL" });
  let users = [];
  if (suburl === "all") {
    users = await userQuery(parsedPage);
    return res.json({
      users,
      nextPage: users.length === pageSize ? parsedPage + 1 : null,
    });
  } else {
    const parsedSuburl = parseInt(suburl);
    users = await userQuery(parsedPage, { userType: parsedSuburl });
  }

  users = users.map(formatUserPreview);

  return res.json({
    users,
    nextPage: users.length === pageSize ? parsedPage + 1 : null,
  });
});