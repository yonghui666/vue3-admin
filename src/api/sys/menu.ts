/*
 * @Author: yonghui666
 * @Date: 2022-05-22 10:50:08
 * @LastEditTime: 2022-05-22 17:39:58
 * @LastEditors: yonghui666
 * @Description:
 */
import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: '/getMenuList' });
};
