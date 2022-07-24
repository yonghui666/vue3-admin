import type { UserInfo } from '/#/store';
import type { ErrorMessageMode } from '/#/axios';
import { defineStore } from 'pinia';
import { store } from '/@/store';
import { GroupInfo } from '/@/enums/roleEnum';
import { PageEnum } from '/@/enums/pageEnum';
import { ROLES_KEY, TOKEN_KEY, USER_INFO_KEY, USE_ROLE_KEY } from '/@/enums/cacheEnum';
import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { GetUserInfoModel, LoginParams } from '/@/api/sys/model/userModel';
import { apiGetMineInfo, doLogout, loginApi } from '/@/api/sys/user';
import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import { router } from '/@/router';

import { usePermissionStore } from '/@/store/modules/permission';
import { RouteRecordRaw } from 'vue-router';
import { PAGE_NOT_FOUND_ROUTE } from '/@/router/routes/basic';
import { h } from 'vue';
interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  roleList: GroupInfo[];
  useRole: Nullable<GroupInfo>;
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
    // roleList
    roleList: [],
    useRole: null,
    // 登录是否过期
    sessionTimeout: false,
    // 最后获取时间
    lastUpdateTime: 0,
  }),
  getters: {
    getUserInfo(): UserInfo {
      return this.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
    getRoleList(): GroupInfo[] {
      return this.roleList.length > 0 ? this.roleList : getAuthCache<GroupInfo[]>(ROLES_KEY);
    },
    getUseRole(): GroupInfo {
      return this.useRole || getAuthCache<GroupInfo>(USE_ROLE_KEY);
    },
    getSessionTimeout(): boolean {
      return !!this.sessionTimeout;
    },
    getLastUpdateTime(): number {
      return this.lastUpdateTime;
    },
  },
  actions: {
    setToken(info: string | undefined) {
      this.token = info ? info : ''; // for null or undefined value
      setAuthCache(TOKEN_KEY, info);
    },
    setRoleList(roleList: GroupInfo[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    setUseRole(role: GroupInfo) {
      this.useRole = role;
      setAuthCache(USE_ROLE_KEY, role);
    },
    setUserInfo(info: UserInfo | null) {
      this.userInfo = info;
      this.lastUpdateTime = new Date().getTime();
      setAuthCache(USER_INFO_KEY, info);
    },
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },

    // 重置状态
    resetState() {
      this.userInfo = null;
      this.token = '';
      this.roleList = [];
      this.useRole = null;
      this.sessionTimeout = false;
    },

    /**
     * @description: 登录
     */
    async login(
      params: LoginParams & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      },
    ): Promise<GetUserInfoModel | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);

        const { token } = data;
        this.setToken(token);
        return this.afterLoginAction(goHome);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    /**
     * 登录前处理
     * @param goHome 是否返回首页
     * @returns
     */
    async afterLoginAction(goHome?: boolean): Promise<GetUserInfoModel | null> {
      if (!this.getToken) return null;

      // 获取用户信息
      const userInfo = await this.getUserInfoAction();

      const sessionTimeout = this.sessionTimeout;
      if (sessionTimeout) {
        // 超时
        this.setSessionTimeout(false);
        return userInfo;
      }

      const permissionStore = usePermissionStore();

      if (!permissionStore.isDynamicAddedRoute) {
        const routes = await permissionStore.buildRoutesAction();
        routes.forEach((route) => {
          router.addRoute(route as unknown as RouteRecordRaw);
        });
        router.addRoute(PAGE_NOT_FOUND_ROUTE as unknown as RouteRecordRaw);
        permissionStore.setDynamicAddedRoute(true);
      }
      goHome && (await router.replace(userInfo?.homePath || PageEnum.BASE_HOME));
      return userInfo;
    },

    /**
     * 获取登录用户的信息
     * @returns
     */
    async getUserInfoAction(): Promise<UserInfo | null> {
      if (!this.getToken) return null;
      const userInfo = await apiGetMineInfo();
      const { roles = [], useRole } = userInfo;
      userInfo.roles = roles;

      this.setRoleList(roles);
      this.setUseRole(useRole);
      this.setUserInfo(userInfo);
      return userInfo;
    },

    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      if (this.getToken) {
        try {
          await doLogout();
        } catch {
          console.log('注销Token失败');
        }
      }
      this.setToken(undefined);
      this.setSessionTimeout(false);
      this.setUserInfo(null);
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: () => h('span', t('sys.app.logoutTip')),
        content: () => h('span', t('sys.app.logoutMessage')),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWithOut() {
  return useUserStore(store);
}
