const numbers = [1, 2, 2, 3, 4, 4, 5];

const res: number[] = [];

for (let i = 0; i < numbers.length - 1; i++) {
  if (!res.includes(numbers[i])) {
    res.push(numbers[i]);
  }
}
