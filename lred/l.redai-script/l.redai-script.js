        // 平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
        
        // 滚动时导航栏效果
// 修改原有滚动事件监听
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const hero = document.querySelector('.hero');
    const scrollY = window.scrollY;

    // 导航栏动画
    if (scrollY > 90) {
        header.classList.add('scrolled');
        hero.style.transform = `translateY(${scrollY * 0.15}px) scale(0.98)`;
        hero.style.opacity = 1 - scrollY / 800;
    } else {
        header.classList.remove('scrolled');
        hero.style.transform = 'none';
        hero.style.opacity = 1;
    }

    // 原有背景颜色调整（改为通过class控制）
    header.style.backgroundColor = scrollY > 50 
        ? 'rgba(0, 0, 0, 0.8)' 
        : 'rgba(0, 0, 0, 0.4)';
});

// 添加加载时初始化
window.addEventListener('load', () => {
    document.querySelector('header').style.transition = 'all 0.3s ease';
});
        
        // 动态加载字体图标
        const fontAwesome = document.createElement('link');
        fontAwesome.rel = 'stylesheet';
        fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css';
        document.head.appendChild(fontAwesome);



    
    
// 验证码

        document.addEventListener('DOMContentLoaded', function() {
            const verificationContainer = document.getElementById('verificationContainer');
            const overlay = document.getElementById('overlay');
            const verificationInput = document.getElementById('verificationInput');
            const verifyButton = document.getElementById('verifyButton');
            const messageElement = document.getElementById('message');

            // 获取所有目标链接和按钮
            const targetLinks = document.querySelectorAll('.target-link');
            const targetButtons = document.querySelectorAll('.target-button');

            // 为所有按钮添加点击事件监听器
            targetButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault(); // 阻止链接的默认跳转行为
                    const targetLink = e.target.parentElement; // 获取按钮的父链接元素
                    targetLink.dataset.targetUrl = targetLink.href; // 存储目标URL
                    overlay.style.display = 'block';
                    verificationContainer.style.display = 'block';
                    verificationInput.value = '';
                    messageElement.textContent = '';
                    verificationInput.focus();
                });
            });

            // 验证密码
            verifyButton.addEventListener('click', verifyPassword);

            // 按下回车键时也触发验证
            verificationInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    verifyPassword();
                }
            });

            function verifyPassword() {
                const password = verificationInput.value;
                const targetUrl = document.querySelector('.target-link[data-target-url]').dataset.targetUrl;
                
                // 清除之前的提示消息
                messageElement.textContent = '';
                
                // 验证密码
                if (password === 'LRed011') {
                    // 密码正确，关闭验证窗口并跳转
                    overlay.style.display = 'none';
                    verificationContainer.style.display = 'none';
                    
                    // 触发链接的跳转行为
                    if (targetUrl) {
                        window.location.href = targetUrl;
                    }

                    // 延迟2500刷新网页保证安全
                    setTimeout(function(){
                    window.location.reload();
                    }, 2500);


                } else {
                    // 密码错误，显示提示消息
                    messageElement.textContent = '密码错误！请重新输入';
                    verificationInput.value = '';
                    verificationInput.focus();
                }
            }

            // 点击验证窗口外部时，关闭验证窗口
            overlay.addEventListener('click', function() {
                overlay.style.display = 'none';
                verificationContainer.style.display = 'none';
                verificationInput.value = '';
                messageElement.textContent = '';
            });

            // 点击验证窗口内部时，阻止事件冒泡
            verificationContainer.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });


