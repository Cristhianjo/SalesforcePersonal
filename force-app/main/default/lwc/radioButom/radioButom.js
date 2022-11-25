import { LightningElement, wire, track} from 'lwc';

export default class RadioButom extends LightningElement {

    value = '';
    @track selectedValue;

    get options() {
        return [
            { label: 'hola', type: 'button'   },
            { label: '1', value: 'option1' },
            { label: '2', value: 'option2' },
            { label: '3', value: 'option3' },
            { label: '4', value: 'option4' },
            { label: '5', value: 'option5' },
            { label: 'fin', type: 'button' },
            
        ];
    }
    // handle the selected value
    handleSelected(event) {
        window.console.log('selected value ===> '+event.target.value);
        this.selectedValue = event.target.value;
    }
}