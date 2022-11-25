import { LightningElement, track, wire } from "lwc";

import getAccountList from "@salesforce/apex/OpportunityContact.getAccountList";

const COLS = [
  { label: "Name", type: "Text", fieldName: "Name" },
  {
    label: "Contact Role",
    type: "priorityPicklist",
    fieldName: "Contact_Role__c",
    wrapText: true,
    typeAttributes: {
      options: { fieldName: "Contact_Role__c" },
    },
  },
];

export default class MyDatatable extends LightningElement {
  columns = COLS;
  @track accounts = [];

  @wire(getAccountList)
  wiredAccounts({ error, data }) {
    if (error) {
      // Handle error
    } else if (data) {
      console.log("data ", JSON.stringify(data));
      // Process record data
      this.accounts = data.map((record) => {
        let Name = record.Name;
        let Contact_Role__c = record.Contact_Role__c;
        return { ...record, Name: Name, Contact_Role__c: Contact_Role__c };
      });
    }
  }
}