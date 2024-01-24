import { Prisma , PrismaClient} from "@prisma/client";
import { Request, Response } from "express";
import auth from "../config/auth";

const prisma = new PrismaClient();


class userController {

    async create(req: Request, res: Response){
        try{
            const {username, password} = req.body;

            const { hash, salt } = auth.generatePassword(password);
            let userInput: Prisma.UserCreateInput = {
                username,
                hash,
                salt
            }     
                       
            
            const user = await prisma.user.create({
                data: userInput
                          
            })
            return res.status(201).json(user);

        }catch(error: any){
            return res.status(500).json({ error: error.message})

        }
    }
    async show(req: Request, res: Response){
        try {
            const user = await prisma.user.findMany()
            return res.status(201).json(user)
            
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    }
    async index(req: Request, res: Response){
        try {
            const { id } = req.params;
            const user = await prisma.user.findUnique({
                where:{
                    id: Number(id)
                },
            })
            return res.status(201).json(user)
            
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    }
    async update(req: Request, res: Response){
        try {
            const { id } = req.params;
            const { username }= req.body;
            let userInput: Prisma.UserUpdateInput = {
                username               
            }
            const user = await prisma.user.update({
                data: userInput,
                where: {
                    id: Number(id)
                }
            })
            return res.status(201).json(user)
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    }
    async destroy(req: Request, res: Response){
        try {
            const { id } = req.params;
            const user = await prisma.user.delete({
                where: {
                    id: Number(id)
                }
            })
            return res.status(201).json(user)
        } catch (error: any) {
            return res.status(500).json({ error: error.message })
            
        }
    }
}

export default new userController()