module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userEmail: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userType: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'user'
        },
        userPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    });
    // implementation
    return User;
};