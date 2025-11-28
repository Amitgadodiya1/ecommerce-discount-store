// Simple logger wrapper – in real life you’d plug into Winston/Datadog/etc.
module.exports.logger = {
  info: (...args) => console.log("[INFO]", ...args),
  error: (...args) => console.error("[ERROR]", ...args)
};
