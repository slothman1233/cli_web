# 基于 koa2+typescript+sequelize+nunjucks+log4js+seagger的web端框架

附加说明
```bash
  默认去掉了掉redis 跟mysql的连接 需要的话 

1.在app.ts
 sequelizeInit()

  store: redisStore({
       port: redisConf.port,
       host: redisConf.host
   })

   恢复这两段
2. 在common/config/env 文件修改mysql个redis对应的配置即可

```
运行命令（输入完成后浏览[http://localhost:2000](http://localhost:2000)即可--如果修改了端口请自行调整端口）
```bash

npm install 安装依赖
pm2 install typescript

npm run start 
```

命令介绍
```bash
npm run start     -----  开发使用
npm run start:dev -----  dev 环境  采用对应的开发
npm run start:test  -----  test 环境  采用对应的开发
npm run start:pre -----  pre 环境  采用对应的开发
npm run start:ga  -----  ga 环境  采用对应的开发
npm run build ----- 打包生产代码
npm run pm2:start ----- pm2 形式进行运行
npm run pm2:start:dev ----- pm2 dev 环境 形式进行运行
npm run pm2:start:test ----- pm2 test 环境 形式进行运行
npm run pm2:start:pre ----- pm2 pre 环境 形式进行运行
npm run pm2:start:ga ----- pm2 ga 环境 形式进行运行
npm run pm2:stop  ----- pm2 命令  停止所有程序
npm run pm2:delete  ----- pm2 命令  删除所有程序
npm run pm2:reload  ----- pm2 命令  热更新所有程序
npm run pm2:restart  ----- pm2 命令  重新启动所有程序
npm run pm2:list  ----- pm2 命令  查看pm2的运行程序列表
npm run pm2:monit  ----- pm2 命令  监视器
npm run eslint   ----- eslint 代码规范检测
npm run jest:test  -----  jest 运行单元测试
npm run docker  -----  在docker下运行
```

开发方式
```bash
1.在views里面创建ejs的页面 
2.在routes里面创建对应的路由
```

目录说明——(未说明的部分请参照 vue-cli 文档)
```
├── coverage  单元测试报告文件夹
├── logs  pm2 下的日志文件 
│   ├── log4js 程序日志
│   └── pm2 系统日志
├── dist  生产代码文件夹
├── src
│   ├── bin 启动文件
│   ├── cache 缓存的文件夹
│   │   ├── redis     redis缓存的文件夹
│   │   │   ├── _redis.ts  redis的基类文件
│   │   │   └── test.ts   redis的使用示例
│   ├── common  公共文件
│   │   ├── config  全局配置文件夹
│   │   │   ├── env   配置文件夹
│   │   │   └── constant.ts   全局常量文件
│   │   ├── decorator  装饰器文件夹
│   │   │   └── httpMethod.ts   路由装饰器
│   │   ├── nunjucks  装饰器文件夹
│   │   │   ├── constant.ts   全局静态配置
│   │   │   ├── filter.ts   过滤器
│   │   │   └── index.ts    编译html代码插件
│   │   ├── type  全局的类型文件夹
│   │   │   └── type.d.ts   类型文件包含一些  路由模型类型 中间件的模型 等全局需要用到的
│   │   └── utils   工具文件夹
│   │       ├── cryp.ts   md5加密
│   │       ├── env.ts   各种环境判断
│   │       ├── net.ts   http请求的工具类
│   │       ├── type_check.ts   类型判断工具类
│   │       └── util.ts   常用的工具
│   ├── controller  用于处理逻辑的文件夹
│   ├── db  用于跟数据库对接的文件
│   │   ├── mysql  使用mysql原生的方式对接数据库
│   │   │   ├── dao   数据库语句组合的工具文件夹
│   │   │   ├── dbHelper.ts   查询数据的组件
│   │   │   └── dbPool.ts   连接数据的文件
│   │   └── sequelize   使用 sequelize 方式对接数据库
│   │       ├── mapping   对应数据库字段的模型结构 (必须已.mapping.ts结尾)
│   │       ├── tables   公用的底层数据模型
│   │       ├── index.ts   sequelize 连接创建的入口文件
│   │       ├── map.ts   所有的数据模型的集合文件
│   │       ├── sync.ts   创建数据库表的方式 一般情况下直接先在数据库创建表  不推荐通过这个方式创建
│   │       └── types.ts  sequelize 数据类型
│   ├── middleware  中间件文件夹
│   │   ├── httpservercache  文件缓存中间件
│   │   ├── log4js  日志中间件
│   │   ├── proxy  代理请求中间件
│   │   └── test.ts   中间件示例
│   ├── model  模型文件夹
│   ├── routes  路由文件夹
│   │   └── index.ts   路由的示例
│   ├── services  服务文件夹(跟数据库打交道) 获取数据的
│   ├── views  nunjucks模板文件夹
│   │   ├── error  错误和404页面文件夹
│   │   ├── shared  部分页和布局页文件夹
│   │   │   ├── layout   布局页文件夹
│   │   │   └── sharedView  部分页文件夹
│   │   │       ├── call   nunjucks的call模板文件夹
│   │   │       ├── macro   nunjucks的macro模板文件夹
│   │   │       └── set  nunjucks的set模板文件夹
│   │   ├── proxy  代理请求中间件
│   │   └── test.ts   中间件示例
│   ├── wwwroot  静态文件夹
│   ├── app.ts  入口文件
│   ├── router.ts  路由入口
├── test  单元测试文件夹(所有的单元测试文件必须以.test.ts结尾)
├── .eslintignore eslint忽略文件
├── .eslintrc eslint配置文件
├── docker-compose.yml  docker-compose 文件  
├── Dockerfile  docker的配置文件
├── jest.config.js  jest 配置文件
├── jest.setup.js   jest 的脚本文件
├── nodemon.json  nodemon的配置文件
├── pm2.conf.json pm2的配置文件
└── tsconfig.json ts的配置文件
```