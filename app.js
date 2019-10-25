const Koa = require("koa");
const Router = require('koa-router')
const Init = require('./core/init')
const bodyparser = require('koa-bodyparser')
const catchExcepiton = require('./middlewares/exception')

require('./app/models/user')

const app = new Koa()
app.use(bodyparser())
app.use(catchExcepiton)

Init.initCore(app)

app.listen(3000);