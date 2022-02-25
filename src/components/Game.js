import React from 'react';
import { letters_3, letters_4, letters_5, letters_6, letters_7, letters_8 } from '../assets/WordList';

class Game extends React.Component {

    constructor(props) {
        super(props);
        const {start, end} = this.get_word_pair()
        this.state = {
            start:start,
            end:end
        }
    }

    render(){
        return(
            <div>
                <p>{this.state.start}</p>
                <p>{this.state.end}</p>
            </div>
        );
    }

    get_word_pair() {
        let start_length = this.getRandomInt(3, 8);
        let end_length = this.getRandomInt(3,8);
        while (Math.abs(start_length - end_length) <= 2) {
            end_length = this.getRandomInt(3,8);
        }
        let start, end
        switch(start_length){
            case 3:
                start = letters_3[Math.floor(Math.random()*letters_3.length)];
                break;
            case 4:
                start = letters_4[Math.floor(Math.random()*letters_4.length)];
                break;
            case 5:
                start = letters_5[Math.floor(Math.random()*letters_5.length)];
                break;
            case 6:
                start = letters_6[Math.floor(Math.random()*letters_6.length)];
                break;
            case 7:
                start = letters_7[Math.floor(Math.random()*letters_7.length)];
                break;
            case 8:
                start = letters_8[Math.floor(Math.random()*letters_8.length)];
                break;
            default:
                return -1
        }
        switch(end_length){
            case 3:
                end = letters_3[Math.floor(Math.random()*letters_3.length)];
                break;
            case 4:
                end = letters_4[Math.floor(Math.random()*letters_4.length)];
                break;
            case 5:
                end = letters_5[Math.floor(Math.random()*letters_5.length)];
                break;
            case 6:
                end = letters_6[Math.floor(Math.random()*letters_6.length)];
                break;
            case 7:
                end = letters_7[Math.floor(Math.random()*letters_7.length)];
                break;
            case 8:
                end = letters_8[Math.floor(Math.random()*letters_8.length)];
                break;
            default:
                return -1
        }
        return {
            start:start,
            end:end
        }
    }

    is_valid_word(guess) {

    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }
}

export default Game