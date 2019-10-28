function isThisType(val) {
    for(let i in this) {
        if(this[i] == val){
            return true
        }
    }
    return false
}

const LoginTypeEnum = {
    USER_MINI_PROGRAM:100, //小程序
    USER_EMAIL:101,        //email
    USER_MOBILE:102,       //手机
    isThisType
}

module.exports = {LoginTypeEnum}