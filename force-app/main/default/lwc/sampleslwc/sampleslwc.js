import { LightningElement, wire } from "lwc";
import { CurrentPageReference } from "lightning/navigation";

export default class SampleLWC extends LightningElement {
  strInput;

  @wire(CurrentPageReference)
  currentPageReference;

  connectedCallback() {
    console.log(
      "c__strInput Param value is " +
        this.currentPageReference.state.c__strInput
    );
    this.strInput = this.currentPageReference.state.c__strInput;
  }
}