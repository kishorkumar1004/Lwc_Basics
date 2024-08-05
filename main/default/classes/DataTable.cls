public with sharing class DataTable {

    @AuraEnabled(cacheable=true)   
    public static List<Invoice__c> getRecords(String Search)  {
        
        List<Invoice__c> invoiceList = [Select Name,Status__c,Total__c,Invoice_Date__c, Due_Date__c FROM Invoice__c Where Status__c LIKE :(Search +'%') Limit 50];
        return invoiceList;
    }
     
    @AuraEnabled(cacheable=true)
    public static Integer  countRecords(){
        //List<Invoice__c> invoiceList =[Select Name,Status__c,Total__c,Invoice_Date__c, Due_Date__c FROM Invoice__c ];
        return [Select count() FROM Invoice__c];
    }
    @AuraEnabled(cacheable=true)
    public static List<Invoice__c> fetchRecords(Integer offset){
        return [Select Name,Status__c,Total__c,Invoice_Date__c, Due_Date__c FROM Invoice__c Limit 10 OFFSET:offset];
    }
    }
