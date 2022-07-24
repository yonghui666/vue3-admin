<!--
 * @Author: yonghui666
 * @Date: 2022-06-10 17:39:47
 * @LastEditTime: 2022-06-23 11:38:23
 * @LastEditors: yonghui666
 * @Description: 
-->
<template>
  <div>
    <a-select
      ref="select"
      v-model:value="value"
      style="width: 120px"
      :options="options"
      @change="handleChange"
    />
  </div>
</template>
<script lang="ts">
  type GroupInfo = {
    group_id: number;
    group_name: string;
  };
</script>
<script setup lang="ts">
  import { SelectTypes } from 'ant-design-vue/lib/select';
  import { onMounted, ref } from 'vue';
  // import { GetUserInfoModel } from '/@/api/sys/model/userModel';
  // import { useUserStoreWithOut } from '/@/store/modules/user';
  import { usePermission } from '/@/hooks/web/usePermission';

  import { apiLoginChangeGroup } from '/@/api/sys/user';
  import { useUserStore } from '/@/store/modules/user';
  const userStore = useUserStore();

  const options = ref<SelectTypes['options']>([]);
  const value = ref(1);

  // =================== 生命周期函数 STR ===================
  onMounted(async () => {
    const groupList: GroupInfo[] = userStore.roleList;
    console.log('============= groupList', userStore.roleList);

    console.log('============= userStore.useRole', userStore.useRole);
    value.value = <number>userStore.useRole?.group_id;
    const groups: { value: number; label: string; key: number; title: string }[] = [];

    for (const groupInfo of groupList) {
      const { group_id, group_name } = groupInfo;
      groups.push({ value: group_id, label: group_name, key: group_id, title: group_name });
    }
    options.value = groups; // 忽略此处报错
  });
  // =================== 生命周期函数 END ===================

  /**
   * 切换角色
   */
  async function handleChange(value: number) {
    // TODO:与原来的一致不触发
    await changeGroup(value);
  }

  /**
   * @description: 更换权限组
   */
  async function changeGroup(groupId: number) {
    const data = await apiLoginChangeGroup(groupId);
    userStore.setToken(data);

    // 设置新的用户信息
    await userStore.getUserInfoAction();
    userStore.setUseRole({ group_id: groupId, group_name: '111' });
    value.value = groupId;

    // 刷新菜单
    const { refreshMenu } = usePermission();
    refreshMenu();
  }
</script>
<style lang="less"></style>
