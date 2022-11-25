import { LightningElement, track } from 'lwc';

export default class Certificatescopecomponents extends LightningElement {

    @track areDetailsVisible = false;

    handleClick(){
        this.areDetailsVisible = true;
    }
}