const prefix = 'wxwork';

module.exports = function namespace(ruleName) {
  return `${prefix}/${ruleName}`;
};
