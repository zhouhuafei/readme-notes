## pnpm官网
https://www.pnpm.cn

## 使用pnpm的install取代npm的install
* 一个git仓库管理多个npm软件包的项目称之为monorepo项目。
* monorepo项目使用pnpm进行管理时体验会非常友好。
* 开源案例：https://github.com/youzan/vant

## only-allow
```
{
  "scripts": {
    "preinstall": "npx only-allow pnpm"
  }
}
```
