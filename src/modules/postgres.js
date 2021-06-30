import SequelizeCopy from 'sequelize'
const { Sequelize } = SequelizeCopy
import config from '../config.js'

import UserModel from '../models/UserModel.js'
import AttemptsModel from '../models/AttemptsModel.js'
import BanModel from '../models/BanModel.js'
import SessionModel from '../models/SessionModel.js'
import SettingsModel from '../models/SettingsModel.js'
import FileModel from '../models/FileModel.js'
import UserPhotoModel from '../models/UserPhotoModel.js'
import TeacherModel from '../models/TeachersModel.js'
import CourseModel from '../models/CourseModel.js'
import ModuleModel from '../models/ModuleModel.js'
import LessonModel from '../models/LessonModel.js'
import MentorModel from '../models/MentorModel.js'
import SubscriptionModel from '../models/SubscriptionModel.js'

const sequelize = new Sequelize(config.PG_CONNECTION_STRING, {
    logging: false
})


async function postgres () {
    try {
        let db = {}
        db.users = await UserModel(Sequelize, sequelize)
        db.attempts = await AttemptsModel(Sequelize, sequelize)
        db.ban_model = await BanModel(Sequelize, sequelize)
        db.session_model = await SessionModel(Sequelize, sequelize)
        db.settings_model = await SettingsModel(Sequelize, sequelize)
        db.file_model = await FileModel(Sequelize, sequelize)
        db.user_photo_model = await UserPhotoModel(Sequelize, sequelize)
        db.teacher_model = await TeacherModel(Sequelize, sequelize)
        db.course_model = await CourseModel(Sequelize, sequelize)
        db.module_model = await ModuleModel(Sequelize, sequelize)
        db.lesson_model = await LessonModel(Sequelize, sequelize)
        db.mentor_model = await MentorModel(Sequelize, sequelize)
        db.sub_model = await SubscriptionModel(Sequelize, sequelize)
        
        await db.users.hasMany(db.attempts, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })

        await db.attempts.belongsTo(db.users, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })

        await db.users.hasMany(db.ban_model, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })

        await db.ban_model.belongsTo(db.users, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })

        await db.users.hasMany(db.session_model, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })

        await db.session_model.belongsTo(db.users, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })

        await db.users.hasMany(db.file_model, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })

        await db.file_model.belongsTo(db.users, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })

        await db.users.hasMany(db.user_photo_model, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })

        await db.user_photo_model.belongsTo(db.users, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })

         await db.file_model.hasOne(db.user_photo_model, {
            foreignKey: {
                name: "file_id",
                allowNull: false
            }
        })

        await db.user_photo_model.belongsTo(db.file_model, {
            foreignKey: {
                name: "file_id",
                allowNull: false
            }
        })

        await db.users.hasOne(db.teacher_model, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })

        await db.teacher_model.belongsTo(db.users, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })

        

        await db.teacher_model.hasMany(db.course_model, {
            foreignKey: {
                name: "teacher_id",
                allowNull: false
            }
        })

        await db.course_model.belongsTo(db.teacher_model, {
            foreignKey: {
                name: "teacher_id",
                allowNull: false
            }
        })

        await db.course_model.hasMany(db.module_model, {
            foreignKey: {
                name: "course_id",
                allowNull: false
            }
        })

        await db.module_model.belongsTo(db.course_model, {
            foreignKey: {
                name: "course_id",
                allowNull: false
            }
        })
        
        await db.module_model.hasMany(db.lesson_model, {
            foreignKey: {
                name: "module_id",
                allowNull: false
            }
        })

        await db.lesson_model.belongsTo(db.module_model, {
            foreignKey: {
                name: "module_id",
                allowNull: false
            }
        })

        await db.users.hasMany(db.mentor_model, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })

        await db.mentor_model.belongsTo(db.users, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })

        await db.course_model.hasMany(db.mentor_model, {
            foreignKey: {
                name: "course_id",
                allowNull: false
            }
        })

        await db.mentor_model.belongsTo(db.course_model, {
            foreignKey: {
                name: "course_id",
                allowNull: false
            }
        })

        await db.users.hasMany(db.sub_model, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })

        await db.sub_model.belongsTo(db.users, {
            foreignKey: {
                name: "user_id",
                allowNull: false
            }
        })

        await db.course_model.hasMany(db.sub_model, {
            foreignKey: {
                name: "course_id",
                allowNull: false
            }
        })

        await db.sub_model.belongsTo(db.course_model, {
            foreignKey: {
                name: "course_id",
                allowNull: false
            }
        })

        // const { dataValues: { user_id } } = await db.users.findOne()

        // await db.course_model.create({
        // name: "System Administration and IT Infrastructure Services",
        // description: "Though the gravity still dragged at him, his muscles were making great efforts to adjust. After the daily classes he no longer collapsed immediately into bed. Only the nightmares got worse.",
        // price: 19,
        // media: `<iframe width="560" height="315" src="https://www.youtube.com/embed/1DvTwuByjo0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
        // levels: "Advanced",
        // author: "John Doe",
        // author_photo: "https://lh3.googleusercontent.com/proxy/wfYjqqclHT6m7DdBaB3udOdE6mFu14lI1oc2Cdln7swTl9gdbtQAcpORVyFtKwmmN1jSgP-sVEh9ixqI9UntitcV1nTGNRWzbgTFojhc7EqZWv2hiVtuQ-wQjT0X4XqjSQJz",
        // is_closed: true,
        // duration: "6"
        // })

        await sequelize.sync({ force: false })
        
        return db
        
    }
    catch(e) {
        console.log("DB_ERROR:", e);
    }
}

export default postgres