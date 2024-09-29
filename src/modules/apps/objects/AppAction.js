import BaseObject from "../../../objects/BaseObject.js"

export default class AppAutomation extends BaseObject {

    constructor({name, field, condition, conditionValue, action })
    {
      this.name = name.toLowerCase().replaceAll(" ","_");
      this.id = id;
      this.label = label || name.toLowerCase().replaceAll(" ","_");
      this.icon = icon || "";
      this.field = field || null;
      this.condition = condition || null;
      this.conditionValue = conditionValue || null;
      this.action = action || null;
      this.condition_options = [
        "equal to",
        "greater than",
        "greater than or equal to",
        "less than","less than or equal to",
        "not equal to"
        ]
      };

    info() {
      let properties = []
      Object.entries(this).forEach(([key,value])=>{
        properties.push({[key]:value})
      })
      console.log(properties);
      return properties; 
    }
    
  }