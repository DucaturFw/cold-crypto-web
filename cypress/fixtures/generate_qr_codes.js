const qr = require("qrcode")
const videoshow = require('videoshow')
const fs = require('fs')
const del = require('del')

let qrs = require('./qrs.json')

if (!fs.existsSync('qr'))
	fs.mkdirSync('qr')

del('qr/*').then(() =>
{
	Object.keys(qrs).map(fileName =>
	{
		// generate QR and save as image
		let text = qrs[fileName]
		return qr.toFile(`qr/${fileName}.png`, text).then(_ => fileName)
	}).map(p => p.then(fileName =>
	{
		// generate video from QR image
		videoshow([`qr/${fileName}.png`], { loop: 10, transition: false })
			.save(`qr/${fileName}.mp4`)
	}))
})