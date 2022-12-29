import { readFile } from "fs"

class Pair {
	first_elf: number[]
	second_elf: number[]
	constructor(str: string) {
		let elves = str.split(",")
		this.first_elf = getRange(elves[0].split("-").map((n) => Number(n)))
		this.second_elf = getRange(elves[1].split("-").map((n) => Number(n)))
	}
}

function getRange(arr: number[]): number[] {
	let numbers: number[] = []
	for (let e = arr[0]; e <= arr[1]; e++) {numbers.push(e)}
	return numbers
}

readFile("input", "utf-8", (_e, input: string) => {
	let pairs: Pair[] = []
	let lines = input.split("\n")
	lines.pop() // remove empty last line of input
	lines.forEach((l) => pairs.push(new Pair(l)))

	let fully_contains = 0
	pairs.forEach((p) => { // Because we fiddle with strings, we need to add a leading 0 to avoid confusions such as "1 is in 11"
		// Could I NOT fiddle with strings instead? Well yeah but that's no fun
		let a = String(p.first_elf.map((n) => String(n).padStart(2, "0")))
		let b = String(p.second_elf.map((n) => String(n).padStart(2, "0")))
		if (a.indexOf(b) !== -1 || b.indexOf(a) !== -1) {
			fully_contains++
		}
	})
	console.log("#1:", fully_contains)

	let overlaps = 0
	pairs.forEach((p) => {
		let is_overlapping = false
		p.first_elf.forEach((n_1) => {
			if (is_overlapping) return
			let f = p.second_elf.find((n_2) => n_1 == n_2)
			if (f) {
				overlaps++
				is_overlapping = true
			}
		})
	})
	console.log("#2:", overlaps)
})
