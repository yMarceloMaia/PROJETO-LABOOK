export type FriendUserInputDTO = {
    token: string,
    friend_id: string
}

export class Friend {
    constructor(
        private id: string,
        private user_id: string,
        private friend_id: string
    ){}
    static toUserModel(data: any): Friend {
        return new Friend(data.id, data.user_id, data.friend_id)
    }
    public getId(){
        return this.id
    }
    public getUserId(){
        return this.user_id
    }
    public getFriendId(){
        return this.friend_id
    }
}