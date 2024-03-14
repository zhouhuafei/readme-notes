> Stable Diffusion本地部署、Stable Diffusion本地安装、SadTalker本地部署、SadTalker本地安装、stable-diffusion-webui和SadTalker本地部署教程-win11

## 前置条件
* 安装最新的英伟达显卡驱动（NVIDIA Driver）
  - https://www.nvidia.cn/Download/index.aspx
* 安装Python 3.10.6
  - https://www.python.org/downloads/release/python-3106/
* 克隆对应项目到本地
  - 根据文档指引，下载对应项目相关的模型，并放入到对应目录。
  - 因高墙耸立，固我在百度网盘备份了相关模型。

## pip使用国内清华的源
* pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/

## stable-diffusion-webui报错
#### RuntimeError: Torch is not able to use GPU;
#### Torch not compiled with CUDA enabled
* 问题原因：上述两个错误，都是同一个原因导致的。显卡驱动没装好或项目依赖有问题。
* 解决方案：重新安装显卡驱动或重新安装stable-diffusion-webui项目。
#### no module 'xformers'. Processing without
* 解决方案：修改`./webui-user.bat`文件中的第6行代码：把`set COMMANDLINE_ARGS=`改为`set COMMANDLINE_ARGS=--xformers`。

## SadTalker报错
#### AttributeError: 'Row' object has no attribute 'style'
* 解决方案：更换app_sadtalker.py文件，我存百度网盘了。
#### FFmpeg cannot edit existing files in-place.
* 解决方案：更换src/test_audio2coeff.py文件，我存百度网盘了。
#### RuntimeError: unexpected EOF, expected 270747 more bytes. The file might be corrupted.
* 勾上GFPGAN as Face enhancer选项后报上述错误
* 问题原因：文件夹解压的时候，套了一层gfpgan目录。
* 解决方案：./gfpgan/gfpgan/变成./gfpgan/即可。
#### in function 'cv::cvtColor'
* 问题原因：图片名称不能使用汉字，音频名称可以。
* 解决方案：图片名称不使用汉字。

## stable-diffusion-webui本地部署教程
* https://zhuanlan.zhihu.com/p/577676154
* https://www.bilibili.com/read/cv22700219/

## 安装stable-diffusion-webui时gfpgan安装失败
* https://blog.csdn.net/qq_45041788/article/details/129677247

## stable-diffusion-webui程序界面汉化
* https://www.360doc.cn/article/36363017_1075396022.html

## Stable Diffusion的各类模型介绍
* https://zhuanlan.zhihu.com/p/622410028

## Stable Diffusion AI绘画入门 模型详解 模型训练 安装教程 汉化教程 保姆教程 教程集合
* https://www.bilibili.com/video/BV1eL411176f/

## ckpt和safetensors的区别
* ckpt和safetensors实质上是同样的文件，但因为各个模型算法有安全漏洞，导致普通模型文件ckpt可能携带病毒，所以对ckpt文件进行了封装，变成了更安全的safetensors。

## sd提示词案例
* 推荐：https://www.liblib.art/
* https://www.bilibili.com/read/cv25368715/
* https://www.bilibili.com/read/cv25284218/
* https://www.bilibili.com/read/cv25293812/
* https://juejin.cn/post/7237145375311659065/
* https://www.zhihu.com/question/598034327/answer/3090915675/

## sd插件
* 汉化插件1：https://github.com/dtlnor/stable-diffusion-webui-localization-zh_CN
* 汉化插件2：https://github.com/VinsonLaro/stable-diffusion-webui-chinese
  - 汉化插件，我用的这个，因为star数多。
* 提示词插件：https://github.com/Physton/sd-webui-prompt-all-in-one
  - 提示词插件，支持自动中文转英文、一键转英文、快速修改权重、收藏常用提示词，写提示词会方便很多。
* 图片动作可控插件：https://github.com/Mikubill/sd-webui-controlnet
  - 图片动作可控插件，可以精确绘制AI出图动作，还能给手稿上色，根据草图生成相应人，物等。
* 视频无闪烁插件：https://github.com/s9roll7/ebsynth_utility
  - 视频无闪烁插件，主要是用来生成稳定的视频帧的扩展。
* AI动画生成插件：https://github.com/deforum-art/sd-webui-deforum
  - AI动画生成插件，可以根据文本描述或参考图像生成连续的图像序列，并将它们拼接成视频。
* 关键词反推插件：https://github.com/picobyte/stable-diffusion-webui-wd14-tagger
  - 关键词反推插件，此插件的反推关键词更精准，生成的图片效果也更接近于原图效果。
#### Deforum和EbSynth是两款强大的插件
* Deforum是一款号称“瞬息全宇宙”的SD插件，只需要提供一帧的图像，它就可以基于设计多帧的文字提示、结合概率去噪扩散算法、随机生成各种风格的连续图像序列。
* 如果说EbSynth的是基于图生图使得画面在可控的范围内转绘，那么Deforum就是基于文生图更富创造性的联想生成画面。
#### sd升级版
* webui：https://github.com/lllyasviel/stable-diffusion-webui-forge
* 生成透明背景图插件：https://github.com/layerdiffusion/sd-forge-layerdiffuse
