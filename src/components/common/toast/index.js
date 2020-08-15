import Toast from '@/components/common/toast/Toast'

const obj = {}

obj.install = function (Vue) {

  // 创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  // 创建组件对象
  const toast = new toastConstructor();

  // 将组件对象挂载到一个元素上
  toast.$mount(document.createElement("div"));

  // 将toast组件中template加入body中
  document.body.appendChild(toast.$el);

  // 将组件挂在到vue的原型链上
  Vue.prototype.$toast = toast;
}

export default obj;
