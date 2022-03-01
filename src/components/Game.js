import React from 'react';
import Tile from './Tile'
import IModal from './InstructionsModal'
import CModal from './CongratsModal';

import { get_word_pair, ws2_is_valid_guess } from './Logic'

class Game extends React.Component {

    constructor(props) {
        super(props);
        const { start, end } = get_word_pair()
        this.state = {
            goal: end,
            count: 0,
            guesses: [start],
            inputString: "",
            modal: false,
            modalC: false,
            win: false
        }

        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.showCongrats = this.showCongrats.bind(this);
        this.hideCongrats = this.hideCongrats.bind(this);
        this.showInstructions = this.showInstructions.bind(this);
        this.hideInstructions = this.hideInstructions.bind(this);
    }

    handleKeyPress(e) {
        if(this.state.win){
            console.log("win");
            return;
        }
        if (e.key.length === 1 && (/[a-zA-Z]/).test(e.key) && this.state.inputString.length < 8) {
            this.setState(prev => ({
                inputString: prev.inputString += e.key
            }));
        } else if (e.key === "Backspace") {
            this.setState(prev => ({
                inputString: prev.inputString.slice(0, -1)
            }));
        } else if (e.key === "Enter") {
            let prev_word = this.state.guesses[this.state.count];
            let curr_word = this.state.inputString.toUpperCase();
            if (ws2_is_valid_guess(prev_word, curr_word)) {
                if (curr_word === this.state.goal) {
                    console.log("yes");
                    this.showCongrats();
                }
                let new_array = ([...this.state.guesses, curr_word]);
                this.setState(prev => ({
                    count: prev.count + 1,
                    guesses: new_array,
                    inputString: ""
                }));
                //console.log(prev_word, curr_word)
            } else {
                //console.log(prev_word, curr_word);
            }
        }
    }

    showCongrats() {
        this.setState({
            modalC: true,
        });
    }

    hideCongrats() {
        this.setState({
            modalC: false,
        });
    }

    showInstructions() {
        this.setState({ modal: true });
    }

    hideInstructions() {
        this.setState({ modal: false })
    }

    render() {
        let guess = Array.from(this.state.guesses[this.state.count])
        let tile_array = guess.map((letter) =>
            <Tile value={letter}></Tile>
        );
        let input = Array.from(this.state.inputString)
        let input_array = []
        for (let i = 0; i < 8; i++) {
            if (input[i]) {
                input_array.push(<Tile value={input[i].toUpperCase()}></Tile>)
            } else {
                input_array.push(<Tile value={'\u2002'}></Tile>)
            }
        }
        return (
            <div autoFocus className="Body" onKeyDown={this.handleKeyPress} tabIndex={0}>
                <div className="Info">
                    <h1> Word Sandwich</h1>
                    <div>
                        <h4><b> Goal: {this.state.goal} </b></h4>
                        <p> Tries: {this.state.count} </p>
                    </div>
                </div>
                <div className="Game">
                    <IModal show={this.state.modal} hide={this.hideInstructions}></IModal>
                    <CModal show={this.state.modalC} hide={this.hideCongrats} guesses={this.state.guesses}></CModal>
                    <div>
                        <div className="TileBox">
                            {tile_array}
                        </div>
                        <div className="InputBox">
                            {input_array}
                        </div>
                    </div>
                    <div className="ButtonBox">
                        <button className="WButton" onClick={this.showInstructions}>Instructions</button>
                    </div>
                </div>
            </div>
        );
    }
}
// TODO:
// 1. Win Screen
// 3. Date Specific Word Generation
// 4. Instruction Modals
// 5. Animations?
// Rules:
// 1. Try to transform start word to goal word in the least amount of tries as possible.
// 2. You can do three things:
// 2a. Remove the first letter and find a word that uses the remaining section
// 2b. Remove the last letter and find a word that uses the remaining section
// 2c. Remove both the first and last letter and find a word that uses the remaining section
// 2d. Remove everything but the first and last letter and create a word with it (you can use the first and last letter interchangeably)
export default Game