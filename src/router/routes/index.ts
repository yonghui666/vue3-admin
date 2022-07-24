/*
 * @Author: yonghui666
 * @Date: 2022-05-22 10:50:10
 * @LastEditTime: 2022-06-23 11:27:51
 * @LastEditors: yonghui666
 * @Description:
 */
import type { AppRouteRecordRaw, AppRouteModule } from '/@/router/types';

import { PAGE_NOT_FOUND_ROUTE, REDIRECT_ROUTE } from '/@/router/routes/basic';

import { mainOutRoutes } from './mainOut';
import { PageEnum } from '/@/enums/pageEnum';
import { t } from '/@/hooks/web/useI18n';
import _ from 'lodash';

const getRouteModuleList = () => {
  const modules = import.meta.globEager('./modules/**/*.ts');

  const routeModuleList: AppRouteModule[] = [];

  Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routeModuleList.push(...modList);
  });

  return _.cloneDeep(routeModuleList);
};

export const asyncRoutes: AppRouteRecordRaw[] = [PAGE_NOT_FOUND_ROUTE, ...getRouteModuleList()];

export function getAsyncRoutes() {
  const res = getRouteModuleList();
  return [PAGE_NOT_FOUND_ROUTE, ...res];
}

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('/@/views/sys/login/Login.vue'),
  meta: {
    title: t('routes.basic.login'),
  },
};

// Basic routing without permission
export const basicRoutes = [
  LoginRoute,
  RootRoute,
  ...mainOutRoutes,
  REDIRECT_ROUTE,
  PAGE_NOT_FOUND_ROUTE,
];
