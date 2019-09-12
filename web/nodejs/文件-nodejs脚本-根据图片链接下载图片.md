```
const fs = require('fs-extra');
const request = require('request');

request('https://www.sbxx.top/static-no-cache/test/zero/img.jpg').pipe(fs.createWriteStream('./hello-world1.png'));

// fs.createWriteStream('./hello-world2.png').write(res.body); // 此方法是fs模块的，但fs-extra内置了fs的方法。
// fs.outputFile('./hello-world3.png', res.body); // fs-extra模块
```
