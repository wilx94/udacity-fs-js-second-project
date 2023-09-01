import express, { Request, Response } from 'express'
import { BaseProduct, ProductStore } from '../models/products'

const store = new ProductStore()

const createProduct = async (req: Request, res: Response) => {
    console.log('creating product')

    const { 
        body: {
            name,
            price
        }
    } = req

    const newProductInfo: BaseProduct = {
        name,
        price
    }

    const newProduct = await store.create(newProductInfo)
    console.log('user created')

    res.send(newProduct)
}

const showProduct = async (req: Request, res: Response) => {
    console.log('showing product')

    const { 
        params: { id }
    } = req

    console.log({id})

    const product = await store.show(id)
    console.log({product})

    console.log('showing product finished')

    res.send(product)
}

const index = async (_req: Request, res: Response) => {
    console.log('index product')
    const products = await store.index()

    console.log('products retrieved')
    res.send(products)
}

// app.get('/products', function (req: Request, res: Response) {
//     res.send('product end point')
// })

// app.get('/products/:id', function (req: Request, res: Response) {
//     console.log(`${req.params.id}`)

//     res.send('specific product endpoint')
// })

// app.post('/products', function (req: Request, res: Response) {
//     console.log({...req.body})
//     console.log('create new product')

//     res.send('creating new product')
// })

const productRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', showProduct)
    app.post('/products', createProduct)
}

export default productRoutes