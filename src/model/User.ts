export type SignupInputDTO = {
    name: string,
    email: string,
    password: string
}

export class User{
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private password: string
    ){}
    static toUserModel(data: any): User {
        return new User(data.id, data.name, data.email, data.password)
    }
    public getId(){
        return this.id
    }
    public getName(){
        return this.name
    }
    public getEmail(){
        return this.email
    }
    public getPassword(){
        return this.password
    }
}
