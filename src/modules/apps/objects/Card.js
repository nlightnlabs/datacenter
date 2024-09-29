import BaseObject from "../../../objects/BaseObject.js"

export default class Card extends BaseObject{

    constructor({applet_name}) {
      this.applet = applet_name
      this.items = [];
      this.sections = ["Header", "Body","Footer"]
    }

    info() {
      let properties = []
      Object.entries(this).forEach(([key,value])=>{
        properties.push({[key]:value})
      })
      console.log(properties);
      return properties; 
    }

    addCardItem(card_item){
        this.items.push(card_item)
    }

    deleteCardItem(card_item){
      let current_items = this.items
      this.items = current_items.filter(obj=>obj.field_name != card_item.field_name)
    }

    editCardItem(updated_card_item){
      let current_items = this.items
      let item_to_update = current_items.find(obj=>obj.field_name===updated_card_item.field_name) || null
      Object.entries(updated_card_item).forEach(([key,value])=>{
        item_to_update[key] = value
      })
    }

  }