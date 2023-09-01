import Client from "../database";


export interface BaseOrder {
    userId: String;
    status: String;
}

export interface Order extends BaseOrder {
    id: number;
}

export class OrderStore {
    async create(orderInfo: BaseOrder): Promise< Order > {
        try {
            const { userId, status } = orderInfo
            const conn = await Client.connect()

            const sql = `INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *`

            const result = await conn.query(sql, [ userId, status ])

            conn.release()

            return result.rows[0]
        } catch (error) {
            throw new Error(`Failed creating Order > Error: ${error}`)
        }
    }

    async index(): Promise< Order[] > {
        try {
            const conn = await Client.connect()

            const sql = `SELECT * FROM orders`

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (error) {
            throw new Error(`Failed to get orders > Error: ${error}`)
        }
    }

    async show(id: string): Promise< Order > {
        try {
            const conn = await Client.connect()

            const sql = `SELECT * FROM orders WHERE id = ($1)`

            const result = await conn.query(sql, [ id ])

            conn.release()
            console.log(result.rows[0])

            return result.rows[0]
        } catch (error) {
            throw new Error(`Failed get order ${id} > Error: ${error}`)
        }
    }
}