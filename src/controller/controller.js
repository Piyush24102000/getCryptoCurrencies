let coinModel = require('../models/coinModel')
const getCoins = async (req, res) => {
    try {
        let api = await fetch('https://api.coincap.io/v2/assets')
        let apiData = await api.json()
        let coinData = apiData.data
        let sortData = coinData.sort((a, b) => a.changePercent24Hr - b.changePercent24Hr)


        //Adding to database
        try {
            let request = req.body
            let count = 0
            for (let i = 0; i < sortData.length; i++) {
                request.symbol = sortData[i].symbol
                request.name = sortData[i].name
                request.marketCapUsd = sortData[i].marketCapUsd
                request.priceUsd = sortData[i].priceUsd

                await coinModel.create(request)
                count++
            }
            let coinsInDb = await coinModel.find({})
            if (count == 100) return res.status(201).send({ msg: "Successfully inserted", data: coinsInDb })
        }
        catch (f) {
            return res.status(500).send({ status: false, msg: f.message })

        }

    } catch (e) {
        return res.status(500).send({ status: false, msg: e.message })
    }
}

module.exports = { getCoins }