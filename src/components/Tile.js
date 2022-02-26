
import React from 'react';

class Tile extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isTileEnd : false
        }
    }

    render() {
        const {isTileEnd} = this.state;
        return (
            <span key={this.props.keyvalue} className={isTileEnd ? "Tile" : "Tile-End"}>
                {this.props.value}
            </span>
        );
    }
}

export default Tile