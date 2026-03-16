const express = require("express")
const cors = require("cors")
const { Pool } = require("pg")

const app = express()

app.use(cors())
app.use(express.json())

const pool = new Pool({
user: "postgres",
host: "db",
database: "people_db",
password: "postgres",
port: 5432
})

app.get("/api/people", async (req,res) => {

const result = await pool.query("SELECT * FROM people")

res.json(result.rows)

})

app.post("/api/people", async (req,res) => {

const {full_name,email} = req.body

const result = await pool.query(
"INSERT INTO people(full_name,email) VALUES($1,$2) RETURNING *",
[full_name,email]
)

res.status(201).json(result.rows[0])

})

app.delete("/api/people/:id", async (req,res)=>{

const id = req.params.id

await pool.query(
"DELETE FROM people WHERE id=$1",
[id]
)

res.json({message:"Person deleted"})

})

app.listen(5000,()=>{
console.log("Server running on port 5000")
})