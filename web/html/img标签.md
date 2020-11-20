# img标签在内存中的体现
* 当一个img标签在内存中加载完毕。`onload`。
* 通过img.width和img.height可以获取到img的真实宽高。真实宽高。真实宽高。
* 但是img.offsetWidth和img.offsetHeight必须渲染到文档上之后，才能获取到在文档中展现出来的宽高。在文档中展现出来的宽高。在文档中展现出来的宽高。
    - 如果img是none掉的。则img.offsetWidth和img.offsetHeight获取到的都是0。
