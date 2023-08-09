
// rules check funcitons
// Checking that there is not a 2 x 2 square of the same color in the table
function squareRule(tiles){
    
    let TL, TR, BL, BR;         // Top Left, Top Right, Bottom Left, Bottom Right
    for(const [row, rows] of tiles.entries()){
        for(const [col, ] of rows.entries()){
            if(tiles[row][col] !== 0){
                TL = tiles[row-1]?.[col] === tiles[row][col] && tiles[row][col-1] === tiles[row][col] && tiles[row-1][col-1] === tiles[row][col];
                TR = tiles[row+1]?.[col] === tiles[row][col] && tiles[row][col-1] === tiles[row][col] && tiles[row+1][col-1] === tiles[row][col];
                BL = tiles[row-1]?.[col] === tiles[row][col] && tiles[row][col+1] === tiles[row][col] && tiles[row-1][col+1] === tiles[row][col];
                BR = tiles[row+1]?.[col] === tiles[row][col] && tiles[row][col+1] === tiles[row][col] && tiles[row+1][col+1] === tiles[row][col];
                if(TL || TR || BL || BR) return false;
            }
        }
    }
    return true;
}



// Continuity check for each color

function continuity(tiles, number, color){
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


function findFirst(tiles, color){

    for(const [row, rows] of tiles.entries()){
        for(const [col, tile] of rows.entries()){
            if(tile === color) return [row, col];
        }
    }
    return undefined;
}