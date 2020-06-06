import React, { Component } from 'react';

class Pokemon extends Component {
    render() {
        console.log(this.props.match.params.id);
        return (
        <p>POKEMON {this.props.match.params.id}</p>
        );
    }
}

export default Pokemon;