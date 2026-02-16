const thing = {
	a: 1,
	b: 2,
} as const;

type thing = (typeof thing)[keyof typeof thing];

let testA: thing;
let testB: thing = 2;

// no error even though `thing.b` (`2`) case is missing
switch (testA) {
	case thing.a:
		break;
}

// same lack of error when using literals
switch (testA) {
	case 1:
		break;
}

// an `if` statement causes the following `switch` block to emit a false positive
if (1 * 1 === 1) {
	testB = 1;
}

// false positive, switch statement is exhaustive
switch (testB) {
	case thing.a:
		break;
	case thing.b:
		break;
}

// false negative when using literals not affected by `if` statement
switch (testB) {
	case 1:
		break;
}
