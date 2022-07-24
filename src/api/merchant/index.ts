import { defHttp } from '/@/utils/http/axios';
import { MerchantListRes, MerchantListParams } from './model/index';
import { IAddMerchant } from '/@/views/merchant/base/types';
// 商家管理模块API
const PRE_URL = '/merchant';

export function getMerchantList(params: MerchantListParams) {
  return defHttp.get<MerchantListRes>({ url: `${PRE_URL}`, params }, { errorMessageMode: 'none' });
}

// export function getMerchantInfo(params) {
//   return defHttp.get({ url: `${PRE_URL}/info`, params }, { errorMessageMode: 'none' });
// }
export function getMerchantInfo(params) {
  console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC', params);

  return defHttp.get(
    { url: `${PRE_URL}/info/${params.merchant_id}`, params },
    { errorMessageMode: 'none' },
  );
}
export function addMerchant(params: IAddMerchant) {
  return defHttp.post({ url: `${PRE_URL}`, params }, { errorMessageMode: 'none' });
}
export function editMerchantBaseInfo(params) {
  return defHttp.put({ url: `${PRE_URL}/base_info`, params }, { errorMessageMode: 'none' });
}
export function editMerchantCooperationMode(params) {
  return defHttp.put({ url: `${PRE_URL}/mode`, params }, { errorMessageMode: 'none' });
}
export function getMerchantZxType(merchant_id: number) {
  return defHttp.get(
    { url: `${PRE_URL}/zx_type`, params: { merchant_id } },
    { errorMessageMode: 'none' },
  );
}
export function editMerchantStatus(merchant_id: number, status: number) {
  return defHttp.put(
    { url: `${PRE_URL}/status`, params: { merchant_id, status } },
    { errorMessageMode: 'none' },
  );
}

export function getContractInfo(params) {
  return defHttp.get({ url: `${PRE_URL}/contract/info`, params }, { errorMessageMode: 'none' });
}
export function getOrderReceiveList(params) {
  return defHttp.get({ url: `${PRE_URL}/order_receive`, params }, { errorMessageMode: 'none' });
}
export function addContract(params) {
  return defHttp.post({ url: `${PRE_URL}/contract`, params }, { errorMessageMode: 'none' });
}
export function editContract(params) {
  return defHttp.put({ url: `${PRE_URL}/contract`, params }, { errorMessageMode: 'none' });
}
export function delContract(params) {
  return defHttp.delete({ url: `${PRE_URL}/contract`, params }, { errorMessageMode: 'none' });
}

export function getMerchantReceliveCity(params) {
  return defHttp.get({ url: `${PRE_URL}/recelive_city`, params }, { errorMessageMode: 'none' });
}
