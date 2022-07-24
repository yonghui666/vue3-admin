<!--
 * @Author: yonghui666
 * @Date: 2022-06-21 09:30:16
 * @LastEditTime: 2022-06-21 16:31:53
 * @LastEditors: yonghui666
 * @Description: 用户的角色显示
-->
<template>
  <div> {{ groupNamesStr }}</div>
</template>
<script lang="ts">
  export default {
    name: 'UserGroupsView',
  };
</script>
<script lang="ts" setup>
  import { ref, toRefs, watch } from 'vue';
  import { apiGetUserGroups } from '/@/api/sys/permission';
  const props = defineProps({
    userId: {
      type: String,
      default: null,
      required: true,
    },

    newTime: {
      type: Number,
      default: null,
      required: true,
    },
  });
  const { userId, newTime } = toRefs(props);

  const groupNames = ref<string[]>([]);
  const groupNamesStr = ref<string>('');

  watch(
    () => newTime.value,
    () => {
      _initGroups();
    },
  );

  async function _initGroups() {
    const groupList = await apiGetUserGroups(userId.value);
    groupNames.value = [];
    for (const iterator of groupList) {
      groupNames.value.push(iterator.group_name);
    }
    groupNamesStr.value = groupNames.value.join('，');
  }
</script>
<style lang="less" scoped></style>
