const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const todoRouter = require('./routes/todo');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user')
const verifyJWT = require('./middleware/jwt');

const app = express();

dotenv.config();
const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URL,
   { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => { console.log('database connected sucessfully') })
   .catch((err) => console.log(err))

app.use(bodyParser.json());
app.use(cookieParser())
app.use(cors());

app.use('/api/auth', authRouter);
// app.use(verifyJWT)
app.use('/api/todo', todoRouter)
app.use('/api/user', userRouter)



app.listen(PORT, () => {
   console.log(`Server started at port ${PORT}`)
})