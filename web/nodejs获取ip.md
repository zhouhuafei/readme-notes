```
function getClientIp(req, proxyType) {
    let ip = req.connection.remoteAddress || req.socket.remoteAddress || (req.connection.socket ? req.connection.socket.remoteAddress : null);
    // 如果使用了nginx代理
    if (proxyType === 'nginx') {
        // headers上的信息容易被伪造,但是我不care,自有办法过滤,例如'x-nginx-proxy'和'x-real-ip'我在nginx配置里做了一层拦截把他们设置成了'true'和真实ip,所以不用担心被伪造
        // 如果没用代理的话,我直接通过req.connection.remoteAddress获取到的也是真实ip,所以我不care
        ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || ip;
    }
    const ipArr = ip.split(',');
    // 如果使用了nginx代理,如果没配置'x-real-ip'只配置了'x-forwarded-for'为$proxy_add_x_forwarded_for,如果客户端也设置了'x-forwarded-for'进行伪造ip
    // 则req.headers['x-forwarded-for']的格式为ip1,ip2只有最后一个才是真实的ip
    if (proxyType === 'nginx') {
        ip = ipArr[ipArr.length - 1];
    }
    if (ip.indexOf('::ffff:') !== -1) {
        ip = ip.substring(7);
    }
    return ip;
}
```