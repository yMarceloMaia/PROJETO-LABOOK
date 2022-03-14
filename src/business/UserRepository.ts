import { Friend } from "../model/Friend"
import {User} from "../model/User"

export interface UserRepository{
    insert(user: User):Promise<User>
    findUserByEmail(email: string):Promise<User | null>
    findUserById(id: string): Promise<User | null>
    insertFriend(friend: Friend): Promise<Friend>
    isFriend(user_id: string, friend_id: string): Promise<Friend> 
    deleteFriendship(id: string): Promise<number>
}