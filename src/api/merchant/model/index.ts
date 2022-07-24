import { BasicFetchResult, BasicPageParams } from '../../model/baseModel';
import { ISeaForm } from '/@/views/merchant/base/types';

export type MerchantListParams = ISeaForm & BasicPageParams;

interface ListItem {
  dateRange: string[];
  merchant_id: string;
  merchant_name: string;
  cooperation_type: number;
  city: number[];
  create_by_user: string;
  delegate_user_id: number;
  status: number;
}

export type MerchantListRes = BasicFetchResult<ListItem>;
