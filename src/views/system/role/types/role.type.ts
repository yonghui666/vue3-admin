/*
 * @Author: yonghui666
 * @Date: 2022-06-06 13:16:30
 * @LastEditTime: 2022-06-06 15:09:41
 * @LastEditors: yonghui666
 * @Description:
 */

export type PageInfo = {
  name: string;
  key: string;
  parent_key: string;
  type: string;
};

export type TitleInfo = {
  name: string;
  key: string;
  child: PageInfo[];
  checkedFunKeys: string[];
  showSuperSet: boolean;
};

export type GroupInfoInfo = {
  group_id: number;
  group_name: string;
  funkeys_fun: string[];
  funkeys_page: string[];
  type: number;
};
