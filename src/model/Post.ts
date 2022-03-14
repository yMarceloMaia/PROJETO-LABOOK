export type CreatePostInputDTO = {
    photo: string,
    description: string,
    type: string,
    author_id: string
}

export class Post {
    constructor(
        private id: string,
        private photo: string,
        private description: string,
        private type: string,
        private created_at: string,
        private author_id: string
    ) { }
    static toPostModel(data: any): Post {
        return new Post(data.id, data.photo, data.description, data.type, data.created_at, data.author_id)
    }
    public getId() {
        return this.id
    }
    public getPhoto() {
        return this.photo
    }
    public getDescription() {
        return this.description
    }
    public getType() {
        return this.type
    }
    public getCreatedAt() {
        return this.created_at
    }
    public getAuthorId() {
        return this.author_id
    }
}