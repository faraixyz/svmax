const fs = require("fs");
const path = require("path");
const parse = require("csv-parse");
const file = path.join(process.cwd(), "./data.csv");

const BOOLEAN_FIELDS = ["multiple_harvests", "spring", "summer", "fall", "winter"]
const INTEGER_FIELDS = ["travelling_cart", "oasis", "egg_festival", "joja", "pierre"]

function destringifyField (record) {
    INTEGER_FIELDS.forEach((field) => {
        record[field] = record[field] === "Infinity" ? Infinity : record[field]
    })
    BOOLEAN_FIELDS.forEach((field) => {
        record[field] = record[field] === "true" ? true : false
    })
    return record
}

function makeProduce(callback) {
    fs.readFile(file, function (err, data) {
        if (err) throw err;
        parse(data, {
            "columns": true,
            "cast": true,
            "on_record": destringifyField
            }, function(e, output) {
                callback(output)
            });
        }
    );
}

module.exports.makeProduce = makeProduce
