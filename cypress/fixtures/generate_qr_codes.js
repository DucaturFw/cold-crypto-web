const qr = require("qrcode")
const videoshow = require('videoshow')
const fs = require('fs')

let qrs = {
	login_qr_video: `|2|[{"address":"0x5DcD6E2D92bC4F96F9072A25CC8d4a3A4Ad07ba0","blockchain":"eth","chainId":4},{"address":"0x30384424F1Ab508F1f82b58f1335f343ABdF68AE","blockchain":"eth","chainId":4},{"address":"0x1AD80eC32FD6Ef24e80801e90C5f7e32950C2D05","blockchain":"eth","chainId":4}]`,
}

if (!fs.existsSync('qr'))
	fs.mkdirSync('qr')

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