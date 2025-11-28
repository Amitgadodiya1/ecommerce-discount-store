const { stats, NTH_ORDER_FOR_DISCOUNT } = require("../store");
const { logger } = require("../logger");

function generateCode() {
  return "DISCOUNT-" + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function canGenerateDiscountCode() {
  const nextOrderNumber = stats.totalOrdersPlaced + 1;
  const isNth = nextOrderNumber % NTH_ORDER_FOR_DISCOUNT === 0;
  const hasActive = stats.discountCodes.some(dc => !dc.used);
  return isNth && !hasActive;
}

function createDiscountCode() {
  if (!canGenerateDiscountCode()) {
    throw new Error("Not eligible to generate discount code");
  }

  const code = {
    code: generateCode(),
    used: false
  };

  stats.discountCodes.push(code);
  logger.info("Generated discount code", code.code, {
    nextOrderNumber: stats.totalOrdersPlaced + 1
  });

  return code;
}

function findActiveDiscountCode(code) {
  return stats.discountCodes.find(dc => dc.code === code && !dc.used);
}

function markDiscountUsed(codeObj, order) {
  codeObj.used = true;
  codeObj.orderId = order.id;
  logger.info("Discount code used", codeObj.code, {
    orderId: order.id,
    userId: order.userId,
    discountAmount: order.discountAmount
  });
}

module.exports = {
  canGenerateDiscountCode,
  createDiscountCode,
  findActiveDiscountCode,
  markDiscountUsed
};
