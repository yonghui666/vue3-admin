/*
 * @Author: yonghui666
 * @Date: 2022-05-22 10:50:10
 * @LastEditTime: 2022-06-10 17:43:24
 * @LastEditors: yonghui666
 * @Description:
 */
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent';
import FullScreen from './FullScreen.vue';

export const UserDropDown = createAsyncComponent(() => import('./user-dropdown/index.vue'), {
  loading: true,
});

export const LayoutBreadcrumb = createAsyncComponent(() => import('./Breadcrumb.vue'));

export const Notify = createAsyncComponent(() => import('./notify/index.vue'));

export const ErrorAction = createAsyncComponent(() => import('./ErrorAction.vue'));

export const ChangeGroup = createAsyncComponent(() => import('./changeGroup/index.vue'));

export { FullScreen };
