<!--
 * @Author: yonghui666
 * @Date: 2022-06-06 11:00:28
 * @LastEditTime: 2022-06-08 10:45:57
 * @LastEditors: yonghui666
 * @Description: 角色功能权限
-->
<template>
  <div>
    <p style="width: 100%; text-align: right">
      <a-checkbox
        :indeterminate="indeterminate"
        :checked="checkAll"
        @change="
          (e) => {
            selectAllFunKeys(e);
          }
        "
      >
        全选
      </a-checkbox>
    </p>
    <table border="1">
      <PerPageCheck
        ref="perPageCheck"
        v-for="titleInfo in titleList.data"
        :key="titleInfo.key"
        @backCheckedList="backCheckedList"
        :titleInfo="titleInfo"
        :groupId="groupId"
      />
    </table>

    <br />
    <p style="width: 100%; text-align: right">
      <a-button type="primary" @click="saveAllFunKeys">保存</a-button>
      &nbsp;&nbsp;
      <a-button @click="notSave">取消</a-button>
    </p>
  </div>
</template>
<script lang="ts">
  enum TitleKeys {
    // Title_Home = '1', // 我的主页
    Title_Permission_Test = '2', // 商户管理
    Title_System_Management = '10', // 系统管理
  }
</script>

<script setup lang="ts">
  import { message } from 'ant-design-vue';
  import { onMounted, reactive, ref } from 'vue';
  import PerPageCheck from './components/perPageCheck.vue';
  import { PageInfo, TitleInfo } from './types/role.type';
  import { apiAddFunKeysToGroup, apiGetTitlePageFunKeys } from '/@/api/sys/permission';

  // 页面刷新
  import { useTabs } from '/@/hooks/web/useTabs';
  const { refreshPage } = useTabs(); // 页面刷新

  const TitleMap = new Map<string, TitleInfo>([
    // [
    //   TitleKeys.Title_Home,
    //   {
    //     name: 'Dashboard',
    //     key: TitleKeys.Title_Home,
    //     child: [],
    //     checkedFunKeys: [],
    //     showSuperSet: true,
    //   },
    // ],
    [
      TitleKeys.Title_Permission_Test,
      {
        name: '权限测试',
        key: TitleKeys.Title_Permission_Test,
        child: [],
        checkedFunKeys: [],
        showSuperSet: true,
      },
    ],
    [
      TitleKeys.Title_System_Management,
      {
        name: '系统管理',
        key: TitleKeys.Title_System_Management,
        child: [],
        checkedFunKeys: [],
        showSuperSet: false,
      },
    ],
  ]);

  const perPageCheck = ref();

  // =================== 属性 STR ===================
  const indeterminate = ref<boolean>(false);
  const checkAll = ref<boolean>(false);

  const groupId = ref<number | null>(null);
  const titleList = reactive<{ data: TitleInfo[] }>({ data: [] });
  const titleMap = reactive<{ data: Map<string, TitleInfo> }>({ data: TitleMap });

  // =================== 属性 END ===================

  // =================== 生命周期函数 STR ===================
  onMounted(async () => {
    const result: PageInfo[] = await apiGetTitlePageFunKeys();

    result.forEach((item: PageInfo) => {
      const theChild = TitleMap.get(item.parent_key)?.child;
      theChild?.push(item);
    });
    const TitleList: TitleInfo[] = [...TitleMap.values()];
    titleList.data = TitleList;
  });
  // =================== 生命周期函数 END ===================

  /**
   * 全选操作
   */
  const selectAllFunKeys = (e: { target: { checked: boolean } }) => {
    checkAll.value = e.target.checked;

    for (let index = 0; index < perPageCheck.value.length; index++) {
      perPageCheck.value[index].choseAllPageFunKey(checkAll.value);
    }
  };

  /**
   * 父级调用的重置方法
   */
  const resetGroupId = (inGroupId: number) => {
    groupId.value = inGroupId;
  };

  /**
   * 接收已选的funKeys值
   */
  const backCheckedList = (titleKey: TitleKeys, newFunKeys: string[]) => {
    const theTitle = titleMap.data.get(titleKey);
    if (!theTitle) return;
    theTitle.checkedFunKeys = newFunKeys;
  };

  /**
   * 保存
   */
  const saveAllFunKeys = async () => {
    const allFunkeys: string[] = [];
    for (const iterator of titleMap.data.values()) {
      allFunkeys.push(...iterator.checkedFunKeys);
    }

    await apiAddFunKeysToGroup(<number>groupId.value, allFunkeys);
    message.success('保存成功！');
  };

  /**
   * 取消
   */
  const notSave = async () => {
    await refreshPage();
  };

  // =================== 暴露给父组件 STR ===================
  defineExpose({ resetGroupId });
  // =================== 暴露给父组件 END ===================
</script>
