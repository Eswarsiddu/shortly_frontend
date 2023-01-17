export interface urlInterface {
  currentUrlIndex: number;
  getUrlsData: (pageNo: number) => any;
  getUrl: (index: number) => any;
  searchUrls: (search: string) => any;
  urlsData: any;
}
