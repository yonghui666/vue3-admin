/*
 * @Author: yonghui666
 * @Date: 2022-05-22 10:50:09
 * @LastEditTime: 2022-06-23 09:32:27
 * @LastEditors: yonghui666
 * @Description:
 */

export type GroupInfo = {
  group_id: number;
  group_name: string;
};

export enum RoleEnum {
  // super admin
  SUPER = 'super',

  // tester
  TEST = 'test',
}
