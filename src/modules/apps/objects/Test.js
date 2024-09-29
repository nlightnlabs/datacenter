import React from 'react'
import Applet from './Applet.js'
import Field from './Field.js'
const app1 = new Applet({name:"test app"})
const field1 = new Field({name:"Test Field",type:"text"})
const field2 = new Field({name:"Example",type:"number"})



const Test = () => {

  return (
    <div>
        {}
    </div>
  )
}

export default Test