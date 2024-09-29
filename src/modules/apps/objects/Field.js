import * as nlightnApi from '../../../apis/nlightn.js'
import BaseObject from "../../../objects/BaseObject.js"

export default class Field extends BaseObject {
    
    constructor({app, name, label, singular_label, icon, type, required, visible, enabled, 
      database_name, calculated, formula, choice_list, api_endpoint, api_method, 
      reference_app, reference_app_conditional_lookup_field, reference_app_conditional_field, reference_app_conditional_field_value,
      api_content_type, api_auth_token, api_body, api_params})
    {
      super(name);
      this.app = app;
      this.name = name.toLowerCase().replaceAll(" ","_");
      this.label = label || name.toLowerCase().replaceAll(" ","_");
      this.singular_label = singular_label || "";
      this.icon = icon || "";
      this.type = type || "";
      this.type = required || false;
      this.visible = visible || true;
      this.enabled = enabled || true;
      this.database_name = database_name || name.toLowerCase().replaceAll(" ","_");
      this.calulated = calculated || true;
      this.formula = formula || "";
      this.choice_list = choice_list || [];
      this.reference_app = reference_app || null;
      this.reference_app_conditional_lookup_field = reference_app_conditional_lookup_field || null;
      this.reference_app_conditional_field = reference_app_conditional_field || null;
      this.reference_app_conditional_field_value = reference_app_conditional_field_value || null;
      
      this.api = {
        endpoint: api_endpoint || "",
        method: api_method || "POST",
        content_type: api_content_type || "application/json",
        authtoken: api_auth_token || "",
        body: api_body || null,
        params: api_params || null, // URL parameters
        timeout: 10000 // Request timeout in milliseconds
      };
      
      this.types = [
        {name: "text", label:"Text", icon: ""},
        {name: "note", label:"Note", icon: ""},
        {name: "number", label:"Number", icon: ""},
        {name: "date", label:"Date", icon: ""},
        {name: "datetime", label:"DateTime", icon: ""},
        {name: "email", label:"Email", icon: ""},
        {name: "phone", label:"Phone", icon: ""},
        {name: "document", label:"Document", icon: ""},
        {name: "image", label:"Image", icon: ""},
        {name: "audio", label:"Audio", icon: ""},
        {name: "video", label:"Video", icon: ""},
        {name: "stage", label:"Stage", icon: ""},
        {name: "choice_list", label:"Choice List", icon: ""},
        {name: "reference_records", label:"Reference Records", icon: ""},
        {name: "reference_record", label:"Reference Record", icon: ""},
        {name: "reference_list", label:"Reference List", icon: ""},
        {name: "reference_value", label:"Reference Value", icon: ""},
        {name: "api", label:"Api", icon: ""},
      ];
      this.apiMethods = ["GET","POST","PUT"]
    
    }

    info() {
      let properties = []
      Object.entries(this).forEach(([key,value])=>{
        properties.push({[key]:value})
      })
      console.log(properties);
      return properties; 
    }
    
    calculate(){
        if(this.calulated && this.formula !=null){
            try{
                const result = eval(this.formula)
                console.log(result)
                return(result)
            }catch(error){
                console.log("Calculuation Error")
            }
        }
    }

    async getReferenceRecords(){
      let tableName = this.reference_app
      let conditionalField = this.reference_app_conditional_field
      let condition = this.reference_app_conditional_field_value
      
      if(this.type.name === "reference_records"){
        try{
          const response = await nlightnApi.getRecords(tableName, conditionalField, condition)
          return response.data
        }catch(error){
          console.log(error,`Error getting reference records for ${this.field_name}`)
        }
      }
        
    }

    async getReferenceRecord(){
      let tableName = this.reference_app
      let conditionalField = this.reference_app_conditional_field
      let condition = this.reference_app_conditional_field_value
     
      try{
          if(this.type.name === "reference_records"){
          const response = await nlightnApi.getRecord(tableName, conditionalField, condition)
          return response.data
        }
      }catch(error){
        console.log(error,`Error getting reference records for ${this.field_name}`)
      }

    }


    async getReferenceList(){
      let tableName = this.reference_app
      let fieldName = this.reference_app_conditional_lookup_field
      let conditionalField = this.reference_app_conditional_field_value
      let condition = this.reference_app_conditional_field_value
      
      try{
        if(this.type.name === "reference_list"){
          const response = await nlightnApi.getConditionalList(tableName,fieldName,conditionalField, condition)
          const data = response.data
          return data
        }
      }catch(error){
        console.log(error,`Error getting reference records for ${this.field_name}`)
      }
    }

 
    async getReferenceValue(){
      let tableName = this.reference_app
      let lookupField = this.reference_app_conditional_lookup_field
      let conditionalField = this.reference_app_conditional_field_value
      let conditionalValue = this.reference_app_conditional_field_value
      
      try{
        if(this.type.name === "reference_value"){  
          const response = await nlightnApi.getValue(tableName,lookupField, conditionalField,conditionalValue)
          const data = response.data
          return data
        }
      }catch(error){
        console.log(error,`Error getting reference records for ${this.field_name}`)
      }
    }

   
    fetchData(){
      if(this.type ==="api"){
        if(this.api_endpoint.includes("http") || this.api_endpoint.includes("https") && 
            (this.api.body.query !=null || this.api.params != null)
        ){
            try{
              const data = fetch(this.api_endpoint, {
                method: this.api.method,
                headers: {
                  "Content-Type":this.api.content_type,
                  "Authorization": `Bearer ${this.authtoken}`,
                },
                body: JSON.stringify(this.api.body),
                params: new URLSearchParams(this.api.params), // Convert params to URL search params
                timeout: this.api.timeout
              })
                .then(response => response.json())
                .then(data => console.log(data))
                .catch(error => console.error('Error:', error));
                console.log(data)
                return data;
            }catch(error){
              console.log(error)
              return ""
            }
        }
      }
    }
  }