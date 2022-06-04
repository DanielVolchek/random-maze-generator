import {dimensions} from "./app.js"
export class square {
    constructor() {
        this.color = "#fff";
        this.clicked = false;
        this.modifiedClick = false;
    }
    click = () => {
        this.modifiedClick = true;
        if (this.clicked){
            console.log("clicked is true")
            // blank
            this.color = "#fff";
            this.clicked = false;
        }
        else{
            console.log("clicked is false")
            // filled in
            this.color = "#00ff44";
            this.clicked = true;
        }
    }
    setEnd = () => {
        this.modifiedClick = true;
        if (this.clicked){
            // blank
            this.color = "#fff";
            this.clicked = false;
        }
        else{
            // filled in
            this.color = "#";
            this.clicked = true;
        }
    }
}