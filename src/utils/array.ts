/*
 * @Author: yonghui666
 * @Date: 2022-06-21 14:46:45
 * @LastEditTime: 2022-06-21 14:52:14
 * @LastEditors: yonghui666
 * @Description: 数组工具
 */
export class ArrayUtil {
  static compareArray<T>(
    newList: T[],
    oldList: T[],
  ): {
    addList: T[];
    delList: T[];
  } {
    const addList: T[] = [];

    for (const newItem of newList) {
      const _i = oldList.indexOf(newItem);
      if (_i === -1) {
        addList.push(newItem);
      } else {
        oldList.splice(_i, 1);
      }
    }

    return {
      addList,
      delList: oldList,
    };
  }
}
