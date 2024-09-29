export default class CardItem {

    constructor({field_name, data_type, section, order}) {
      this.field_name = field_name
      this.data_type = data_type || "text"
      this.section = section || "body"
      this.order = order || null
    }

    info() {
      let properties = []
      Object.entries(this).forEach(([key,value])=>{
        properties.push({[key]:value})
      })
      console.log(properties);
      return properties; 
    }

  }