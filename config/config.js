module.exports = {
    //pro生成环境 dev测试环境
    env:'dev',
    dataBase:{
        hostname:'localhost',
        username:'root',
        password:'root',
        database:'ialand',
        hostport:3306
    },
    security:{
        secretKey:'asdf',
        expiresIn:60*60*24*30
    }
}