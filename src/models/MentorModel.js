export default async (Sequelize, sequelize) => {
    return await sequelize.define('mentors', {
        mentor_id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        student_count: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    })
}