import { useState, useEffect } from "react"

function PeopleList() {

const [people,setPeople] = useState([])

const loadPeople = async () => {

const res = await fetch("http://localhost:5000/api/people")
const data = await res.json()

setPeople(data)

}

useEffect(()=>{
loadPeople()
},[])

const deletePerson = async (id) => {

await fetch(`http://localhost:5000/api/people/${id}`,{
method:"DELETE"
})

loadPeople()

}

return (

<div style={{padding:"40px"}}>

<h1>People List</h1>

<ul>
{people.map((p)=>(
<li key={p.id}>

{p.full_name} - {p.email}

<button
onClick={()=>deletePerson(p.id)}
style={{marginLeft:"10px"}}
>
Delete
</button>

</li>
))}
</ul>

</div>

)

}

export default PeopleList