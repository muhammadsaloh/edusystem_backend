
class CourseController {
    static async CourseGetController (req, res) {
        try {
            const courses = await req.postgres.course_model.findAll({})
            res.status(200).json({
                ok: true,
                data: courses
            })
        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ""
            })
        }
    }
    
    static async CourseGetOneController (req, res) {
        try {
            const course = await req.postgres.course_model.findOne({
                where: {
                    course_id: req.params.course_id
                },
                include: [
                    {
                        model: req.postgres.teacher_model,
                        include: {
                            model: req.postgres.users
                        }
                    },
                    
                ]
            })
            res.status(200).json({
                ok: true,
                data: course
            })
        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ""
            })
        }
    }
}

export default CourseController