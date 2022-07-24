<template>
  <upload
    name="file"
    :headers="{
      'second-path': headerSecondPath,
    }"
    list-type="picture-card"
    :show-upload-list="false"
    :action="action"
    :before-upload="beforeUpload"
    @change="handleChange"
  >
    <img v-if="newImageUrl" :src="newImageUrl" />
    <div v-else>
      <a-icon :type="loading ? 'loading' : 'plus'" />
      <div class="ant-upload-text"> 选择文件 </div>
    </div>
  </upload>
</template>

<script lang="ts">
  import { defineComponent, ref, toRefs, watch } from 'vue';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { Upload } from 'ant-design-vue';

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  export default defineComponent({
    components: {
      Upload,
    },
    props: {
      secondPath: {
        type: String,
        default: '',
      },
      imageUrl: {
        type: String,
        default: '',
      },
    },
    setup(props, { emit }) {
      const { createMessage } = useMessage();
      const { imageUrl, secondPath } = toRefs(props);
      const headerSecondPath = secondPath;
      const VITE_GLOB_UPLOAD_URL = import.meta.env.VITE_GLOB_UPLOAD_URL;

      const action = `${VITE_GLOB_UPLOAD_URL}`;
      const loading = ref(false);
      const newImageUrl = ref<string>('');
      const onChangeImageUrl = () => {
        newImageUrl.value = imageUrl.value;
      };
      watch(imageUrl, onChangeImageUrl);

      // 上传前校验
      function beforeUpload(file: File) {
        const { size, type } = file;
        const isLt2M = size / 1024 / 1024 < 5;
        const isJpgOrPng = type === 'image/jpeg' || type === 'image/png';

        if (!isLt2M) {
          createMessage.error('图片大小必须小于5M!');
        }

        if (!['image/jpeg', 'image/png'].includes(type)) {
          return createMessage.error('你只能上传[jpg,png]图片格式!');
        }

        return isJpgOrPng && isLt2M;
      }
      function handleChange(info) {
        const {
          file: { status },
        } = info;

        if (status === 'uploading') {
          loading.value = true;
          return;
        }

        if (status === 'done') {
          const {
            file: {
              originFileObj,
              response: {
                result: { host, name, url },
              },
            },
          } = info;
          getBase64(originFileObj, (url) => {
            newImageUrl.value = url;
            loading.value = false;
          });

          // 发送给父组件
          emit('upfileDone', { host, name, url });
          return { host, name, url };
        }
      }

      return {
        headerSecondPath,
        newImageUrl,
        action,
        loading,
        beforeUpload,
        handleChange,
      };
    },
  });
</script>

<style scoped lang="less">
  img {
    width: 300px;
  }
</style>
