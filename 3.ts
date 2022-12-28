import { readFile } from "fs"

class Rucksack {
	items_string: string
	items: Item[]
	compartments: Item[][]
	constructor(str: string) {
		this.items_string = str
		let items: Item[] = []
		for (let i = 0; i < str.length; i++) {items.push(new Item(str[i]))}
		this.items = [...items]
		let second_half = items.splice(items.length / 2)
		this.compartments = [items, second_half]
	}
}

class Item {
	name: string
	priority: number
	constructor(name: string) {
		this.name = name
		let priority = name.charCodeAt(0) - 96
		if (priority < 0) priority += 58 // Is uppercase
		this.priority = priority
	}
}

readFile("input", "utf-8", (_e, input: string) => {
	let rucksacks: Rucksack[] = []
	let lines = input.split("\n")
	lines.pop() // remove empty last line of input
	lines.forEach((l) => rucksacks.push(new Rucksack(l)))

	let sum_1 = 0
	rucksacks.forEach((r) => {
		let priority = 0
		r.compartments[0].forEach((i_0) => {
			if (priority) return
			let common_item = r.compartments[1].find((i_1) => i_0.name == i_1.name)
			if (common_item) priority += common_item.priority
		})
		sum_1 += priority
	})
	console.log("#1:", sum_1)

	let sum_2 = 0
	for (let i = 0; i < rucksacks.length; i += 3) {
		let priority = 0
		rucksacks[i].items.forEach((i_0) => {
			rucksacks[i + 1].items.forEach((i_1) => {
				if (priority) return
				let common_item = rucksacks[i + 2].items.find((i_2) => i_0.name == i_1.name && i_0.name == i_2.name)
				if (common_item) priority += common_item.priority
			})
		})
		sum_2 += priority
	}
	console.log("#2:", sum_2)
})
