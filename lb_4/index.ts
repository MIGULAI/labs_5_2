class PlayGround {
    _lowEdge: number;
    _hightEdge: number;

    constructor(){
        this._hightEdge = 1;
        this._lowEdge = 0;
    }
    get lowEdge(){
        return this._lowEdge;
    }
    get hightEdge(){
        return this._hightEdge
    }
    set lowEdge(x: number){
        this._lowEdge = x
    }
    set hightEdge(x: number){
        this._hightEdge = x
    }
}


class AgentOne {
    _playground;
    constructor(){
        this._playground = new PlayGround();
        const a1 = Math.random();
        const a2 = Math.random() * (1 -a1 ) + a1;
        this.generateValues(a1, a2);
    }

    generateValues(a1: number, a2: number){
       // console.log(a1, a2);
        this._playground.lowEdge = a1;
        this._playground.hightEdge = a2;

    }

    playground() {
        return this._playground;
    }
    getLowEdge(){
        return this._playground.lowEdge
    }
}

class AgentTwo {
    
}

const agentOne = new AgentOne();
console.log(agentOne.getLowEdge());