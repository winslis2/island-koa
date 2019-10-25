const {Rule,LinValidator} = require('../../core/lin-validator')

class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super()
        this.id = [
            new Rule("isInt",'需要传递一个正整数的呀',{min:1})
        ]
    }
}

module.exports = {PositiveIntegerValidator}
