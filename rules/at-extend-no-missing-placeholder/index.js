// var https://github.com/kristerkari/stylelint-scss/tree/master/src/rules/at-extend-no-missing-placeholder

const stylelint = require('stylelint');
const namespace = require('../../utils/namespace');
const msgPrefix = require('../../utils/messagePrefix');

const ruleName = namespace("at-extend-no-missing-placeholder")

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: msgPrefix.main + "Expected a placeholder selector (e.g. %placeholder) to be used in @extend",
})

const rule = function (actual) {
  return function (root, result) {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, { actual })
    if (!validOptions) { return }

    root.walkAtRules("extend", atrule => {
      const isPlaceholder = atrule.params.trim()[0] === "%"
      const isInterpolation = (/^#{.+}/).test(atrule.params.trim())

      if (!isPlaceholder && !isInterpolation) {
        stylelint.utils.report({
          ruleName,
          result,
          node: atrule,
          message: messages.rejected,
        })
      }
    })
  }
}

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
