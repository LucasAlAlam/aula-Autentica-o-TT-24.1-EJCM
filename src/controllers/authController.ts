import { Request, Response } from "express";
import Auth from "../config/auth";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { username: req.body.username },
      });
      if (!user)
        return res.status(404).json({ message: "Usuário não encontrado." });
      const { password } = req.body;
      if (Auth.checkPassword(password, user.hash, user.salt)) {
        const token = Auth.generateJWT(user);
        return res.status(200).json({ token: token });
      } else {
        return res.status(401).json({ message: "Senha inválida." });
      }
    } catch (e) {
      return res.status(500).json({ err: e });
    }
  }

  async getDetails(req: Request, res: Response) {
    try {
      const token = Auth.getToken(req);
      const payload = Auth.decodeJWT(token);
      const user = await prisma.user.findUnique({ where: { id: payload.sub } });
      if (!user)
        return res.status(404).json({ message: "Usuário não encontrado." });
      return res.status(200).json({ client: user });
    } catch (e) {
      return res.status(500).json({ err: e });
    }
  }
}

export default new AuthController();