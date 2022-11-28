const {Sequelize, DataTypes} = require('sequelize');
const bookModel = require('../../models/book.model')



const sequelize = new Sequelize(
    'book', //nom de la base de données
    'root', //utilisateur
    'root', //mot de passe
    {
        host: 'localhost',
        dialect: 'postgres'
    }
);
const Book = bookModel(sequelize , DataTypes)
const connect = () => {
    sequelize.authenticate().then(() =>{
        console.log('Connection Ok');
    }).catch((error)=>{
        console.log('Connection K.O',error);
    })
}
const initDb = () => {
  sequelize.sync({force:true}).then(()=> {
      console.log('Database refactored');




  })
}
module.exports = {
    connect, initDb, Book
}