'use strict';

const stylelint = require('stylelint');
const namespace = require('../../utils/namespace');
const path = require('path');
const msgPrefix = require('../../utils/messagePrefix');


const ruleName = namespace('selector-namespace-follow-filename');
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: (selector, namespace) => `[wxwork] Expected selector "${selector}" to match source filename as namespace "${namespace}".`,
});

function rule(actual) {
  return (root, result) => {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {actual});
    if (!validOptions) {
      return;
    }

    root.walkRules(rule => {

      // 仅检测根节点的选择器名字
      if(!rule.source.input.file || rule.parent.type !== 'root'){
        return;
      }

      // console.log(typeof rule.source.input.file)

      // 从代码源scss文件中获取到命名空间
      const filename = path.basename(rule.source.input.file, '.scss');
      const filenameSpace = filename.replace('_','');
      const ruleSelector = rule.selector;

      if( ruleSelector.indexOf(filenameSpace) > -1){
        return;
      }

      stylelint.utils.report({
        message: messages.expected(ruleSelector,filenameSpace),
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
