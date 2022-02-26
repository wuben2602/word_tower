import React from 'react';
import Tile from './Tile'
import { get_word_pair, ws_is_valid_guess } from './Logic'

class Game extends React.Component {

    constructor(props) {
        super(props);
        const { start, end } = get_word_pair()
        this.state = {
            goal: end,
            count: 0,
            guesses: [start],
            inputString: ""
        }

        this.handleKeyPress = this.handleKeyPress.bind(this)
    }

    handleKeyPress(e) {
        if (e.key.length === 1 && (/[a-zA-Z]/).test(e.key)) {
            this.setState(prev => ({
                inputString : prev.inputString += e.key
            }));
        } else if (e.key === "Backspace") {
            this.setState(prev => ({
                inputString : prev.inputString.slice(0,-1)
            }));
        } else if (e.key === "Enter") {
            let prev_word = this.state.guesses[this.state.count];
            let curr_word = this.state.inputString.toUpperCase();
            if(ws_is_valid_guess(prev_word, curr_word)){
                if (curr_word === this.state.goal){
                    alert("win")
                }
                let new_array = ([...this.state.guesses, curr_word]);
                this.setState(prev => ({
                    count : prev.count + 1,
                    guesses : new_array,
                    inputString : ""
                }));
                console.log(prev_word, curr_word)
            } else {
                console.log(prev_word, curr_word);
                alert("bad guess");
            }
        }
    }

    render() {
        let guess = Array.from(this.state.guesses[this.state.count])
        let tile_array = guess.map((letter, index) =>
            <Tile keyvalue={index} value={letter}></Tile>
        );
        let input = Array.from(this.state.inputString)
        let input_array = []
        for (let i = 0; i < 8; i++) {
            if (input[i]) {
                input_array.push(<Tile keyvalue={i} value={input[i].toUpperCase()}></Tile>)
            } else {
                input_array.push(<Tile keyvalue={i} value={'\u2002'}></Tile>)
            }
        }
        tile_array[0].setState(()=>({isTileEnd : true}));
        tile_array[tile_array.length-1].setState(()=>({isTileEnd : true}));
        input_array[0].setState(()=>({isTileEnd : true}));
        input_array[input_array.length-1].setState(()=>({isTileEnd : true}));

        return (
            <div autoFocus className="Body" onKeyDown={this.handleKeyPress} tabIndex={0}>
                <div className="Info">
                    <h1> Word Sandwich</h1>
                    <p> Goal: {this.state.goal} </p>
                    <p> Tries: {this.state.count} </p>
                </div>
                <div className="Game">
                    <div>
                        <div className="TileBox">
                            {tile_array}
                        </div>
                        <div className="InputBox">
                            {input_array}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game