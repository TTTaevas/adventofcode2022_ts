import { readFile } from "fs"

class DatastreamBuffer {
	raw: string
	arr: string[]
	constructor(raw: string) {
		this.raw = raw
		this.arr = raw.split("")
	}
}

function getMarker(n: number, buffer: DatastreamBuffer): number {
	for (let i = n; i < buffer.arr.length; i++) {
		let arr = buffer.arr.slice(i - n, i)
		if ([...new Set(arr)].length === n) {
			return i
		}
	}
	return -1
}

readFile("input", "utf-8", (_e, input: string) => {
	let buffer = new DatastreamBuffer(input)
	console.log("#1:", getMarker(4, buffer))
	console.log("#2:", getMarker(14, buffer))
})
