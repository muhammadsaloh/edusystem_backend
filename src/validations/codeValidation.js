import Joi from 'joi'

export default Joi.object({
    code: Joi.number()
            .required()
            .error(Error("Code is invalid"))
            .min(100000)
            .max(999999)
})