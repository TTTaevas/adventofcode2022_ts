import { readFile } from "fs"

class Round {
	moves: {
		opponent: Move,
		myself_1: Move,
		myself_2: Move
	}
	constructor(unparsed: string) {
		let parsed = unparsed.split(" ")
		let opponent_move = moves.find((m) => m.name == parsed[0])
		let my_move_1 = moves.find((m) => m.alias == parsed[1])
		let my_move_2 = moves.find((m) => m.name == (parsed[1] == "X" ? opponent_move?.wins : parsed[1] == "Y" ? opponent_move?.name : opponent_move?.loses))
		this.moves = {opponent: opponent_move!, myself_1: my_move_1!, myself_2: my_move_2!}
	}
}

class Move {
	constructor(
		public name: string,
		public alias: string,
		public value: number,
		public wins: string,
		public loses: string
	){}
}

const win_score = 6
const draw_score = 3
const lose_score = 0

const moves = [
	new Move("A", "X", 1, "C", "B"), // "Rock"
	new Move("B", "Y", 2, "A", "C"), // "Paper"
	new Move("C", "Z", 3, "B", "A") // "Scissors"
]

readFile("input", "utf-8", (e, input: string) => {
	let rounds: Round[] = []
	input.split("\n").forEach((l) => rounds.push(new Round(l)))
	rounds.pop() // last line of input is empty

	// First star
	let score_1 = 0
	rounds.forEach((r) => {
		score_1 += r.moves.myself_1.value
		score_1 += r.moves.myself_1.wins == r.moves.opponent.name ? win_score : r.moves.myself_1.loses == r.moves.opponent.name ? lose_score : draw_score
	})
	console.log("#1:", score_1)

	// Second star
	let score_2 = 0
	rounds.forEach((r) => {
		score_2 += r.moves.myself_2.value
		score_2 += r.moves.myself_2.wins == r.moves.opponent.name ? win_score : r.moves.myself_2.loses == r.moves.opponent.name ? lose_score : draw_score
	})
	console.log("#2:", score_2)
})
