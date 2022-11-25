import { LightningElement } from "lwc";

import customPicklist from "./customPicklist.html";

export default class MyCustomTypeDatatable extends LightningElement {
  static customTypes = {
    priorityPicklist: {
      template: customPicklist,
      standardCellLayout: true,
      typeAttributes: ["options"],
    },
  };

  connectedCallback() {
    console.log("Entro");
  }
}