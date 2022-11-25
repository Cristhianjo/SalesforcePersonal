import { LightningElement, track, api } from 'lwc';

export default class Dispositivo extends LightningElement {
    @track dato1 = "Cristhian";
    @track dato2 = true;
    @track dato3 = "Hola3";
    @track dato4 = "Hola4";
    @track dato5 = "Hola5";

    @api recordId; 

    connectedCallback() {
        console.log('connecte colback');
        this.recodiIdView();
    }

    disconnectedCallback() {
        window.removeEventListener('message', this.messageHandler);
    }

    recodiIdView(){
        console.log('ID '+ this.recordId);
    }



}