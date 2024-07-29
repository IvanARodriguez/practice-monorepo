console.clear();

// Lexical scope defines how variables names are resolved in nested functions

// Nested child functions have access to the scope of their parent functions

// This is often confused with closure, but lexical scope is only an important part of closure

// global scope

let x = 1;
const parentFunction = () => {
	// Local scope
	let myValue = 2;
	console.log(x);
	console.log(myValue);
};

// Two dimension array

let values: string[][] = [];

values.push(['Ivan', 'Maria', 'Juan']);
values.push(['Pedro', 'John', 'Leticia']);
values.push(['Agustin', 'Abiel']);

console.table(values[2]);
