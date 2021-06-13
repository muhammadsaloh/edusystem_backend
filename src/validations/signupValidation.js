import Joi from 'joi'


export default Joi.object({
    name: Joi.string()
            .max(64)
            .min(3)
            .required()
            .error(Error("Name is invalid")),
    phone: Joi.string()
            .pattern(/^9989[012345789][0-9]{7}$/)
            .required()
            .error(Error("Phone number is invalid")),
    bdate: Joi.date()
            .error(Error("Birth date is invalid"))
            .required(),
    gender: Joi.number()
            .min(1)
            .max(2)
            .error(Error("Gender is invalid"))
            .required()
})      