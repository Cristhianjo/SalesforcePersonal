import { LightningElement, track, api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import csvFileRead from '@salesforce/apex/CSVFileReadLWCCntrl.csvFileRead';

const columnsAccount = [
    { label: 'Name', fieldName: 'Name' }, 
    { label: 'AccountNumber', fieldName: 'AccountNumber' },

];

export default class UploadCsv extends LightningElement {
    activeTab = '1';
    @api recordId;
    //@track id = recordId;
    @track error;
    @track columnsAccount = columnsAccount;
    @track data;

    handleActive(event) {
        this.activeTab = event.target.value;
    }

    // accepted parameters
    get acceptedCSVFormats() {
        return ['.csv'];
    }
    
    uploadFileHandler(event) {
        // Get the list of records from the uploaded files
        const uploadedFiles = event.detail.files;

        //console.log('id '+ this.id);
        // calling apex class csvFileread method
        csvFileRead({contentDocumentId : uploadedFiles[0].documentId})
        .then(result => {
            window.console.log('result ===> '+JSON.stringify(result));
            this.data = result;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success!!',
                    message: 'Accounts are created according to the CSV file upload!!!',
                    variant: 'Success',
                }),
            );
        })
        .catch(error => {
            this.error = error;
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error!!',
                    message: JSON.stringify(error),
                    variant: 'error',
                }),
            );     
        })

    }
    
}