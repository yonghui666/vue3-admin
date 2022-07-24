/*
 * @Author: yonghui666
 * @Date: 2022-05-23 11:03:06
 * @LastEditTime: 2022-06-23 10:56:07
 * @LastEditors: yonghui666
 * @Description: 系统管理 system
 */
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { FunKeyEnum } from '../../funkey.enum';

const system: AppRouteModule = {
  path: '/system',
  name: 'System',
  funKey: FunKeyEnum.Title_System_Management,
  component: LAYOUT,
  redirect: '/system/mine',
  meta: {
    icon: 'ion:settings-outline',
    title: '系统管理',
    orderNo: 1000, // 排序标识
  },
  children: [
    {
      path: 'account',
      name: 'AccountInfo',
      funKey: FunKeyEnum.Page_Mine_Info,
      component: () => import('../../../views/system/account/center/index.vue'),
      meta: {
        title: '个人中心',
        hideMenu: false,
      },
    },
    {
      path: 'pwd',
      name: 'Pwd',
      funKey: FunKeyEnum.Page_Change_Password,
      component: () => import('/@/views/system/pwd/pwd.vue'),
      meta: {
        title: '修改密码',
        hideMenu: false,
      },
    },
    {
      path: 'personnel',
      name: 'Personnel',
      funKey: FunKeyEnum.Page_Member_Management,
      component: () => import('/@/views/system/personnel/personnel.vue'),
      meta: {
        title: '人员管理',
        hideMenu: false,
      },
    },
    {
      path: 'role',
      name: 'Role',
      funKey: FunKeyEnum.Page_Role_Management,
      component: () => import('/@/views/system/role/role.vue'),
      meta: {
        title: '角色管理',
        hideMenu: false,
      },
    },
  ],
};

export default system;
