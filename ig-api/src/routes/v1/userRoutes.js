import express from "express";
import { User } from "../../controllers/UserController.js";
import { upload } from "../../middlewares/uploadImage.js";
import { verifyToken } from "../../middlewares/verifyToken.js";

const UserRouter = express.Router();

UserRouter.get("/:id", verifyToken, User.getUser)
  .put("/:id", verifyToken, upload.single("avatar"), User.editUser)
  .get("/follow/:id", verifyToken, User.getFollow)
  .get("/unfollow/:id", verifyToken, User.getUnFollow)
  .get("/users/:id", verifyToken, User.getUsers)
  .get("/recentsearch/:id", verifyToken, User.getRecentSearchUser);

export default UserRouter;
