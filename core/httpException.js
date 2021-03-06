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

//成功异常
class Success extends HttpException {
    constructor(msg, errorCode=0) {
        super()
        this.message = msg
        this.errorCode = errorCode
        this.status = 200
    }
}

// 验证失败异常
class AuthFailedException extends HttpException {
    constructor(msg= '授权失败', errorCode) {
        super()
        this.message = msg
        this.errorCode = errorCode
        this.status = 404
    }
}

//禁止访问
class ForbiddenException extends HttpException {
    constructor(msg= '禁止访问', errorCode) {
        super()  
        this.message = msg
        this.errorCode = 10006
        this.status = 403
        console.log(ForbiddenException)
    }
}
module.exports = {
    HttpException,
    ParameterException,
    Success,
    AuthFailedException,
    ForbiddenException
}