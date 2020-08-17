const fs = require('fs')
const path = require('path')
const DATA_DIR = path.join(__dirname, '../src/data/')
const DATA_SRC = path.join(DATA_DIR, 'crops.json')
const DATA_DEST = path.join(DATA_DIR, 'crops.js')

function findSellingPrice (prices) {
    return prices.base.regular
}

function findBuyingPrice (prices) {
    let min = []
    for (const store of Object.keys(prices)) {
        if (store === 'cart') continue;
        if (min[0] !== undefined) {
            switch (true) {
                case prices[store] < min[0].price:
                    min = [{store, price:prices[store]}]
                    break
                case prices[store] === min[0].price:
                    min.push({store, price:prices[store]})
                    break
            }
        } else {
            min.push({store, price:prices[store]})
        }
    }
    return min
}

function main () {
    const cropData = fs.readFileSync(DATA_SRC, { encoding: 'utf-8' })
    const cropsObj = JSON.parse(cropData)
    const parsedCrops = []
    for (const crop of cropsObj) {
        const cropObj = {
            name: crop.name,
            seasons: crop.seasons,
            seed: crop.seed
        }
        cropObj.buyingPrice = findBuyingPrice(crop.buyingPrice)
        cropObj.sellingPrice = findSellingPrice(crop.sellingPrice)
        parsedCrops.push(cropObj)
    }
    console.log(parsedCrops)
}

main()
