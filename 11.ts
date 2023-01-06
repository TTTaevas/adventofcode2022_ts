import { readFile } from "fs"

class Monkey {
	original_position: number
	items: number[]
	operation: string[]
	test: Test
	iftrue: number
	iffalse: number
	inspection_count: number
	public doOperation(item: number): number {
		let n = Number(this.operation[2])
		let b = isNaN(n) ? item : n
		if (this.operation[1] === "+") {
			return item + b
		} else if (this.operation[1] === "*") {
			return item * b
		} else {throw new Error(`This monkey's operation is invalid! ${this.operation}`)}
	}
	constructor(arr: string[]) {
		this.original_position = Number(arr[0].replace(/[^0-9]/g, ""))
		this.items = arr[1].substring(arr[1].indexOf(":") + 2).split(", ").map((i) => Number(i))
		this.operation = arr[2].substring(arr[2].indexOf("=") + 2).split(" ")
		this.test = new Test(Number(arr[3].replace(/[^0-9]/g, "")))
		this.iftrue = Number(arr[4].replace(/[^0-9]/g, ""))
		this.iffalse = Number(arr[5].replace(/[^0-9]/g, ""))
		this.inspection_count = 0
	}
}

const number_of_rounds_1 = 20
const number_of_rounds_2 = 10000

class Test {
	constructor(
		public condition: number
	) {}
	public isTrue(item: number): boolean {
		return Number.isInteger(item / this.condition)
	}
}

function playWithMonkeys(monkeys: Monkey[], number_of_rounds: number, part: number): Monkey[] {
	if (part === 2) throw new Error("#2 is a math problem, and I SUCK at math, so there's no way I'm figuring this out, sorry")
	for (let i = 0; i < number_of_rounds; i++) {
		monkeys.forEach((monkey) => {
			monkey.items.forEach((item) => {
				monkey.inspection_count++
				item = part === 1 ? Math.floor(monkey.doOperation(item) / 3) : 0
				let new_monkey = monkeys[monkey.test.isTrue(item) ? monkey.iftrue : monkey.iffalse]
				new_monkey.items.push(item)
			})
			monkey.items = []
		})
	}
	monkeys.sort((a, b) => a.inspection_count < b.inspection_count ? 1 : -1)
	return monkeys
}

readFile("input", "utf-8", (_e, input: string) => {
	let monkeys_1: Monkey[] = input.split("\n\n").map((a) => new Monkey(a.split("\n")))
	monkeys_1 = playWithMonkeys(monkeys_1, number_of_rounds_1, 1)
	console.log("#1:", monkeys_1[0].inspection_count * monkeys_1[1].inspection_count)

	let monkeys_2: Monkey[] = input.split("\n\n").map((a) => new Monkey(a.split("\n")))
	monkeys_2 = playWithMonkeys(monkeys_2, number_of_rounds_2, 2)
	console.log("#2:", monkeys_2[0].inspection_count * monkeys_2[1].inspection_count)
})
