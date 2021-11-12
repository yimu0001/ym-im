// import Vue from 'vue'
// import LemonIMUI from 'lemon-imui';
// import 'lemon-imui/dist/index.css';
// Vue.use(LemonIMUI);
import ymIm from './imHome';

ymIm.install = function(Vue) {
    Vue.component(ymIm.name, ymIm);
};
export default ymIm;