import express from 'express'
// import dotenv from "dotenv";

import { Sequelize } from 'sequelize'

// if (process.env.NODE_ENV === 'development') {
//   dotenv.config()
// }

const mysqlHost = process.env.MYSQL_HOST
const mysqlDbName = process.env.MYSQL_DATABASE
const mysqlUser = process.env.MYSQL_USER
const mysqlPassword = process.env.MYSQL_PASSWORD
const mysqlPort= parseInt(process.env.MYSQL_PORT, 10)
const mysqlUseSsl =  process.env.MYSQL_USE_SSL === 'true' ? true : false

// console.log(mysqlHost)
// console.log(mysqlPort)
// console.log(mysqlUser)
// console.log(mysqlUseSsl)


const sequelize = new Sequelize(mysqlDbName, mysqlUser, mysqlPassword, {
  dialect: 'mysql',
  host: mysqlHost,
  port: mysqlPort,
  ssl: mysqlUseSsl
})

const app = express()

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.listen({ port: 4000 }, async () => {
  console.log('Server started at http://localhost:4000')
  await sequelize.authenticate()
  console.log('Database connection has been established successfully.')
})
