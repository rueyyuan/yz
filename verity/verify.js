// 状态变量
let isVerified = false;
let selectedCount = 0;

// 获取元素
const verifyLayer = document.querySelector('.verify-layer');
const checkBoxBorder = document.querySelector('.verify-check-box-border');
const spinner = document.querySelector('.spinner');
const tickBox = document.querySelector('.tick-box');
const validationText = document.getElementById('validation');

// 1. 点击复选框
function onOpenverify() {
    const account = document.getElementById('account').value;
    const pass = document.getElementById('password').value;

    if (!account || !pass) {
        alert("请先输入账号和密码");
        return;
    }

    if (isVerified) return;

    // 显示加载转圈
    checkBoxBorder.classList.add('close');
    spinner.classList.remove('close');

    // 模拟网络延迟后弹出大图
    setTimeout(() => {
        spinner.classList.add('close');
        checkBoxBorder.classList.remove('close');
        verifyLayer.classList.remove('close');
    }, 800);
}

// 2. 图片点击选中逻辑
document.querySelectorAll('.image-box').forEach(box => {
    box.addEventListener('click', function() {
        const img = this.querySelector('.img');
        const ico = this.querySelector('.checked-ico');
        
        if (img.classList.contains('checked')) {
            img.classList.remove('checked');
            ico.classList.remove('checked');
            selectedCount--;
        } else {
            img.classList.add('checked');
            ico.classList.add('checked');
            selectedCount++;
        }
    });
});

// 3. 点击验证层里的“验证”按钮
function onCheckverify() {
    if (selectedCount === 0) {
        alert("请选择符合描述的图片");
        return;
    }

    // 验证成功流程
    verifyLayer.classList.add('close');
    checkBoxBorder.classList.add('close'); // 隐藏方框
    tickBox.classList.remove('close');    // 显示绿勾
    
    isVerified = true;
    validationText.innerText = "身份已确认";
    validationText.style.color = "#20af46";
}

// 4. 最终登录按钮
function finalLogin() {
    const isTickVisible = !document.querySelector('.tick-box').classList.contains('close');

    if (isTickVisible) {
        // 1. 视觉上的关闭：让登录卡片消失
        document.querySelector('.login-card').style.opacity = '0';
        document.querySelector('.login-card').style.transition = '0.5s';
        
        // 2. 延迟跳转，给用户一个“退出”的动画感
        setTimeout(() => {
            window.location.replace("你的视频网站链接.html");
        }, 500);
    } else {
        alert("请先完成人机身份验证");
    }
}

// 点击空白处关闭弹窗
window.addEventListener('click', (e) => {
    if (!verifyLayer.contains(e.target) && !checkBoxBorder.contains(e.target)) {
        verifyLayer.classList.add('close');
    }
});
