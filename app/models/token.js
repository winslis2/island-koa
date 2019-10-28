const bcrypt = require('bcryptjs')
const {sequelize} = require('../../core/db')
const {Sequelize, Model} = require('sequelize')
const {User} = require('./user')
const {AuthFailedException} = require('../../core/httpException')

class Token extends Model {
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where:{
                email:email
            }
        })
        if (!user) {
            throw new AuthFailedException('账号不存在')
        }
        const res = bcrypt.compareSync(plainPassword, user.password)
        if(!res){
            throw new AuthFailedException('密码错误') 
        }
        return user
    }
}

module.exports = {Token}