'use strict';
import { Controller } from 'egg'

class HomeController extends Controller {
  async index() {
    console.log("---------------");
    this.ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;


