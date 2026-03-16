import { useState, useEffect } from "react"

function PeopleList(){

const [people,setPeople] = useState([])
const [editingId,setEditingId] = useState(null)
const [name,setName] = useState("")
const [email,setEmail] = useState("")

const loadPeople = async () => {

const res = await fetch("http://localhost:5000/api/people")
const data = await res.json()

setPeople(data)

}

useEffect(()=>{
loadPeople()
},[])


const deletePerson = async (id)=>{

const confirmDelete = window.confirm("Are you sure you want to delete this person?")

if(!confirmDelete) return

await fetch(`http://localhost:5000/api/people/${id}`,{
method:"DELETE"
})

loadPeople()

}


const startEdit = (person)=>{

setEditingId(person.id)
setName(person.full_name)
setEmail(person.email)

}


const updatePerson = async ()=>{

await fetch(`http://localhost:5000/api/people/${editingId}`,{
method:"PUT",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
full_name:name,
email:email
})
})

setEditingId(null)
setName("")
setEmail("")

loadPeople()

}


return(

<div style={{padding:"40px"}}>

<h2>People List</h2>

<table border="1" cellPadding="10">

<thead>

<tr>
<th>Name</th>
<th>Email</th>
<th>Actions</th>
</tr>

</thead>

<tbody>

{people.map((p)=>(
<tr key={p.id}>

<td>{p.full_name}</td>
<td>{p.email}</td>

<td>

<button onClick={()=>startEdit(p)}>
Edit
</button>

<button
onClick={()=>deletePerson(p.id)}
style={{marginLeft:"10px"}}
>
Delete
</button>

</td>

</tr>
))}

</tbody>

</table>

{editingId && (

<div style={{marginTop:"30px"}}>

<h3>Edit Person</h3>

<input
value={name}
onChange={(e)=>setName(e.target.value)}
/>

<br/><br/>

<input
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<br/><br/>

<button onClick={updatePerson}>
Update
</button>

</div>

)}

</div>

)

}

export default PeopleList