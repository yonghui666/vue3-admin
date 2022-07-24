export interface UploadApiResult {
  message: string;
  code: number;
  url: string;
  result: {
    name: string;
    url: string;
    host: string;
  };
}
