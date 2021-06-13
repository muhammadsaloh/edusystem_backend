export default async (Sequelize, sequelize) => {
    return await sequelize.define('lessons', {
        lesson_id: {
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
        video: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        is_start: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false
        }
    })
}