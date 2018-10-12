const express = require("express")
let app = express()
app.get('/', (req, res) =>
{
    res.json({hello: "world"})
})
app.get('/blockchains', (req, res) =>
{
    res.json({ supported: ['eth', 'neo', 'eos'] })
})
app.get('/eth/gas', (req, res) =>
{
    res.json({
        "average": 20.0,
        "fastestWait": 0.5,
        "fastWait": 0.6,
        "fast": 200.0,
        "safeLowWait": 4.3,
        "blockNum": 6471259,
        "avgWait": 2.4,
        "block_time": 14.26842105263158,
        "speed": 0.7856651476674678,
        "fastest": 630.0,
        "safeLow": 16.0
    })
})
app.get('/addresses', (req, res) =>
{
    res.json([{
        address: '0x00',
        blockchain: 'eos',
        balance: "42512341235000000000",
    }, {
        address: '0x01',
        blockchain: 'eth',
        balance: "2423423424",
    }
    ])
})
app.get('/:blockchain/:address/txs', (req, res) =>
{
    res.json({
        address: req.params.address,
        blockchain: req.params.blockchain,
        txs: [
            {
                hash: '0x23da7a3be275db221e93f1ba8f2779656d5f53a39af027660ab3d4d6752f40f3',
                value: '651030000000000000',
                gasUsed: '21000',
                gasValue: '134000000000',
                nonce: '3'
            },
            {
                hash: '0x23da7a3be275db221e93f1ba8f2779656d5f53a39af027660ab3d4d6752f40f4',
                value: '92200000000000000',
                gasUsed: '23000',
                gasValue: '154000000000',
                nonce: '2'
            },
            {
                hash: '0x23da7a3be275db221e93f1ba8f2779656d5f53a39af027660ab3d4d6752f40f5',
                value: '237030000000000000',
                gasUsed: '22000',
                gasValue: '34000000000',
                nonce: '1'
            }
        ]
    })
})
app.get('/market/price/eth', (req, res) =>
{
    res.json('2221.7905')
})
app.all('/eth/pushTx', (req, res) =>
{
    res.json({
        result: 1,
        hash: '0x' + randomHex(64)
    })
})
function randomHex(num)
{
    let str = ''
    for (let i = 0; i < num; i++)
    {
        str += randomHexDigit()
    }
    return str
}
function randomHexDigit()
{
    return Math.floor(Math.random() * 16).toString(16)
}

app.listen(4443, () => console.log('API emulator listening on port 4445'))

export const shutdown = () => console.log('CLOSE!') || app.close()
