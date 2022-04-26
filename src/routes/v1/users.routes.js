import { Router } from "express";
import * as user from "../../controllers/userController";

const router = Router();

router.get("/", user.showAll);
router.post("/", user.store);
router.get("/:id", user.show);
router.put("/:id", user.update);
router.delete("/:id", user.remove);

//? Modificar Contraseña
router.post("/update-password", user.changePassword);

export default router;
