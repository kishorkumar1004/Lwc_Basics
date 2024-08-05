import { LightningElement, track } from 'lwc';
import getCountRecords from '@salesforce/apex/DataTable.countRecords';
import getRecords from '@salesforce/apex/DataTable.fetchRecords';
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

export default class Pagination extends LightningElement {
    currentPage =1;
    recordsPerPage =10;
    totalRecords ;
    columns =columns; 
    @track InvdataArray = [];

    //calculate the totalpages using get method
    get TotalPages(){
        return Math.ceil(this.totalRecords/this.recordsPerPage);
    }
    
    fetchData(){
        //current page is 1  -1 * 10 = 0
        //current page is 2  -1 * 10 = -10
        //current page is 3  -1 * 10 = -20
        //current page is 4  -1 * 10 = -30
        //current page is 5  -1 * 10 = -40
        const Offset = (this.currentPage -1)*(this.recordsPerPage);
        getRecords({offset:Offset}).then(result=>{
            this.InvdataArray = result;
            
        }).catch(error=>{
            console.log(error);
        })


    }
    fetchTotalRecords(){
        getCountRecords()
        .then(result =>{
            this.totalRecords = result;
        })
    }
    
    connectedCallback(){
        this.fetchTotalRecords();
        this.fetchData();

    }
    handleNext(){
        if(this.currentPage < this.TotalPages){
            console.log('currentpage'+this.currentPage)
            this.currentPage ++;
            this.fetchData();
            
        }
    }
    handlePrev(){
        if(this.currentPage >1){
            this.currentPage --;
            this.fetchData();
        }
    }

}