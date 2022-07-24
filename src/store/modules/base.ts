import { AreaList } from '/@/utils/area/areaList';

import { defineStore } from 'pinia';
import { store } from '/@/store';

interface BaseState {
  areaList: any[];
}
function handleList(arr, type = 3) {
  if (type === 3) {
    for (const item of arr) {
      item['value'] = item.code;
      item['label'] = item.name;
      if (item.children) {
        handleList(item.children);
      }
    }
  } else {
    for (const item of arr) {
      item['value'] = item.code;
      item['label'] = item.name;
      if (item.children) {
        for (const cv of item.children) {
          cv['value'] = cv.code;
          cv['label'] = cv.name;
          delete cv.children;
        }
      }
    }
  }
}
handleList(AreaList, 2);
// 全局公共数据
export const useBaseStore = defineStore({
  id: 'app-base',
  state: (): BaseState => ({
    areaList: AreaList,
  }),
  getters: {
    getAreaList(): any {
      return this.areaList;
    },
  },
});

// Need to be used outside the setup
export function useBaseStoreWithOut() {
  return useBaseStore(store);
}
