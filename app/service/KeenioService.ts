'use strict';
import { Service, Context } from 'egg'
import Type from '../const/type'
import reply from '../const/reply'
import * as querystring from 'querystring'
var IDValidator = require('id-validator');
var GB2260 = require('id-validator/src/GB2260');
import * as _ from 'lodash';
var KeenTracking = require('keen-tracking');
import * as Keen from 'keen-analysis';

export class KeenioService extends Service {

    client: any;
    readChess:any;
    constructor(ctx: Context) {
        super(ctx);
        const config: any = this.app.config;
        this.client = new KeenTracking({
            projectId: config.keenio.agentId,
            writeKey: config.keenio.agentWriteKey
        });

        this.readChess = new Keen({
            projectId: config.keenio.chesstId,
            readKey: config.keenio.chessReadKey
        });
    }

    /**查询**/
    async getDayCurator(curatorParent:any,timeframe:string = "this_1_days"){
        const result = await new Promise((resolve, reject) => {
            this.readChess.query("sum", {
                event_collection: "onUserPay",
                filters: [{"operator":"in","property_name":"curatorParent","property_value":curatorParent}],
                group_by: ["curatorParent"],
                target_property: "money",
                timeframe: timeframe,
                timezone: "Asia/Singapore"
              })
              .then((res) =>{
                    resolve(res)
              }).catch((err) => {
                    reject(err);
              });
        }).then((res)=>{
            return res;
        }).catch((err)=>{
            return err;
        });
        return result
    }
}

module.exports = KeenioService;