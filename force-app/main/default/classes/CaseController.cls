public with sharing class CaseController {

    @AuraEnabled(cacheable=true)
    public static List<Case> getCases(){
        try {
            return [SELECT Id, CaseNumber, Priority, Subject, Status from Case];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}