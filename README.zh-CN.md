# 一次性密码密钥提取器

一个简单、安全、纯客户端的 Web 工具，用于从 Google Authenticator 和 LastPass Authenticator 的二维码导出中提取一次性密码（OTP）密钥。

[English](README.md) | [中文文档](README.zh-CN.md)

## [打开工具 →](https://mfcarroll.github.io/extract-otp-web/)

[https://mfcarroll.github.io/extract-otp-web/](https://mfcarroll.github.io/extract-otp-web/)

## 功能特性

- 从 Google Authenticator 批量二维码加载
- 从 LastPass Authenticator 批量二维码加载
- 从标准 otpauth 二维码加载
- 从 LastPass Authenticator JSON 导出加载
- 显示单个 OTP 密钥和二维码
- 保存为 CSV
- 保存为 JSON
- 导出为 Google Authenticator 批量二维码
- 导出为 LastPass Authenticator 批量二维码
- 直接从摄像头扫描

## 为什么需要这个工具？

Google Authenticator 允许您将账户转移到新手机，但它不提供将这些账户导出到其他应用（如 1Password 或 Bitwarden）的简单方法。这是因为它隐藏了每个账户的原始"密钥"（您最初扫描的二维码）。

没有这些密钥，迁移到新的密码管理器意味着需要为每个账户手动重新配置双因素认证，这非常麻烦。

虽然存在其他工具来解决这个问题，但它们通常需要运行脚本或安装软件等技术步骤。这个工具设计为一个简单、安全、一键式的解决方案，完全在您的浏览器中运行。

## 使用方法

此工具读取 Google Authenticator 或 LastPass Authenticator 导出功能中的二维码截图，并返回每个账户的原始密钥。然后您可以使用这些密钥将账户导入到任何其他认证器应用中。

1.  **从您的一次性密码应用导出**：

    _从 Google Authenticator 导出_：

    - 在手机上打开 Google Authenticator 应用。
    - 进入菜单，选择"转移账户" > "导出账户"。
    - 选择您要导出的账户。
    - 对显示的每个二维码进行截图。

    _从 LastPass 导出_：

    - 在手机上打开 LastPass Authenticator。
    - 点击设置图标，选择"转移账户" > "导出账户到二维码"。
    - 对显示的每个二维码进行截图。

    （对于 LastPass，您也可以选择"导出账户到文件"并上传该文件。此工具支持两种格式。）

2.  **提取密钥**：

    - [在 Web 浏览器中打开此工具](https://mfcarroll.github.io/extract-otp-web/)
    - 点击"选择图片"或将您的截图拖放到页面上。

3.  **使用您的密钥**：
    - 工具将显示提取的 OTP 密钥，每个都有自己的二维码和密钥。
    - 现在您可以将这些密钥导入到您首选的认证器应用或密码管理器中。

## 安全与隐私

安全和隐私是此工具的首要任务。

- **您上传的任何内容都不会离开您的设备。** 所有处理都在本地进行，就在您的浏览器中。
- 您的二维码图片和它们包含的密钥永远不会发送到任何服务器。
- 此工具是开源的，[任何人都可以检查代码](https://github.com/mfcarroll/extract-otp-web)以验证其安全性和方法。它托管在 GitHub Pages 上，提供了[安全透明的部署过程](https://github.com/mfcarroll/extract-otp-web/deployments/github-pages)。
- 为了最大程度的安全性，您可以从 GitHub 下载源代码并在本地离线机器上运行。

## 开发

此项目使用 [Vite](https://vitejs.dev/) 进行开发和打包，但**最终部署的应用是零框架依赖的** - 它作为纯原生 JavaScript 在浏览器中运行。

### 重要说明

- **运行时**：部署的应用是纯客户端 JavaScript，无框架依赖（不使用 React、Vue、Angular 等）
- **构建时**：开发和构建需要 Node.js 和 npm 依赖（Vite、TypeScript 等）来编译 TypeScript 和打包代码
- **部署**：构建输出是静态 HTML/CSS/JS 文件，可以由任何 Web 服务器提供 - 不需要 Node.js 运行时

### 前置要求

- [Node.js](https://nodejs.org/)（推荐版本 18 或更高）
- npm、pnpm 或 yarn

### 本地运行

1.  克隆仓库：

    ```bash
    git clone https://github.com/mfcarroll/extract-otp-web.git
    cd extract-otp-web
    ```

2.  安装依赖（仅用于构建/开发）：

    ```bash
    npm install
    ```

3.  启动开发服务器：

    ```bash
    npm run dev
    ```

4.  在浏览器中打开提供的本地 URL。

### 构建生产版本

要构建用于部署的静态文件：

```bash
npm run build
```

输出将在 `dist/` 目录中 - 这些是纯静态文件，可以部署到任何 Web 服务器（GitHub Pages、Netlify 等），无需任何 Node.js 运行时。

## 致谢

此工具由 [Matthew Carroll](https://www.linkedin.com/in/matthewfcarroll/) 创建，他是一位对从 Google Authenticator 迁移 OTP 代码到其他密码管理器的过程感到沮丧的开发者。

它建立在多个开源项目的工作基础上，包括：

- [Extract OTP Secrets](https://github.com/scito/extract_otp_secrets/#readme)，由 [Roland Kurmann](https://scito.ch/) 编写的 Python 脚本，此工具基于它。
- [Aegis Authenticator](https://github.com/beemdevelopment/Aegis/#readme)，提供了 Google Authenticator 导出 protobuf 规范。
- [Google Authenticator Exporter](https://github.com/krissrex/google-authenticator-exporter/#readme)，另一个解决相同问题的 Python 脚本方案。

用户界面和二维码处理由这些优秀的开源库提供支持：

- [jsQR](https://github.com/cozmo/jsQR) 用于从图像解码二维码。
- [protobuf.js](https://github.com/protobufjs/protobuf.js) 用于解码 Google Authenticator 数据负载。
- [pica](https://github.com/nodeca/pica) 用于高质量的图像缩放。
- [qrcode](https://github.com/soldair/node-qrcode) 用于为每个账户生成新的二维码。
- [thirty-two](https://github.com/wzrdtales/thirty-two) 用于 Base32 编码 OTP 密钥。
- [Font Awesome](https://github.com/FortAwesome/Font-Awesome) 用于 UI 中使用的图标。

[Gemini Code Assist](https://codeassist.google/) 在此工具的开发过程中被使用。所有 AI 生成的代码都经过了仔细的手动审查。

此工具的开发部分得到了 [Stand.earth](https://stand.earth/) 的支持。如果您觉得这很有用，请[考虑捐款](https://stand.earth/donate/)以支持 Stand 的工作。

