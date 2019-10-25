const Router = require('koa-router')
const router = new Router()
const {HttpException,ParameterException} = require('../../../core/httpException')
const {PositiveIntegerValidator} = require('../../validators/validator')

router.post('/v1/:id/book/latest', async(ctx, next)=>{
    const param = ctx.params
    const query = ctx.request.query
    const header = ctx.request.header
    const body = ctx.request.body
  
    const v = await new PositiveIntegerValidator().validate(ctx)

    // if (true) {
    //     const error = new parameterException()
    //     throw error   
    // }


    ctx.body = {key: 'book'}
})

module.exports = router
