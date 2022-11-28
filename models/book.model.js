module.exports = (sequelize , DataTypes) => {
    return sequelize.define('Book', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        author : {
            type : DataTypes.STRING,
            allowNull: false
        },
        releaseDate : {
            type :DataTypes.DATE,
            allowNull : true
        },
        type : {
            type : DataTypes.STRING,
            allowNull: false
        },
        downloadNumber : {
            type : DataTypes.INTEGER,
            allowNull: true
        },
        readNumber:  {
            type : DataTypes.INTEGER,
            allowNull: true
        }
    })

}