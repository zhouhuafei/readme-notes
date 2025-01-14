# git克隆vue的源码项目时报如下错误
> git clone https://github.com/vuejs/vue.git
```
Cloning into 'vue'...
remote: Enumerating objects: 2, done.
remote: Counting objects: 100% (2/2), done.
remote: Compressing objects: 100% (2/2), done.
error: RPC failed; curl 18 transfer closed with outstanding read data remaining
fatal: The remote end hung up unexpectedly
fatal: early EOF
fatal: index-pack failed
```
* 原因：移动宽带网络问题
* 解决方案：使用手机热点(我使用的是联通手机热点)

# 报错
* 报错信息：
```
remote: HTTP Basic: Access denied
fatal: Authentication failed for
```
* 解决方案：
```
git config --system --unset credential.helper
git config --global credential.helper store
```

## 报错
#### 报错信息：
```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the RSA key sent by the remote host is
SHA256:uNiVztksCsDhcc0u9e8BujQXVUpKZIDTMczCvj3tD2s.
Please contact your system administrator.
Add correct host key in /c/Users/dell/.ssh/known_hosts to get rid of this message.
Offending RSA key in /c/Users/dell/.ssh/known_hosts:5
RSA host key for github.com has changed and you have requested strict checking.
Host key verification failed.
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```
#### 解决方案：
```
查看：ssh-keygen -l -f ~/.ssh/known_hosts
删除：ssh-keygen -R github.com
提交：git push
选择：yes
```
#### 报错信息：
```
ssh: connect to host github.com port 22: Connection timed out
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```
#### 解决方案：在`~/.ssh/`目录下增加config文件。内容如下所示：
```
Host github.com
Hostname ssh.github.com
Port 443
```

#### 报错信息：
```
Unable to negotiate with 120.27.45.57 port 22: no matching host key type found. Their offer: ssh-rsa,ssh-dss
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```
#### 解决方案：在您的 SSH 配置文件（~/.ssh/config）中添加以下几行：
```
Host *
    HostkeyAlgorithms +ssh-rsa
    PubkeyAcceptedAlgorithms +ssh-rsa
```
