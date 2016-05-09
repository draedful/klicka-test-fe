import React from 'react';


const getTime = function(duration) {
    var second = duration/1000;
    return parseInt(second/60)+':'+parseInt(second%60);
};


export default  React.createClass({
    displayName: 'Track',
    render() {
        var {author, duration, genre, name} = this.props.track;
        return <div className="row track-list--item">
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