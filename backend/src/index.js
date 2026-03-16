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

/*
GET ALL PEOPLE
*/
app.get("/api/people", async (req,res) => {

  try{

    const result = await pool.query("SELECT * FROM people ORDER BY id")

    res.status(200).json(result.rows)

  }catch(err){

    res.status(500).json({error:"Server error"})

  }

})


/*
GET SINGLE PERSON
*/
app.get("/api/people/:id", async (req,res)=>{

  const id = req.params.id

  try{

    const result = await pool.query(
      "SELECT * FROM people WHERE id=$1",
      [id]
    )

    if(result.rows.length === 0){
      return res.status(404).json({error:"Person not found"})
    }

    res.status(200).json(result.rows[0])

  }catch(err){

    res.status(500).json({error:"Server error"})

  }

})


/*
CREATE PERSON
*/
app.post("/api/people", async (req,res) => {

  const {full_name,email} = req.body

  if(!full_name || !email){
    return res.status(400).json({error:"Missing fields"})
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if(!emailRegex.test(email)){
    return res.status(400).json({error:"Invalid email format"})
  }

  try{

    const result = await pool.query(
      "INSERT INTO people(full_name,email) VALUES($1,$2) RETURNING *",
      [full_name,email]
    )

    res.status(201).json(result.rows[0])

  }catch(err){

    if(err.code === "23505"){
      return res.status(409).json({error:"EMAIL_ALREADY_EXISTS"})
    }

    res.status(500).json({error:"Server error"})

  }

})


/*
UPDATE PERSON
*/
app.put("/api/people/:id", async (req,res)=>{

  const id = req.params.id
  const {full_name,email} = req.body

  if(!full_name || !email){
    return res.status(400).json({error:"Missing fields"})
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if(!emailRegex.test(email)){
    return res.status(400).json({error:"Invalid email format"})
  }

  try{

    const result = await pool.query(
      "UPDATE people SET full_name=$1, email=$2 WHERE id=$3 RETURNING *",
      [full_name,email,id]
    )

    if(result.rows.length === 0){
      return res.status(404).json({error:"Person not found"})
    }

    res.status(200).json(result.rows[0])

  }catch(err){

    if(err.code === "23505"){
      return res.status(409).json({error:"EMAIL_ALREADY_EXISTS"})
    }

    res.status(500).json({error:"Server error"})

  }

})


/*
DELETE PERSON
*/
app.delete("/api/people/:id", async (req,res)=>{

  const id = req.params.id

  try{

    const result = await pool.query(
      "DELETE FROM people WHERE id=$1 RETURNING *",
      [id]
    )

    if(result.rows.length === 0){
      return res.status(404).json({error:"Person not found"})
    }

    res.status(200).json({message:"Person deleted"})

  }catch(err){

    res.status(500).json({error:"Server error"})

  }

})


app.listen(5000,()=>{
  console.log("Server running on port 5000")
})