import { readFile } from "fs"

class Command {
	name: string
	value: number
	constructor(c: string) {
		let arr = c.split(" ")
		this.name = arr[0]
		this.value = arr[1] !== undefined ? Number(arr[1]) : 0
	}
}

const cycles = [20, 60, 100, 140, 180, 220]
const lines = 6

readFile("input", "utf-8", (_e, input: string) => {
	let x: number[] = [1]
	let strenghts: number[] = []
	let crt: string[] = []

	let arr = input.split("\n")
	arr.pop() // don't need empty last line
	let commands = arr.map((c) => new Command(c))

	// First star
	commands.forEach((c) => {
		let cur = x[x.length - 1]
		if (c.name === "noop") {
			x.push(cur)
		} else if (c.name === "addx") {
			x.push(cur)
			x.push(cur + c.value)
		}
	})
	cycles.forEach((cycle) => {strenghts.push(x[cycle - 1] * cycle)})

	// Second star
	let line_length = Math.round(x.length / lines)
	for (let i = 0; i < lines; i++) {
		crt.push("")
		for (let e = 0; e < line_length; e++) {
			let a = x[i * line_length + e]
			let sprite_position = [a - 1, a, a + 1]
			crt[i] += (sprite_position.indexOf(e) > -1 ? "#" : ".")
		}
	}

	console.log("#1:", strenghts.reduce((a, b) => {return a + b}, 0))
	console.log("#2, carefully look at the 40-width lines below:\n", crt)
})
