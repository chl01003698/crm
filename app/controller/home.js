'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
class HomeController extends egg_1.Controller {
    async index() {
        console.log("---------------");
        this.ctx.body = 'hi, egg';
    }
}
module.exports = HomeController;
