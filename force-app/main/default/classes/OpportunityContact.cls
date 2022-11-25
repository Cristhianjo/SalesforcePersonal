public with sharing class OpportunityContact {
    @AuraEnabled(cacheable=true)
    public static List<Opportunity_Contact_Role__c> getAccountList() {
        return [Select Name, Contact_Role__c from Opportunity_Contact_Role__c];
    }
}