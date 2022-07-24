/*
 * @Author: yonghui666
 * @Date: 2022-06-08 16:13:32
 * @LastEditTime: 2022-06-08 17:03:43
 * @LastEditors: yonghui666
 * @Description: 商家账户
 */
import { defHttp } from '/@/utils/http/axios';

const PRE_URL = '/merchantAccount';

const PRE_BILL_URL = '/merchantBill';

export async function apiGetMerchantAccountList(
  params: any,
): Promise<{ list: any[]; page_size: number; page_no: number; total_count: number }> {
  console.log('RRRRRRRRRRRRRRRRRRRRRRRRR', params);

  return defHttp.get<any>({ url: `${PRE_URL}`, params }, { errorMessageMode: 'none' });
}

export async function apiGetMerchantBillList(
  params: any,
): Promise<{ list: any[]; page_size: number; page_no: number; total_count: number }> {
  return defHttp.get<any>({ url: `${PRE_BILL_URL}`, params }, { errorMessageMode: 'none' });
}

export async function apiGetBillConsumeList(
  params: any,
): Promise<{ list: any[]; page_size: number; page_no: number; total_count: number }> {
  console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC', params);
  return defHttp.get<any>({ url: `${PRE_BILL_URL}`, params }, { errorMessageMode: 'none' });
}

export function editBillRechargeInfo(params) {
  return defHttp.post({ url: `${PRE_BILL_URL}`, params }, { errorMessageMode: 'none' });
}

export function getMerchantAccountInfo(params) {
  return defHttp.get({ url: `${PRE_URL}/account_info`, params }, { errorMessageMode: 'none' });
}
export function getBillRechargeInfo(params) {
  return defHttp.get(
    { url: `${PRE_BILL_URL}/billRecharge/info`, params },
    { errorMessageMode: 'none' },
  );
}

export function editMerchantAccountInfo(params) {
  return defHttp.put({ url: `${PRE_URL}`, params }, { errorMessageMode: 'none' });
}

export function getMerchantAccountInfo1(params) {
  return defHttp.get(
    { url: `${PRE_URL}/info/${params.merchant_id}`, params },
    { errorMessageMode: 'none' },
  );
}

export async function getBillRechargeList(
  params: any,
): Promise<{ list: any[]; page_size: number; page_no: number; total_count: number }> {
  console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC', params);
  return defHttp.get<any>(
    { url: `${PRE_BILL_URL}/billRecharge`, params },
    { errorMessageMode: 'none' },
  );
}
