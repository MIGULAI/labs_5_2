const fs = require('fs')

class PlayGround {
    _sections: { a1: number, a2: number }[];
    _gradations: number;
    _iter: number;
    constructor(gradations: number) {
        this._iter = 0
        this._sections = [];
        this._gradations = gradations;
        let arr = new Array(0.25, 0.75);
        this.calcSection(arr)
    }
    get gradations() {
        return this._gradations
    }
    set gradations(x: number) {
        this._gradations = x
    }
    get iter() {
        return this._iter
    }
    addSection(obj: { a1: number, a2: number }): void {
        this._sections.push(obj)
    }
    regenerateGradations(): void {
        let arr = new Array();
        for (let index = 0; index < this._gradations - 1; index++) {
            const el = Math.random();
            arr.push(el);
        }
        arr = arr.sort((x, y) => x - y)
        this.calcSection(arr)
    }
    private calcSection(arr: number[]) {
        let min = 0;
        const max = 1;
        for (let index = 0; index < arr.length; index++) {
            this._sections.push({ a1: min, a2: arr[index] });
            min = arr[index]
            if (index === arr.length - 1) {
                this._sections.push({ a1: min, a2: max });
            }
        }
    }
    checkFire(x: number): number {
        for (let index = 0; index < this._sections.length; index++) {
            if (x > this._sections[index].a1 && x < this._sections[index].a2) {
                return index;
            }
        }
        return -1
    }
    nextStep(): boolean {
        this._iter += 1;
        return true;
    }
}

class AgentOne {
    _playground: PlayGround;
    private _x: number;
    constructor(playground: PlayGround) {
        this._playground = playground;
        const x = Math.random()
        const sector = this._playground.checkFire(x)
        if (sector !== -1) {
            this._x = sector
        } else {
            this._x = -1;
        }
    }
    calcFire(): number {
        const x = Math.random()
        this._x = this._playground.checkFire(x)
        return this._x
    }
    get playground() {
        return this._playground;
    }
    get x() {
        return this._x
    }
}

class AgentTwo {
    _fireStat: number[];
    _playground: PlayGround;
    _freq: number[];
    _point: number;
    _last: number;
    _freqPoint: number;
    _freqed: number;
    _freqNum: number;
    constructor(playground: PlayGround) {
        this._last = -1;
        this._freqPoint = 0;
        this._playground = playground
        this._fireStat = []
        this._freq = []
        this._freqNum = 0;
        this._freqed = 1
        const gradations = playground.gradations;
        for (let index = 0; index < playground.gradations; index++) {
            this._fireStat.push(0);
            this._freq.push(0);
        }
        this._point = Math.max(...this._freq);
    }

    get fireStat() {
        return this._fireStat
    }
    get point() {
        return this._point
    }
    set last(x: number) {
        this._last = x
    }
    checkNextFire(): number {
        if (this._fireStat.reduce((a, b) => a + b) < 20) {
            const fire = Math.random()
            this._freqed = this._playground.checkFire(fire)
        } else {
            this._freqed = this._fireStat.indexOf(Math.max(...this._fireStat));
        }
        return this._freqed;
    }
    ceckFire(x: number) {
        this.last = x;
        if (this._freqed === x) {
            this._freqNum += 1
        }
        this._fireStat[x] += 1;
    }
    calcFreq(i: number): number {
        this._point = this._freqNum / i;
        return this._point;
    }
}

const num = 3; //кількість секцій
const steps = 200; // кількість кроків
let result: { iter: number, x: number, freq: number, fireStat: number[], point: number }[] = []
const fileName = 'result.csv'
const max = 0.6;
let triger = false;

let playground = new PlayGround(num)
let agentOne = new AgentOne(playground);
let agentTwo = new AgentTwo(playground)
let counter = 0;
do {
    let maximum = 0;
    for (let i = 0; i < steps; i++) {
        const freq = agentTwo.checkNextFire()
        const x = agentOne.calcFire()
        agentTwo.ceckFire(x);
        const point =  agentTwo.calcFreq(i);
        result.push({ iter: i, x: x, freq: freq, fireStat: agentTwo.fireStat, point: agentTwo.point })
        if(point >= max && i > 50){
            maximum = point
            playground.regenerateGradations()
            triger = true
        }
        playground.nextStep()
    }
    console.log(triger ? 'Done!!' : `Iteretion false  ${counter}, max point is ${maximum}`);
    if (!triger) {
        playground = new PlayGround(num);
        agentOne = new AgentOne(playground);
        agentTwo = new AgentTwo(playground);
        result = [];
    }
    counter++;
} while (!triger)


let csv: string = ''

for (let i = 0; i < result.length; i++) {
    csv += `${result[i].iter},${result[i].x},${result[i].point}\n`;
}

try {
    fs.writeFileSync(fileName, csv);
} catch (err) {
    console.error(err);
}