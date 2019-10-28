const  {LoginTypeEnum} = require('../lib/enum')
const {Rule,LinValidator} = require('../../core/lin-validator')
const {User} = require('../models/user')

//在使用linValidator的时候Rule字段提示是不用写字段名称的，会自动加上
//验证器中是直接抛出Error异常，模型中需要抛出自定义异常
//是否是正整数验证器
class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule("isInt",'需要传递一个正整数的呀',{min:1})
        ]
    }
}

//注册逻辑验证器
class RegisterValidator extends LinValidator {
    constructor() {
        super()
        this.nickname = [
            new Rule("isLength", '用户昵称长度不符合规范', {min:3,max:12})
        ]

        this.email = [
            new Rule("isEmail", "email不符合规范")
        ]

        this.password1 = [
            new Rule("isLength", '密码长度不符合规范', {min:3,max:12}),
            new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ]

        this.password2 = this.password1
    }

    //验证两个密码是不是相同的
    validateSamePassword(vals) {
        const password1 = vals.body.password1
        const password2 = vals.body.password2
        if(password1 != password2) {
            throw new Error("两次密码不一致")
        }
    }

    //判断邮箱是否注册
    async validateEmailHasReg(vals) {
        const email = vals.body.email

        const hasEmail = await User.findOne({
            where:{
                email:email
            }
        })
        
        if (hasEmail) {
            throw new Error('该邮箱已经注册')
        }
    }
}

//token验证器
class TokenValidator extends LinValidator {
    constructor(){
        super()
        this.account = [
            new Rule("isLength", "不符合账号规则'", {min:4, max:32})
        ]
        this.secret = [
            new Rule("isOptional"),
            new Rule("isLength", "不符合密码规则", {min:6, max:128})
        ]
    }

    //校验登录类型
    validateLoginType(vals) {
        const loginType = vals.body.loginType
        if(!Boolean(loginType)) {
            throw new Error('登录类型loginType必须')
        }
        if(!LoginTypeEnum.isThisType(loginType)) {
            throw new Error('登录类型LoginType错误')
        }
    }
}
module.exports = {PositiveIntegerValidator, RegisterValidator, TokenValidator}
