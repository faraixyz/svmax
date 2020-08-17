const fs = require('fs')
const path = require('path')
const DATA_DIR = path.join(__dirname, '../src/data/')
const DATA_SRC = path.join(DATA_DIR, 'crops.json')
const DATA_DEST = path.join(DATA_DIR, 'crops.js')

function main () {
    const cropData = fs.readFileSync(DATA_SRC, { encoding: 'utf-8' })
    const cropsObj = JSON.parse(cropData)
    const parsedCrops = []
    for (const crop of cropsObj) {
        const cropObj = {
            name: crop.name,
            seasons: crop.seasons,
            seed: crop.seed,
            buyingPrice: crop.buyingPrice,
            sellingPrice: crop.sellingPrice
        }
        parsedCrops.push(cropObj)
    }
}

main()
