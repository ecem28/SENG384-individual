import { useState } from "react"

function AddPerson() {

const [name,setName] = useState("")
const [email,setEmail] = useState("")

const addPerson = async () => {

if(!name || !email){
alert("All fields are required")
return
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

if(!emailRegex.test(email)){
alert("Invalid email format")
return
}

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

setName("")
setEmail("")

}

return (

<div style={{padding:"40px"}}>

<h2>Add Person</h2>

<input
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<br/><br/>

<input
placeholder="Email"
value={email}
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