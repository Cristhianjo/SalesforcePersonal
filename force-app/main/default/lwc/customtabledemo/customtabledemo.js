import { LightningElement, track } from 'lwc';

export default class Customtabledemo extends LightningElement {
    @track columns = defaultColumns; 
    @track data;
    //sample data
    data = [
        { 'Id': '12345', 'Name': 'Acme', 'AccountNumber': 12345, 'Rating': 'Hot' },
         { 'Id': '34567', 'Name': 'Mace', 'AccountNumber': 34567, 'Rating': 'Cold' }
        ];
}

const defaultColumns = [
    { label: 'Record Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name' },
    { label: 'Account Number', fieldName: 'AccountNumber', type: 'number' },
    {
        label: 'Rating', fieldName: 'Rating', type: 'picklist', typeAttributes: {
            placeholder: 'Choose rating', options: [
                { label: 'Hot', value: 'Hot' },
                { label: 'Warm', value: 'Warm' },
                { label: 'Cold', value: 'Cold' },
            ] // list of all picklist options
            , value: { fieldName: 'Rating' } // default value for picklist
            , context: { fieldName: 'Id' } // binding account Id with context variable to be returned back
        }
    }
];