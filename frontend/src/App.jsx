import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import AddPerson from "./pages/AddPerson"
import PeopleList from "./pages/PeopleList"

function App() {

return (

<Router>

<div style={{padding:"20px"}}>

<h1>Docker Person App</h1>

<nav>

<Link to="/" style={{marginRight:"20px"}}>
Add Person
</Link>

<Link to="/people">
People List
</Link>

</nav>

<hr/>

<Routes>

<Route path="/" element={<AddPerson/>} />

<Route path="/people" element={<PeopleList/>} />

</Routes>

</div>

</Router>

)

}

export default App