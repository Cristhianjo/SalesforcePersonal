import { LightningElement, track } from 'lwc';

export default class Productscomponents extends LightningElement {
    @track columns = defaultColumns;

    
}

const defaultColumns = [
    {
        
        label: 'Categoty',
        fieldName: '',
        type: 'text',
        sortable: true
    },
    {
        label: 'Sub Category',
        fieldName: '',
        type: 'text',
        sortable: true
    },
    {
        label: 'Type',
        fieldName: '',
        type: 'text',
        sortable: true
    },
    {
        label: 'Primary',
        fieldName: '',
        type: 'text',
        sortable: true
    },
    {
        label: 'Secondary',
        fieldName: '',
        type: 'text',
        sortable: true
    },
    {
        label: 'Species',
        fieldName: '',
        type: 'text',
        sortable: true
    }
];