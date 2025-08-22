# Typix - 输入即图像

[English](README_en-US.md) | 简体中文

Typix 是一款现代化、开源、易用、隐私安全的 AI 工具，专注于媒体内容生成领域，为广大 AI 创作者提供一站式的生成体验。

![](docs/public/images/demo/preview.png)

## 🎯 快速使用

- [https://typix.art](https://typix.art)
  生产级稳定版本，提供更可靠的体验。
- [https://preview.typix.art](https://preview.typix.art)
  抢先体验最新功能和改进，免费提供 Cloudflare AI 图像生成服务（每日额度有限，先到先得）。

## ✨ 核心特性

专注 AI 图像生成，让创意瞬间成为视觉艺术

- 📱 **本地优先** - 优先使用本地存储和离线功能
- 🏠 **自托管部署** - 完全掌控您的数据和隐私
- 🎁 **免费生图** - 免费使用 Cloudflare Workers AI 生图
- ☁️ **一键部署** - Docker 和 Cloudflare Workers 快速上线
- 🤖 **多模型支持** - 支持多种 AI 模型和服务提供商
- 🔄 **云同步** - 在所有设备间无缝同步您的内容

## 🔒 数据安全

Typix 将您的数据安全和隐私保护放在首位：

- **🛡️ 浏览器本地存储** - 基于 WASM SQLite 技术，所有数据完全存储在您的浏览器上
- **🔐 零数据上传** - 您的创作内容、设置信息等敏感数据从不离开您的设备
- **🚫 无服务器依赖** - 客户端模式无需依赖外部服务器，保障数据主权
- **🔄 可选云同步** - 支持可选的云同步功能

您的创意和隐私，我们一并守护。

## ⚡ 领先 AI 模型驱动

集成最先进的 AI 模型和服务，为您提供最佳的图像生成体验：

- **OpenAI** - 业界领先的 AI 技术
- **Flux** - 高质量图像生成模型
- **Fal** - 快速 AI 推理服务
- **Cloudflare** - 免费 AI 模型支持

更多服务商和模型正在持续接入中。

## 🚀 快速部署

### Cloudflare Workers 一键部署（推荐）

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/monkeyWie/typix)

Cloudflare Workers 部署可以免费享受 Cloudflare AI 提供的图像生成服务。

> 部署成功后，您将获得一个 `typix.xxx.workers.dev` 域名，即可开始使用！

### Node.js 部署

#### 前置要求

- Node.js 20+
- pnpm 或 npm

#### 部署步骤

1. **克隆并安装**

```bash
git clone https://github.com/monkeyWie/typix.git
cd typix
pnpm install
```

2. **配置环境变量**

```bash
cp .env.node.example .env
# 编辑 .env 文件配置必要参数
```

3. **数据库初始化**

```bash
pnpm db:generate
pnpm db:migrate
```

4. **构建项目**

```bash
pnpm build:node
```

5. **启动服务**

```bash
node .bin/node.js
```

## 🛠️ 开发文档

### 技术栈

**前端框架：**

- **React 18** - 现代化 UI 框架
- **TypeScript** - 类型安全的 JavaScript
- **Tailwind CSS** - 原子化 CSS 框架
- **shadcn/ui** - 高质量 UI 组件库
- **Tanstack Router** - 类型安全的路由管理
- **Zustand** - 轻量级状态管理
- **BetterAuth** - 现代化认证解决方案

**后端框架：**

- **Hono.js** - 轻量级 Web 框架
- **SQLite** - 嵌入式数据库
- **Drizzle ORM** - 类型安全的 ORM

**开发工具：**

- **Vite** - 快速构建工具
- **Biome** - 代码格式化和检查
- **pnpm** - 包管理器

### 本地开发指引

#### 环境准备

1. **安装 Node.js 20+**
2. **安装 pnpm**

```bash
npm install -g pnpm
```

#### 开发流程

1. **克隆项目**

```bash
git clone https://github.com/monkeyWie/typix.git
cd typix
```

2. **安装依赖**

```bash
pnpm install
```

3. **数据库初始化**

```bash
# 生成数据库迁移文件
pnpm db:generate

# 执行迁移
pnpm db:migrate
```

4. **启动开发服务器**

```bash
# 启动前端开发服务器
pnpm dev
```

#### 项目结构

```
src/
├── app/                    # 前端应用
│   ├── components/         # React 组件
│   ├── hooks/             # 自定义 Hooks
│   ├── routes/            # 路由页面
│   ├── stores/            # 状态管理
│   └── lib/               # 工具库
├── server/                # 后端服务
│   ├── api/               # API 路由
│   ├── ai/                # AI 提供商集成
│   ├── db/                # 数据库模式
│   └── service/           # 业务逻辑
```

## 📄 开源协议

本项目采用 [Apache License 2.0](https://www.apache.org/licenses/LICENSE-2.0) 开源协议。

您可以自由地：

- ✅ 商业使用
- ✅ 修改代码
- ✅ 分发项目
- ✅ 私人使用

但需要：

- 📝 保留版权声明
- 📝 包含许可证文件
- 📝 声明重大更改

---

如果这个项目对您有帮助，请考虑给我们一个 ⭐ Star！
