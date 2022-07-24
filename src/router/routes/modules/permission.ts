import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { FunKeyEnum } from '../../funkey.enum';

const permission: AppRouteModule = {
  path: '/permission',
  name: 'Permission',
  component: LAYOUT,
  redirect: '/permission/product',
  funKey: FunKeyEnum.Title_Permission_Test,
  meta: {
    orderNo: 10,
    icon: 'ion:key-outline',
    title: '权限测试',
  },
  children: [
    {
      path: 'product',
      name: 'Product',
      funKey: FunKeyEnum.Page_Product,
      component: () => import('/@/views/permission/product/index.vue'),
      meta: {
        title: '产品经理',
      },
    },
    {
      path: 'ui',
      name: 'Ui',
      funKey: FunKeyEnum.Page_Ui,
      component: () => import('/@/views/permission/ui/index.vue'),
      meta: {
        title: 'UI设计',
      },
    },
  ],
};

export default permission;
