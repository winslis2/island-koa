const bcrypt = require('bcryptjs')
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')

class User extends Model {

}

User.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
      },
    nickname:Sequelize.STRING,
    password:{
        type:Sequelize.STRING,
        set(val) {//注意这里的写法是和json格式不同的，node中一般都是json格式的数组
            //对密码进行加密
            const salt = bcrypt.genSaltSync(10)
            const encryptedPwd = bcrypt.hashSync(val, salt)
            this.setDataValue('password', encryptedPwd)
        }
    },
    email:Sequelize.STRING, 
    openid:{
        type:Sequelize.STRING(64),
        unique:true
    }
},{
    sequelize,
    tableName:'user'
})

module.exports = {User}