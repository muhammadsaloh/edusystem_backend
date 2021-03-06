import phoneValidation from "../validations/phoneValidation.js"
import signupValidation from "../validations/signupValidation.js"
import editProfileValidation from "../validations/editProfileValidation.js"
import randomNumber from 'random-number'
// import sendSms from "../modules/sms.js"
import codeValidation from "../validations/codeValidation.js"
import pkg from "sequelize"
import moment from "moment"
import JWT from '../modules/jwt.js'
import editPhotoValidation from "../validations/editPhotoValidation.js"
import promoteUserValidation from "../validations/promoteUserValidation.js"
const { Op } = pkg;

class UserController {
    static async checkPhone (req, res) {
        try {
            const data = await phoneValidation.validateAsync(req.body)
            
            let user = await req.postgres.users.findOne({
                where: {
                    phone: data.phone
                }
            })
            
            res.status(200).json({
                ok: true,
                exists: user ? true : false
            })
            
        } catch (e){
            res.status(400).json({
                ok: false,
                message: e + ""
            })
        }
    }
    static async signup (req, res) {
        try {
            const data = await signupValidation.validateAsync(req.body)
            
            const user = await req.postgres.users.create({
                name: data.name,
                bdate: data.bdate,
                phone: data.phone,
                gender: data.gender == 1 ? "female" : "male"
            })
            
            await res.status(201).json({
                ok: true,
                message: "Successfully registrated",
                data: user.dataValues
            })
            
        } catch (error) {
            if(error == "SequelizeUniqueConstraintError: Validation error"){
                error = "Phone already exists"
            }
            res.status(400).json({
                ok: false,
                message: error + ""
            })
        }
    }
    static async login (req, res) {
        try {
            const data = await phoneValidation.validateAsync(req.body)
            const user = await req.postgres.users.findOne({
                where: {
                    phone: data.phone
                }
            })
            if(!user) {
                throw new Error("User not found")
            }
            
            const ban = await req.postgres.ban_model.findOne({
                where: {
                    user_id: user.dataValues.user_id,
                    expireDate: {
                        [Op.gt]: new Date()
                    }
                }
            })
            
            if(ban) throw new Error(`You are banned until ${moment(ban.dataValues.expireDate)} `)
            
            const gen = randomNumber.generator({
                min:  100000, 
                max:  999999, 
                integer: true
            })
            
            await req.postgres.attempts.destroy({
                where: {
                    user_id: user.user_id
                }
            })
            
            let attempt = await req.postgres.attempts.create({
                code: gen(),
                user_id: user.user_id
            }) 
            
            // await sendSms(data.phone, `Your code: ${attempt.dataValues.code}`)
            
            // console.log(attempt.dataValues.code);
            
            await res.status(201).json({
                ok: true,
                message: "Code sent",
                id: attempt.dataValues.id,
                code: attempt.dataValues.code
            })
            
        } catch (error) {
            res.status(401).json({
                ok: false,
                message: error + ""
            })
        }
    }
    static async validateCode (req, res) {
        try {
            // console.log(req.settings );

            const validationId = req.headers["code-validation-id"]
            if(!validationId) throw new Error("Invalid validation token")
            const attempt = await req.postgres.attempts.findOne({
                where: {
                    id: validationId
                },
                include: {
                    model: req.postgres.users,
                    attributes: ["user_attempts"]
                }
            })
            
            
            if(!attempt) throw new Error("Validation code is not found")
            
            
            const { code } = await codeValidation.validateAsync(req.body)

            
            if(Number(code) !== Number(attempt.dataValues.code)){

                await req.postgres.attempts.update({
                    attempts: attempt.dataValues.attempts + 1
                }, {
                    where: {
                        id: validationId 
                    }
                })
                if(Number(attempt.dataValues.attempts) > Number(req.settings.code_attempts) - 2){
                    await req.postgres.attempts.destroy({
                        where: {
                            id: validationId
                        }
                    })
                    
                    await req.postgres.users.update({
                        user_attempts: attempt.dataValues.user.dataValues.user_attempts + 1
                    }, {
                        where: {
                            user_id: attempt.dataValues.user_id
                        }
                    })
                    
                    if(Number(attempt.dataValues.user.dataValues.user_attempts) > Number(req.settings.phone_attempts) - 2){
                        await req.postgres.users.update({
                            user_attempts: 0
                        }, {
                            where: {
                                user_id: attempt.dataValues.user_id
                            }
                        })
                        
                        await req.postgres.ban_model.create({
                            user_id: attempt.dataValues.user_id,
                            expireDate: new Date(Date.now() + Number(req.settings.ban_time))
                        })
                    }
                    
                    
                }
                throw new Error("Validation code is incorrect")
            }
            
            await req.postgres.session_model.destroy({
                where: {
                    user_id: attempt.dataValues.user_id
                }
            })
            
            const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress
            const userAgent = req.headers["user-agent"]
            
            if(!(ipAddress && userAgent)) {
                throw new Error("Invalid device") 
            }
            
            const session = await req.postgres.session_model.create({
                user_id: attempt.dataValues.user_id,
                ip_address: ipAddress,
                user_agent: userAgent
            })
            
            const token = JWT.generateToken({ 
                id: session.dataValues.id
            })
            
            await req.postgres.attempts.destroy({
                where: {
                    user_id: attempt.dataValues.user_id
                }
            })
            
            await req.postgres.users.update({
                user_attempts: 0
            }, {
                where: {
                    user_id: attempt.dataValues.user_id
                }
            })
            
            res.status(201).json({
                ok: true,
                message: "Logged in",
                token: token
            })
            
        } catch (error) {
            res.status(401).json({
                ok: false,
                message: error + ""
            })
        }
    }
    static async editPersonalData(req, res) {
        try {
            const data = await editProfileValidation.validateAsync(req.body)
            const info = {
                ...data,
                gender: data.gender == 2 ? "male" : "female"
            }
            
            await req.postgres.users.update( info , {
                where: {
                    user_id: req.user
                }
            })

            await res.status(202).json({
                ok: true,
                message: "Accepted",
                data: info
            })
        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ""
            })
        }
    }
    static async editPhoto(req, res) {
        try {
            const data = await editPhotoValidation.validateAsync(req.body)

            await req.postgres.user_photo_model.destroy({
                where: {
                    user_id: req.user
                }
            })
            
            const photo = await req.postgres.user_photo_model.create({
                file_id: data.file_id,
                user_id: req.user
            })

            // console.log(photo);

            await res.status(202).json({
                ok: true,
                message: "Accepted"
            })
        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ""
            })
        }
    }
    static async getData (req, res) {
        try {
            const user = await req.postgres.users.findOne({
                where: {
                    user_id: req.user
                },
                include: {
                    model: req.postgres.user_photo_model,
                    include: {
                        model: req.postgres.file_model
                    }
                }
            })

            await res.status(200).json({
                ok: true,
                data: user.dataValues
            })

        } catch (error) {
            res.status(500).json({
                ok: false,
                message: error + ""
            })
        }
    }
    static async promoteUser(req, res) {
        try {
            
            const data = await promoteUserValidation.validateAsync(req.body)
            
            if(data.user_id === req.user) {
                throw new Error("You can't promote yourself")
            }

            if(data.role == "superadmin") throw new Error("This is banned role") 

            if(data.role == "admin" && (!req.isSuperAdmin)) throw new Error("You can't promote admin")

            const user = await req.postgres.users.findOne({
                where: {
                    user_id: data.user_id 
                }
            })

            if(user.dataValues.role == "superadmin") throw new Error("You can't edit this role")

            await req.postgres.users.update({
                role: data.role
            }, {
                where: {
                    user_id: data.user_id
                }
            })
            

            await res.status(202).json({
                ok: true,
                message: "Edited",
            })

        } catch (error) {
            res.status(400).json({
                ok: false,
                message: error + ""
            })
        }
    }
}

export default UserController