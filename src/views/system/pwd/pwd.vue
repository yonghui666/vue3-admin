<template>
  <PageWrapper title="修改密码">
    <!-- id="box" style="margin: 24px;border: solid 2px #D7D7D7;padding-top: -50px;" -->
    <template #headerContent>
      <a-form
        name="custom-validation"
        ref="formRef"
        :model="formState"
        :rules="rules"
        v-bind="{
          labelCol: { span: 7 },
          wrapperCol: { span: 12 },
        }"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <!-- 旧密码输入框 -->
        <a-row class="updataPwd">
          <a-col :md="12">
            <a-form-item label="旧密码" has-feedback name="pass">
              <a-input v-model:value="formState.pass" type="password" autocomplete="off" />
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 新密码输入框 -->
        <a-row class="updataPwd">
          <a-col :md="12">
            <a-form-item label="新密码" has-feedback name="repeatPass">
              <a-input v-model:value="formState.repeatPass" type="password" autocomplete="off" />
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 再次输入新密码输入框 -->
        <a-row class="updataPwd">
          <a-col :md="12">
            <a-form-item label="再次输入新密码" has-feedback name="checkPass">
              <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" />
            </a-form-item>
          </a-col>
        </a-row>

        <!-- 修改密码取消按钮 -->
        <a-row justify="center">
          <a-col :md="12" flex="">
            <a-form-item class="updataPwd" style="display: flex; text-align: center">
              <a-button @click="resetForm">重置</a-button>
              <a-button style="margin-left: 10px" type="primary" html-type="submit">提交</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </template>
  </PageWrapper>
</template>
<script lang="ts">
  export default {
    name: 'Pwd',
  };

  interface FormState {
    pass: string;
    checkPass: string;
    repeatPass: string;
  }
</script>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { RuleObject, ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
  import { reactive, ref, UnwrapRef } from 'vue';
  import { apiUpdateMinePassword } from '/@/api/sys/user';
  import { message } from 'ant-design-vue';
  import md5 from 'md5';

  //form表单数据

  const formRef = ref();
  const formState: UnwrapRef<FormState> = reactive({
    pass: '',
    repeatPass: '',
    checkPass: '',
  });

  /**
   * 输入旧密码校验
   */
  async function funcPass(rule: RuleObject, value: string) {
    console.log(rule);

    if (!value) {
      return Promise.reject('请输入旧密码');
    }
  }

  /**
   * 输入新密码校验
   */
  async function funcRepeatPass(rule: RuleObject, value: string) {
    console.log(rule);

    //密码验证规则
    let reg = /^(?![0-9]+$)(?![a-z,A-Z]+$)[0-9,a-z,A-Z]{6,10}$/;
    if (!value) {
      return Promise.reject('请输入新密码');
    }
    if (value == formState.pass) {
      return Promise.reject('新密码不能与旧密码相同');
    }
    if (!reg.test(value)) {
      return Promise.reject('密码不能是纯数字或纯字母');
    }
  }

  // 再次输入密码校验
  async function funcCheckPass(rule: RuleObject, value: string) {
    console.log(rule);

    if (value == '') {
      return Promise.reject('请再次输入新密码');
    }
    if (value !== formState.repeatPass) {
      return Promise.reject('两次新密码输入不一致');
    }
  }

  // 表单验证
  const rules = {
    pass: [{ validator: funcPass, trigger: 'change' }],
    repeatPass: [{ validator: funcRepeatPass, trigger: 'change' }],
    checkPass: [{ validator: funcCheckPass, trigger: 'change' }],
  };

  /**
   * 修改密码
   */
  async function handleFinish(values: FormState) {
    const { pass, repeatPass } = values;
    await apiUpdateMinePassword(md5(pass), md5(repeatPass));
    message.success('修改成功！');
  }

  /**
   * 修改密码时校验不通过方法
   */
  function handleFinishFailed(errors: ValidateErrorEntity<FormState>) {
    console.log(errors);
  }

  /**
   * 重置页面内容方法
   */
  function resetForm() {
    formRef.value.resetFields();
  }
</script>

<style scoped>
  .updataPwd {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
