import { LightningElement, track } from 'lwc';

export default class Parent extends LightningElement {
    
    @track listGoal = [];

    addInput() {
        this.listGoal = [...this.listGoal, ''];
        refresh();
    }

    deleteInput() {
        this.listGoal.splice(-1)
    }

    saveGoal() {

        var dataChildren = this.template.querySelectorAll('c-prueba');
        console.log('..................');
        dataChildren.forEach(element => {
            console.log('element getObject: ' + element.returnGoal());
            console.log('description '+ element.returnGoal().actionItem);
            console.log('date '+ element.returnGoal().goalDate);
            console.log('prio '+ element.returnGoal().priotityGoal);
            console.log('resp '+ element.returnGoal().responsible);
        });
        console.log('..................');
    }
}