// 阿里云OSS部署脚本
// 使用前请安装依赖：npm install ali-oss

const OSS = require('ali-oss');
const fs = require('fs');
const path = require('path');

// 配置信息 - 请根据您的实际情况修改
const config = {
  region: 'oss-cn-hangzhou', // 替换为您的OSS region
  accessKeyId: 'YOUR_ACCESS_KEY_ID', // 替换为您的AccessKey ID
  accessKeySecret: 'YOUR_ACCESS_KEY_SECRET', // 替换为您的AccessKey Secret
  bucket: 'your-bucket-name', // 替换为您的存储空间名称
  localFiles: ['index.html', 'style.css', 'game.js', 'README.md'] // 要上传的文件列表
};

// 创建OSS客户端实例
const client = new OSS({
  region: config.region,
  accessKeyId: config.accessKeyId,
  accessKeySecret: config.accessKeySecret,
  bucket: config.bucket
});

// 上传文件函数
async function uploadFile(fileName) {
  try {
    console.log(`正在上传 ${fileName}...`);
    // 读取文件内容
    const fileContent = await fs.promises.readFile(fileName);
    
    // 上传文件到OSS
    const result = await client.put(fileName, fileContent);
    
    console.log(`${fileName} 上传成功！URL: ${result.url}`);
    return result.url;
  } catch (error) {
    console.error(`${fileName} 上传失败:`, error.message);
    return null;
  }
}

// 启用静态网站托管
async function enableStaticWebsite() {
  try {
    console.log('正在配置静态网站托管...');
    
    // 配置静态网站托管
    await client.putBucketWebsite(config.bucket, {
      indexDocument: {
        suffix: 'index.html'
      },
      errorDocument: {
        key: 'index.html' // 对于单页应用，404错误也返回index.html
      }
    });
    
    console.log('静态网站托管配置成功！');
    
    // 计算网站URL
    const websiteUrl = `https://${config.bucket}.${config.region}.aliyuncs.com`;
    console.log(`您的游戏网站地址: ${websiteUrl}`);
    
  } catch (error) {
    console.error('配置静态网站托管失败:', error.message);
  }
}

// 主函数
async function deploy() {
  console.log('开始部署办公室录音攻防战到阿里云OSS...');
  
  // 逐个上传文件
  for (const file of config.localFiles) {
    if (fs.existsSync(file)) {
      await uploadFile(file);
    } else {
      console.warn(`警告: 文件 ${file} 不存在，跳过上传。`);
    }
  }
  
  // 配置静态网站托管
  await enableStaticWebsite();
  
  console.log('\n部署完成！');
  console.log('\n请注意：');
  console.log('1. 确保您已在阿里云控制台为OSS Bucket设置了公共读权限');
  console.log('2. 如果需要自定义域名，请在阿里云域名控制台配置CNAME记录');
  console.log('3. 国内访问时，可能需要进行ICP备案');
}

// 执行部署
deploy().catch(error => {
  console.error('部署过程发生错误:', error);
});

// 部署前的准备步骤说明：
// 1. 安装Node.js和npm
// 2. 在当前目录运行: npm init -y && npm install ali-oss
// 3. 修改上面的配置信息为您的阿里云OSS信息
// 4. 运行: node oss-deploy.js