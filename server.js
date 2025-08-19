const express = require('express');
const dotenv = require('dotenv');
const booksRouter = require('./src/routes/booksRouter')
dotenv.config();
const port = process.env.PORT

const app = express();
app.use(express.json())

app.get('/',(req,res)=>{
    res.json('Hello World!')
})

app.use('/books', booksRouter)
app.listen(port,()=>{
    console.log(`Server Running in http://localhost:${port}`)
})