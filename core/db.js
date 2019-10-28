const Sequelize = require('sequelize')
const {hostname, username, password, database, hostport} = require('../config/config').dataBase

const sequelize = new Sequelize(database, username, password, {
    dialect:'mysql',
    hostname,
    hostport,
    logging:console.log,
    timezone:'+08:00',
    define:{
        //创建create_time update_time  delete_time
        timestamps:false
    } 
})

sequelize.sync({ force: false })

module.exports = {sequelize}