import express from 'express'
import UserController from '../controllers/UserController.js'
import AdminMiddleware from '../middlewares/AdminMiddleware.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'

const router = express.Router()

router.post('/check-phone', UserController.checkPhone)

router.post('/signup', UserController.signup)

router.post('/login', UserController.login)

router.post('/validate-code', UserController.validateCode)

router.post('/edit', AuthMiddleware, UserController.editPersonalData)

router.post('/editPhoto', AuthMiddleware, UserController.editPhoto)

router.post('/promoteUser', [AuthMiddleware, AdminMiddleware], UserController.promoteUser)


router.get('/', AuthMiddleware, UserController.getData)



export default {
    path: "/users",
    router
}