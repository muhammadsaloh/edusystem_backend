export default async (Sequelize, sequelize) => {
    return await sequelize.define('courses', {
        course_id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.DataTypes.BIGINT,
            allowNull: false
        },
        media_type: {
            type: Sequelize.DataTypes.ENUM,
            values: ["photo", "iframe"],
            defaultValue: "photo"
        },
        media: {
            type: Sequelize.DataTypes.STRING,
            allowNull: true
        },
        is_closed: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: true
        }
    })
}