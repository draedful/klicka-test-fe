import React from 'react';
import ReactDOM from 'react-dom';
import FlipMove from 'react-flip-move';
import List from '../../api/list.js';
import ListModel from '../../api/list_model.js';

var getTime = function(duration) {
    var second = duration/1000;
    return parseInt(second/60)+':'+parseInt(second%60);
};

var Track = React.createClass({
    displayName: 'Track',
    render() {
        var {author, duration, genre, name} = this.props.track;
        return <div className="row track-list--item">
            <div className="column track-list--item__avatar"></div>
            <div className="column column-1">
                {name}
            </div>
            <div className="column column-1">
                {author}
            </div>
            <div className="column column-1">
                {genre}
            </div>
            <div className="column track-list--item__duration">
                {getTime(duration)}
            </div>
        </div>
    }
});

export default React.createClass({
    displayName: 'TrackList',
    getInitialState(){
        return {
            items: List.getData()
        }
    },
    componentDidMount() {
        List.onUpdate(() => {
            this.setState({
                items: List.getData()
            })
        });
        List.update();
    },
    getItems() {
        return this.state.items.map(item => <Track key={item._id} track={item}/>)
    },
    sort () {
        ListModel.sortBy('author');
    },
    next () {
        List.next().then(() => {
            requestAnimationFrame(() => {
                this.refs.list.scrollTop = this.refs.table.offsetHeight;
            })
        })
    },
    render() {
        return <div><div className="track-list" ref='list'>
            <div className="track-list--wrapper">
                <div className="table" ref='table'>
                    {this.getItems()}
                </div>
            </div>
        </div>
            <button onClick={this.sort}>Sort</button>
            <button onClick={this.next}>Next</button>
        </div>
    }
})