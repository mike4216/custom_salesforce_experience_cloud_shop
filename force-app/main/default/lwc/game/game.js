import ContactMobile from '@salesforce/schema/Case.ContactMobile';
import MailingPostalCode from '@salesforce/schema/Contact.MailingPostalCode';
import { LightningElement, track } from 'lwc';


export default class Game extends LightningElement {
    score = 0;
    blockSize = 40;

    @track gameBlocks = new Map();
    renderComplete = false;
    xSpeed = 1;
    ySpeed = 0;

    xHead = 0;
    yHead = 0;

    xMax;
    yMax;

    box = new Map();
    innerBox;

    startGame(){
        setInterval(() => { 
            // this.move();
        }, 300);
    }

    // move(){
    //     // let curPosIndex = this.gameBlocks.findIndex(x => x.id === `${this.xHead}:${this.yHead}`);

    //     this.gameBlocks[curPosIndex].snake  = false;

    //     this.xHead += this.xSpeed;
    //     this.yHead += this.ySpeed;

    //     if(this.xHead >= this.xMax){
    //         this.xHead = 0;
    //     }

    //     if(this.xHead < 0){
    //         this.xHead = this.xMax - 1;
    //     }

    //     if(this.yHead >= this.yMax){
    //         this.yHead = 0;
    //     }

    //     if(this.yHead < 0){
    //         this.yHead = this.yMax - 1;
    //     }


    //     let newPosIndex = this.gameBlocks.findIndex(x => x.id === `${this.xHead}:${this.yHead}`);
    //     this.gameBlocks[newPosIndex].snake  = true;        
    // }

    renderedCallback(){
        if(!this.renderComplete){
            let eWigth = this.template.querySelector('.game_container').clientWidth;
            let eHeigth = this.template.querySelector('.game_container').clientHeight;

            this.xMax = Math.floor(eWigth/this.blockSize);
            this.yMax = Math.floor(eHeigth/this.blockSize);
            console.log(this.yMax);
            let tmpBlocks = []

            for(let y = 0; y < this.yMax; y++){
                for(let x = 0; x < this.xMax; x++){
                    let obj;
                    if (x == 0 && y == 0){
                        obj = {id: `${x}:${y}`, active: true, box: false};
                    }else{
                        obj = {id: `${x}:${y}`, active: false, box: false};
                    }
                   
                    tmpBlocks.push(obj);
                    this.gameBlocks.set(`${x}:${y}`, tmpBlocks.indexOf(obj, 0));
                }

            }

            
            this.renderComplete = true;
            this.addKeyboardsControls();
            this.innerBox = tmpBlocks;
            console.log(this.gameBlocks);
            // this.startGame();
        }
        
    }

    renderBox(xPoint, yPoint){
        // let startBoxPoint = this.gameBlocks.findIndex(x => x.id == `${xPoint}:${yPoint}`);

        let boxSize = 6;
        for(let y = yPoint;  y < boxSize; y++){
            for(let x = xPoint; x < boxSize; x++){
                this.box.set(`${x}:${y}`, {
                    active: false,
                    box: true
                });
            }
        }

        console.log(this.box);
    }

    addKeyboardsControls(){
        window.addEventListener('keydown', (e)=>{
            e.preventDefault();
            console.log(e);
            switch(e.key){
                case "ArrowUp":
                    this.xSpeed = 0;
                    this.ySpeed = -1;
                    break;
                case "ArrowDown":
                    this.xSpeed = 0;
                    this.ySpeed = 1;
                    break;
                case "ArrowLeft":
                    this.xSpeed = -1;
                    this.ySpeed = 0;
                    break;
                case "ArrowRight":
                    this.xSpeed = 1;
                    this.ySpeed = 0;
                    break;


            }
        })
    }
}