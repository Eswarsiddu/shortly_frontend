export interface urlInterface {
  currentUrlIndex: number;
  getUrlsData: (pageNo: number) => any;
  selectUrl: (index: number) => any;
  searchUrls: (search: string) => any;
  urlsData: any;
  currentUrl: any;
  hasMore: boolean;
  loading: boolean;
  // getCurrentUrl: () => any;
}
