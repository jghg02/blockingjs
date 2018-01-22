/**
 * Created by jhgonzalez on 12/14/17.
 */

'use strict';

const _ = require('lodash');

const checkRules = (order, rules) => {
    for (let i in rules) {
        if (!rules[i](order)) {
            return false;
        }
    }
    return true;
}

const cancelledRules = [
    (order) => (_.first(order.mediations) || {}).status === "cancel_purchase",
    (order) => !order.fulfilled,
    (order) => order.status_detail.code === "mediations",
    (order) => order.status === "cancelled",
    (order) => !order.feedback.sale
];

const mediationRules = [
    (order) => (_.first(order.mediations) || {}).status === "cancel_purchase",
    (order) => !order.fulfilled,
    (order) => order.status_detail.code === "mediations",
    (order) => order.status === "cancelled",
    (order) => order.feedback.sale,
];

const returnRules = [
    (order) => !order.fulfilled,
    (order) => order.status_detail.code === "feedback",
    (order) => order.status === "cancelled",
    (order) => order.feedback.sale && !order.feedback.sale.fulfilled,
];

const feedbackRules = [(order) => order.feedback.purchase];

const isCancelled = (order) => checkRules(order, cancelledRules)
const isMediation = (order) => checkRules(order, mediationRules)
const isReturning = (order) => checkRules(order, returnRules)
const hasFeedback= (order) => checkRules(order, feedbackRules)
const isDoubleFeedback = (order) => isCancelled(order) || isMediation(order) || isReturning(order) ||
        hasFeedback(order)

module.exports = {
    isCancelled,
    isMediation,
    isReturning,
    hasFeedback,
    isDoubleFeedback
}