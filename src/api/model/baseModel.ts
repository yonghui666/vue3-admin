export interface BasicPageParams {
  page_no: number;
  page_size: number;
}

export interface BasicFetchResult<T> {
  list: T[];
  total_count: number;
}
