<!-- 人员管理页面 -->
<template>
  <PageWrapper style="margin: 25px">
    <template #headerContent>
      <!-- 筛选 STR -->
      <a-form
        name="custom-validation"
        ref="formRef"
        :model="formState"
        :label-col="{ style: 'text-align:right;width: 100px;' }"
      >
        <a-row type="flex" justify="space-between">
          <a-col :md="12" :xl="6">
            <a-form-item has-feedback label="姓名" name="user_name">
              <a-input v-model:value="formState.user_name" type="text" autocomplete="off" />
            </a-form-item>
          </a-col>

          <a-col :md="12" :xl="6">
            <a-form-item has-feedback label="手机号" name="phone">
              <a-input v-model:value="formState.phone" type="text" />
            </a-form-item>
          </a-col>

          <a-col :md="12" :xl="6">
            <a-form-item has-feedback label="账号" name="user_id">
              <a-input v-model:value="formState.user_id" type="text" autocomplete="off" />
            </a-form-item>
          </a-col>

          <a-col :md="12" :xl="6">
            <a-form-item has-feedback label="角色" class="selectNowarp">
              <a-select
                v-model:value="formState.group_id"
                :options="groupOptions"
                placeholder="请选择角色"
              />
            </a-form-item>
          </a-col>
        </a-row>

        <a-row justify="space-between">
          <a-col :md="12" :xl="6">
            <a-form-item has-feedback label="在职状态" name="status">
              <a-select v-model:value="formState.serving" placeholder="请选择">
                <a-select-option :value="0">全部</a-select-option>
                <a-select-option :value="UserServings.ON">在职</a-select-option>
                <a-select-option :value="UserServings.OFF">离职</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <!-- 筛选 END -->

      <!-- 按钮 STR -->
      <div
        :style="{
          textAlign: 'right',
        }"
      >
        <a-button type="primary" @click="searchUser" style="margin-right: 5px"> 搜索 </a-button>
        <a-button type="primary" @click="resetForm"> 重置 </a-button>
        <!-- 分割线 -->
      </div>
      <div style="width: 100%; height: 2px; background-color: #f7f7f8; margin-top: 10px"></div>

      <a-button type="primary" @click="openPersonnelAddModal" style="margin-top: 10px">
        新增人员
      </a-button>
      <!-- 按钮 END -->

      <!-- 表格 STR -->
      <!-- title="用户列表"
        titleHelpMessage="温馨提醒" -->
      <BasicTable
        :api="getTableData"
        :columns="columns"
        rowKey="user_id"
        @register="registerTable"
        :actionColumn="{
          width: 200,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'SLOT_action' },
        }"
      >
        <template #SLOT_serving="{ text }">
          <p>
            {{ text === 1 ? '在职' : '离职' }}
          </p>
        </template>

        <template #SLOT_group_ids="{ record }">
          <p>
            <UserGroupsView :userId="record.user_id" :newTime="new Date().valueOf()" />
          </p>
          <!-- <p>
            {{ record.group_ids?.map((group_id) => (group_id = 'qqq')) }}
          </p> -->
        </template>

        <template #SLOT_action="{ record }">
          <TableAction
            :dropDownActions="[
              {
                label: '修改信息',
                onClick: () => {
                  openPersonnelEditModal(record);
                },
              },
              {
                label: '重置密码：默认000000',
                popConfirm: {
                  title: '是否重置密码？',
                  confirm: () => {
                    changePassword(record);
                  },
                },
              },
              // {
              //   label: '删除账号',
              //   popConfirm: {
              //     title: '是否删除账号？',
              //     confirm: () => {
              //       delUser(record);
              //     },
              //   },
              // },
            ]"
          />
        </template>
      </BasicTable>
      <!-- 表格 END -->

      <PersonnelEditModal
        @register="regPersonnelEditModal"
        @backCreateUser="onCreateUser"
        @backUpdateUserr="onUpdateUser"
      />
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  export default {
    name: 'Personnel',
  };

  enum UserServings {
    ON = 1,
    OFF = 2,
  }

  // 人员管理input框数据
  interface FormState {
    user_name?: string;
    phone?: string;
    user_id?: string;
    group_id?: string;
    serving?: number;
  }

  const columns: BasicColumn[] = [
    {
      title: '账号',
      dataIndex: 'user_id',
    },
    {
      title: '姓名',
      dataIndex: 'user_name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
    },
    {
      title: '角色',
      dataIndex: 'group_ids',
      slots: { customRender: 'SLOT_group_ids' },
    },
    {
      title: '在职状态',
      dataIndex: 'serving',
      slots: { customRender: 'SLOT_serving' },
    },
  ];

  type OptionsItem = { label: string; value: string; disabled?: boolean };
</script>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { onMounted, reactive, ref, UnwrapRef } from 'vue';
  import moment from 'moment';
  import { apiGetUserList, apiRestUserPassword } from '/@/api/sys/user';
  import { BasicColumn, BasicTable, useTable, TableAction } from '/@/components/Table';
  import PersonnelEditModal from './modal/personnelEditModal.vue';
  import { useModal } from '/@/components/Modal';
  import { apiGetGroupRoles } from '/@/api/sys/permission';
  import UserGroupsView from './components/userGroupsView.vue';
  import { message } from 'ant-design-vue';
  // import { cloneDeep } from 'lodash-es';

  const [regPersonnelEditModal, apiPersonnelEditModal] = useModal();

  const ROLE_ALL_GROUP_ID = '0';
  const groupOptions = ref<OptionsItem[]>([{ label: '全部', value: ROLE_ALL_GROUP_ID }]);

  onMounted(async () => {
    const groupList = await apiGetGroupRoles();
    for (const groupInfo of groupList) {
      groupOptions.value.push({ label: groupInfo.group_name, value: groupInfo.group_id });
    }
  });

  const SERVING_ALL_VALUE = 0;

  // ----------------- 筛选栏 STR -----------------
  const formState: UnwrapRef<FormState> = reactive({
    user_name: '',
    phone: '',
    user_id: '',
    group_id: ROLE_ALL_GROUP_ID,
    serving: SERVING_ALL_VALUE,
  });

  const formRef = ref();

  /**
   * 人员搜索
   */
  async function searchUser() {
    tableApi.reload();
  }

  //人员管理重置页面内容方法
  function resetForm() {
    formRef.value.resetFields();
    formState.group_id = '0';
    formState.serving = 0;
    tableApi.reload();
  }
  // ----------------- 筛选栏 END -----------------

  // ----------------- 表格 STR -----------------
  // 表格API暴露
  const [registerTable, tableApi] = useTable();

  /**
   * 获取表格数据
   */
  async function getTableData(pageInfo: { page_no: number; page_size: number }) {
    // 处理全部
    const { group_id, serving } = formState;
    const params = { ...pageInfo, ...formState };
    if (group_id === ROLE_ALL_GROUP_ID) delete params.group_id;
    if (serving === SERVING_ALL_VALUE) delete params.serving;

    const tableData = await apiGetUserList(params);
    const { list } = tableData;
    list.forEach((element) => {
      _formatTableData(element);
    });
    return tableData;
  }

  /**
   * 整理表格数据
   */
  function _formatTableData(tableData) {
    tableData.create_at = moment(tableData.create_at).format('YYYY-MM-DD HH:mm:ss');
  }
  // ----------------- 表格 END -----------------

  /**
   * 重置密码
   */
  async function changePassword(userInfo: { user_id: string }) {
    await apiRestUserPassword(userInfo.user_id);
    message.success('重置成功！');
  }

  /**
   * 删除用户
   */
  // async function delUser(params: any) {
  //   console.log('=========== params', params);
  //   const res = await apiDelUser(params.user_id);
  //   console.log('=========== res', res);
  // }

  /**
   * 打开增加弹窗
   */
  function openPersonnelAddModal() {
    apiPersonnelEditModal.openModal(true, null);
  }

  /**
   * 打开编辑弹窗
   */
  function openPersonnelEditModal(record: Recordable) {
    apiPersonnelEditModal.openModal(true, record);
  }

  /**
   * 用户创建回调
   */
  function onCreateUser() {
    tableApi.reload();
  }

  /**
   * 用户更新回调
   */
  function onUpdateUser(newData: Recordable) {
    tableApi.updateTableDataRecord(newData.user_id, newData);
  }
</script>

<style lang="less" scoped></style>
