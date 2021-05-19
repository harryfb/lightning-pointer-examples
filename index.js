const express = require('express');
const app = express();

app.use("/lightning", express.static(__dirname + "/node_modules/wpe-lightning/dist/"));
app.use(express.static(__dirname + "/public/"))

app.get('/', (req, res) => res.sendFile('index.html', {root: __dirname }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Started server on port ${PORT}`));
