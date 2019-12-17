const fs = require('fs')
const path = require('path')
const makeProduce = require('./make-produce-files.js').makeProduce
const OUT_DIR = path.join(process.cwd(), 'output')
const JSON_OUT = path.join(OUT_DIR, 'data.json')
const CSV_OUT = path.join(OUT_DIR, 'data.csv')

function infinitfy (key, value) {
  if (value == Infinity) {
    return "Infinity"
  }
  return value
}
function toJSON (data) {
  fs.writeFileSync(JSON_OUT, JSON.stringify(data, infinitfy, 4))
}

function toCSV () {
  fs.copyFileSync('./data.csv', CSV_OUT)
}

function doItAll(data) {
  toCSV(data)
  toJSON(data)

}
if (require.main === module) {
  fs.exists(OUT_DIR, (exists) => {
    if (!exists) {
      fs.mkdirSync(OUT_DIR)
    }
    makeProduce(doItAll)
  })
}

