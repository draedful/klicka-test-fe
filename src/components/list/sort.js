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
        return <thead><tr>
                <th onClick={this.sortBy.bind(this, 'name')}>Название {this.getSortStatus('name')}</th>
                <th  onClick={this.sortBy.bind(this, 'author')}>Автор {this.getSortStatus('author')}</th>
                <th onClick={this.sortBy.bind(this, 'genre')}>Жанр {this.getSortStatus('genre')}</th>
                <th onClick={this.sortBy.bind(this, 'duration')}>Продолжительность {this.getSortStatus('duration')}</th>
            </tr></thead>
    }
})