
// rules check funcitons
// Checking that there is not a 2 x 2 square of the same color in the table
function squareRule(tiles){
    
    console.log("fuck")
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