import { PostRepository } from "../business/PostRepository";
import { Post } from "../model/Post";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase implements PostRepository {
    protected TABLE_NAME = "labook_posts"
    insert = async (post: Post) => {
        try {
            await BaseDatabase.connection(this.TABLE_NAME)
                .insert(post)
            return post
        } catch (error: any) {
            throw new Error("Erro ao criar post no banco de dados")
        }
    }
    getPostById = async (id: string) => {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME)
                .select()
                .where({ id })
            if (!result[0]) {
                return null
            }
            return Post.toPostModel(result[0])
        } catch (error) {
            throw new Error("Erro ao acessar banco de dados")
        }
    }
}