import express from 'express'
import { userController } from '../../controllers/user.controller'


export const  userRouter=express.Router()
userRouter.get('/users/:id',userController.getUserById)

userRouter.patch('/users/:id',userController.updateUser)

userRouter.delete('/users/:id',userController.deleteUserById)

userRouter.get('/users',userController.getAllUser)