const {Sequelize, DataTypes} = require('sequelize');
const bookModel = require('../../models/book.model')
const userModel = require('../../models/user.model')
const bookLibraryModel = require('../../models/bookLibrary.model')
const pageModel = require('../../models/page.model')
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
const User = userModel(sequelize, DataTypes)
const Page = pageModel(sequelize, DataTypes)
const BookLibrary = bookLibraryModel(sequelize, DataTypes)
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
    connect, initDb, Book ,User ,BookLibrary, Page
}