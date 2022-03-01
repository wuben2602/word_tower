import React from 'react';

class IModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: props.type
        }
    }

    render() {
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="Modal">
                <div className="ModalContent">
                    <div className="TextContent">
                        <h1> Rules </h1>
                        <p>The goal of Word Sandwich is to try to transform the start word to the goal word in the least amount of tries as possible.</p>
                        <p>You can remove the first letter and create a word with the rest of the letters</p>
                        <p>You can remove the last letter and create a word with the rest of the letters</p>
                        <p>You can remove both the first and last letter and create a word with the rest of the letters</p>
                        <p>You can remove everything but the first and last letter and create a word with the first and last letter</p>
                    </div>
                    <button className="WButton" onClick={this.props.hide}> Close </button>
                </div>
            </div>
        );
    }
}

export default IModal 