import { readFile } from "fs"

// WE TREAT THE LAST ELEMENT OF AN ARRAY AS THE TOP OF A STACK

readFile("input", "utf-8", (_e, input: string) => {
	let input_arr = input.split("\n\n")
	let stacks_raw = input_arr[0]
	let movements_raw = input_arr[1]

	let stacks_lines = stacks_raw.split("\n")
	stacks_lines.pop() // We don't need the numbers
	let stacks: string[][] = Array.from(Array(Math.round(stacks_lines[0].length / 4)), (a) => a = []) 
	stacks_lines.forEach((l) => {
		for (let i = 1; i < l.length; i += 4) {
			let stack_number = Math.floor(i / 4)
			let crate = l[i]
			if (crate !== " ") {
				stacks[stack_number].push(crate)
			}
		}
	})
	stacks = stacks.map((a) => a.reverse())
	
	let stacks_1 = stacks.map((a) => [...a])
	let stacks_2 = stacks.map((a) => [...a])
	let movements_lines = movements_raw.replace(/[a-z]/g, "").split("\n")
	movements_lines.pop()

	movements_lines.forEach((l) => {
		let movement = l.split("  ").map((m) => Number(m))
		let number_of_crates = movement[0]

		// Crucial to remember that in JS (and TS), those variables are references to `stacks_1`, not copies of parts of `stacks_1`!
		// btw, minus 1 cuz index in input starts at 1 instead of 0
		let stack_origin_1 = stacks_1[movement[1] - 1]
		let stack_destination_1 = stacks_1[movement[2] - 1]
		for (let i = 0; i < number_of_crates; i++) {
			let crate = stack_origin_1.pop()
			stack_destination_1.push(crate!)
		}

		let stack_origin_2 = stacks_2[movement[1] - 1]
		let stack_destination_2 = stacks_2[movement[2] - 1]
		for (let i = stack_origin_2.length - number_of_crates; i < stack_origin_2.length; i++) {
			stack_destination_2.push(stack_origin_2[i])
		}
		for (let i = 0; i < number_of_crates; i++) {stack_origin_2.pop()}
	})

	console.log("#1:", String(stacks_1.map((a) => a[a.length - 1])).replace(/,/g, ""))
	console.log("#2:", String(stacks_2.map((a) => a[a.length - 1])).replace(/,/g, ""))
})
