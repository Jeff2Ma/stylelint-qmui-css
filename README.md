# stylelint-qmui-css

> [This plugin is still developing... ]Special stylelint rules for [QMUI team](https://github.com/QMUI/) project css. 


## Usege

```
npm i stylelint-qmui-css -D
```

## Rules

- `comments-in-header`: 文件头必须有注释，包含`@author`或`@data`等必要信息

- `unused-mixins`: mixins 黑名单

- `nested-qui-selector`: 不建议在嵌套中使用`qui_xxx` 的类

- `stylelint-disable-reason`: 某些代码需要禁止检测的话需要在后面加上注释

- `selector-namespace-follow-filename`: 业务CSS 的命名空间需要跟随文件名


## Thanks

Inspired from [stylelint-suitcss](https://github.com/suitcss/stylelint-suitcss).