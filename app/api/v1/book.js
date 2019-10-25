const Router = require('koa-router')
const router = new Router()
const {HttpException,ParameterException} = require('../../../core/httpException')
const {PositiveIntegerValidator} = require('../../validators/validator')

router.post('/v1/:id/book/latest', async(ctx, next)=>{
    const param = ctx.params
    const query = ctx.request.query
    const header = ctx.request.header
    const body = ctx.request.body
    const sequelize = new Sequelize(hostname, )
    // const v = await new PositiveIntegerValidator().validate(ctx)

    // const id = v.get('params.id',false)

    ctx.body = {key: 'book'}
})

module.exports = router
