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

    async showByUser(userId: string): Promise< Order > {
        try {
            const conn = await Client.connect()

            const orderSql = `
                SELECT * FROM orders 
                WHERE user_id = $1
                AND STATUS = true
                ORDER BY id DESC
                LIMIT 1
            `

            const orderResult = await conn.query(orderSql, [ userId ])
            const currentOrder = orderResult.rows[0]

            const productsOrderSql = `
                SELECT * FROM product_orders
                WHERE order_id = $1
            `

            const productsOrder = await conn.query(productsOrderSql, [currentOrder.id])
            currentOrder.products = []

            productsOrder.rows.forEach( productOrder => {
                const { product_id: productId, qty } = productOrder
                currentOrder.products.push({ productId, qty })
            })

            return currentOrder
        } catch (error) {
            throw new Error(`Failed get order ${userId} > Error: ${error}`)
        }
    }
}