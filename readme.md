# Node.js 论坛支持 [N.J.F.S]

## 介绍
这是以API为主的项目，使用`json`作为`i18n`翻译文件，使用`jwt`进行认证与加密，使用`plugin`添加更多强大功能。

## 进度

- [ ] main
    - [ ] API
    - [ ] JWT
        - [x] 可用性
        - [ ] 实装
    - [ ] database
        - [ ] WebDAV
            - [x] 可用性
            - [ ] 实装
        - [ ] MySQL
        - [ ] SQLite
- [ ] i18n
    - [ ] zh_cn
- [ ] plugin

## Lib说明
- spoon.js 用于辅助用户验证的JWT模式 {Aigio1064}
- WebDAV.js WebDAV的基础支持 {Aigio1064}

## 许可证
普通用户均按照 [`GNU General Public License v3.0`](./LICENSE) 进行授权。  
捐助者与贡献者按照 [`Apache License 2.0`](./LICENSE.txt) 进行授权。  
特殊情况将另行说明。

### 附加
当你创建并修改一个新的分支时，应当使用一个新的、具有明显区别的名称。  
例如：XXX-Node.js-Forum-Support 或者一个新的名字。  
除非你不打算修改除了config.json、plugins以外的任何文件，仅将其作为一个备份或者运行中的后端。

贡献者以 Github Contributors 为准，捐助者以 [donors.md](./donors.md) 为准。  
