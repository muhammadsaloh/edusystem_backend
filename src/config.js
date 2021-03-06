import dotenv from 'dotenv'

const { env } = process

dotenv.config()

export default {
    PG_CONNECTION_STRING: env.PG_CONNECTION_STRING,
    JWT_SECRET: env.JWT_SECRET,
    PORT: env.PORT
}