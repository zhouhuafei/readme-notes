## AIGC
* UGC（全称：User Generated Content）是指广大用户生产的内容。其内容更加大众化和简单化，但是其质量参差不齐。
* PGC（全称：Professional Generated Content）是指专业人士生产的内容。其创作的内容相对UGC更加专业、精准、高质量。
* AIGC（全称：AI Generated Content）是指利用人工智能技术来生成内容。AIGC也被认为是继UGC、PGC之后的新型内容生产方式，AI绘画、AI写作等都属于AIGC的分支。

## ChatGPT（推荐）
> 可以根据描述生成文本。
* 在线网站（收费/每月20美元）：https://chat.openai.com
  - 国内无法使用。需要翻墙。
  - ChatGPT是美国人工智能研究实验室OpenAI新推出的一种人工智能技术驱动的自然语言处理工具。

## MidJourney（推荐）
> 可以根据文本生成图片。
* 在线网站（收费/每月30美元）：https://www.midjourney.com
  - 国内无法使用。需要翻墙。

## Stable Diffusion（推荐）
> 可以根据文本生成图片。
* 在线网站（免费）：https://stablediffusionweb.com
  - 第1个输入框输入关键词：`A dolphin jumped out of the splashing water in the aquarium`。
  - 第2个输入框排除关键词`low quality`。
* 开源项目（免费）：https://github.com/AUTOMATIC1111/stable-diffusion-webui
  - 本地运行时，非常吃电脑的配置，对显卡的要求很高。

# getimg.ai（推荐）
> 可以根据文本生成图片。
* 在线网站（收费/每月12-99美元）：https://getimg.ai
  - 国内无法使用。需要翻墙。

## ElevenLabs（中文不推荐）
> 可以根据文本生成音频。
* 在线网站（收费/每月5-330美元）：https://beta.elevenlabs.io
  - 中文支持很差。

## D-ID（推荐）
> 可以根据图片生成视频（虚拟人张嘴讲话）。
* 在线网站（收费/每月6-300美元）：https://studio.d-id.com
  - 支持读取文本。
  - 支持读取语音。
  - 中文支持很友好。
* 国内也有类似的平台，例如腾讯智影，至于是不是自研的，我就不清楚了。
  - 腾讯智影的收费比D-ID稍贵。
  - D-ID需要自行制作符合国人审美的模板。
  - 腾讯智影预制了一批符合国人审美的模板。
  - 我个人怀疑腾讯智影是使用D-ID的接口进行的套皮开发。因收费标准太相似了。

## SadTalker（不推荐）
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
