
// rules check funcitons
// Checking that there is not a 2 x 2 square of the same color in the table
function squareRule(tiles){
    

    for(const [row, rows] of tiles.entries()){
        for(const [col, ] of rows.entries()){
            if(tiles[row][col] !== 0){
                const square = '' + tiles[row][col] + tiles[row+1]?.[col]  + tiles[row][col+1] + tiles[row+1]?.[col+1];
                if(compare(square)) return false;
            }
        }
    }
    return true;
}

function compare(square){
    const violationModes = ['1111', '2222', '1221', '2112'];            // Different modes of breaking the RULE
    return violationModes.includes(square);
}



// Continuity check for each color

function continuity(tiles, number, color){
    if(number > 0){


        const queue = [];                           // To push every adjacent of current tile
        const checked = {};
        let counter = 0;                            // The number of tiles that are connected
    
        const firstPos = findFirst(tiles, color);                   // Find the first place to start the algorithm
    
    
        const flatPos = firstPos[0] * tiles.length + firstPos[1];
        checked[flatPos] = true;
        queue.push(firstPos);
        counter++;
    
        const dr = [0, 1, 0, -1];
        const dc = [1, 0, -1, 0];
    
        while(queue.length !== 0){
    
            const [row, col] = queue.shift();
    
            for(let d=0; d<4; d++){
                let adjRow = row + dr[d];
                let adjCol = col + dc[d];
                if(tiles[adjRow]?.[adjCol] === color && checked[adjRow * tiles.length + adjCol] !== true){
                        queue.push([adjRow, adjCol]);
                        checked[adjRow * tiles.length + adjCol] = true;
                        counter++
                }
            }
    
        }
        return counter === number;
    }
    return true;

}


function findFirst(tiles, color){

    for(const [row, rows] of tiles.entries()){
        for(const [col, tile] of rows.entries()){
            if(tile === color) return [row, col];
        }
    }
    return undefined;
}

function everyColorContinuity(tiles, numbers = undefined){
    numbers ??= counter(tiles);
    const whiteContinuity = continuity(tiles, numbers[1], 1);
    const blackContinuity = continuity(tiles, numbers[2], 2);
    return whiteContinuity && blackContinuity;
}

function counter(tiles){
    const numbers = {1: 0, 2: 0}

    tiles.forEach(e => {
        e.forEach(t =>{if(t>0) numbers[t]++})
    });

    return numbers;
}
