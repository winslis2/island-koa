const {HttpException} = require('../core/httpException')

const  catchExcepiton = async(ctx, next)=>{
    try {
        await next()
    } catch (error) {
        if(global.config.env == 'dev') {
            throw error
        }
        if(error instanceof HttpException){
            ctx.body = {
                msg:error.message,
                requestUrl:`${ctx.method} ${ctx.path}`,
                error_code:error.errorCode
            }
            ctx.status = error.status
        } else {
            ctx.body = {
                msg:'make a unkonwn ~ ~',
                requestUrl:`${ctx.method} ${ctx.path}`,
                error_code:999
            }
            ctx.status = 500
        }
    }
}

module.exports = catchExcepiton