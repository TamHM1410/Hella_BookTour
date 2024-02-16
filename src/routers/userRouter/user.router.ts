import express from 'express'
import { userController } from '../../controllers/user.controller'

export const userRouter=express.Router()


userRouter.get('/users',userController.getAllUser)

userRouter.get('/users/:id',userController.getUserById)

userRouter.delete('/users',userController.deleteUserById)

userRouter.patch('/users/password',userController.changePassword)

userRouter.patch('/users/:id',userController.updateUser)