const csv = require('csv-parser')
const fs = require("fs");
const readAndReport = require("../module/report")

// allows a loop through all the address csv provided
let docArr = ["./docs/Group01.csv", "./docs/Group02.csv", "./docs/Group03.csv", "./docs/Group04.csv", "./docs/Group05.csv", "./docs/Group06.csv", "./docs/Group07.csv", "./docs/Group08.csv", "./docs/Group09.csv", "./docs/Group10.csv"]

docArr.forEach( (el, index) => readAndReport( el, index)) 


module.exports = {
    getIndex: (req, res) => {
        res.render("index.html");
    },
};