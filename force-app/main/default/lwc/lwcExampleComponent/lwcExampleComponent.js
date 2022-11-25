import { LightningElement } from 'lwc';

export default class LwcExampleComponent extends LightningElement {
    accountId;

    handleSelectedLookup(event) {
        this.accountId = event.detail;
    }
}