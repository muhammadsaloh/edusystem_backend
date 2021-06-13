export default async (Sequelize, sequelize) => {
    return await sequelize.define('users', {
        user_id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            type: Sequelize.DataTypes.STRING(64),
            allowNull: false
        },
        email: {
            type: Sequelize.DataTypes.STRING(64),
            is: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            unique: true
        },
        phone: {
            type: Sequelize.DataTypes.STRING(13),
            is: /^9989[012345789][0-9]{7}$/,
            allowNull: false,
            unique: true
        },
        role: {
            type: Sequelize.DataTypes.ENUM,
            values: ["superadmin","admin","teacher","student","moderator"],
            allowNull: false,
            defaultValue: "student"
        },
        bdate: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false
        },
        gender: {
            type: Sequelize.DataTypes.ENUM,
            values: ["male","female"],
            allowNull: false
        },
        user_attempts: {
            type: Sequelize.DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: 0
        }
    })
}