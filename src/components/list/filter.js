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
    getPattern(name) {
        return ListModel.get('match').get(name);
    },
    filterBy(name, e) {
        ListModel.get('match').set(name, e.target.value);
    },
    setLimit(e) {
        ListModel.set('limit', e.target.value);
    },
    render() {
        return <form role="form" >
            <div className='form-group'>
                <label ntmlFor='name'>Название</label>
                <input className="form-control" onChange={this.filterBy.bind(this, 'name')} value={this.getPattern('name')}/>
            </div>
            <div className='form-group'>
                <label ntmlFor='name'>Автор</label>
                <input className="form-control" onChange={this.filterBy.bind(this, 'author')} value={this.getPattern('author')}/>
            </div>
            <div className='form-group'>
                <label ntmlFor='name'>Жанр</label>
                <input className="form-control" onChange={this.filterBy.bind(this, 'genre')} value={this.getPattern('genre')}/>
            </div>
            <div className='form-group'>
                <label ntmlFor='name'>Лимит</label>
                <input className="form-control" onChange={this.setLimit} value={ListModel.get('limit')}/>
            </div>
        </form>
    }
})