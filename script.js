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
    
    
    tileContainer = createDiv();        // Tiles container
    tileContainer.id("tileContainer");
    tileContainer.addClass("tileContainer");
    tileContainer.parent("table");
    

    for(let j=0; j<6; j++){
        for(let i=0; i<6; i++){
            let tile = new Tile(i, j); 
            tils[i][j] = tile; 
        }
    }
    
}



function draw(){

    
}

class Tile{
    constructor(i, j){
        this.i = i;
        this.j = j;
        this.tile = createButton("");
        this.tileInitializer();
    }


    tileInitializer(){                         // Initialize tiles in beginning of game
        this.tile.position(this.j*(69 + 10),this.i*(69 + 10));

        this.tile.addClass("tile");
        this.tile.parent("tileContainer")
        this.tile.addClass('asNormal');
        this.status = 'asNormal';
    }

    setStatus(status){
        this.tile.removeClass('asNormal')
        this.tile.removeClass("asBlack")
        this.tile.removeClass("asWhite")
        this.tile.addClass(status)
        this.status = status;
    }
}

