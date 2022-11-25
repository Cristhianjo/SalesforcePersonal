import { LightningElement, track } from 'lwc';

import getContact from '@salesforce/apex/ContactController.getContact'


export default class Tablecustom extends LightningElement {

    columns = columns;
    @track data;

    connectedCallback() {
        console.log('connecte colback');
        this.findContractResult();
    }

    disconnectedCallback() {
        window.removeEventListener('message', this.messageHandler);
    }

    findContractResult(){
        console.log('FINCONTRATRC');
        getContact({}).then(data => {
            this.data = data;
            console.log('data '+ this.data);
        }).catch(error => {

            console.log(error);
        })
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        console.log('entro handle');
        console.log('row '+JSON.stringify(row));
        console.log('actionName '+ actionName);
        switch (actionName) {
            case 'select':
                //this.postRowDetails(row);
                console.log('row '+row.id);
                break;
            default:
        }
    }

}

const columns = [
    {type: "button", typeAttributes: {  
        label: 'Select',  
        name: 'select',  
        title: 'select',  
        variant: 'brand'
    }}, 
    { label: 'Id', fieldName: 'id', type: 'text' },
    { label: 'Name', fieldName: 'name', type: 'text' },
    { label: 'Email', fieldName: 'email', type: 'text' }
];