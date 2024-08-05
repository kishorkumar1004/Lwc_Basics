import { LightningElement, api, track, wire} from 'lwc';
import getRecords from '@salesforce/apex/GetContacts.getRecords';

export default class Child extends LightningElement {

    @api getfromparent;


    data=[];
    Lastname="";

      @track age = {kishor:'52',rikhitha:'85'};
      height = 168;
      
      handleChange(){
      this.age.kishor = 75;

      }

      handleClick(){
        this.height = 155;
      }

      handleLastname(event){
        this.Lastname =event.target.value;
      }
      @wire(getRecords,{LastName:'$Lastname'})
      //@wire(getRecords)
      wiredData({data,error}){
        console.log('inside WiredData');
        if(data){
            this.data = data;
            console.log('inside then Wiredata'+ JSON.stringify(data));
        }
        else if(error){
            console.log(error)
        }
      }
      connectedCallback(){
        console.log('inside connected callback');
        getRecords()
        .then(result =>{
            console.log('Inside  then Connected callback'+JSON.stringify(result));
        })
      }
        
      childClickHandle(){
        this.dispatchEvent(new CustomEvent('childevent',{
          detail:this.childinput
        }))
      
      

     
      }
}