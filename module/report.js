const csv = require('csv-parser')
const fs = require("fs");

function readAndReport(currentDocument, i) {

    let result = [];
    const zipMap = new Map();
    let num = i;
    //uses node file system to read the document provided, handle the incoming data and place it as objects (due to csvparcer) into an array. Once in the array call loopResult, sort values then writeResults
    fs.createReadStream(currentDocument)
        .pipe(csv())
        .on("data", (data) => result.push(data))
        .on("end", () => {
            loopResult(result)
            //  not strictly necessary and will add to time complexity, but makes for better reading for end user. If time complexity is of concern can pass zip map into write results and use similar spread and join to create strings to be written. 
            var arrAsc = [...zipMap.entries()].sort();
            writeResults(arrAsc, num)
            // in case we do not wish to sort
            // writeResults(zipMap, num);
        });

    function loopResult(arr){
        // loop through the array of object and see if the current objects ZipCode exists in zipMap object.
        for (i = 0; i < arr.length; i++){
            if(zipMap.has(arr[i].ZipCode)){
                // if the zip code exists in zipMap object reset the object's value by iterating by one
                zipMap.set(arr[i].ZipCode, zipMap.get(arr[i].ZipCode) + 1)
                // if the zipcode does not exixt in zipMap object set the key as the zipCode and the value to 1
                } else {
                    zipMap.set(arr[i].ZipCode, 1)
                }
        ;}
    };

        // turn the sorted array of key value pairs into a string by joining with new line, write to a file in the docs folder including an iteration as part of the name and a header of Zip Code and instances. 
    function writeResults(arr, i){
        let strArr = arr.join("\r\n");
        fs.writeFile('./docs/summary'+(i+1)+'.csv', "Zip Code, Instances \r\n" + strArr, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
        });
    };


    //in case we do not want to spend time sorting this uses spread syntax to expand map object into an array then joins them with new line andwrite to a file in the docs folder including an iteration as part of the name and a header of Zip Code and instances. 
    // function writeResults(map, i){
    //     let strMap = [...zipMap.entries()].join("\r\n");
    //     fs.writeFile('./docs/summary'+(i+1)+'.csv', "Zip Code, Instances \r\n" + strMap, function (err) {
    //         if (err) throw err;
    //         console.log('File is created successfully.');
    //         })
    // };

}

module.exports = readAndReport