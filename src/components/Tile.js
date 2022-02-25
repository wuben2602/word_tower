import React from 'react'

class Tile extends React.Component{

    render(){
        return(
            <span className="Tile">
                {this.props.value}
            </span>
        );
    }
}