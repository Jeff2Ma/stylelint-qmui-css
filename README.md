# stylelint-wxwork-css

> Special stylelint rules for wxwork(wechat for work) CSS. 企业微信项目CSS 代码stylelint 特殊规范

> Part of wxwork (Wechat For Work) CSS / Sass Styleguide.

## Usege

```
npm i stylelint-wxwork-css -D
```

## Rules

- `at-extend-no-missing-placeholder`: @extend 规则被引入的部分不能丢失%

- `border-color-part-use-variable`: border 属性中color 的部分必须用变量

- `nested-qui-selector`: 不建议在嵌套中使用`qui_xxx` 的类

- `stylelint-disable-reason`: 某些代码需要禁止检测的话需要在后面加上注释

- `selector-namespace-follow-filename`: 业务CSS 的命名空间需要跟随文件名



