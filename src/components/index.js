// import Vue from 'vue'
// import LemonIMUI from 'lemon-imui';
// import 'lemon-imui/dist/index.css';
// Vue.use(LemonIMUI);
import ymIm from './imHome';
import _Vue from 'vue'

ymIm.install = Vue => {
if (!Vue) {
window.Vue = Vue = _Vue
}
Vue.component(ymIm.name, ymIm)
}
export default ymIm;