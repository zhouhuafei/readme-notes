```
const fs = require('fs');
const request = require('request');

request('https://www.sbxx.top/static-no-cache/test/zero/img.jpg').pipe(fs.createWriteStream('./hello-world.png'));

// fs.createWriteStream('./hello-world.png').write(res.body); // fs模块
// fs.outputFile('./hello-world.png', res.body); // fs-extra模块
```
