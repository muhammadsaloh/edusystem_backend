import HomeRoute from './HomeRoute.js'
import UsersRoute from './UsersRoute.js'
import FileRoute from './FileRoute.js'
import AdminRoute from './AdminRoute.js'
import CourseRoute from './CourseRoute.js'

export default (app) => {
    app.use(HomeRoute.path, HomeRoute.router)
    app.use(UsersRoute.path, UsersRoute.router)
    app.use(FileRoute.path, FileRoute.router)
    app.use(AdminRoute.path, AdminRoute.router)
    app.use(CourseRoute.path, CourseRoute.router)
}