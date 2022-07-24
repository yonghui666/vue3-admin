/*
 * @Author: yonghui666
 * @Date: 2022-06-08 11:07:57
 * @LastEditTime: 2022-06-23 10:56:02
 * @LastEditors: yonghui666
 * @Description: 和后端对应的权限Key
 */
export enum FunKeyEnum {
  Title_Home = '1',
  // Page_Work_Place = '1-1', // 工作台 (默认必有的页面，不在权限中使用)

  Title_Permission_Test = '2',
  Page_Product = '2-1',
  Page_Ui = '2-2',

  Title_System_Management = '10', // 系统管理
  Page_Mine_Info = '10-1', // 个人中心页
  Page_Change_Password = '10-2', // 修改密码页
  Page_Member_Management = '10-3', // 成员管理页
  Page_Role_Management = '10-4', // 角色管理页面
}
