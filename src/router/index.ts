/*
 * @Author: yonghui666
 * @Date: 2022-05-22 10:50:10
 * @LastEditTime: 2022-06-24 10:40:16
 * @LastEditors: yonghui666
 * @Description:
 */
import { createWebHistory, RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createRouter } from 'vue-router';
// import { createRouter, createWebHashHistory } from 'vue-router';
import { basicRoutes } from './routes';

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
getRouteNames(basicRoutes);

// app router
export const router = createRouter({
  // history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: basicRoutes as unknown as RouteRecordRaw[],
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

// config router
export function setupRouter(app: App<Element>) {
  app.use(router);
}
