'use strict'

const tils = [[], [], [], [], [], []];

let tileContainer;
let table;

function setup(){
    createCanvas(700, 700)

    table = createDiv();
    table.addClass("table")
    table.id("table")
    table.position(15,15)
    
    createTiles();

}



function draw(){

    
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
        this.tile.removeClass(constants.NORMAL)
        this.tile.removeClass(constants.BLACK)
        this.tile.removeClass(constants.WHITE)
        this.tile.addClass(status)
        this.status = status;
    }
    
    statusCycle = () => {

        if(this.status !== constants.WHITE){
            
            this.setStatus(constants.WHITE)
        }else{
            this.setStatus(constants.BLACK)
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
}

const constants = {
    TILE_SIZE : 69,             // Size of tiles, width===hight
    DISTANCE : 10,              // The distance between each tile
    //Different stauses and same names with style classes:
    NORMAL : "asNormal",        
    WHITE : "asWhite",
    BLACK : "asBlack",
}

