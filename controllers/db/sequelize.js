const {Sequelize, DataTypes} = require('sequelize');
const bookModel = require('../../models/book.model')
const userModel = require('../../models/user.model')
const bookLibraryModel = require('../../models/bookLibrary.model')
const pageModel = require('../../models/page.model')
const libraryModel = require('../../models/library.model')
const sequelize = new Sequelize(
    'book', //nom de la base de données
    'root', //utilisateur
    '', //mot de passe
    {
        host: 'localhost',
        port:'3305',
        dialect: 'mysql'
    }
);
const Library = libraryModel(sequelize, DataTypes)
const Book = bookModel(sequelize , DataTypes)
const User = userModel(sequelize, DataTypes)
const Page = pageModel(sequelize, DataTypes)
const BookLibrary = bookLibraryModel(sequelize, DataTypes)


Book.hasMany(BookLibrary,{foreignKey:"bookId"})
BookLibrary.belongsTo(Book,{foreignKey:"bookId"})
Library.hasMany(BookLibrary,{foreignKey:'libraryId'})
BookLibrary.belongsTo(Library,{foreignKey:'libraryId'})

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
    connect, initDb, Book ,User ,BookLibrary, Page, Library
}
