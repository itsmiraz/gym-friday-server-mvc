import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import authRoute from './routes/auth.route.js'

import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
dotenv.config()
mongoose.set('strictQuery', true)

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://mambarter:XuqfMztt5AiHX38G@cluster0.fpgnyx0.mongodb.net/Test-MAMBarter`
    )
    console.log('Connected to mongoDB!')
  } catch (error) {
    console.log(error)
  }
}




app.use(cors());

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoute)


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong!'

  return res.status(errorStatus).send(errorMessage)
})

app.get('/', (req, res) => {
  res.send(
    '<div style="height:100vh; display:flex; justify-content:center; align-item:center; color:#023047" ><h1>Welcome! - GymFirday API is running!</h1></div>'
  )
})

app.listen(8800, () => {
  connect()
  console.log('Backend server is running!')
})
