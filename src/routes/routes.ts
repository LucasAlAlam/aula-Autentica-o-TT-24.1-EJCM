import { Router } from "express";

import authController from "../controllers/authController";
import userController from "../controllers/userController";

const router = Router()

router.post("/login", authController.login);
router.get("/userInfo", authController.getDetails);


router.post("/user", userController.create)
router.get("/users", userController.show)
router.get("/user/:id", userController.index)
router.put("/user/:id", userController.update)
router.delete("/userDelete/:id", userController.destroy)

export default router;