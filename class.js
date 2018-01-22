/**
 * Created by jhgonzalez on 12/14/17.
 */

'use strict';

const _ = require('lodash');

let cancelledRules = [
    ((order) => (_.first(order.mediations) || {}).status === "cancel_purchase"),
    ((order) => !order.fulfilled),
    ((order) => order.status_detail.code === "mediations"),
    ((order) => order.status === "cancelled"),
    ((order) => !order.feedback.sale),
];

let mediationRules = [
    ((order) => (_.first(order.mediations) || {}).status === "cancel_purchase"),
    ((order) => !order.fulfilled),
    ((order) => order.status_detail.code === "mediations"),
    ((order) => order.status === "cancelled"),
    ((order) => order.feedback.sale),
];

let returnRules = [
    ((order) => !order.fulfilled),
    ((order) => order.status_detail.code === "feedback"),
    ((order) => order.status === "cancelled"),
    ((order) => order.feedback.sale && !order.feedback.sale.fulfilled),
];

let feedbackRules = [
    ((order) => order.feedback.purchase),
];


class OrdersRules {

    isCancelled(order) {
        return this.checkRules(order, cancelledRules);
    }

    isMediation(order) {
        return this.checkRules(order, mediationRules);
    }

    isReturning(order) {
        return this.checkRules(order, returnRules);
    }

    hasFeedback(order) {
        return this.checkRules(order, feedbackRules);
    }

    isDoubleFeedback(order){
        return this.isCancelled(order) || this.isMediation(order) || this.isReturning(order) ||
            this.hasFeedback(order);
    }


    checkRules(order, rules) {
        for (var i in rules) {
            if (!rules[i](order)) {
                return false;
            }
        }
        return true;
    }

}

module.exports = OrdersRules;