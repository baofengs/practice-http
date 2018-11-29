HTTP 实践
---

> 纸上得来终觉浅，绝知此事要躬行

## 运行示例

例如：

1. 运行 Cache-Control 相关示例

```bash
npm run cache-control [port]
```

2. 在控制台查看有关现象：http 的请求与响应

## HTTP 缓存

详解：[MDN：HTTP 缓存](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Caching_FAQ)

### Cache-Control

指定有关指令来控制缓存

常见指令 & 含义

1. `max-age=600`：最大缓存时间是 600 秒
2. `no-cache`：服务器说：别直接用缓存，先问我
3. `no-store`：服务器说：别存

详情：[MDN Cache-Control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)

实践：[Practice Cache-Control](./cache/cache-control/index.js)

### Etag

存在意义：

1. 
