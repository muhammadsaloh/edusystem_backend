export default async (Sequelize, sequelize) => {
    return await sequelize.define('modules', {
        module_id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        }
    })
}