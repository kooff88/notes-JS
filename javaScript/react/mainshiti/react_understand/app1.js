const numbers = [1, 2, 3, 4];

const reducerFn = (acculumator, currentValue) => {
  const nextAculumator = acculumator + currentValue;
  return nextAculumator;
}

const initialValue = 0;
const sum = numbers.reduce(
  reducerFn,
  initialValue
)