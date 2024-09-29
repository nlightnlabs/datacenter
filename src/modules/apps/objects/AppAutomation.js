import BaseObject from "../../../objects/BaseObject.js"

export default class AppAutomation extends BaseObject{
  
    constructor({id, name, label, icon})
    {
      this.name = name.toLowerCase().replaceAll(" ","_");
      this.label = label || name
      this.icon = icon || "";
      this.rules=[]
      };

    info() {
      let properties = []
      Object.entries(this).forEach(([key,value])=>{
        properties.push({[key]:value})
      })
      console.log(properties);
      return properties; 
    }

    addAction(name, field, condition, conditionValue, action ){
      this.rules.push({name, field, condition, conditionValue, action })
    }
    
  }