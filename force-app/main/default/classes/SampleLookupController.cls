public with sharing class SampleLookupController {
    public String contactId {get; set;}
    public Contact caseObj {get; set;}
    public SampleLookupController(ApexPages.StandardController controller) {
        caseObj = new Contact();
    }
    private static List<CustomData> getContacts(String searchString){

        String sQuery ='%' + searchString + '%';
        List<Contact> contacts = [SELECT ID, Name, LastName, Account.Name FROM Contact WHERE Name LIKE :sQuery LIMIT 10];
        List<CustomData> returnData = new List<CustomData>();
        for (Contact contact : contacts) {
            returnData.add(new CustomData(contact.Id, contact.Name, contact.Account.Name));
        }
    
        return returnData;
    }

    @AuraEnabled(Cacheable=true)
    public static List<CustomData> getLookupData(String searchString, String lookupFieldApiName){
    if ( lookupFieldApiName.equalsIgnoreCase('Contact') ) {
        return getContacts(searchString);
    }
    return null;
}




// Wrapper class to store the data of matching records for lookup field.
    public class CustomData {
        public String Name;
        public String Id;
        public String Subtitle;

        public CustomData(Id Id, String Name, String Subtitle){
            this.Name = Name;
            this.Id = Id;
            this.Subtitle = Subtitle;
        }
    }

}