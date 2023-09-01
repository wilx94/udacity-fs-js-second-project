import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import userRoutes from './handlers/users'
import productRoutes from './handlers/products'
import orderRoutes from './handlers/orders'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})


//users
userRoutes(app)

//Products
productRoutes(app)

// token required
// app.post('/products', function (req: Request, res: Response) {
//     console.log({...req.body})
//     console.log('create new product')

//     res.send('creating new product')
// })

// Orders 

orderRoutes(app)
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

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
