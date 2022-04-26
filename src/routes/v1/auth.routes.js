import { Router } from "express";
import * as auth from "../../controllers/userController/auth";
import { verifyToken } from "../../middlewares";

const router = Router();

router.post("/login", auth.signIn);
router.post("/register", auth.signUp);
router.get("/profile", verifyToken, auth.getProfile);

export default router;
