import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import routes from './routes/routes.js'

const app = express()

dotenv.config()



app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/', routes)

app.get('/', (req,res) =>{
  res.send("Welcome")
})

const CONNECTION_URL = process.env.APPSETTING_MONGO_CONNECTION_URL || process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000
console.log(CONNECTION_URL)

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`))

mongoose.set('useFindAndModify', false)
