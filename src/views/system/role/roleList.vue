<!--
 * @Author: yonghui666
 * @Date: 2022-06-01 10:43:21
 * @LastEditTime: 2022-06-27 13:27:41
 * @LastEditors: yonghui666
 * @Description: 角色列表
-->
<template>
  <div>
    <div :style="{ margin: '10px' }">
      <a-button @click="showModalOfAdd" type="primary"><PlusCircleOutlined />新增角色</a-button>
    </div>

    <a-list :data-source="roleList.data">
      <template #renderItem="{ item, index }">
        <a-list-item
          :class="item.selected ? 'role-item-selected' : ''"
          @click="choseRole(index)"
          style="border: solid 0 !important"
        >
          <a-row
            type="flex"
            justify="space-between"
            style="width: 100%; padding-left: 20px; padding-right: 20px; cursor: pointer"
          >
            <a-col :span="8"> {{ item.group_name }} </a-col>
            <a-col :span="8" style="text-align: right">
              <span @click="showModalOfEdit(item, index)"><EditOutlined /> </span>
              &nbsp;
              <span @click="delRole(item, index)"><DeleteOutlined /> </span>
            </a-col>
          </a-row>
        </a-list-item>
      </template>
    </a-list>

    <a-modal
      :title="`${modalAction === ModalAction.ADD ? '添加' : '编辑'}角色：`"
      :visible="visible"
      :destroyOnClose="false"
      @ok="
        () => {
          modalAction === ModalAction.ADD ? createRole() : editRole();
        }
      "
      @cancel="handleCancel"
    >
      <a-form ref="formRef" :model="form" :rules="rules">
        <a-form-item ref="group_name" name="group_name" label="角色名称">
          <a-input v-model:value="form.group_name" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
  type ListItem = {
    group_id: number;
    group_name: string;
    selected: boolean;
  };

  enum ModalAction {
    ADD = 'add',
    EDIT = 'edit',
  }

  interface Form {
    group_id?: number;
    group_name: string | null;
    index?: number;
  }
</script>

<script lang="ts" setup>
  // reactive 包装数组和对象 ref 包装基础类型
  import { ref, reactive, onMounted } from 'vue';
  import {
    apiAddNewRole,
    apiDelRole,
    apiGetGroupRoles,
    apiUpdateRole,
  } from '/@/api/sys/permission';
  import { PlusCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons-vue';

  // =================== 属性 STR ===================
  const visible = ref<boolean>(false);
  const modalAction = ref<ModalAction>(ModalAction.ADD);
  const selectIndex = ref<number>(0);

  // 表单
  const rules = {
    group_name: [
      { required: true, message: '请输入角色名', trigger: 'blur' },
      { min: 1, max: 5, message: '请输入1-5长度的字符', trigger: 'blur' },
    ],
  };
  const formRef = ref();
  const form: Form = reactive<Form>({ group_name: null });

  const roleList = reactive<{ data: ListItem[] }>({ data: [] });
  // =================== 属性 END ===================

  // =================== 生命周期函数 STR ===================
  onMounted(async () => {
    await getRoleList();
    choseRole(0);
  });
  // =================== 生命周期函数 END ===================

  // =================== 事件 STR ===================
  const emits = defineEmits(['choseRole']);
  // =================== 事件 END ===================

  const choseRole = async (index: number) => {
    const roleInfo = roleList.data[index];

    // 切换被选中的状态
    roleList.data[selectIndex.value].selected = false;
    roleList.data[index].selected = true;
    selectIndex.value = index;

    emits('choseRole', roleInfo);
  };

  const showModalOfEdit = async (item: ListItem, index: number) => {
    roleList.data[selectIndex.value].selected = false;
    selectIndex.value = index;
    roleList.data[index].selected = true;

    modalAction.value = ModalAction.EDIT;

    form.group_id = item.group_id;
    form.group_name = item.group_name;
    form.index = index;

    visible.value = true;
  };

  const delRole = async (item: ListItem, index: number) => {
    // TODO: 添加确认删除提示
    await apiDelRole(item.group_id);

    if (index !== 0) choseRole(index - 1);

    roleList.data.splice(index, 1);
    roleList.data[selectIndex.value].selected = true;

    if (index === 0) choseRole(index);
  };

  const getRoleList = async () => {
    const resRoleList = await apiGetGroupRoles();
    roleList.data = resRoleList;
  };

  const showModalOfAdd = () => {
    visible.value = true;
    modalAction.value = ModalAction.ADD;
  };

  const createRole = async () => {
    await formRef.value.validate();
    const newRoleInfo = await apiAddNewRole(<string>form.group_name);

    roleList.data[selectIndex.value].selected = false;
    newRoleInfo.selected = true;
    selectIndex.value = roleList.data.length;
    roleList.data.push(newRoleInfo);

    emits('choseRole', newRoleInfo);
    visible.value = false;
  };

  const editRole = async () => {
    await formRef.value.validate();
    await apiUpdateRole({ group_id: <number>form.group_id, group_name: <string>form.group_name });

    const newValue = roleList.data[<number>form.index];
    newValue.group_name = <string>form.group_name;
    roleList.data[<number>form.index] = newValue;

    visible.value = false;
  };

  const handleCancel = async () => {
    visible.value = false;
  };
</script>
<style lang="less" scoped>
  .role-item-selected {
    background: #dfe8ff;
  }
</style>
