const Router = require('koa-router');
const router = new Router({
    prefix:'/v1/classic/'
});
const {Auth} = require('../../../middlewares/auth')
const {AuthScopeEmum} = require("../../lib/enum")

router.get('latest', new Auth(AuthScopeEmum.USER).m,async (ctx, next)=>{
    ctx.body = {
        uid:ctx.auth.uid,
        scope:ctx.auth.scope
    }
})

module.exports = router