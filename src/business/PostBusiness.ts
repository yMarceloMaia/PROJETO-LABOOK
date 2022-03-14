import { CreatePostInputDTO, Post } from "../model/Post";
import { Authenticator } from "../services/Authenticator";
import { IdGeneration } from "../services/IdGenerator";
import { PostRepository } from "./PostRepository";

export class PostBusiness {
    private postData: PostRepository
    private idGenerator: IdGeneration
    private authentication: Authenticator
    constructor(postDataImplementation: PostRepository) {
        this.postData = postDataImplementation
        this.idGenerator = new IdGeneration()
        this.authentication = new Authenticator()
    }
    createPost = async (input: CreatePostInputDTO, token: string) => {
        const { photo, description, type, author_id } = input

        const id = this.idGenerator.generateId()
        if (!photo || !description || !type || !author_id) {
            throw new Error("Campos vazios")
        }

        const tokenExist = this.authentication.getTokenData(token)
        if (!tokenExist) {
            throw new Error("Token inválido")
        }

        const created_at = new Date().toString()
        const post = new Post(
            id,
            photo,
            description,
            type,
            created_at,
            tokenExist.id
        )
        console.log(post)
        await this.postData.insert(post)
        return "Post criado com sucesso"
    }
    getPostById = async (id: string, token: string) => {
        if (!id) {
            throw new Error("Precisa de um id")
        }
        const tokenExist = this.authentication.getTokenData(token)
        if (!tokenExist) {
            throw new Error("Token inválido")
        }
        const result = await this.postData.getPostById(id)

        return result
    }
}