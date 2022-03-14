import { UserRepository } from "../business/UserRepository";
import { Friend } from "../model/Friend";
import { User } from "../model/User";
import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase implements UserRepository {
    protected TABLE_USERS = "labook_users"
    protected TABLE_FRIENDS = "labook_friends"
    insert = async (user: User) => {
        try {
            await BaseDatabase.connection(this.TABLE_USERS)
                .insert(user)
            return user
        } catch (error: any) {
            throw new Error("Erro ao criar usuário no banco de dados")
        }
    }
    findUserByEmail = async (email: string) => {
        try {
            const result = await BaseDatabase.connection(this.TABLE_USERS)
                .select()
                .where({ email })
            if (!result[0]) {
                return null
            }
            return User.toUserModel(result[0])
        } catch (error: any) {
            throw new Error("Erro ao buscar usuário no banco de dados")
        }
    }
    findUserById = async (id: string) => {
        try {
            const result = await BaseDatabase.connection(this.TABLE_USERS)
                .select()
                .where({ id })
            if (!result[0]) {
                return null
            }
            return User.toUserModel(result[0])
        } catch (error: any) {
            throw new Error("Erro ao buscar usuário no banco de dados")
        }
    }
    insertFriend = async (friend: Friend) => {
        try {
            await BaseDatabase.connection(this.TABLE_FRIENDS)
                .insert(friend)
            return friend
        } catch (error: any) {
            throw new Error("Erro ao tentar acessar o banco de dados")
        }
    }
    isFriend = async (user_id: string, friend_id: string) => {
        try {
            const result = await BaseDatabase.connection(this.TABLE_FRIENDS)
                .select()
                .where({user_id})
                .andWhere({friend_id})
            return result[0]
        } catch (error: any) {
            throw new Error("Erro ao tentar buscar amizades no banco de dados")
        }
    }
    deleteFriendship = async (id: string) => {
        try {
            const result = await BaseDatabase.connection(this.TABLE_FRIENDS)
                .where({ id })
                .delete()
            return result
        } catch (error: any) {
            throw new Error("Erro ao tentar acessar o banco de dados")
        }
    }
}