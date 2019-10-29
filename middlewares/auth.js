const basicAuth = require("basic-auth")
const jwt = require("jsonwebtoken")
const {ForbiddenException}= require("../core/httpException")

class Auth {
    constructor(level) {
        this.level = level
    }

    get m() {
        return async (ctx, next) => {
           const userToken = basicAuth(ctx.req)
           //验证token
           if(!userToken || !userToken.name) {
              throw new ForbiddenException()
           }

           try {
            var decoded = jwt.verify(userToken.name, global.config.security.secretKey);
           } catch(err) {
                if(err.name == 'JsonWebTokenError') {
                    throw new ForbiddenException('令牌不合法')
                }
                throw new ForbiddenException("令牌已过期")
           }
           
           if(decoded.scope < this.level) {
               throw new ForbiddenException()
           }
         

           ctx.auth = {
               uid:decoded.uid,
               scope:decoded.scope
           }

           await next()
        }
    }
}

module.exports = {
    Auth
}