class Automaton {
  constructor(n) {
    this.currentPosition = 0;
    this.stringLength = n;
  }

  moveLeft() {
    if (this.currentPosition > 0) {
      this.currentPosition--;
    }
  }

  moveRight() {
    if (this.currentPosition < this.stringLength - 1) {
      this.currentPosition++;
    }
  }

  getCurrentPosition() {
    return this.currentPosition;
  }
}

const stringLength = Math.floor(Math.random() * 100) + 1;
let randomString = '';
for (let i = 0; i < stringLength; i++) {
  randomString += Math.floor(Math.random() * 2);
}
console.log('Randomly generated string:', randomString);

const automaton = new Automaton(stringLength);

for (let i = 0; i < stringLength; i++) {
  const symbol = randomString[i];
  console.log(`Position ${automaton.getCurrentPosition()}: ${symbol}`);
  if (symbol === '0') {
    automaton.moveLeft();
  } else {
    automaton.moveRight();
  }
}