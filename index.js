// tools
const express = require('express');
const server = express();
const bookApi = require('./routes/book')
const bookLibrary = require("./routes/bookLibrary")
const page = require('./routes/page')
const library = require("./routes/library")
const sequelize = require('./controllers/db/sequelize.js');
const cors = require("cors");
const port = 3000;

sequelize.initDb()
// using port
server.use(cors())
// sequelize.connect()
server.use(express.json())

server.get('/',(req, res) => {
    res.send('Hello motto!')
})
server.use('/' , bookApi ,bookLibrary, page, library)
// server.use('/api')
server.listen(port, () => {console.log(`Server listening on : http://localhost:${port}`)})
