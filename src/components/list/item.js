import React from 'react';


const getTime = function(duration) {
    var second = duration/1000;
    return parseInt(second/60)+':'+parseInt(second%60);
};


export default  React.createClass({
    displayName: 'Track',
    render() {
        var {author, duration, genre, name} = this.props.track;
        return <tr>
            <td>{name}</td>
            <td>{author}</td>
            <td>{genre}</td>
            <td>{getTime(duration)}</td>

        </tr>
    }
});