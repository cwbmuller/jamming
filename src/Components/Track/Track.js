import React, { Component } from 'react';
import './Track.css';


class Track extends Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }
    renderAction(isRemoval) {
        if (isRemoval) {
            return (<span onClick={this.removeTrack}>-</span>);
        } else {
            return(<span onClick={this.addTrack}>+</span>);
        }
    }
    addTrack(e) {
        this.props.onAdd(this.props.track);
        e.preventDefault();
    }
    removeTrack(e) {
        this.props.onRemove(this.props.track);
        e.preventDefault();
    }
  render() {
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{this.props.track.name}</h3>
                <p>{this.props.track.album} | {this.props.track.artist}</p>
            </div>
            <a className="Track-action">{this.renderAction(this.props.isRemoval)}</a>
        </div>
    );
  }
}

export default Track;