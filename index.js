require('dotenv').config()

const library = require('express');

const cors = require('cors');

require('./DataBase/connection');

const routes = require('./Routes/router')

const server = library();

server.use(cors());
server.use(library.json())
server.use(routes)

const PORT = 3008 || process.env.PORT

server.listen(PORT,()=>{
    console.log(`now cart Server is active at ${PORT}`);
})

server.get('/',(req,res)=>{
    res.send(`<h2>server running successfully and ready to accept client request </h2>`)
})
