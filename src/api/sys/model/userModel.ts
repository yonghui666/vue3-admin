/*
 * @Author: yonghui666
 * @Date: 2022-05-22 10:50:08
 * @LastEditTime: 2022-06-21 17:22:33
 * @LastEditors: yonghui666
 * @Description:
 */

import { GroupInfo } from '/@/enums/roleEnum';

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  phone: string;
  password: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  role: GroupInfo;
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  roles: GroupInfo[];
  useRole: GroupInfo;
  // 用户id
  userId: string | number;
  // 用户名
  username: string;
  phone: string;
  // 真实名字
  realName: string;
  // 头像
  avatar: string;
  // 介绍
  desc?: string;
}

export interface EditUserInfo {
  user_id: string | null;
  user_name: string | null;
  phone: string | null;
  group_ids: number[];
  group_ids_change: boolean;
}
