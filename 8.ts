import { readFile } from "fs";

class Tree {
	constructor(
		public x: number, // horizontal position, 0 -> 1
		public y: number, // vertical position, 0 v 1
		public height: number
	){}
}

readFile("input", "utf-8", (_e, input: string) => {
	let arr = input.split("\n")
	let trees: Tree[] = []
	
	for (let y = 0; y < arr.length; y++) {
		let row = arr[y]
		for (let x = 0; x < row.length; x++) {
			trees.push(new Tree(x, y, Number(row[x])))
		}
	}
	const grid_size = trees[trees.length - 1].x + 1
	
	let how_many_visible = 0
	let highest_score = 0
	trees.forEach((t) => {
		// First star
		let visible = [true, true, true, true] // N,E,S,W
		for (let i = 0; i < t.y; i++) { // N
			let other_tree = trees.find((o) => o !== t && o.x === t.x && o.y === i)
			if (other_tree && other_tree.height >= t.height) visible[0] = false
		}
		for (let i = t.x; i < grid_size; i++) { // E
			let other_tree = trees.find((o) => o !== t && o.x === i && o.y === t.y)
			if (other_tree && other_tree.height >= t.height) visible[1] = false
		}
		for (let i = t.y; i < grid_size; i++) { // S
			let other_tree = trees.find((o) => o !== t && o.x === t.x && o.y === i)
			if (other_tree && other_tree.height >= t.height) visible[2] = false
		}
		for (let i = 0; i < t.x; i++) { // W
			let other_tree = trees.find((o) => o !== t && o.x === i && o.y === t.y)
			if (other_tree && other_tree.height >= t.height) visible[3] = false
		}
		if (visible.some((v) => v)) how_many_visible++

		// Second star
		let scores = [0, 0, 0, 0] // N,E,S,W
		for (let i = t.y - 1; i >= 0; i--) { // N
			let other_tree = trees.find((o) => o.x === t.x && o.y === i)
			if (other_tree) {scores[0]++; if (other_tree.height >= t.height) i = 0}
		}
		for (let i = t.x + 1; i <= grid_size; i++) { // E
			let other_tree = trees.find((o) => o.x === i && o.y === t.y)
			if (other_tree) {scores[1]++; if (other_tree.height >= t.height) i = grid_size}
		}
		for (let i = t.y + 1; i <= grid_size; i++) { // S
			let other_tree = trees.find((o) => o.x === t.x && o.y === i)
			if (other_tree) {scores[2]++; if (other_tree.height >= t.height) i = grid_size}
		}
		for (let i = t.x - 1; i >= 0; i--) { // W
			let other_tree = trees.find((o) => o.x === i && o.y === t.y)
			if (other_tree) {scores[3]++; if (other_tree.height >= t.height) i = 0}
		}
		let score = scores.reduce((a, b) => a * b)
		if (score > highest_score) highest_score = score
	})
	console.log("#1:", how_many_visible)
	console.log("#2:", highest_score)
})
