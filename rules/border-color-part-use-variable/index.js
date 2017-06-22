const stylelint = require('stylelint');
const namespace = require('../../utils/namespace');
const msgPrefix = require('../../utils/messagePrefix');

const ruleName = namespace("border-color-part-use-variable");

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: msgPrefix.main + "Expected border color part to be used in variable",
});

const rule = function (actual) {
  return function (root, result) {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {actual})
    if (!validOptions) {
      return
    }

    root.walkDecls(decl => {
      const prop = decl.prop;
      const value = decl.value;

      if (prop !== 'border') {
        return;
      }

      // 排除 border:0 或 border:none 的情况
      if (value.indexOf('$') > -1 || value === '0' || value.indexOf('none') > -1) {
        return;
      }

      stylelint.utils.report({
        message: messages.rejected,
        node: decl,
        word: "important",
        result,
        ruleName,
      })
    })
  }
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
