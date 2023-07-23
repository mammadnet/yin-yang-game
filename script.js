'use strict'

const tils = [[], [], [], [], [], []];

let tileContainer;
let buttonContainer;
let boardContainer;
let table;

function setup(){
    createCanvas(700, 700)

    boardContainer = createDiv();
    boardContainer.addClass("boardContainer");
    boardContainer.id("boardContainer");
    boardContainer.position(90,20)

    table = createDiv();
    table.addClass("table")
    table.id("table")
    table.parent("boardContainer")
    createTiles();
    
    buttonContainer = createDiv();
    buttonContainer.addClass("buttonContainer");
    buttonContainer.id("buttonContainer");
    buttonContainer.parent("boardContainer")


    buttonInitializer();

}



function draw(){

    
}

function buttonInitializer(){
    const reset = createButton("Reset");
    const undo = createButton("Undo");
    const redo = createButton("Redo");
    reset.parent("buttonContainer");
    reset.addClass("button");
    reset.mouseClicked(resetGame);

    undo.parent("buttonContainer");
    undo.addClass("button");
    redo.parent("buttonContainer");
    redo.addClass("button");

}

function createTiles(){
    tileContainer = createDiv();        // Tiles container
    tileContainer.addClass("tileContainer");
    tileContainer.id("tileContainer");
    tileContainer.parent("table");
    
    for(let j=0; j<6; j++){
        for(let i=0; i<6; i++){
            let tile = new Tile(i, j); 
            tils[i][j] = tile;
        }
    }
}

function resetGame(){
    for(const arr of tils){
        for(const tile of arr){
            tile.reset();
        }
    }
}

class Tile{

    constructor(i, j){
        this.i = i;
        this.j = j;
        this.tile = createButton("");
        this.tileInitializer();

        this.clickListener();
    }


    tileInitializer(){                         // Initialize tiles in beginning of game

        this.tile.position(this.j*(constants.TILE_SIZE + constants.DISTANCE),
                            this.i*(constants.TILE_SIZE + constants.DISTANCE));

        this.tile.addClass("tile");
        this.tile.parent("tileContainer")
        this.tile.addClass(constants.NORMAL);
        this.status = constants.NORMAL;
    }
    
    setStatus(status){
        this.tile.removeClass(this.status)
        this.tile.addClass(status)
        this.counter(this.status, status)
        this.status = status;
    }
    
    statusCycle = () => {

        if(this.status !== constants.WHITE){
                this.setStatus(constants.WHITE);
        }else{
                this.setStatus(constants.BLACK);
        }
    }

    clickListener(){

        this.tile.mousePressed(()=>{
            this.tile.mouseReleased(()=>{
                if(mouseButton === LEFT)
                    this.statusCycle();

                if(mouseButton === RIGHT)
                    this.setStatus(constants.NORMAL);
            })
            
        })
    }

    squareRule(){
        const i = this.i;
        const j = this.j;
        const TL = tils[i-1]?.[j].status === this.status && tils[i][j-1]?.status === this.status && tils[i-1][j-1].status === this.status;
        const TR = tils[i+1]?.[j].status === this.status && tils[i][j-1]?.status === this.status && tils[i+1][j-1].status === this.status;
        const BL = tils[i-1]?.[j].status === this.status && tils[i][j+1]?.status === this.status && tils[i-1][j+1].status === this.status;
        const BR = tils[i+1]?.[j].status === this.status && tils[i][j+1]?.status === this.status && tils[i+1][j+1].status === this.status;
        return !(TL || TR || BL || BR);
    }

    counter(previos, next){
        number[previos]--;
        number[next]++;
    }

    reset(){
        this.setStatus(constants.NORMAL)
    }
}

const constants = {
    TILE_SIZE : 69,             // Size of tiles, width===hight
    DISTANCE : 10,              // The distance between each tile
    //Different stauses and same names with style classes:
    NORMAL : "asNormal",        
    WHITE : "asWhite",
    BLACK : "asBlack",
}

const number={
    [constants.NORMAL]: 36,
    [constants.WHITE] : 0,
    [constants.BLACK] : 0
}

// Prevent options from bieng displayed in the browser by right-click
window.addEventListener("contextmenu", e => e.preventDefault());

