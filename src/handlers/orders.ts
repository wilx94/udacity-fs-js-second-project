import express, { Request, Response } from 'express'
import { BaseOrder, OrderStore } from '../models/orders'
import { verifyAuthToken } from './utilities'

const store = new OrderStore()

const createOrder = async (req: Request, res: Response) => {
    console.log('creating order')
    const { 
        body: {
            userId,
            status
        }
    } = req

    const newOrderInfo: BaseOrder = {
        userId,
        status
    }

    const newOrder = await store.create(newOrderInfo)
    console.log('order created')

    res.send(newOrder)
}

const showUserOrder = async (req: Request, res: Response) => {
    console.log('showing order')
    const {
        params: { userId }
    } = req

    const order = await store.showByUser(userId)

    res.send(order)
}

const index = async (_req: Request, res: Response) => {
    console.log('index order')
    const orders = await store.index()

    res.send(orders)
}

// app.get('/orders', function (req: Request, res: Response) {
//     res.send('order end point')
// })

// app.get('/orders/:id', function (req: Request, res: Response) {
//     console.log(`${req.params.id}`)

//     res.send('specific order endpoint')
// })

// app.post('/orders', function (req: Request, res: Response) {
//     console.log({...req.body})
//     console.log('create new order')

//     res.send('creating new order')
// })

const orderRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/current/:userId', verifyAuthToken, showUserOrder)
    app.post('/orders', createOrder)
}

export default orderRoutes