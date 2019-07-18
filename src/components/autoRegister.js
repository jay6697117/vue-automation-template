/**
 * 全局组件自动注册
 *
 * 全局组件统一放在 ./global 目录下，需要注意各个组件按文件夹区分，文件夹名称与组件名无关联
 * 文件夹内至少保留一个文件名为 index 的组件入口，例如 index.vue
 * 普通组件必须设置 name 并保证其唯一，自动注册会将组件的 name 设为组件名，可参考 SvgIcon 组件写法
 * 如果组件是通过 js 进行调用，则确保组件入口文件为 index.js，可参考 ExampleNotice 组件
 */

import Vue from 'vue'

const componentsContext = require.context('./global', true, /index.(vue|js)$/)
componentsContext.keys().forEach(component => {
    // 组件配置信息
    const componentConfig = componentsContext(component)
    const ctrl = componentConfig.default || componentConfig
    if (/.vue$/.test(component)) {
        Vue.component(ctrl.name, ctrl)
    } else {
        Vue.prototype[`$${ctrl.name}`] = ctrl
    }
})
