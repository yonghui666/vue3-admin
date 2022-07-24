/*
 * @Author: yonghui666
 * @Date: 2022-06-08 16:13:32
 * @LastEditTime: 2022-06-08 17:03:43
 * @LastEditors: yonghui666
 * @Description: 商家账户
 */
import { defHttp } from '/@/utils/http/axios';

const PRE_URL = '/merchantOrder';

export function getMerchantOrderList(params: any) {
  console.log('paramsparamsparamsparamsparamsparams', params);

  return defHttp.get<any>({ url: `${PRE_URL}`, params }, { errorMessageMode: 'none' });
}

export function getOrderList(params: any) {
  console.log('paramsparamsparamsparamsparamsparams', params);

  return defHttp.get<any>({ url: `${PRE_URL}/order`, params }, { errorMessageMode: 'none' });
}

export function getOrderInfo(params) {
  return defHttp.get(
    { url: `${PRE_URL}/order/info/${params.order_id}` },
    { errorMessageMode: 'none' },
  );
}

export function editOrderInfo(params) {
  return defHttp.put({ url: `${PRE_URL}/order_info`, params }, { errorMessageMode: 'none' });
}

export function getMerchantOrderInfo(params) {
  return defHttp.get(
    { url: `${PRE_URL}/info/${params.merchant_id}` },
    { errorMessageMode: 'none' },
  );
}

export function editMerchantOrderInfo(params) {
  return defHttp.put(
    { url: `${PRE_URL}/merchant_order_info`, params },
    { errorMessageMode: 'none' },
  );
}
