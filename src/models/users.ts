import Client from "../database";
import bcrypt from 'bcrypt'


export interface BaseUser {
    firstName: String;
    lastName: String;
    password: String;
}

export interface User extends BaseUser {
    id: number;
}

export class UserStore {
    async create(userInfo: BaseUser): Promise< User > {
        try {
            const { firstName, lastName, password } = userInfo
            const conn = await Client.connect()

            const sql = `INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *`

            const { BCRYPT_PASSWORD: pepper = '', SALT_ROUNDS: saltRounds = ''} = process.env

            const hash = bcrypt.hashSync(password + pepper, parseInt(saltRounds))

            const result = await conn.query(sql, [ firstName, lastName, hash ])

            conn.release()

            return result.rows[0]
        } catch (error) {
            throw new Error(`Failed creating user > Error: ${error}`)
        }
    }

    async index(): Promise< User[] > {
        try {
            const conn = await Client.connect()

            const sql = `SELECT * FROM users`

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (error) {
            throw new Error(`Failed to get users > Error: ${error}`)
        }
    }

    async show(id: string): Promise< User > {
        try {
            const conn = await Client.connect()

            const sql = `SELECT * FROM users WHERE id = ($1)`

            const result = await conn.query(sql, [ id ])

            conn.release()
            console.log(result.rows[0])

            return result.rows[0]
        } catch (error) {
            throw new Error(`Failed get user ${id} > Error: ${error}`)
        }
    }
}