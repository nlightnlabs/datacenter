import Field from './Field.js'
import AppAutomation from './AppAutomation.js'
import BaseObject from "../../../objects/BaseObject.js"

export default class Applet extends BaseObject {

    constructor({name, label, icon, color}) {
      super(name);
      this.name = name.toLowerCase().replaceAll(" ","_");
      this.label = label || name;
      this.icon = icon || "";
      this.color = color || "";
      this.fields = [];
      this.card = [];
      this.automations =[];
      this.line_items =[];
    }

    info() {
      let properties = []
      Object.entries(this).forEach(([key,value])=>{
        properties.push({[key]:value})
      })
      console.log(properties);
      return properties; // Optionally return the properties array
    }

    listFields(){
      let fields = []
      Object.entries(this.fields.forEach(([key,value])=>{
        fields.push({[key]:value})
      }))
      console.log(fields)
      return(fields)
    }

    addField(field_name, type) {
      const field = new Field({name: field_name, type: type})
      this.fields.push(field)
    }

    deleteField(field_name){
      this.fields = this.fields.filter(obj=>obj.name !=field_name)
    }

    editField(field_name, updates){
      let field = this.fields.find(obj=>obj.name===field_name)
      Object.entries(updates).forEach(([key,value])=>{
        field[key] = value
      })
    }

    addAutomation(automation_name){
      const automation = new AppAutomation(automation_name)
      this.automations.push(automation)
    }

    deleteAutomation(automation_name){
      this.fields = this.fields.filter(obj=>obj.name !=automation_name)
    }

    editAutomation(fieldName, updates){
      let field = this.fields.find(obj=>obj.name===fieldName)
      Object.entries(updates).forEach(([key,value])=>{
        field[key] = value
      })
    }

    runAutomation(automation_name){

    }

  }
  