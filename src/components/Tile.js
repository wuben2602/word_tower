
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
        const classes = `${isTileEnd ? "Tile" : "Tile-End"}`
        return (
            <span key={Math.random()} className={classes} >
                {this.props.value}
            </span>
        );
    }
}

export default Tile