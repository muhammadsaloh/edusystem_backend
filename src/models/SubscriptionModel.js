export default async (Sequelize, sequelize) => {
    return await sequelize.define('subscription', {
        subscription_id: {
            type: Sequelize.DataTypes.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        status: {
            type: Sequelize.DataTypes.ENUM,
            values: ["paid", "unpaid"],
            defaultValue: "unpaid"
        }
    })
}