
/**
 * 主函数
 */
function main() {
    // 手动创建canvas，可以有提示
    const canvas = document.createElement("canvas");
    document.body.appendChild(canvas);
    // 设置canvas的宽高
    canvas.width = 512;
    canvas.height = 512;
    // 设置canvas样式，增加边框
    canvas.style.border = "2px solid black" 

    // 获取2d绘制上下文
    const draw2d = canvas.getContext("2d");
    // 绘制矩形并设置颜色
    draw2d.fillStyle = `rgba(0,0,255,255)`;
    draw2d.fillRect(10,10,200,200)
    // 绘制字体并设置颜色
    draw2d.fillStyle =`rgba(100,200,255,255)`;
    draw2d.font = "30px Arial"; 
    draw2d.fillText("这是几个字",10,400);
}



main();