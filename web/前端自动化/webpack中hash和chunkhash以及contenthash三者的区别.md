* 在webpack中有时需要使用hash来做静态资源实现增量更新方案之一，文件名的hash值可以有三种hash生成方式，每一种都有不同应用场景，那么三者有何区别呢？
* hash、chunkhash、contenthash
* hash一般是结合CDN缓存来使用，通过webpack构建之后，生成对应文件名自动带上对应的MD5值。如果文件内容发生改变的话，那么对应文件hash值也会改变，对应的HTML引用的URL地址也会改变，触发CDN服务器从原服务器上拉取对应数据，进而更新本地缓存。但是实际使用时，这三种hash计算还是有一定区别。

# hash
* hash是跟整个项目的构建相关，构建生成的文件hash值都是一样的，所以hash计算是跟整个项目的构建相关，同一次构建过程中生成的hash都是一样的，只要项目里有文件更改，整个项目构建的hash值都会更改。
* 如果出口是hash，那么一旦针对项目中任何一个文件的修改，都会构建整个项目，重新获取hash值，缓存的目的将失效。

# chunkhash
* 采用hash计算的话，每一次构建后生成的hash值都不一样，即使文件内容压根没有改变。这样子是没办法实现缓存效果，我们需要另一种hash值计算方法，即chunkhash。
* chunkhash和hash不一样，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的hash值。我们在生产环境里把一些公共库和程序入口文件区分开，单独打包构建，接着我们采用chunkhash的方式生成hash值，那么只要我们不改动公共库的代码，就可以保证其hash值不会受影响。
* 由于采用chunkhash，所以项目主入口文件main.js及其对应的依赖文件main.css由于被打包在同一个模块，所以共用相同的chunkhash，但是公共库由于是不同的模块，所以有单独的chunkhash。这样子就保证了在线上构建时只要文件内容没有更改就不会重复构建。

# contenthash
* contenthash表示由文件内容产生的hash值，内容不同产生的contenthash值也不一样。在项目中，通常做法是把项目中css都抽离出对应的css文件来加以引用。

# webpack3总结
* 图片、字体、音频等静态资源使用```[hash:8]```
* js使用```[chunkhash]```
* css使用```[contenthash]```

# webpack4总结
* 图片、字体、音频等静态资源使用```[hash:8]```
* js使用```[contenthash]```
* css使用```[contenthash]```
* webpack4时，js和css使用的hash都需要是```[contenthash]```才可以。否则修改css会导致js改变。
