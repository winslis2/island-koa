const Koa = require("koa");
const Init = require('./core/init')
const bodyparser = require('koa-bodyparser')
const catchExcepiton = require('./middlewares/exception')

const app = new Koa()
app.use(bodyparser())
app.use(catchExcepiton)

Init.initCore(app)

app.listen(3000);