import express, { Request, Response } from 'express'

import { BaseUser, UserStore } from '../models/users'
import { verifyAuthToken } from './utilities'
import jwt from 'jsonwebtoken'

const store = new UserStore()

const createUser = async (req: Request, res: Response) => {
    console.log('creating user')

    const { 
        body: {
            firstName,
            lastName,
            password 
        }
    } = req

    const newUserInfo: BaseUser = {
        firstName,
        lastName,
        password
    }

    const newUser = await store.create(newUserInfo)
    console.log('user created')

    const {
        TOKEN_SECRET: tokenSecret = ''
    } = process.env
    
    const token = jwt.sign(newUser, tokenSecret)

    res.send(token)
}

const showUser = async (req: Request, res: Response) => {
    console.log('showing user')

    const { 
        params: { id }
    } = req

    console.log({id})

    const user = await store.show(id)
    console.log({user})

    console.log('showing user finished')

    res.send(user)
}

const index = async (_req: Request, res: Response) => {
    const users = await store.index()

    res.send(users)
}

// app.get('/users', function (req: Request, res: Response) {
//     res.send('user end point')
// })

// app.get('/users/:id', function (req: Request, res: Response) {
//     console.log(`${req.params.id}`)

//     res.send('specific user endpoint')
// })

// app.post('/users', function (req: Request, res: Response) {
//     console.log({...req.body})
//     console.log('create new user')

//     res.send('creating new user')
// })

const userRoutes = (app: express.Application) => {
    app.get('/users', verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, showUser)
    app.post('/users', createUser)
}

export default userRoutes