# jumpNum

一个简单的网页插件，让数字跳动起来

可以在hexo中使用

## 效果

请见[我的博客](https://rufish.top/2023/07/28/%E6%95%B0%E5%AD%97%E8%B7%B3%E5%8A%A8/)

## 特点

1. 支持自定义数字跳动的持续时间
2. 支持鼠标浮动到数字上显示或直接显示两种方式
3. 根据数字大小可自动调整整数位与小数位的跳动时间

## 使用方式

### 安装

```bash
git clone https://github.com/chafiprc/jumpNum.git
```

将 src 中的 jumpNum.js 复制到 hexo 博客 source/js 目录下

在博客根目录下新建 scripts 目录，在其中新建一个 injector.js 文件
写入以下内容

```js
hexo.extend.injector.register(
  "body_end",
  () => {
    return js("/js/jumpNum.js");
  },
  "post"
);
```

此处利用了 hexo5 自带的 js 插入功能，详细参数请见[
注入器（Injector）
](https://hexo.io/zh-cn/api/injector)

### 使用

在博客中引入`<jumpNum>Num</jumpNum>`标签即可，其中 Num 为你需要跳动的数字

| 参数     | 默认值    | 描述                                                                                               |
| -------- | --------- | -------------------------------------------------------------------------------------------------- |
| type     | `default` | 用于选择数字显示的方式，`default`:页面加载完毕数字即开始跳动，`hover`:鼠标移动到数字上方时可以跳动 |
| duration | `2000`    | 用于调整数字跳动的时间，范围在 500-5000 之间，单位 ms                                              |

例如
第一处 -123456 的代码即为

```html
<jumpNum duration="5000">-123456</jumpNum>
```

第二处 -123456.789 的代码即为

```html
<jumpNum duration="4000">-123456.789</jumpNum>
```

第三处 789.654321 的代码即为

```html
<jumpNum duration="4000" type="hover">789.654321</jumpNum>
```

## 已知问题

1. 由于使用位运算，数字不能太大，在$[-2^{31},2^{31}]$之间
