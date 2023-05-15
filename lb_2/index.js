
/**
 * варіант №3 
 * Кросовер: одноточковий
 * Вибір батьків: Колесо релетки
 * Функція пристосованості: adjustment()
 */
const groupsNumb = 6    // кількість груп
const groups = []
const migrNumb = 2
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
const changeValuesParalel = () => {
    let smthMinA = minA
    let smthMaxA = maxA
    let smthMinB = minB
    let smthMaxB = maxB
    let domMinA = dom.x-smthMinA
    let domMaxA = smthMaxA - dom.x
    if(domMinA < domMaxA){
        smthMinA = dom.x
    }else{
        smthMaxA = dom.x
    }
    let domMinB = dom.y-smthMinB
    let domMaxB = smthMaxB - dom.y
    if(domMinB < domMaxA){
        smthMinB = dom.y
    }else{
        smthMaxB = dom.y
    }
    minA = smthMinA
    maxA = smthMaxA
    minB = smthMinB
    maxA = smthMaxB
}

const migrate = (groups) => {
    let migrationArray = []
    for (let i = 0; i < groups.length; i++) {
        let mArray = []
        for (let j = 0; j < migrNumb; j++) {
            const index = Math.floor(Math.random() * groups[i].length)
            mArray.push(groups[i][index])
            groups[i].splice(index, 1)
        }
        migrationArray.push(mArray)
    }
    for (let i = 0; i < groups.length; i++) {
        const index = Math.floor(Math.random() * migrationArray.length)
        for (let j = 0; j < migrationArray[index].length; j++) {
            groups[i].push(migrationArray[index][j])
        }
        migrationArray.splice(index, 1)
    }
}

let liders = [] // лідери
let liderBoard = []
for (let iteration = 0; iteration < 10; iteration++) {


    for (let i = 0; i < groupsNumb; i++) {
        let iters = 5
        const bits = 8  // бітність хромосоми
        const numberChroms = 10 // кількість хромосом
        let t = 0 // ітерація
        let pSum = 0
        let n = Math.ceil(numberChroms / 10)

        for (let index = 0; index < iters; index++) {
            let P = []
            for (let i = 0; i < numberChroms; i++) {
                let chrom = generateСhromosome()
                P.push(chrom)
                pSum += chrom.fitness
            }
            groups[i] = P
        }
    }
    migrate(groups)
    for (let i = 0; i < groups.length; i++) {
        let arr = groups[i].sort(compare)
        let smallDom = arr[0]
        liderBoard.push({
            ...smallDom
        })
    }
    liderBoard.sort(compare)
    dom = liderBoard[0]
    liders.push(liderBoard[0])
    changeValuesParalel()

}
liders.sort(compare)
console.log(liders[0]);
