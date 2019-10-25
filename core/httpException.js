class HttpException extends Error {
    constructor(msg='服务器发生错误', errorCode=1000, httpStatus=400){
        super()
        this.message = msg
        this.errorCode = errorCode
        this.status = httpStatus
    }
}

class ParameterException extends HttpException {
    constructor(msg='参数发生异常',errorCode=1000){
        super()
        this.message = msg
        this.errorCode = errorCode
        this.status = 400
    }
}

module.exports = {HttpException,ParameterException}