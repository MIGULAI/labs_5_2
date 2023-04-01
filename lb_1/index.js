
/**
 * варіант №3 
 * Кросовер: одноточковий
 * Вибір батьків: Колесо релетки
 * Функція пристосованості: adjustment()
 */
const num = 2
let minA = 0.5
let maxA = 1.1
let dom = {}
let A = 0.5
const createX = () => {
    return minA + (maxA - minA) * Math.random()
}
let minB = 1
let maxB = 4.6
const createY = () => {
    return minB + (maxB - minB) * Math.random()
}
const adjustment = (x, y) => {
    return ((-2 * Math.pow(y, 3) + 6 * Math.pow(y, 2) + 6 * y) * Math.sin(Math.log(x) * Math.pow(Math.E, y)))
}

const generateСhromosome = () => {
    let chromosome = {
        x: createX(),
        y: createY(),
    }
    chromosome.fitness = adjustment(chromosome.x, chromosome.y)
    return chromosome
}

const dec2bin = (dec) => {
    return dec.toString(2)
}

function compare(a, b) {
    if (a.fitness < b.fitness) {
        return 1;
    }
    if (a.fitness > b.fitness) {
        return -1;
    }
    return 0;
}



const changeValues = () => {
    let smthMinA = dom.x - A * (maxA - minA) / 2
    let smthMaxA = dom.x - A * (maxA - minA) / 2
    let smthMinB = dom.y - A * (maxB - minB) / 2
    let smthMaxB = dom.y - A * (maxB - minB) / 2
    minA = smthMinA
    maxA = smthMaxA
    minB = smthMinB
    maxA = smthMaxB
}
let liderBoard = []
let iters = 5
const bits = 8  // бітність хромосоми
const numberChroms = 10 // кількість хромосом
// хромосоми
let t = 0 // ітерація
let pSum = 0
let n = Math.ceil(numberChroms / 10)
let liders = []
for (let j = 0; j < 1000; j++) {
    for (let index = 0; index < iters; index++) {
        let P = []
        for (let i = 0; i < numberChroms; i++) {
            let chrom = generateСhromosome()
            P.push(chrom)
            pSum += chrom.fitness
        }
        let arr = P.sort(compare)
        dom = arr[0]
        //console.log(index);
        //let best = arr.splice(0, n)
        liderBoard.push({ ...dom, iter: index })
        changeValues()
    }

    liderBoard.sort(compare)
    liders.push(liderBoard[0]);
}

let sortedLiders = liders.sort(compare)

console.log("Максимальний лідер :  " +"\nx:\t"+ sortedLiders[0].x + '\ny:\t' + sortedLiders[0].y.toString() + "\nfitness:\t" + sortedLiders[0].fitness);
console.log("Мінімальний лідер : "+"\nx:\t"+ sortedLiders[sortedLiders.length-1].x+ '\ny:\t' + sortedLiders[sortedLiders.length-1].y+ "\nfitness:\t" + sortedLiders[sortedLiders.length-1].fitness);