import Client from "../database";


export interface BaseProduct {
    name: String;
    price: String;
}

export interface Product extends BaseProduct {
    id: number;
}

export class ProductStore {
    async create(productInfo: BaseProduct): Promise< Product > {
        try {
            const { name, price } = productInfo
            const conn = await Client.connect()

            const sql = `INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *`

            const result = await conn.query(sql, [ name, price ])

            conn.release()

            return result.rows[0]
        } catch (error) {
            throw new Error(`Failed creating Product > Error: ${error}`)
        }
    }

    async index(): Promise< Product[] > {
        try {
            const conn = await Client.connect()

            const sql = `SELECT * FROM products`

            const result = await conn.query(sql)

            conn.release()

            return result.rows
        } catch (error) {
            throw new Error(`Failed to get products > Error: ${error}`)
        }
    }

    async show(id: string): Promise< Product > {
        try {
            const conn = await Client.connect()

            const sql = `SELECT * FROM products WHERE id = ($1)`

            const result = await conn.query(sql, [ id ])

            conn.release()
            console.log(result.rows[0])

            return result.rows[0]
        } catch (error) {
            throw new Error(`Failed get product ${id} > Error: ${error}`)
        }
    }
}