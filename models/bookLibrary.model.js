
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('BookLibrary', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        } ,
        bookId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        libraryId : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        read: {
            type: DataTypes.BOOL,
            allowNull: false
        }
    })
}