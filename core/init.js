

const requireDirectory = require('require-directory')
const Router = require('koa-router');

class InitManager{
    //入口方法
    static initCore(app){
        InitManager.app = app
        InitManager.initLoadRouters()
        InitManager.initLoadConfig()
    }
    //加载路由
    static initLoadRouters() {

        const modules = requireDirectory(module, `${process.cwd()}`+'/app/api',{visit:onLoadModule})

        function onLoadModule(router) {
            if(router instanceof Router) {
                const app = InitManager.app
                app.use(router.routes())
            }
        }   
    }

    //加载配置文件
    static initLoadConfig() {
        const config = require(`${process.cwd()}`+'/config/config')
        global.config = config
    }
}

module.exports = InitManager