import { defHttp } from '/@/utils/http/axios';
import { LoginParams, LoginResultModel, GetUserInfoModel, EditUserInfo } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

const PRE_URL = '/user';

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: `${PRE_URL}/login/phone`,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: getUserInfo
 */
export function apiGetMineInfo() {
  return defHttp.get<GetUserInfoModel>({ url: `${PRE_URL}/mine` }, { errorMessageMode: 'none' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: `${PRE_URL}/getPermCode` });
}

export function doLogout() {
  return defHttp.get({ url: `${PRE_URL}/logout` });
}

export function apiLoginChangeGroup(groupId: number) {
  return defHttp.post({ url: `${PRE_URL}/login/role/${groupId}` });
}

export function apiGetUserList(
  params: any,
): Promise<{ list: any[]; page_size: number; page_no: number; total_count: number }> {
  return defHttp.get<any>({ url: `${PRE_URL}`, params }, { errorMessageMode: 'none' });
}

/**
 * 增加用户
 * @param userInfo
 * @returns
 */
export function apiCreateUser(userInfo: EditUserInfo) {
  return defHttp.post<any>({ url: `${PRE_URL}`, data: userInfo });
}

/**
 * 修改用户
 * @param userInfo
 * @returns
 */
export function apiUpdateUser(userInfo: EditUserInfo) {
  return defHttp.put<any>({ url: `${PRE_URL}/info/${userInfo.user_id}`, data: userInfo });
}

/**
 * 删除用户
 * @param userInfo
 * @returns
 */
export function apiDelUser(userId: string) {
  return defHttp.delete<any>({ url: `${PRE_URL}/${userId}` });
}

/**
 * 重置用户密码
 * @param user_id
 * @returns
 */
export function apiRestUserPassword(user_id: string) {
  return defHttp.put<any>({ url: `${PRE_URL}/password/user/${user_id}` });
}

/**
 * 修改我的密码
 * @param password
 * @returns
 */
export function apiUpdateMinePassword(old_password: string, password: string) {
  return defHttp.put<any>({ url: `${PRE_URL}/password/mine`, data: { password, old_password } });
}
