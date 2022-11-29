
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Page', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        } ,
        number: {
            type : DataTypes.INTEGER,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        bookId: {
            type : DataTypes.INTEGER,
            allowNull: false
        }
    })
}
