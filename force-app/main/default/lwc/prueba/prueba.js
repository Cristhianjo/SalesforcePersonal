import { LightningElement, api,track, wire} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

import getUserRoles from '@salesforce/apex/GetDriverData.getUserRoles';

// const fields = [
//     'Contact.Name',
//     'Contact.Title',
//     'Contact.Phone',
//     'Contact.Email',
//     'Contact.Department',
// ];
let i=0;
export default class Prueba extends LightningElement {

    @api recordId;
    @track contactRec;
    // by providing field in argument. Uncomment this and comment layout type code to check functionality
    // @wire(getRecord, {
    //     recordId: '$recordId',
    //     fields
    // })
    //By providing layout type in argument
    @wire(getRecord, {
        recordId: '$recordId',
        layoutTypes: ['Full']
    })
        contactRec;


        areDetailsVisible = false;

        @track stringTemplate = '';
        @track contador = 1;
        @track showText = false;

        showHandler() {
            stringTemplate = this.template.getElementById('prueba');
            console.log('prueba '+this.stringTemplate);
        }

        @track componete = '<h1>Hola</h1>';
        @track contador = 0;
        
        @track listNew = [];
        @track reasonPriceChange = '';

        @track goal;


        @api currentVal;

        @track goalDescription = '';
        @track goalDate = '';
        @track goalPriority = '';
        @track goalResponsible = '';

        @track description = 'Hola';

        descriptionGoal(event){
            this.goalDescription = event.target.value;

        }

        deleteInput() {
            this.listGoal.splice(-1)
        }
        
        dateGoal(event){
            this.goalDate = event.target.value;

        }

        priorityGoal(event){
            this.goalPriority = event.target.value;
        }

        responsibleGoal(event){
            this.goalResponsible = event.target.value;
        }

        @api
        returnGoal(){
            this.goal = {
                actionItem: this.goalDescription,
                goalDate: this.goalDate,
                priotityGoal: this.goalPriority,
                responsible: this.goalResponsible
            };
            return this.goal;
        }
    
        handleReasonPriceChange(event){
            var hoy = new Date();
            let name = event.target.name;
            if( name === 'newGoal' ) {
            this.reasonPriceChange = event.detail.value;
            }
            console.log('text :' + this.reasonPriceChange);

            let reviewGoal = [
                {
                    name: name,
                    actionImet: this.reasonPriceChange,
                    date: hoy.getDate() +'-'+ hoy.getMonth()+ '-' +hoy.getFullYear(),
                    priority: 'Low'
                }
            ]
            
            console.log('Objetos :' + JSON.stringify(reviewGoal))
        }

        value = 'inProgress';

    get options() {
        return [
            { label: 'Low', value: 'Low' },
            { label: 'Medium', value: 'Medium' },
            { label: 'High', value: 'High' },
            { label: 'Urgent', value: 'Urgent' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }





        add_fields() {
            console.log('entro add fueld');
            var x = document.getElementById("content");
            x.querySelector(".slds-form-element__control").innerHTML = "Hello World!";
        }
        //Default to false
    displayDetails = false;

    handleClick() {
        //Toggle display details attribute
        console.log('Hola');
        this.displayDetails = true;
    }

    handleChange(event) {
        this.areDetailsVisible = event.target.checked;
    }


        @track items = []; //this will hold key, value pair
        @track value = ''; //initialize combo box value

    
        @track chosenValue = '';
    
        @wire(getUserRoles)
        wiredUserRoles({ error, data }) {
            if (data) {
    
                //create array with elements which has been retrieved controller
                //here value will be Id and label of combobox will be Name
                for(i=0; i<data.length; i++)  {
                    this.items = [...this.items ,{value: data[i].Id , label: data[i].Name} ];                                   
                }                
                this.error = undefined;
            } else if (error) {
                this.error = error;
                this.contacts = undefined;
            }
        }
    
        //gettter to return items which is mapped with options attribute
        get roleOptions() {
            return this.items;
        }
    
        handleChange(event) {
            // Get the string of the "value" attribute on the selected option
            const selectedOption = event.detail.value;
            console.log('selected value=' + selectedOption);
            this.chosenValue = selectedOption;
        }
    
        //this value will be shown as selected value of combobox item
        get selectedValue(){
            return this.chosenValue;
        }


}