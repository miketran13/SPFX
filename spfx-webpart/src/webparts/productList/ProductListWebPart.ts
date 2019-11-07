import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
    PropertyPaneCheckbox,
  PropertyPaneDropdown,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';
import MockHttpClient from './MockHttpClient';
import * as strings from 'HelloWorldWebPartStrings';
import HelloWorld from './components/ProductList';
import { IProductListProps } from './components/IProductListProps';
import {
  SPHttpClient,
  SPHttpClientResponse,
  AadHttpClient,
  HttpClientResponse
} from '@microsoft/sp-http';

export interface IProductListWebPartProps {
  description: string;
  test: string;
    test1: boolean;
    test2: string;
    test3: boolean;
    isDataLoaded: boolean;
}

export interface IProduct {
  productID: number;
  productNumber: string;
  safetyStockLevel: number;
  name: string;
  modifiedDate: Date;
  listPrice: number;
  color: string;
}
export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}
export default class ProductListWebPart extends BaseClientSideWebPart<IProductListWebPartProps> {

  private _renderListAsync(client: AadHttpClient): void {
    // Local environment
    if (Environment.type === EnvironmentType.Local) {
      let products:  IProduct[] = [];
     // this._getMockListData().then((response) => {
        this._renderList(products);
     // });
    }
    else if (Environment.type == EnvironmentType.SharePoint ||
              Environment.type == EnvironmentType.ClassicSharePoint) {
      this._getListData(client)
        .then((response) => {
          this._renderList(response);
        });
    }
  }

  public _renderList(listItems: IProduct[]): void {
    this.properties.isDataLoaded = true;
    const element: React.ReactElement<IProductListProps > = React.createElement(
      HelloWorld,
      {
        description: this.properties.description,
        test: this.properties.test,
        test1: this.properties.test1,
        test2: this.properties.test2,
        isDataLoaded: this.properties.isDataLoaded,
        webTitle: this.context.pageContext.web.title,
        listItems: listItems
      }
    );
   console.log(listItems);
    ReactDom.render(element, this.domElement);
  }

  public render(): void {
    this.properties.isDataLoaded = false;
    console.log("starting...");
    this.context.aadHttpClientFactory.getClient('3d76db04-29ab-4efb-a0ba-a5fad664c7e9')
    .then((client: AadHttpClient) => {
      console.log("finished get token...");
      this._renderListAsync(client);
      return 
    })    
    .then(data => {
      console.log(data);
    })
    .catch(console.log);

   
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  private _getMockListData(): Promise<ISPLists> {
    return MockHttpClient.get()
      .then((data: ISPList[]) => {
        var listData: ISPLists = { value: data };
        return listData;
      }) as Promise<ISPLists>;
  }

  private _getListData(client: AadHttpClient): Promise<IProduct[]> {
   /*  return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      }); */
     return client.get('https://localhost:44312/api/clients', AadHttpClient.configurations.v1)
     .then((res: HttpClientResponse): Promise<any> => {
      console.log("finished1...");
      return res.json();
    });
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('test', {
                  label: 'Multi-line Text Field',
                  multiline: true
                }),
                PropertyPaneCheckbox('test1', {
                  text: 'Checkbox'
                }),
                PropertyPaneDropdown('test2', {
                  label: 'Dropdown',
                  options: [
                    { key: '1', text: 'One' },
                    { key: '2', text: 'Two' },
                    { key: '3', text: 'Three' },
                    { key: '4', text: 'Four' }
                  ]}),
                PropertyPaneToggle('test3', {
                  label: 'Toggle',
                  onText: 'On',
                  offText: 'Off'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
