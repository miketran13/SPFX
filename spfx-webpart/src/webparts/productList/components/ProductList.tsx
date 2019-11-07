import * as React from 'react';
import styles from './ProductList.module.scss';
import { IProductListProps } from './IProductListProps';
import { escape } from '@microsoft/sp-lodash-subset';
import MockHttpClient from '../MockHttpClient';
import { ISPList, IProduct } from '../ProductListWebPart';
import { IColumn, buildColumns, SelectionMode, Toggle } from 'office-ui-fabric-react/lib/index';
import { ShimmeredDetailsList } from 'office-ui-fabric-react/lib/ShimmeredDetailsList';
import { Async } from 'office-ui-fabric-react/lib/Utilities';
export interface IProductListState {
  items: IProduct[]; // DetailsList `items` prop is required so it expects at least an empty array.
  columns?: IColumn[];
  isDataLoaded?: boolean;
}
export default class ProductList extends React.Component<IProductListProps, {}, IProductListState> {
  private _async: Async;
  

  public componentWillUnmount(): void {
    this._async.dispose();
  }
  public _buildColumns(): IColumn[] {
    
    const columns: IColumn[] = [
   
      {key: "name", name : "Name",fieldName:"name", "minWidth": 100},
      {key: "productID", name : "Product ID",fieldName:"productID", "minWidth": 50},
      {key: "productNumber", name : "Product Number",fieldName:"productNumber", "minWidth": 50},
    {key: "color", name : "Color", fieldName:"color", "minWidth": 50},
  
    {key: "listPrice", name : "List Price",fieldName:"listPrice", "minWidth": 50},
    {key: "modifiedDate", name : "Modified Date",fieldName:"modifiedDate", "minWidth": 100},
   
    {key: "safetyStockLevel", name : "Safety Stock Level",fieldName:"safetyStockLevel", "minWidth": 50}];
  
    return columns;
  }
  
  public render(): React.ReactElement<IProductListProps> {
    let columns = this._buildColumns();
   // const items: IProduct[] = [{color: "Black", name:"1", productID: 1, productNumber: "1", safetyStockLevel: 1, modifiedDate: Date.now, listPrice: 1}];
/*   this.props.listItems.value
    .forEach(item => items.push(
      <li className={styles.listItem}>
      <span className="ms-font-l">{item.Title}</span>
      <span className="ms-font-l">{item.Id}</span>
  </li>
                     )) */

    return (
      <div className={ styles.helloWorld }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Product List</span>              
            </div>
          </div>
          <ShimmeredDetailsList           
            items={this.props.listItems}
            columns={columns}
            selectionMode={SelectionMode.none}
            enableShimmer={!this.props.isDataLoaded}            
            listProps={{ renderedWindowsAhead: 0, renderedWindowsBehind: 0 }}
          />
        </div>
      </div>
    );
  }

 
}
