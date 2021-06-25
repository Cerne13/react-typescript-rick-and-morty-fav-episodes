const arr = [1, 2, 5, 232, 23, 1, 978, 234, 2, 45, 4, 90, 12, 5];

const biggestNum = (arr) => {
	return arr.reduce((acc, elem) => (acc < elem ? elem : acc), 0);
};

console.log(biggestNum(arr));
console.log(Math.max(...arr));
