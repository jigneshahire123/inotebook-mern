const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;
app.use(express.json());
app.use(cors());
const connectToMongo=require("./db");
connectToMongo();


app.use("/api/auth", require("./routes/auth.js"))
app.use("/api/notes", require("./routes/notes"))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
