import { withInstall } from '/@/utils';
import cropperImage from './src/Cropper.vue';
import cropperThumb from './src/CropperThumb.vue';

export * from './src/typing';
export const CropperImage = withInstall(cropperImage);
export const CropperThumb = withInstall(cropperThumb);
