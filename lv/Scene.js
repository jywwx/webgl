const defAttr = () => ({
  gl:null,
  children: new Set(), //避免三维对象重复添加  
  children2Draw: new Map(), // 键名是程序对象名称 值是普通对象 包含 program:程序对象 attrubutes: attribute集合 uniforms:uniform变量集合
  programs:new Map(),//键名 程序对象名称  值包含与此程序对象的所有三维对象
})
export default class Scene{
  constructor(attr){
    Object.assign(this,defAttr(),attr)
  }
  init(){
    const { children, gl } = this
    children.forEach(obj => {
      obj.init(gl)
    })
  }
  registerProgram(name,{program,attributeNames,uniformNames}) {
    const {gl, programs } = this;

    const attributes = new Map();
    const uniforms = new Map();
    gl.useProgram(program);

    attributeNames.forEach((name) => {
      attributes.set(name, gl.getAttribLocation(program,name));
    })
    uniformNames.forEach((name) => {
      uniforms.set(name, gl.getUniformLocation(program,name));
    });
    programs.set(name,{attributes, uniforms, program});
  }
  add(...objs) {
    const { children, gl } = this
    objs.forEach(obj => {
      children.push(obj)
      obj.parent=this
      obj.init(gl)
    })
  }
  unshift(...objs) {
    const { children, gl } = this
    objs.forEach(obj => {
      children.unshift(obj)
      obj.parent=this
      obj.init(gl)
    })
  }
  remove(obj) {
    const { children } = this
    const i=children.indexOf(obj)
    if (i !== -1) {
      children.splice(i,1)
    }
  }
  setUniform(key, val) {
    this.children.forEach(({ mat }) => {
      mat.setData(key,val)
    })
  }
  draw() {
    const {gl,children}=this
    gl.clear(gl.COLOR_BUFFER_BIT)
    children.forEach(obj => {
      const { geo: { drawType,count},mat:{mode,program}}=obj
      gl.useProgram(program)
      obj.update(gl)
      if (typeof mode === 'string') {
        this[drawType](gl,count,mode)
      } else {
        mode.forEach(m => {
          this[drawType](gl,count,m)
        })
      }
    })
  }
  drawArrays(gl, count, mode) {
    gl.drawArrays(gl[mode],0,count)
  }
  drawElements(gl, count, mode) {
    gl.drawElements(gl[mode],count,gl.UNSIGNED_BYTE,0)
  }
}