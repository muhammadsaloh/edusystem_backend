import express from 'express'
import CourseController from '../controllers/CourseController.js'
import AuthMiddleware from '../middlewares/AuthMiddleware.js'

const router = express.Router()

router.use(AuthMiddleware)

router.get('/', CourseController.CourseGetController)

router.get('/:course_id', CourseController.CourseGetOneController)

export default {
    path: "/course",
    router: router
}