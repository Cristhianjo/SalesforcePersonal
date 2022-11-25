import { LightningElement, track, wire, api } from 'lwc';


import pickListValueDynamically from "@salesforce/apex/LwcLookupController.pickListValueDynamically"

import findRecords from "@salesforce/apex/LwcLookupController.findRecordsProjects";

export default class Auditscomponents extends LightningElement {

    @track picklistVal;
 
    @wire(pickListValueDynamically, {customObjInfo: {'sobjectType' : 'MPM4_BASE__Milestone1_Task__c'},
    selectPicklistApi: 'Audit_Type__c'}) selectTargetValues;
        
      selectOptionChanveValue(event){       
           this.picklistVal = event.target.value;
       }  

    @track recordsList;
    @track searchKey = "";
    @track selectedValue;
    @track selectedRecordId;
    @track objectApiName = "Account";
    @track iconName = "standard:product_item";
    @track lookupLabel;
    @track message;
    @track areDetailsVisible = false;


    onLeave(event) {
        setTimeout(() => {
            this.searchKey = "";
            this.recordsList = null;
        }, 300);
    }

    handleClick(){

    }

    onRecordSelection(event) {
        this.selectedRecordId = event.target.dataset.key;
        this.selectedValue = event.target.dataset.name;
        this.searchKey = "";
        this.areDetailsVisible = true;
        this.onSeletedRecordUpdate();
    }

    handleKeyChange(event) {
        const searchKey = event.target.value;
        this.searchKey = searchKey;
        this.getLookupResult();
    }

    removeRecordOnLookup(event) {
        this.searchKey = "";
        this.selectedValue = null;
        this.selectedRecordId = null;
        this.recordsList = null;
        this.onSeletedRecordUpdate();
    }
    getLookupResult() {
        findRecords({ searchKey: this.searchKey, objectName: this.objectApiName })
            .then((result) => {
                if (result.length === 0) {
                    this.recordsList = [];
                    this.message = "No Records Found";
                } else {
                    this.recordsList = result;
                    this.message = "";
                }
                this.error = undefined;
            })
            .catch((error) => {
                this.error = error;
                this.recordsList = undefined;
            });
    }

    onSeletedRecordUpdate() {
        const passEventr = new CustomEvent('recordselection', {
            detail: { selectedRecordId: this.selectedRecordId, selectedValue: this.selectedValue }
        });
        this.dispatchEvent(passEventr);
    }

    @track projectTasks = [ ];

    searchProjectTaskCallback(result) {
        let apexTask = result;
        let projectTask = {
            auditDate: apexTask.auditDate,
            auditType: apexTask.auditType,
            projectId: apexTask.projectId,
            projectName: apexTask.projectName,
            isChanged: false,
            projectTaskId: apexTask.Id,
            auditDateInputId: 'auditDateInput-' + apexTask.Id,
            auditTypeInputId: 'auditTypeInput-' + apexTask.Id
        }
        this.projectTasks.pop();
        this.projectTasks.push(projectTask);
        this.projectTasks.push({
            auditDate: null,
            auditType: null,
            projectName: ''
        });
    }

    loadProjectTasksCallback(result) {
        let tasksFromApex = result;
        for( let i = 0; i < tasksFromApex.length; i++ ) {
            let projectTask = {
                auditDate: tasksFromApex[i].auditDate,
                auditType: tasksFromApex[i].auditType,
                projectId: tasksFromApex[i].projectId,
                projectName: tasksFromApex[i].projectName,
                isChanged: false,
                projectTaskId: tasksFromApex[i].Id,
                auditDateInputId: 'auditDateInput-' + tasksFromApex[i].Id,
                auditTypeInputId: 'auditTypeInput-' + tasksFromApex[i].Id
            }
            this.projectTasks.push(projectTask);
        }
        this.projectTasks.push({
            auditDate: null,
            auditType: null,
            projectName: ''  
        });
    }

    save() {
        let tasksToSave = [];
        for( let i = 0; i < this.projectTasks.length; i++ ) {
            if( this.projectTasks[i].projectTaskId && this.projectTasks[i].isChanged ) {
                tasksToSave.push(this.projectTasks[i]);
            }
        }

        sendToApex(tasksToSave);
    }

    saveCallback() {
        for( let i = 0; i < this.projectTasks.length; i++ ) {
            if( this.projectTasks[i].projectTaskId ) {
                this.projectTasks[i].isChanged = false;
            }
        }
    }

    onAuditDateOrAuditTypeChange(event) {
        this.changeDisplaySaveButton();
        let id = event.detail.id // <lighting-input id={task.auditDateInputId} />
        id = id.replace('auditDateInput-', '').replace('auditTypeInput-', '');
        for( let i = 0; i < this.projectTasks.length; i++ ) {
            if( this.projectTasks[i].projectTaskId === id ) {
                this.projectTasks[i].isChanged = true;
            }
        }
    }

    displaySaveButton() {
        if( !this.displaySaveButton ) {
            this.displaySaveButton = true;
        }
    }

}