<!--
 * @Author: yonghui666
 * @Date: 2022-06-01 10:43:35
 * @LastEditTime: 2022-06-27 13:28:56
 * @LastEditors: yonghui666
 * @Description: 角色管理
-->
<template>
  <PageWrapper title="角色管理">
    <!-- <template #headerContent>
      <div class="flex items-center justify-between">
        角色管理
        <span class="flex-1"> 角色管理 </span>
      </div>
    </template> -->

    <a-layout>
      <a-layout-sider theme="light" width="400">
        <RoleList @chose-role="onChoseRole" />
      </a-layout-sider>
      <a-layout>
        <a-layout-content>
          <div :style="{ margin: '10px' }">
            <p>
              {{ nowGroupInfo.data.group_name }}
              <span class="des">(设置角色对应的功能权限、数据权限及操作权限)</span>
            </p>
          </div>
          <RoleFunPer ref="roleFunPermission" />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </PageWrapper>
</template>
<script lang="ts">
  type Group = {
    group_name: string;
    group_id: number | null;
  };
</script>
<script setup lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import RoleList from './roleList.vue';
  import RoleFunPer from './roleFunPermission.vue';
  import { reactive, ref } from 'vue';

  const nowGroupInfo = reactive<{ data: Group }>({ data: { group_name: '', group_id: null } });

  // 定义子组件
  const roleFunPermission = ref<{ resetGroupId(group_id: number | null): void }>();

  // 被子组件触发的方法
  const onChoseRole = (groupInfo: Group) => {
    nowGroupInfo.data = groupInfo;
    // 调用子组件方法
    roleFunPermission.value?.resetGroupId(groupInfo.group_id);
  };
</script>

<style scoped lang="less"></style>
