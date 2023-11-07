# drag_code 项目 - 快速生成表单

## 项目介绍

drag_code 是一个快速生成 Vue3 表单的工具，一个低代码平台，即使用户不懂编程，也可以通过点击和拖拽来创建表单。

本项目借助 Element Plus 提供了丰富的样式和组件，使用户能够轻松创建自定义表单。

## 项目亮点

- 使用 Vue 中的 `component` 标签来动态生成组件。
- 用户使用拖拽，点击，等方式创建表单。
- 将动态标签解析为静态，然后生成代码。
- 实现自定义组件的所有属性，包括添加验证规则，以及添加后端接口，添加动态属性等。
- 支持拖拽、点击等操作来改变组件次序，删除或复制组件。
- 使用 Express 框架搭建服务端，提供登录、注册和获取历史记录等功能。

## 技术栈

- Vue3
- Element Plus
- Express

## 示例和截图

![示例图片](./images/screenshot.png)

```markdown
project/
│ README.md
│ package.json
└───src/
│ └───components/
│ │ │ App.vue
└───server/
│ │ │ server.js
```

## 安装和使用说明

1. 克隆项目
   ```bash
   git clone https://github.com/your/project.git

2. 安装依赖
   ```bash
   npm install

3. 运行服务端
   ```bash
   nodemon app.js # app.js中运行

4. 运行客户端
   ```bash
   npm run dev # 项目根目录

## 相关链接

- [GitHub 仓库](https://github.com/topulikeweb/DragCode)
- [在线演示](https://drag-code-yoa3-topulikeweb.vercel.app)

## TODO 列表

- [x] 完善文档
- [ ] 添加更多自定义组件
- [ ] 扩展，不止用于表单
