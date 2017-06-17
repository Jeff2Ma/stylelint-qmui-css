/*
 * 再次使用已经废弃的stylelint-disable-reason 规则
 * var https://stylelint.io/user-guide/rules/stylelint-disable-reason
 */

"use strict";

const stylelint = require('stylelint');
const namespace = require('../../utils/namespace');
const msgPrefix = require('../../utils/messagePrefix');

const ruleName = "stylelint-disable-reason";

const messages = stylelint.utils.ruleMessages(ruleName, {
  expectedBefore: msgPrefix.main + "Expected comment reason before `stylelint-disable` comment",
  expectedAfter: msgPrefix.main + "Expected comment reason after `stylelint-disable` comment",
});

const stylelintDisableCommand = "stylelint-disable";
const stylelintDisableLineCommand = "stylelint-disable-line";

const rule = function (expectation) {
  return function (root, result) {
    const validOptions = stylelint.utils.validateOptions(result, ruleName, {
      actual: expectation,
      possible: [
        "always-before",
        "always-after",
      ],
    });
    if (!validOptions) {
      return;
    }

    // result.warn((
    //   `'${ruleName}' has been deprecated and in 8.0 will be removed.`
    // ), {
    //   stylelintType: "deprecation",
    //   stylelintReference: `https://stylelint.io/user-guide/rules/${ruleName}/`,
    // })

    root.walkComments(function (comment) {
      if (comment.text.indexOf(stylelintDisableCommand) !== 0) {
        return;
      }

      if (expectation === "always-before") {
        const prev = comment.prev();
        const prevIsCommentAndValid = prev && prev.type === "comment" && !isDisableCommand(prev.text);

        let prevDisableLineIsCommentAndValid = false;

        if (comment.text.indexOf(stylelintDisableLineCommand) === 0 && !prevIsCommentAndValid && prev) {
          const friendlyPrev = prev.prev();

          prevDisableLineIsCommentAndValid = friendlyPrev && friendlyPrev.type === "comment" && !isDisableCommand(friendlyPrev.text)
        }

        if (!prevIsCommentAndValid && !prevDisableLineIsCommentAndValid) {
          const disabledRanges = result.stylelint.disabledRanges
          result.stylelint.disabledRanges = false;

          stylelint.utils.report({
            message: messages.expectedBefore,
            node: comment,
            result,
            ruleName,
          });
          result.stylelint.disabledRanges = disabledRanges
        }
      } else if (expectation === "always-after") {
        const next = comment.next();
        const nextIsCommentAndValid = next && next.type === "comment" && !isDisableCommand(next.text);

        if (!nextIsCommentAndValid) {
          const disabledRanges = result.stylelint.disabledRanges;
          result.stylelint.disabledRanges = false;

          stylelint.utils.report({
            message: messages.expectedAfter,
            node: comment,
            result,
            ruleName,
          });
          result.stylelint.disabledRanges = disabledRanges
        }
      }
    });

    function isDisableCommand(text) {
      return text.indexOf(stylelintDisableCommand) === 0
    }
  }
};

rule.ruleName = ruleName;
rule.messages = messages;
module.exports = rule;
