class Compose {
    constructor() {
        this.parent = null; // 合成对象的父对象  合成对象之前可以相互嵌套
        this.children = new Set(); // 合成对象的子对象 可以是时间轨 也可以是合成对象
    }
    add (obj){ // 添加子对象的方法
      obj.parent = this;
      this.children.add(obj);
    }
    update(t) {  // 根据当前时间更新子对象状态
      this.children.forEach((ele) => {
          ele.update(t);
      })
    }
    // 基于时间轨的目标对象删除时间轨道
    deleteByTarget(target) {
      const { children } = this;
      for (let child of children) {
        if (child.target === target) {
          children.delete(target);
          break;
        }
      }
    }
}

export default Compose;