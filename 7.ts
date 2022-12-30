import { readFile } from "fs"
import util from 'util'

class Directory {
	constructor(
		public name: string,
		public full_path: string,
		public directories: Directory[],
		public files: File[],
		public motherDir?: Directory
	){}

	public getSize(): number {
		let size = 0
		this.files.forEach((f) => size += f.size)
		this.directories.forEach((d) => size += d.getSize())
		return size
	}
}

class File {
	name: string
	size: number
	constructor(str: string) {
		let arr = str.split(" ")
		this.name = arr[1]
		this.size = Number(arr[0])
	}
}

const max = 100000
const total_size = 70000000
const required_for_update = 30000000

readFile("input", "utf-8", (_e, input: string) => {
	let arr = input.split("\n")
	let current_path = "/"
	let directories: Directory[] = [new Directory(current_path, current_path, [], [])]

	for (let i = 1; i < arr.length; i++) {
		let directory = directories.find((d) => d.full_path === current_path)
		if (arr[i].startsWith("$ cd ..")) {
			current_path = current_path.substring(0, current_path.substring(0, current_path.length - 1).lastIndexOf("/") + 1)
		} else if (arr[i].startsWith("$ cd ")) {
			current_path += arr[i].substring(5) + "/"
			let new_dir = new Directory(current_path.substring(current_path.substring(0, current_path.length - 1).lastIndexOf("/") + 1).replace("/", ""), current_path, [], [], directory)
			directory!.directories.push(new_dir)
			directories.push(new_dir)
		} else if (arr[i].match(/^\d/)) {
			directory!.files.push(new File(arr[i]))
		}
	}

	const used_space = directories[0].getSize()
	let sum_total_dir = 0
	let will_delete = Number.MAX_VALUE
	for (let i = 0; i < directories.length; i++) {
		let size_dir = directories[i].getSize()
		// Second star
		if (size_dir + (total_size - used_space) > required_for_update && size_dir < will_delete) will_delete = size_dir
		// First star
		if (size_dir > max) continue
		sum_total_dir += size_dir
	}
	console.log("#1:", sum_total_dir)
	console.log("#2:", will_delete)
})
