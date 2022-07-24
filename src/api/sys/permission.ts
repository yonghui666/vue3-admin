/*
 * @Author: yonghui666
 * @Date: 2022-05-22 10:50:08
 * @LastEditTime: 2022-06-24 14:15:06
 * @LastEditors: yonghui666
 * @Description: 权限组
 */
import { GroupTypes } from './enum/group.enum';
import { defHttp } from '/@/utils/http/axios';

/**
 * @description: 获当前用户所使用组的权限信息
 */
export const apiGetUsedGroupInfo = () => {
  return defHttp.get({ url: '/permission/group/mine/info' });
};

/**
 * @description: 获当前用户所使用组的权限信息
 */
export const apiGetGroupInfoById = (groupId: number) => {
  return defHttp.get({ url: `/permission/group/info/${groupId}` });
};

/**
 * @description: 获取我的权限组列表
 */
export const apiGetMineGroups = () => {
  return defHttp.get({ url: `/permission/group/mine/list` });
};

/**
 * @description: 获取用户的权限组列表
 */
export const apiGetUserGroups = (userId: string) => {
  return defHttp.get({ url: `/permission/group/user/groups/${userId}` });
};

/**
 * @description: 获取权限组（角色）列表
 */
export const apiGetGroupRoles = () => {
  return defHttp.get({ url: `/permission/group/list/${GroupTypes.Role}` });
};

/**
 * @description: 权限组（角色）添加
 */
export const apiAddNewRole = (roleName: string) => {
  return defHttp.post({ url: '/permission/group', data: { group_name: roleName } });
};

/**
 * @description: 权限组（角色）更新
 */
export const apiUpdateRole = (roleInfo: { group_id: number; group_name: string }) => {
  return defHttp.put({ url: `/permission/group/${roleInfo.group_id}`, data: roleInfo });
};

/**
 * @description: 权限组（角色）删除
 */
export const apiDelRole = (group_id: number) => {
  return defHttp.delete({ url: `/permission/group/${group_id}` });
};

/**
 * @description: 获取权限组（角色）列表
 */
export const apiGetTitlePageFunKeys = () => {
  return defHttp.get({ url: `/permission/title_page` });
};

/**
 * @description: 权限组添加功能key
 */
export const apiAddFunKeysToGroup = (groupId: number, funKeys: string[]) => {
  return defHttp.post({ url: `/permission/funkey/${groupId}`, data: { funkeys: funKeys } });
};
