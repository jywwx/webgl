class Compose {
    constructor() {
        this.parent = null; // 合成对象的父对象  合成对象之前可以相互嵌套
        this.children = []; // 合成对象的子对象 可以是时间轨 也可以是合成对象
    }
    add (obj){ // 添加子对象的方法
      obj.parent = this;
      this.children.push(obj);
    }
    update(t) {  // 根据当前时间更新子对象状态
      console.log(this.children,"this.children")
      this.children.forEach((ele) => {
          ele.update(t);
      })
    }
}

export default Compose;