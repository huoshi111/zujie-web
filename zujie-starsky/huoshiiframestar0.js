   const overlay = document.getElementById('huoshistarxkOverlay');
    const iframeContainer = document.getElementById('huoshistarxkIframeContainer');
    const iframe = document.getElementById('huoshistarxkIframe');
    const closeButton = document.getElementById('huoshistarxkCloseButton');
    
    // 定义每个按钮的 iframe 源地址
    const iframeSources = {
        huoshistarxkOpenButton1: "https://www.eso.org/public/images/eso1242a/zoomable/", // 星云
        huoshistarxkOpenButton2: "https://www.eso.org/public/images/eso0907a/zoomable/", //银河系
        huoshistarxkOpenButton3: "https://www.eso.org/public/images/eso1907a/zoomable/", //黑洞 M87
        huoshistarxkOpenButton4: "https://upload.wikimedia.org/wikipedia/commons/6/60/ESO_-_Milky_Way.jpg", // 银河系
        huoshistarxkOpenButton5: "https://www.eso.org/public/images/potw1912a/zoomable/", // 首页
    };
    
    // 绑定按钮点击事件
    document.querySelectorAll('[id^="huoshistarxkOpenButton"]').forEach(button => {
        button.addEventListener('click', function() {
            const iframeSource = iframeSources[this.id];
            iframe.src = iframeSource; // 设置 iframe 的源地址
            overlay.style.display = 'block';
            setTimeout(() => {
                overlay.classList.add('active');
                iframeContainer.classList.add('active');
            }, 10); // 允许浏览器渲染 display 变化
        });
    });
    
    closeButton.addEventListener('click', function() {
        overlay.classList.remove('active');
        iframeContainer.classList.remove('active');
    
        // 等待动画完成后隐藏
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 500);
    });



