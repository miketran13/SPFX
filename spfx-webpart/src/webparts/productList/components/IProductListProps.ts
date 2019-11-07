import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ISPLists, IProduct } from '../ProductListWebPart';
export interface IProductListProps {
  description: string;
  test: string;
    test1: boolean;
    test2: string;
    isDataLoaded: boolean;
    webTitle: string;
    listItems: IProduct[];
}
