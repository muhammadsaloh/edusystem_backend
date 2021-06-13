import express from 'express'
import AdminController from '../controllers/AdminController.js'
import AdminMiddleware from '../middlewares/AdminMiddleware.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'

const router = express.Router()

router.use(AuthMiddleware)

router.patch('/', AdminMiddleware, AdminController.editSettings)



export default {
    path: "/admin",
    router
}