const Router = require('koa-router')
const {TokenValidator} = require('../../validators/validator')
const {AuthFailedException,ParameterException} = require('../../../core/httpException')
const {LoginTypeEnum} = require('../../lib/enum')
const {Token:TokenModel} = require('../../models/token')
const {generateToken} = require('../../../core/util')

const router = new Router({prefix:'/v1/token'})

router.post('/', async(ctx, next)=>{
    const v = await new TokenValidator().validate(ctx)
    const loginType = v.get('body.loginType')
    let token;
    switch (loginType) {
        case LoginTypeEnum.USER_EMAIL:
            token = await emailLogin(v.get('body.account'), v.get('body.secret'))
            break
        case LoginTypeEnum.USER_MINI_PROGRAM:
            //TODO

            break
            default:
        throw new ParameterException('暂未开发此验证方式')
    }
    ctx.body = {token:token}
})

async function  emailLogin(account, secret) {
    const user = await TokenModel.verifyEmailPassword(account,secret)
    const token =  generateToken(user.id, 2)
    return token
}

module.exports = router