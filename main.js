const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

//define class
class Field {
    constructor(field = [[]]){
        this.field = field;
        this.xlocation = 0;
        this.ylocation = 0;
        this.field[0][0] = pathCharacter;
    }

    playGame(){
        let stillAlive = true;

        while(stillAlive){
            this.print();
            this.movingQuestion();

            if (!this.inBounds()){
                console.log('');
                console.log('Out of bounds bitch!');
                stillAlive = false;
                break;
            }
            else if (this.isItAHole()){
                console.log('');
                console.log('You fell down a hole you OAF!');
                stillAlive = false;
                break;
            }
            else if (this.isItAHat()){
                console.log('');
                console.log('You son of a bitch you did it!');
                break;
            }

         this.field[this.ylocation][this.xlocation] = pathCharacter;
        }
    }

    movingQuestion(){
        const answer = prompt('Which way? ').toUpperCase();
        if(answer === "W"){
            this.ylocation -= 1;
        } 
        else if (answer === "S"){
            this.ylocation += 1;
        }
        else if (answer === "A"){
            this.xlocation -= 1;
        }
        else if (answer === "D"){
            this.xlocation += 1;
        }
        else {
            console.log('Please enter only W, A, S, or D');
            this.movingQuestion;
        }
    }

    inBounds(){
        return(
        this.ylocation >= 0 &&
        this.xlocation >= 0 &&
        this.ylocation < this.field.length &&
        this.xlocation < this.field[0].length
        );
    }

    isItAHole(){
        return this.field[this.ylocation][this.xlocation] === hole;
    }

    isItAHat(){
        return this.field[this.ylocation][this.xlocation] === hat;
    }

    print(){
        const displayGame = this.field.map(row => {
            return row.join('');
        }).join('\n');
        console.log(displayGame);
    }

    static generateField(height, width, percentage = 0.1) {
        const field = new Array(height).fill(0).map(el => new Array(width));
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const prob = Math.random();
            field[y][x] = prob > percentage ? fieldCharacter : hole;
          }
        }
        // Set the "hat" location
        const hatLocation = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height)
        };
        // Make sure the "hat" is not at the starting point
        while (hatLocation.x === 0 && hatLocation.y === 0) {
          hatLocation.x = Math.floor(Math.random() * width);
          hatLocation.y = Math.floor(Math.random() * height);
        }
        field[hatLocation.y][hatLocation.x] = hat;
        return field;
      }
}

const myField = new Field(Field.generateField(10,10,0.2));

  myField.playGame();