import { Request, Response } from "express"
import { UserBusiness } from "../business/UserBusiness"
import { UserDatabase } from "../data/UserDatabase"
import { FriendUserInputDTO } from "../model/Friend"
import { SignupInputDTO } from "../model/User"

export class UserController {
    private userBusiness: UserBusiness
    constructor() {
        this.userBusiness = new UserBusiness(
            new UserDatabase()
        )
    }
    signup = async (req: Request, res: Response) => {
        const { name, email, password } = req.body
        const input: SignupInputDTO = {
            name,
            email,
            password
        }
        try {
            const token = await this.userBusiness.signup(input)
            res.status(201).send({ message: "Usuário cadastrado com sucesso", token })
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send("Erro ao tentar fazer o signup")
        }
    }
    login = async (req: Request, res: Response) => {
        const { email, password } = req.body
        try {
            const token = await this.userBusiness.login(email, password)
            res.status(200).send({ message: "Logado com sucesso!", token })
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send("Erro ao tentar fazer login")
        }
    }
    insertFriend = async (req: Request, res: Response) => {
        const friend_id = req.params.id
        const token = req.headers.authorization as string
        const input: FriendUserInputDTO = {
            token,
            friend_id
        }
        try {
            const result = await this.userBusiness.insertFriend(input)
            res.status(200).send({ message: result })
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send("Erro ao tentar fazer amizade")
        }
    }
    deleteFriendship = async (req: Request, res: Response) => {
        const user_id = req.params.id
        const token = req.headers.authorization as string
        try {
            const result = await this.userBusiness.deleteFriendship(token, user_id)
            res.status(200).send({ message: result })
        } catch (error: any) {
            if (error.message) return res.status(400).send(error.message)
            res.status(400).send("Erro ao tentar desfazer amizade")
        }
    }
}