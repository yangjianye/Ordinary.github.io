#!/bin/bash

# 办公室录音攻防战 - GitHub Pages 部署脚本

echo "开始部署办公室录音攻防战到GitHub Pages..."

# 检查是否已安装git
if ! command -v git &> /dev/null; then
    echo "错误：未安装git，请先安装git再继续。"
    exit 1
fi

# 初始化git仓库（如果尚未初始化）
if [ ! -d ".git" ]; then
    echo "初始化Git仓库..."
    git init
    git config user.name "您的用户名"
    git config user.email "您的邮箱@example.com"
fi

# 创建.gitignore文件（如果不存在）
if [ ! -f ".gitignore" ]; then
    echo "创建.gitignore文件..."
    cat > .gitignore << EOF
.DS_Store
Thumbs.db
*.log
node_modules/
EOF
fi

# 添加所有文件到暂存区
echo "添加文件到Git..."
git add index.html style.css game.js README.md deploy.sh .gitignore

# 提交更改
echo "提交更改..."
git commit -m "部署办公室录音攻防战游戏"

# 提示用户创建GitHub仓库并提供远程URL
echo "请在GitHub上创建一个新的仓库，然后将远程仓库URL复制到下面。"
echo "例如：https://github.com/您的用户名/游戏仓库名.git"
read -p "请输入GitHub仓库URL: " GITHUB_URL

# 添加远程仓库
git remote add origin "$GITHUB_URL"

# 推送代码到GitHub Pages分支
echo "推送到GitHub Pages分支..."
git branch -M main
git push -u origin main

echo "部署完成！"
echo "请在GitHub仓库设置中启用GitHub Pages，然后通过提供的URL访问您的游戏。"
echo "详细部署步骤请参考README.md文件。"

# 提供简单的部署到Netlify的命令提示
echo ""
echo "如果您想使用Netlify部署，可以安装Netlify CLI并运行以下命令："
echo "npm install -g netlify-cli"
echo "netlify deploy --dir=. --prod"