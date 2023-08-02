//  自定义派发事件  
// 派发路由信息 
import mitt, { Handler } from 'mitt'
import type { RouteLocationNormalized } from 'vue-router'
const emitter = mitt()
const key = Symbol('ROUTE_CHANGE')
let latestRoute: RouteLocationNormalized;
// 发布事件
export function setRouteEmitter(to: RouteLocationNormalized) {
    emitter.emit(key ,to)
    latestRoute = to
}
// 监听 接收
export function listenerRouteChange(
    handler:( route: RouteLocationNormalized) =>void,immediate = true
){
    emitter.on(key, handler as Handler);
    if (immediate && latestRoute) {
        handler(latestRoute);
      }
}
// 移除
export function removeRouteListener() {
    emitter.off(key);
  }
  