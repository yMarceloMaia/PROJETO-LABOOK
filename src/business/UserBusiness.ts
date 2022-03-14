import { Friend, FriendUserInputDTO } from "../model/Friend";
import { SignupInputDTO, User } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGeneration } from "../services/IdGenerator";
import { UserRepository } from "./UserRepository";

export class UserBusiness {
        private userData: UserRepository
        private idGenerator: IdGeneration
        private hashManager: HashManager
        private authentication: Authenticator
    constructor(userDataImplementation: UserRepository){
        this.userData = userDataImplementation
        this.idGenerator = new IdGeneration()
        this.hashManager = new HashManager()
        this.authentication = new Authenticator()
    }
    signup = async (input: SignupInputDTO) => {
        const { name, email, password } = input

        const id = this.idGenerator.generateId()

        if (!name || !email || !password) {
            throw new Error("Campos vazios")
        }
        if (password.length < 6) {
            throw new Error("A senha deve ter no mínimo 6 caracteres")
        }

        const hashedPassword = this.hashManager.createHash(password)

        const user = new User(
            id,
            name,
            email,
            hashedPassword
        )

        await this.userData.insert(user)

        const token = this.authentication.generate({ id })

        return token
    }
    login = async (email: string, password: string) => {
        if(!email || !password){
            throw new Error("Preencha corretamente os campos 'email' e 'password'")
        }
        if(password.length < 6){
            throw new Error("A senha deve ter no mínimo 6 caracteres")
        }
        const user = await this.userData.findUserByEmail(email)
        
        if(!user){
            throw new Error("Este e-mail não existe")
        }
        const passwordIdCorrect = this.hashManager.compareHash(password, user.getPassword())

        if(!passwordIdCorrect){
            throw new Error("E-mail ou senha inválidos")
        }

        const token = this.authentication.generate({id: user.getId()})

        return token
    }
    insertFriend = async (input: FriendUserInputDTO) => {

        const {token, friend_id} = input
        const id = this.idGenerator.generateId() as string
        if(!token || !friend_id){
            throw new Error("Preencha corretamente os campos de 'id do usuário' e 'id do amigo'")
        }
        const user = await this.userData.findUserById(friend_id)
        if(!user){
            throw new Error("Este e-mail não existe")
        }
        const tokenExist = this.authentication.getTokenData(token)
        if (!tokenExist) {
            throw new Error("Token inválido")
        }
        const user_id = tokenExist.id
        const friendExist = await this.userData.isFriend(user_id, friend_id)
        if(friendExist){
            throw new Error("Estes usuários já possuem amizade")
        }
        const friend = new Friend(
            id,
            user_id,
            friend_id
        )
        await this.userData.insertFriend(friend)
        return "Sucesso"
    }
    deleteFriendship = async (token: string, id: string) => {
        if(!token || !id){
            throw new Error("Preencha corretamente os campos de 'id do usuário' e 'id do amigo'")
        }
        const tokenExist = this.authentication.getTokenData(token)
        if (!tokenExist) {
            throw new Error("Token inválido")
        }
        const result = await this.userData.deleteFriendship(id)
        if(!result){
            throw new Error("Amizade não existe")
        }
        return "Desfeita a amizade com sucesso"
    }
}