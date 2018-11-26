import "jest-extended"
import { JsonRpcOverWebRtc } from './webrtc'

describe('json-rpc', () =>
{
	it('should increase message index', async () =>
	{
		let fake = { send: jest.fn(), onmessage: (obj: any) => undefined }
		let j = new JsonRpcOverWebRtc(fake as any)
		let p = j.ping()
		let msg = (obj: {}) => fake.onmessage({ data: JSON.stringify(obj) })
		msg({ id: 0, result: "pong" })
		await p
		expect(fake.send).toBeCalledTimes(1)
		expect(JSON.parse(fake.send.mock.calls[0][0])).toEqual({ method: "ping", id: 0, params: [] })
		p = j.ping()
		msg({ id: 1, result: "pong" })
		await p
		expect(fake.send).toBeCalledTimes(2)
		expect(JSON.parse(fake.send.mock.calls[1][0])).toEqual({ method: "ping", id: 1, params: [] })
		p = j.ping()
		msg({ id: 2, result: "pong" })
		await p
		expect(fake.send).toBeCalledTimes(3)
		expect(JSON.parse(fake.send.mock.calls[2][0])).toEqual({ method: "ping", id: 2, params: [] })
	})
})