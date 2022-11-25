import { LightningElement, api, wire, track } from "lwc";
import getCases from "@salesforce/apex/CaseController.getCases";

import { getObjectInfo } from "lightning/uiObjectInfoApi";
import { getPicklistValues } from "lightning/uiObjectInfoApi";
import CASE_OBJECT from "@salesforce/schema/Case";
import PRIORITY_FIELD from "@salesforce/schema/Case.Priority";

import getAccountList from "@salesforce/apex/OpportunityContact.getAccountList";

const COLS = [
  { label: "Name", type: "Text", fieldName: "Name" },
  {
    label: "Priority",
    type: "priorityPicklist",
    fieldName: "Contact_Role__c",
    wrapText: true,
    typeAttributes: {
      options: { fieldName: "Contact_Role__c" },
      value: { fieldName: "Priority" },
      placeholder: "Choose Priority",
    },
  },
];

export default class CaseTableWithPicklist extends LightningElement {
  columns = COLS;
  cases = [];
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