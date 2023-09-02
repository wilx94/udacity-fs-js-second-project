import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log('verofying token')
        const authorizationHeader = req.headers.authorization
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        console.log('after decoded')

        next()
    } catch (error) {
        console.log('inside error')
        res.status(401)
        res.json('Access denied')
        return
    }
}