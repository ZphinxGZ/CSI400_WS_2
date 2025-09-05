const express = require('express')
const app = express()
app.use(express.json())

let dataPersonJSON = []
/*
// let data = {"key": "value..."}
function addData(name,email,tel){
   let newData = {
      "name": name,
      "email": email,
      "tel": tel
   }
   dataJSON.push(newData)
}
addData("Kunakorn","Kunakorn.kha@spumail.com","0812345678")
addData("Kuna1","Kunakorn.kha@spumail.com1","0812345679")

console.log(dataJSON)*/

let countClient = 0
app.get('/', (req, res) => {
   console.log('Client Connecting...')
   countClient = countClient + 1
   console.log('countClient', countClient)
   res.status(200).send('Client Connect Success!')
});
app.get('/api/data/:reqClient' , (req,res) => {
   console.log('Client use GET: /api/data -> req.params')
   const reqClient = req.params.reqClient
   console.log('recive',reqClient)
   res.send(`Server Recive req.params = ${reqClient}Success`)
})  
app.get('/api/data' , (req,res)=>{
   console.log('Client use GET: /api/data -> req.body(JSON)')
   const data = req.body
   console.log(data)
   res.status(200).json({message: 'Server req.bodyrecived', data})
})

app.post('/api/person', (req,res)=>{
   console.log('Client use POST: /api/person -> req.body(JSON)')
   const newPerson = req.body
   dataPersonJSON.push(newPerson)
   console.log(dataPersonJSON)
   res.status(200).send('Server recive newPerson OK!!')
})

app.put('/api/person/:pid', (req, res) => {
   const pid = req.params.pid
   const updatePerson = req.body

   if (!updatePerson || Object.keys(updatePerson).length === 0) {
      return res.status(400).send('No update data provided')
   }
   const index = dataPersonJSON.findIndex(person => person.id == pid)
   if (index === -1) {
      return res.status(404).send('Person not found')
   }
   
   const { id, ...rest } = updatePerson
   dataPersonJSON[index] = { ...dataPersonJSON[index], ...rest }

   console.log('Updated person:', dataPersonJSON[index])

   res.status(200).json({
      message: 'Server recive updatePerson OK!!'
   })
})

app.delete('/api/person/:pid', (req, res) => {
   const pid = req.params.pid
   const index = dataPersonJSON.findIndex(person => person.id == pid)
   if (index !== -1) {
      const deletedPerson = dataPersonJSON[index]
      dataPersonJSON.splice(index, 1)
      console.log('Deleted person:', deletedPerson)
      console.log('Current users:', dataPersonJSON)
      res.status(200).send('Server deleted person OK!!')
   } else {
      res.status(404).send('Person not found')
   }
})

app.listen(3000, () => {console.log('workshop#2 API Services is running on port 3000'),
console.log('workshop#2 API Services running...')});

