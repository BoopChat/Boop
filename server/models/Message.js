module.exports = (sequelize, Sequelize) => {
    const Message = sequelize.define("Message", {
        //attributes
        id: { primaryKey: true, type: Sequelize.STRING, allowNull: false },
        content: { type: Sequelize.STRING, allowNull: false },
        conversation_id: { type: Sequelize.STRING, allowNull: false },
        user_id: { type: Sequelize.STRING, allowNull: false },
        //timestamps
        createdAt: { type: Sequelize.DATE, field: 'created_at', defaultValue: Sequelize.NOW},
        updatedAt: { type: Sequelize.DATE, field: 'updated_at', defaultValue: Sequelize.NOW }
    });

    Message.associate = ({
        Conversation,
        User
    })=>{
        Message.belongsTo(Conversation, {
            as: "conversation",
            foreignKey: "conversation_id"
        });
        Message.belongsTo(User, {
            as: "user",
            foreignKey: "user_id"
        });
    }
    
    return Message;
};