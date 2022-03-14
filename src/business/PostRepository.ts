import { Post } from "../model/Post";

export interface PostRepository{
    insert(post: Post): Promise<Post>,
    getPostById(id: string): Promise<Post | null>
}