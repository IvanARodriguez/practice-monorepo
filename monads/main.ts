console.clear();

class Maybe<T> {
	private value: T | null;

	private constructor(value: T | null) {
		this.value = value;
	}

	static of<U>(value: U | null): Maybe<U> {
		return new Maybe<U>(value);
	}

	bind<U>(f: (value: T) => Maybe<U>): Maybe<U> {
		if (this.value === null || this.value === undefined) {
			return Maybe.of<U>(null);
		}
		return f(this.value);
	}

	// To satisfy the identity laws
	static unit<U>(value: U): Maybe<U> {
		return Maybe.of(value);
	}

	getValue(): T | null {
		return this.value;
	}
}

// Example usage:
const maybeValue = Maybe.of(5);
const maybeResult = maybeValue.bind((value) => Maybe.of(value * 2));
console.log(maybeResult.getValue());
