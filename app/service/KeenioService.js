'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
var IDValidator = require('id-validator');
var GB2260 = require('id-validator/src/GB2260');
var KeenTracking = require('keen-tracking');
const Keen = require("keen-analysis");
class KeenioService extends egg_1.Service {
    constructor(ctx) {
        super(ctx);
        const config = this.app.config;
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
    async getDayCurator(curatorParent, timeframe = "this_1_days") {
        const result = await new Promise((resolve, reject) => {
            this.readChess.query("sum", {
                event_collection: "onUserPay",
                filters: [{ "operator": "in", "property_name": "curatorParent", "property_value": curatorParent }],
                group_by: ["curatorParent"],
                target_property: "money",
                timeframe: timeframe,
                timezone: "Asia/Singapore"
            })
                .then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        }).then((res) => {
            return res;
        }).catch((err) => {
            return err;
        });
        return result;
    }
}
exports.KeenioService = KeenioService;
module.exports = KeenioService;
