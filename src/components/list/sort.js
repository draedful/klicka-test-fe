import React from 'react';
import ListModel from '../../api/list_model.js';


export default React.createClass({
    componentDidMount() {
        this.removeUpdate = ListModel.onUpdate('match', () => {
            this.forceUpdate();
        })
    },
    componentWillUnmount() {
        this.removeUpdate();
    },
    getSortStatus(name) {
        return ListModel.get('sort').get(name);
    },
    sortBy(name) {
        ListModel.sortBy(name);
    },
    render() {
        return <div className="row track-list--item">
            <div className="column column-1" onClick={this.sortBy.bind(this, 'name')}>
                Название {this.getSortStatus('name')}
            </div>
            <div className="column column-1"  onClick={this.sortBy.bind(this, 'author')}>
                Автор {this.getSortStatus('author')}
            </div>
            <div className="column column-1"  onClick={this.sortBy.bind(this, 'genre')}>
                Жанр {this.getSortStatus('genre')}
            </div>
            <div className="column track-list--item__duration"  onClick={this.sortBy.bind(this, 'duration')}>
                Продолжительность {this.getSortStatus('duration')}
            </div>
        </div>
    }
})