# 项目简介

> 一个<后台管理系统模板>，本项目更好的帮助你学习 Vue3，Nest.js；熟悉全栈开发，从 0 到 1 的构建发布部署；助你进阶全栈开发；特别感谢：前端项目基于 vben-admin 进行开发：https://github.com/vbenjs/vue-vben-admin

```
前端项目：https://github.com/yonghui666/vue3-admin
后台接口：https://github.com/yonghui666/vue3-admin-backstage
```

## 功能包含后端接口

> 在后台管理系统的基础上，对接好了常用的登录，权限，角色管理功能；方便二次开发；

- 账号登录
- 权限管理
- 角色管理
- 文件 OSS 上传

## 运行

```
# 克隆项目
git clone https://github.com/yonghui666/vue3-admin

# 进入项目目录
cd vue3-admin

# 安装依赖
yarn

# 本地开发 启动前端项目
npm run dev

# 打包本地预览
npm run preview

# 启动对应后端接口参考↓↓↓
https://github.com/yonghui666/vue3-admin-backstage

```

接下来你可以修改代码进行业务开发了，本项目内建了典型业务模板、常用业务组件、参数过滤器、全局错误处理等等各种实用的功能来辅助开发;

## 发布部署

> 在线预览：http://admin.u66.top

- 把项目克隆到服务器
- 使用 shell 脚本一键部署

### linux shell 脚本部署命令

```
echo "启动客户端!"
# 进入服务器项目目录
cd /www/xxx/vue3-admin
# 拉取最新代码
git pull
# 安装依赖
yarn
# 前端打包
npm run build
# 把打包后的前端文件拷贝到Nginx存放静态文件的目录下（需要将下面改为自己服务器打包文件和Nginx正确目录路径）
\cp -rf /自己项目路径/vue3-admin/dist/* /自己项目路径/nginx/html/vue3-admin
```

> 创建一个 start.sh 的文件；上面的 shell 脚本命令写进去；Linux 运行命令：`sh start.sh`即可自动打包部署到 Nginx；也可以自己手动一步一步来；

### Nginx 配置

```
# Vue3-admin项目配置start
    server {
    listen 443 ssl;   #SSL协议访问端口号为443。此处如未添加ssl，可能会造成Nginx无法启动。
    server_name admin.u66.top;  #将我的域名修改为您证书绑定的域名，例如：www.example.com。
    root /自己项目路径/nginx/html/vue3-admin;
    ssl_certificate cert/admin.u66.top.pem;   #将域名.pem替换成您证书的文件名。【自己申请https证书】
    ssl_certificate_key cert/admin.u66.top.key;   #将d域名.key替换成您证书的密钥文件名。
    ssl_session_timeout 5m;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;  #使用此加密套件。
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;   #使用该协议进行配置。
    ssl_prefer_server_ciphers on;

    # include /自己项目路径/nginx/conf/mime.types;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 服务端接口
    location /api {
        proxy_pass http://127.0.0.1:9528/api;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Real-IP $remote_addr;
    }

  }
    # 配置http强制https

    server {
        listen 80;
        server_name admin.u66.top;
         rewrite ^(.*)$   https://$host$1 permanent;
        # return      301 https://admin.u66.top$request_uri;
        #charset koi8-r;
        #access_log  logs/host.access.log  main;

        # gzip config
        gzip on;
        gzip_min_length 1k;
        gzip_comp_level 6;
        gzip_types text/plain text/css text/javascript application/json application/javascript application/x-javascript application/xml;
        gzip_vary on;
        gzip_disable "MSIE [1-6]\.";

        root /自己项目路径/nginx/html/vue3-admin;
        include /自己项目路径/nginx/conf/mime.types;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # 服务端接口
        location /api {
            proxy_pass http://127.0.0.1:9528/api;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header X-Real-IP $remote_addr;
        }

    }

# Vue3-admin项目配置end
```

> 把配置添加到 Nginx，重载配置，重启 Nginx 即可

## 目录结构

```
.
├── build # 打包脚本相关
│   ├── config # 配置文件
│   ├── generate # 生成器
│   ├── script # 脚本
│   └── vite # vite配置
├── mock # mock文件夹
├── public # 公共静态资源目录
├── src # 主目录
│   ├── api # 接口文件
│   ├── assets # 资源文件
│   │   ├── icons # icon sprite 图标文件夹
│   │   ├── images # 项目存放图片的文件夹
│   │   └── svg # 项目存放svg图片的文件夹
│   ├── components # 公共组件
│   ├── design # 样式文件
│   ├── directives # 指令
│   ├── enums # 枚举/常量
│   ├── hooks # hook
│   │   ├── component # 组件相关hook
│   │   ├── core # 基础hook
│   │   ├── event # 事件相关hook
│   │   ├── setting # 配置相关hook
│   │   └── web # web相关hook
│   ├── layouts # 布局文件
│   │   ├── default # 默认布局
│   │   ├── iframe # iframe布局
│   │   └── page # 页面布局
│   ├── locales # 多语言
│   ├── logics # 逻辑
│   ├── main.ts # 主入口
│   ├── router # 路由配置
│   ├── settings # 项目配置
│   │   ├── componentSetting.ts # 组件配置
│   │   ├── designSetting.ts # 样式配置
│   │   ├── encryptionSetting.ts # 加密配置
│   │   ├── localeSetting.ts # 多语言配置
│   │   ├── projectSetting.ts # 项目配置
│   │   └── siteSetting.ts # 站点配置
│   ├── store # 数据仓库
│   ├── utils # 工具类
│   └── views # 页面
├── test # 测试
│   └── server # 测试用到的服务
│       ├── api # 测试服务器
│       ├── upload # 测试上传服务器
│       └── websocket # 测试ws服务器
├── types # 类型文件
├── vite.config.ts # vite配置文件
└── windi.config.ts # windcss配置文件
```
