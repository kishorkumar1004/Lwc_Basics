import { LightningElement,track,wire } from 'lwc';
import getRecords from '@salesforce/apex/DataTable.getRecords';
const columns =[
    {
        label: "Name",  fieldName: "Name", type:"url",  
        
    },
    {
        label: "Due Date", fieldName: "Due_Date__c", type:"date"
    },
    
    {
        label: "Status", fieldName: "Status__c", type:"text"
    },
    {
        label: "Total", fieldName: "Total__c", type:"number"
    },
    {
        label: "Invoice Date", fieldName: "Invoice_Date__c", type:"date"
    }
]
 
export default class DataTable extends LightningElement {
    @track InvdataArray = [];
  
    Searchkey;
    columns = columns;

   
handleSearch(event){
    this.Searchkey = event.detail.value;
    console.log(this.Searchkey);
}

@wire(getRecords,{Search :'$Searchkey'})

    WiredData({data,error}){
        if(data){
            this.InvdataArray = data;
        }
        else if(error){
            console.log(error);
        }
    }

    connectedCallback(){}


}   

