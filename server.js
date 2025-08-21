const express = require('express');
const dotenv = require('dotenv');
const booksRouter = require('./src/routes/booksRouter')
const usersRouter = require('./src/routes/usersRouter')
const authRouter = require('./src/routes/authRoutes')
dotenv.config();
const port = process.env.PORT

const app = express();
app.use(express.json())

app.get('/',(req,res)=>{
    res.json('Hello World!')
})
app.use("/api/auth", authRouter);
app.use('/users', usersRouter)
app.use('/books', booksRouter)
app.listen(port,()=>{
    console.log(`Server Running in http://localhost:${port}`)
})