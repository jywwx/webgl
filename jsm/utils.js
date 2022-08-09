    //初始化程序对象
    function initShaders(gl, vsSource, fsSource) {
        // 创建程序对象
        const program = gl.createProgram();
        // 建立着色对象
        const vertexShader = loaderShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = loaderShader(gl, gl.FRAGMENT_SHADER, fsSource);
        // 把顶点着色器装进程序对象中
        gl.attachShader(program, vertexShader);
        // 把片元着色器装进程序对象中
        gl.attachShader(program, fragmentShader);
        // 连接webgl 上下文对象和程序对象
        gl.linkProgram(program);
        // 启动程序对象
        gl.useProgram(program);
        // 将程序对象挂到上下文对象上
        gl.program = program;
        return true;
    }


    function createProgram (gl,vsSource,fsSource) {
         const program = gl.createProgram();
         const vertexShader = loaderShader(gl, gl.VERTEX_SHADER, vsSource);
         const fragmentShader = loaderShader(gl, gl.FRAGMENT_SHADER, fsSource);
         gl.attachShader(program, vertexShader);
         gl.attachShader(program, fragmentShader);
         gl.linkProgram(program);
         return program
    }

    function loaderShader(gl, type, source) {
        // 根据着色类型，建立着色器对象
        const shader = gl.createShader(type);
        // 将着色器源文件传入着色器对象中
        gl.shaderSource(shader, source);
        // 编译着色器对象
        gl.compileShader(shader);
        // 返回着色器对象
        return shader;
    }
 

    // 获取画布鼠标点击事件点击位置在webgl 坐标系中的坐标
    function getMousePosInwebgl (event,canvas) {
        const {clientX, clientY} = event;
        const { top, left } = canvas.getBoundingClientRect();
        const [cssX, cssY] = [clientX-left,clientY-top];
        const [halfWidth, halfHeight] = [canvas.width/2, canvas.height/2];
        const [xBaseCenter,yBaseCenterY] = [cssX-halfWidth,cssY-halfHeight];
        const yBaseCenterTop = -yBaseCenterY;
        return [xBaseCenter/halfWidth,yBaseCenterTop/halfHeight];
    }

    function glToCssPos ({x,y},{width,height}) {
      const [halfWidth,halfHeight] = [width/2,height/2];
      return {
          x: x * halfWidth,
          y: y * halfHeight
      }
    }

    function imgPromise(img) {
        return new Promise((resolve)=>{
            img.onload = function () {
              resolve(img);
            }
        })
    }

    const inTriangle = (p0,triangle) => {
        let bool = true;
        for (let i = 0; i< 3; i ++) {
           const j = (i + 1) % 3;
           const [p1,p2] = [triangle[i],triangle[j]];
           if (cross([p0,p1,p2]) < 0) {
              bool = false;
              break;
           }
        }
        return bool;
    }

    const cross = ([p0,p1,p2]) => {
       const [ax,ay,bx,by] = [p1.x - p0.x, p1.y-p0.y, p2.x-p0.x, p2.y-p0.y];
       return ax*by - bx*ay;
    }

    export { initShaders, getMousePosInwebgl, glToCssPos, imgPromise, createProgram, inTriangle }