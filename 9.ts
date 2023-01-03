import { readFile } from "fs";

// The comments might be outdated because of how much I changed the code for 2nd puzzle lol sorry

class Rope {
	// knots[2][1] == "Knot 2" (the knot after the knot after the head)'s position after the head moved once
	knots: {
		x: number, // horizontal position, 0 -> 1
		y: number  // vertical position, 0 v 1
	}[][]
	constructor(x: number, y: number, rope_length_minus_head: number) {
		let knots = [[{x, y}]]
		for (let i = 0; i < rope_length_minus_head; i++) {knots.push([{x, y}])}
		this.knots = knots
	}
	public move(m: Motion): void {
		let horizontal_movement = m.direction === "R" ? 1 : m.direction === "L" ? -1 : 0
		let vertical_movement = m.direction === "D" ? 1 : m.direction === "U" ? -1 : 0

		for (let i = 0; i < m.length; i++) {
			if (debug) console.log("\nSpeed:", {x: horizontal_movement, y: vertical_movement})
			// No matter what, we're moving the head
			let x_position_of_previous_knot = this.knots[0][this.knots[0].length - 1].x + horizontal_movement
			let y_position_of_previous_knot = this.knots[0][this.knots[0].length - 1].y + vertical_movement
			this.knots[0].push({x: x_position_of_previous_knot, y: y_position_of_previous_knot})
			if (debug) console.log("Head:", {x: x_position_of_previous_knot, y: y_position_of_previous_knot})

			// The knots after, however, might not move, or might move in two directions in one iteration
			for (let e = 1; e < this.knots.length; e++) {
				let p = e - 1
				x_position_of_previous_knot = this.knots[p][this.knots[p].length - 1].x
				y_position_of_previous_knot = this.knots[p][this.knots[p].length - 1].y

				let x_position_old = this.knots[e][this.knots[e].length - 1].x
				let y_position_old = this.knots[e][this.knots[e].length - 1].y

				// If tail would be overlapping head if it moves normally, don't move tail
				if (x_position_old + horizontal_movement === x_position_of_previous_knot && y_position_old + vertical_movement === y_position_of_previous_knot) {if (debug) {console.log("would overlap")}; this.doNotMoveTail(e); continue}
				// If head is now overlapping tail after moving, don't move tail
				if (x_position_old === x_position_of_previous_knot && y_position_old === y_position_of_previous_knot) {if (debug) {console.log("is overlap")}; this.doNotMoveTail(e); continue}
				// If head is now changing direction (and hasn't done so in previous iteration), don't move tail
				if ((x_position_old + horizontal_movement === x_position_of_previous_knot && y_position_old + horizontal_movement === y_position_of_previous_knot) ||
					(x_position_old + vertical_movement === x_position_of_previous_knot && y_position_old + vertical_movement === y_position_of_previous_knot)) {
					if (debug) {console.log("direction change",
						{x: (x_position_old + horizontal_movement === x_position_of_previous_knot && y_position_old + horizontal_movement === y_position_of_previous_knot),
						y: (x_position_old + vertical_movement === x_position_of_previous_knot && y_position_old + vertical_movement === y_position_of_previous_knot)}
					)}
					this.doNotMoveTail(e); continue
				}
				// If head is getting away from tail, move tail to previous head position
				let x_difference = x_position_of_previous_knot - x_position_old
				let y_difference = y_position_of_previous_knot - y_position_old
				if ((x_difference > 1 || x_difference < -1) || (y_difference > 1 || y_difference < -1)) {
					let x = x_position_old + x_difference + (x_difference ? Math.abs(x_difference) === x_difference ? -1 : 1 : 0) + (Math.abs(y_difference) > Math.abs(x_difference) ? x_difference : 0)
					let y = y_position_old + y_difference + (y_difference ? Math.abs(y_difference) === y_difference ? -1 : 1 : 0) + (Math.abs(x_difference) > Math.abs(y_difference) ? y_difference : 0)
					this.knots[e].push({x, y})
					
					//this.knots[e].push(this.knots[p][this.knots[p].length - 2])
					if (debug) console.log(`Knot ${e}:`, this.knots[e][this.knots[e].length - 1])
					continue
				}
				// If all if statements were avoided, there shouldn't be any need to move the tail
				this.doNotMoveTail(e)
				if (debug) console.log("no movement needed")
			}
		}
	}
	public doNotMoveTail(knot: number): void { // To keep head & tail of equal length for better history tracking
		this.knots[knot].push(this.knots[knot][this.knots[knot].length - 1])
	}
}

class Motion {
	constructor(
		public direction: string, // "U" | "R" | "D" | "L"
		public length: number
	){}
}

const rope_length_minus_head = 9
const debug = false

readFile("input", "utf-8", (_e, input: string) => {
	let arr = input.split("\n")
	arr.pop()
	let motions = arr.map((a) => {
		let m = a.split(" ")
		return new Motion(m[0], Number(m[1]))
	})

	let rope = new Rope(0, 0, rope_length_minus_head)
	motions.forEach((m) => rope.move(m))

	let positions_1: {x: number, y: number}[] = []
	rope.knots[1].forEach((a) => {
		let i = positions_1.findIndex((b) => (b.x == a.x && b.y == a.y))
		if (i <= -1) {positions_1.push(a)}
	})
	let positions_2: {x: number, y: number}[] = []
	rope.knots[rope_length_minus_head].forEach((a) => {
		let i = positions_2.findIndex((b) => (b.x == a.x && b.y == a.y))
		if (i <= -1) {positions_2.push(a)}
	})

	console.log("#1:", positions_1.length)
	console.log("#2:", positions_2.length)
})
