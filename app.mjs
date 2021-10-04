//Подключение модулей и их настройка
import express from 'express'
import path from 'path'
import bodyParser from 'body-parser' 
import cookieSession from 'cookie-session'
const app = express()


const moduleURL = new URL(import.meta.url)
const __dirname = path.dirname(moduleURL.pathname)

//Cookie
app.use(
	cookieSession({
		name: 'session',
		keys: [process.env.COOKIE_SECRET],
		secret: process.env.COOKIE_SECRET 
	}))

//Статичные файл в папке public: images, 
app.use(express.static(path.join(__dirname, 'public')))

//Для пост запросов
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//настройка генерации из шаблонов
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'))

//--------------------------
//

import {router as indexRouter} from './routes/index.mjs'
import {router as loginRouter} from './routes/login.mjs'
import {router as teacherRouter} from './routes/teacher.mjs'
import {router as registerRouter}  from './routes/register.mjs'
import {router as gradebookRouter} from './routes/gradebook.mjs'
import {router as characterRouter} from './routes/character.mjs'
import {router as resultsRouter} from './routes/results.mjs'
import {router as problemsetRouter} from './routes/problemset.mjs'
import {router as planRouter} from './routes/plan.mjs'
import {router as emailRouter} from './routes/email.mjs'
import {router as pendingRouter} from './routes/pending.mjs'
import {router as housesRouter} from './routes/houses.mjs'

app.use('/', indexRouter)
app.use('/login/github', loginRouter)
app.use('/teacher',  teacherRouter)
app.use('/register', registerRouter)
app.use('/gradebook', gradebookRouter)
app.use('/character', characterRouter)
app.use('/results', resultsRouter)
app.use('/problemset', problemsetRouter)
app.use('/plan', planRouter)
app.use('/email', emailRouter)
app.use('/pending', pendingRouter)
app.use('/houses', housesRouter)

export {app}


