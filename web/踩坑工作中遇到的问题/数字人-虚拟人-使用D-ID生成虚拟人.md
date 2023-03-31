## AIGC开源项目推荐
* 文本转图片：https://github.com/AUTOMATIC1111/stable-diffusion-webui
* 让图片开口说话：https://github.com/Winfredy/SadTalker
* 语音转文字：https://github.com/openai/whisper
* 语音转文字：https://github.com/Const-me/Whisper
* 离线语音转文字：https://github.com/chidiwilliams/buzz

## AIGC其他网站推荐
* AI工具合集：https://www.futurepedia.io/
* 使用人工智能语音将文本转换为视频（收费）：https://fliki.ai/
  - 国内的必剪和剪映也可以实现文本转视频（免费）
* 使用图片生成虚拟数字人播报视频（收费）：https://studio.d-id.com/
  - 国内有腾讯的智影和聚力维度的赛博演猿等虚拟数字人平台（收费）
* 像编辑文字一样编辑你的音视频作品（收费）：https://www.descript.com/

## AIGC
* UGC（全称：User Generated Content）是指广大用户生产的内容。其内容更加大众化和简单化，但是其质量参差不齐。
* PGC（全称：Professional Generated Content）是指专业人士生产的内容。其创作的内容相对UGC更加专业、精准、高质量。
* AIGC（全称：AI Generated Content）是指利用人工智能技术来生成内容。AIGC也被认为是继UGC、PGC之后的新型内容生产方式，AI绘画、AI写作等都属于AIGC的分支。

## ChatGPT（推荐）
> 可以根据描述生成文本。
* 在线网站（收费/每月$20美元）：https://chat.openai.com
  - 国内无法使用。需要翻墙。
  - ChatGPT是美国人工智能研究实验室OpenAI新推出的一种人工智能技术驱动的自然语言处理工具。

## MidJourney（推荐）
> 可以根据文本生成图片。
* 在线网站（收费/每月$30美元）：https://www.midjourney.com
  - 国内无法使用。需要翻墙。

## Stable Diffusion（推荐）
> 可以根据文本生成图片。
* 在线网站（免费）：https://stablediffusionweb.com
  - 第1个输入框输入关键词：`A dolphin jumped out of the splashing water in the aquarium`。
  - 第2个输入框排除关键词`low quality`。
  - 生成的图片不够美观和惊艳，可能是服务器上没有对应的已被训练好的模型。
* 开源项目（免费）：https://github.com/AUTOMATIC1111/stable-diffusion-webui
  - 本地部署时，非常吃电脑的配置，对显卡的要求很高。
  - 需要自行寻找已被训练好的模型并进行应用，如此生成的图片才足够美观。
  - 如何训练模型？去哪下载模型？如何使用模型？[B站](https://www.bilibili.com/)皆有教程！
  - 已被训练好的模型资源（被墙了）：https://civitai.com/
  - 已被训练好的模型资源（可访问）：https://models.paomiantv.cn/models

# getimg.ai（推荐）
> 可以根据文本生成图片。
* 在线网站（收费/每月$12-$99美元）：https://getimg.ai
  - 国内无法使用。需要翻墙。

## ElevenLabs（中文不推荐，英文很推荐）
> 可以根据文本生成音频。
* 在线网站（收费/每月$5-$330美元）：https://beta.elevenlabs.io
  - 中文支持很差。

## 剪映（推荐）
> 可以根据文本生成音频。也可以根据音频生成文本。
* 抖音出品。中文支持很友好。且免费。

## 微软语音合成助手（推荐）
> 可以根据文本生成音频。
* 在线网站（收费/每1M字符$16美元）：https://azure.microsoft.com/zh-cn/services/cognitive-services/text-to-speech/
  - 中文支持很友好。
  - D-ID使用的应该就是这个。因为里面的选项一模一样。
  - 需要VISA的信用卡才能进行注册使用。

## D-ID（推荐）
> 可以根据图片生成视频（虚拟人张嘴讲话）。
* 在线网站（收费/每月$6-$300美元）：https://studio.d-id.com/
  - 支持读取文本。
  - 支持读取语音。
  - 中文支持很友好。
* 国内也有类似的平台，例如腾讯智影（根据图片生成视频收费每年￥3999人民币）。
  - 腾讯智影的收费比D-ID稍贵。
  - D-ID需要自行制作符合国人审美的图片。腾讯智影预制了一批符合国人审美的模板。
  - D-ID的可配置项很简陋。腾讯智影的可配置项很丰富，可以选择动作进行配置等。
  - D-ID可以自行上传图片。腾讯智影模板定制收费在每年￥3999-￥19999人民币之间。
  - D-ID提供的有API文档，可以通过程序对接的形式进行相关内容的生成。腾讯智影未看到有相关入口。

## SadTalker（免费的我推荐）
> 可以根据图片生成视频（虚拟人张嘴讲话）。
* 开源项目（免费）：https://github.com/Winfredy/SadTalker
  - 不支持读取文本。
  - 仅支持读取语音。
  - 在线网站：https://huggingface.co/spaces/vinthony/SadTalker
    - 我生成视频时，总是失败。没有一次是生成成功的。
    - 案例视频，人物有很明显的抖动问题，且视频分辨率低，视频不清晰。体验不如D-ID。
  - 在线网站：https://colab.research.google.com/github/Winfredy/SadTalker/blob/main/quick_demo.ipynb
    - 国内无法使用。需要翻墙。
    - 我未进行尝试。因我不懂Python。
    - 看了别人的生成效果，存在和案例视频同样的问题。人物有很明显的抖动问题，且视频分辨率低，视频不清晰。

## 聚力维度 - 虚拟数字人AIGC平台 - 虚拟数字人直播 - 免穿戴 - 单目摄像头动捕
#### 聚力维度网址：https://www.zr-ai.com/
#### 电脑配置要求：
```
显卡显存12G以上N卡（3060、3080ti、3090、4080、4090）
内存32G以上
CPU：i5 12代以上
摄像头：1080p
```
![图片加载中...](./images/pc-config.png)

## 有感而发随便写写
* 做自媒体最重要的是要有优质内容。
* 想要发财需要拥有能为他人解决问题的能力。
* 若你拥有优质的资源，那进行资源的售卖亦可发财。
  - 资源可以是一篇优质文章。
  - 资源可以是一张精美图片。
