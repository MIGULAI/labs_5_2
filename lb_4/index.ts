class PlayGround {
    _sections: {a1:number, a2:number}[];
    _gradations: number;
    constructor(gradations: number) {
        this._sections = [];
        this._gradations = gradations;
        this.regenerateGradations()
         console.log(this._sections);
        
    }
    get gradations() {
        return this._gradations
    }
    set gradations(x: number) {
        this._gradations = x
    }
    addSection(obj: {a1:number , a2:number}): void {
        this._sections.push(obj)
    }
    regenerateGradations(): void {
        let min = 0;
        const max = 1;
        let arr = new Array();
        for (let index = 0; index < this._gradations - 1; index++) {
            const el = Math.random();
            arr.push(el);
        }
        arr = arr.sort((x, y) => x - y)
        for (let index = 0; index < arr.length; index++) {
            this._sections.push({ a1: min, a2: arr[index] });
            min = arr[index]
            if (index === arr.length - 1) {
                this._sections.push({ a1: min, a2: max });
            }
        }
    }
    checkFire(x: number): number{
        for (let index = 0; index < this._sections.length; index++) {
            if(x > this._sections[index].a1 && x < this._sections[index].a2 )
            {
                return index;
            }
        }
        return -1
    }
}

class AgentOne {
    _playground: PlayGround;
    private _x: number;
    constructor(playground: PlayGround) {
        this._playground = playground;
        const x = Math.random()
        console.log(x);
        
        const sector = this._playground.checkFire(x)
        if (sector !== -1) {
            this._x = sector
        }else{
            this._x = -1;
            console.log('Error Agent One');
        }
    }
    calcFire(): number{
        return 1;
    }
    get playground() {
        return this._playground;
    }
    get x (){
        return this._x
    }
}

class AgentTwo {
    _fireStat: number[];
    _playground: PlayGround;
    constructor(playground: PlayGround){
        this._playground = playground
        this._fireStat = []
        let arr = [];
        const gradations = playground.gradations;
        for (let index = 0; index < playground.gradations; index++) {
            this._fireStat.push(0);  
        }
        console.log(this._fireStat);
    }

    ceckFire(x: number){
        this._fireStat[x] += 1;
        console.log(x, this._fireStat);

    }
}

const num = 3 //кількість секцій



const playground = new PlayGround(num)
const agentOne = new AgentOne(playground);
const agentTwo = new AgentTwo(playground)
const x = agentOne.x
agentTwo.ceckFire(x)