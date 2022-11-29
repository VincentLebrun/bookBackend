
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('BookLibrary', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        } ,
        bookId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        libraryId : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    })
}