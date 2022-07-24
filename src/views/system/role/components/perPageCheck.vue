<!--
 * @Author: yonghui666
 * @Date: 2022-06-06 11:21:40
 * @LastEditTime: 2022-06-22 10:45:59
 * @LastEditors: yonghui666
 * @Description: 页面权限编辑
-->
<template>
  <tr style="width: 100%">
    <td style="width: 30%; padding: 30px"
      ><a-checkbox
        :indeterminate="indeterminate"
        :checked="checkAll"
        @change="choseThePageFunKey"
        style="font-size: 15px"
      >
        {{ titleInfo?.name }}
      </a-checkbox>
    </td>
    <td style="width: 70%; padding: 30px">
      <a-checkbox-group
        v-model:value="checkedList.data"
        :options="funKeys.data"
        @change="choseFunKey"
      />
    </td>
  </tr>
</template>

<script lang="ts">
  type PageOptions = {
    label: string;
    value: string;
  };
</script>

<script setup lang="ts">
  import { onMounted, reactive, ref, toRefs, watch } from 'vue';
  import { TitleInfo } from '../types/role.type';
  import { apiGetGroupInfoById } from '/@/api/sys/permission';

  // ============ 父组件绑定的值 STR ============
  const props = defineProps<{
    groupId: number | null;
    titleInfo: TitleInfo | null;
  }>();
  const { groupId, titleInfo } = toRefs(props);

  // ============ 父组件绑定的值 END ============

  // =================== 属性 STR ===================
  const funKeys = reactive<{ data: PageOptions[] }>({ data: [] });
  const funKeyValues = reactive<{ data: string[] }>({ data: [] });

  const checkedList = reactive<{ data: string[] }>({ data: [] });

  const indeterminate = ref<boolean>(false);
  const checkAll = ref<boolean>(false);
  // =================== 属性 END ===================

  // =================== 生命周期函数 STR ===================
  watch(
    () => groupId.value,
    () => {
      _initGroupId();
    },
  );

  onMounted(async () => {
    _initTitleInfo();
  });
  // =================== 生命周期函数 END ===================

  // =================== 事件 STR ===================
  const emits = defineEmits(['backCheckedList']);
  // =================== 事件 END ===================

  /**
   * 初始化标题信息
   */
  const _initTitleInfo = () => {
    const values: string[] = [];
    const options: PageOptions[] = [];

    const { child: keyList } = <TitleInfo>titleInfo.value;

    for (const item of keyList) {
      const { name, key } = item;
      options.push({
        label: name,
        value: key,
      });
      values.push(item.key);
    }

    [funKeys.data, funKeyValues.data] = [options, values];
  };

  /**
   * 初始化权限组信息
   */
  const _initGroupId = async () => {
    // 获取组信息
    const groupInfo = await apiGetGroupInfoById(<number>groupId.value);

    const nowCheckedList = groupInfo.funkeys_page;
    // 分离页面key
    checkedList.data = _fillterTheTitleFunKeys(nowCheckedList);

    backCheckedList(); // 推向父级
    _setAllStatus(); // 全选状态更改
  };

  /**
   * 分离页面key
   */
  const _fillterTheTitleFunKeys = (funKeys: string[] = []) => {
    const backFunKeys: string[] = [];
    for (const funKey of funKeys) {
      if (funKey.indexOf(`${titleInfo.value?.key}-`) !== 0) continue;
      backFunKeys.push(funKey);
    }
    return backFunKeys;
  };

  /**
   * 反馈给父组件数据
   */
  const backCheckedList = () => {
    emits('backCheckedList', titleInfo.value?.key, checkedList.data);
  };

  /**
   * 设置全选状态
   */
  const _setAllStatus = () => {
    indeterminate.value =
      !!checkedList.data.length && checkedList.data.length < funKeys.data.length;
    checkAll.value = !!checkedList.data.length && checkedList.data.length === funKeys.data.length;
  };

  /**
   * 选择标题下全部页面的key
   */
  const choseThePageFunKey = (e: { target: { checked: boolean } }) => {
    const checked = e.target.checked;
    choseAllPageFunKey(checked);
  };

  /**
   * 选择标题下全部页面的key(父组件调用)
   */
  const choseAllPageFunKey = (checked: boolean) => {
    indeterminate.value = false;
    checkedList.data = checked ? funKeyValues.data : [];
    checkAll.value = checked;
    backCheckedList();
  };

  /**
   * 选择页面权限
   */
  const choseFunKey = () => {
    _setAllStatus();
    backCheckedList();
  };

  // =================== 暴露给父组件 STR ===================
  defineExpose({
    choseAllPageFunKey,
  });
  // =================== 暴露给父组件 END ===================
</script>
