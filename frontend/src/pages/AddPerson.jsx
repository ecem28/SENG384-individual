import { useState } from "react"

function AddPerson() {

const [name,setName] = useState("")
const [email,setEmail] = useState("")

const addPerson = async () => {

await fetch("http://localhost:5000/api/people",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
full_name:name,
email:email
})
})

alert("Person added")

}

return (

<div style={{padding:"40px"}}>

<h1>Add Person</h1>

<input
placeholder="Full Name"
onChange={(e)=>setName(e.target.value)}
/>

<br/><br/>

<input
placeholder="Email"
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<button onClick={addPerson}>
Add Person
</button>

</div>

)

}

export default AddPerson