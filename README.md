# 办公室录音攻防战 - 部署指南

本游戏是一个纯静态网站，可以通过多种方式部署到外网进行访问。以下是几种推荐的部署方法：

## 1. 使用 GitHub Pages 部署（免费）

### 步骤：
1. 在 GitHub 上创建一个新的仓库
2. 将游戏文件（index.html, style.css, game.js）上传到仓库
3. 在仓库设置中启用 GitHub Pages：
   - 进入 Settings → Pages
   - Source 选择 `main` 分支
   - 点击 Save 按钮
4. 等待几分钟后，您的游戏将可以通过 GitHub 提供的 URL 访问

## 2. 使用 Netlify 部署（免费）

### 步骤：
1. 访问 [Netlify.com](https://www.netlify.com) 并注册一个账号
2. 点击 "New site from Git"
3. 连接您的 GitHub/GitLab/Bitbucket 账户并选择仓库
4. 配置构建设置：
   - Build command: 留空
   - Publish directory: 留空（默认为根目录）
5. 点击 "Deploy site"
6. Netlify 将自动为您分配一个随机域名，您也可以稍后自定义

## 3. 使用 Vercel 部署（免费）

### 步骤：
1. 访问 [Vercel.com](https://vercel.com) 并注册一个账号
2. 点击 "New Project"
3. 导入您的 Git 仓库或直接拖放项目文件夹
4. 保持默认设置并点击 "Deploy"
5. 部署完成后，您将获得一个预览 URL

## 4. 使用国内云服务提供商（如阿里云、腾讯云）

### 步骤（以阿里云为例）：
1. 登录阿里云控制台
2. 搜索并进入 "对象存储 OSS" 服务
3. 创建一个新的存储空间，权限设置为 "公共读"
4. 上传游戏文件到存储空间
5. 开启 "静态网站托管" 功能
6. 使用提供的访问域名访问您的游戏

## 5. 使用第三方免费静态托管服务

其他免费的静态网站托管服务包括：
- [Surge.sh](https://surge.sh)
- [GitLab Pages](https://pages.gitlab.io)
- [Cloudflare Pages](https://pages.cloudflare.com)

## 部署前的准备工作

确保您的游戏文件是完整的：
- index.html - 游戏主页面
- style.css - 样式文件
- game.js - 游戏逻辑代码

## 注意事项

1. 确保所有文件路径引用正确，使用相对路径
2. 如果游戏中有使用本地存储或浏览器API，确保在部署后也能正常工作
3. 对于国内访问，建议选择国内的托管服务以获得更好的访问速度

## 自定义域名设置

大多数托管服务都支持绑定自定义域名，通常需要：
1. 在域名注册商处修改 DNS 记录
2. 在托管服务控制台设置自定义域名

具体步骤请参考对应托管服务的官方文档。