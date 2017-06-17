'use strict';

const stylelint = require('stylelint');
const namespace = require('../../utils/namespace');
const path = require('path');
const msgPrefix = require('../../utils/messagePrefix');
const ruleName = namespace('nested-qui-selector');
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: msgPrefix.main + "No suggest to use 'qui_xxx' selector in project, please use 'ww_xxx'",
});

function rule(actual) {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {actual});
    if (!validOptions) {
      return;
    }

    root.walkRules(rule => {

      if(rule.parent.type !== 'rule'){
        return;
      }

      if( rule.selector.indexOf('qui_') <= -1){
        return;
      }

      stylelint.utils.report({
        message: messages.rejected,
        node: rule,
        result,
        ruleName,
      });
    });
  };
}

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
