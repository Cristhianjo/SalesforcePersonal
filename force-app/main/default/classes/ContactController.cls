public with sharing class ContactController {
    
    @AuraEnabled(cacheable = true)
    public static List<Map<String, Object>> getContacts(){
     //return [
     //      SELECT FirstName, LastName, Email
     //       FROM Contact
     //       WITH SECURITY_ENFORCED
     //   ];


     throw new AuraHandledException('Forced error');
    }

    @AuraEnabled
    public static List<Map<String, Object>> getContact(){

        List<Contact> contactList = [SELECT id, Name, Email FROM Contact];
        List<Map<String, Object>> resultItems = new List<Map<String, Object>>();

        for(Contact listcontacts : contactList){
            resultItems.add(buildContractItem(listcontacts));
        }
        
        return resultItems;
    }

    private static Map<String, Object> buildContractItem(Contact contats){
        return new Map<String, Object> {
            'id' => contats.id,
            'name' => contats.Name,
            'email' => contats.Email
        };
    }



}