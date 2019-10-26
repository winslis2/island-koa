const {HttpException} = require('../core/httpException')

const  catchExcepiton = async(ctx, next)=>{
    try {
        await next()
    } catch (error) {

        const isHttpException = error instanceof HttpException
    
        // const isDev = global.config.env
        // console.log(isDev)


        // if(isDev && !isHttpException) {
        //     throw error
        // }
        if(isHttpException){
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