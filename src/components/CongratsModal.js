import React from 'react';

class CModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: props.type
        }
    }

    export() {
        return this.props.guesses.map((guess) => <p>{guess}</p>);
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="Modal">
                <div className="ModalContent">
                    <div className="TextContent">
                        <h1>Congrats!</h1>
                        <h2>Tries: {this.props.guesses.length - 1}</h2> 
                        <div className="Scrollable">
                            {this.export()}
                        </div>
                    </div>
                    <button className="WButton" onClick={this.props.hide}> Close </button>
                </div>
            </div>
        );
    }
}

export default CModal 