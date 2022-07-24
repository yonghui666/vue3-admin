<!--
 * @Author: yonghui666
 * @Date: 2022-06-09 10:02:16
 * @LastEditTime: 2022-06-21 16:37:26
 * @LastEditors: yonghui666
 * @Description: 成员编辑
-->
<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="人员编辑" @ok="commit">
    <a-form
      ref="formRef"
      :model="formState.data"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-item label="员工姓名" name="user_name">
        <a-input v-model:value="formState.data.user_name" />
      </a-form-item>
      <a-form-item label="手机号" name="phone">
        <a-input v-model:value="formState.data.phone" />
      </a-form-item>
      <a-form-item label="角色" name="group_ids">
        <a-select
          v-model:value="formState.data.group_ids"
          mode="multiple"
          style="width: 100%"
          placeholder="Please select"
          :options="groupOptions"
          @change="groupIdsChange"
        />
      </a-form-item>
    </a-form>
  </BasicModal>
</template>
<script lang="ts">
  interface FormState {
    user_id: string | null;
    user_name: string | null;
    phone: string | null;
    group_ids: number[];
    group_ids_change: boolean;
  }

  enum Actions {
    ADD = 'add',
    EDIT = 'edit',
  }

  type OptionsItem = { label: string; value: string; disabled?: boolean };
</script>
<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { onMounted, reactive, ref, UnwrapRef } from 'vue';
  import { apiGetGroupRoles } from '/@/api/sys/permission';
  import { apiCreateUser, apiUpdateUser } from '/@/api/sys/user';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  const groupOptions = ref<OptionsItem[]>([]);

  onMounted(async () => {
    const groupList = await apiGetGroupRoles();
    for (const groupInfo of groupList) {
      groupOptions.value.push({ label: groupInfo.group_name, value: groupInfo.group_id });
    }
  });

  const formState: UnwrapRef<{ data: FormState }> = reactive({
    data: {
      user_id: null,
      user_name: null,
      phone: null,
      group_ids: [],
      group_ids_change: false,
    },
  });

  const theEditData = reactive<{ data: Recordable }>({ data: {} });

  const action = ref<Actions>(Actions.ADD); // 该弹窗的备注标识

  const [registerModal, { closeModal, setModalProps }] = useModalInner((data) => {
    if (!data) return;
    action.value = Actions.EDIT;
    theEditData.data = data;

    formState.data.user_id = data.user_id;
    formState.data.user_name = data.user_name;
    formState.data.phone = data.phone;
    formState.data.group_ids = data.group_ids;
  });

  console.log('================= data', closeModal, setModalProps);

  const formRef = ref();
  const rules = {
    user_name: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
      { min: 2, max: 5, message: '姓名请保证为2到5个字符', trigger: 'blur' },
    ],
    phone: [
      { required: true, message: '请输入手机号', trigger: 'blur' },
      { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' },
    ],
    group_ids: [
      {
        type: 'array',
        required: true,
        message: '请选择角色',
        trigger: 'change',
      },
    ],
  };

  /**
   * 角色选择
   */
  function groupIdsChange(params: number[]) {
    formState.data.group_ids = params;
    formState.data.group_ids_change = true;
  }

  // =================== 事件 STR ===================
  const emits = defineEmits(['backCreateUser', 'backUpdateUserr']);
  // =================== 事件 END ===================

  /**
   * 提交
   */
  async function commit() {
    await formRef.value.validate();

    if (action.value === Actions.ADD) {
      await apiCreateUser(formState.data);
      emits('backCreateUser');
    } else {
      await apiUpdateUser(formState.data);
      emits('backUpdateUserr', { ...theEditData.data, ...formState.data });
    }

    message.success(`${action.value === Actions.ADD ? '创建' : '更新'}成功！`);
    closeModal();
  }
</script>
