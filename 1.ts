import { readFile } from "fs"

class Elf {
	items: {
		calories: number
	}[]
	calories: number
	constructor(unparsed: string) {
		this.items = unparsed.split("\n").map((c) => {return {calories: Number(c)}})
		let c = 0
		this.items.forEach((i) => c += i.calories)
		this.calories = c
	}
}

readFile("input", "utf-8", (e, input: string) => {
	let elves: Elf[] = []
	input.split("\n\n").forEach((l) => elves.push(new Elf(l)))

	// First star
	let highest = 0
	elves.forEach((elf) => {if (elf.calories > highest) highest = elf.calories})
	console.log("#1:", highest)

	// Second star
	elves.sort((a, b) => a.calories > b.calories ? -1 : 1)
	let highests = elves[0].calories + elves[1].calories + elves[2].calories
	console.log("#2:", highests)
})
