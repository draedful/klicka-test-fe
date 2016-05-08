import React from 'react';
import ReactDOM from 'react-dom';
import FlipMove from 'react-flip-move';
import List from '../../api/list.js';
import ListModel from '../../api/list_model.js';
import 'style!css!sass!style/tracks_list.scss';
import 'style!css!sass!style/paginator.scss';
import map from 'lodash/map';

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

var FilterHeader = React.createClass({
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
    render() {
        return <div className="row track-list-header">
            <div className="column track-list--item__avatar">
                <input onChange={this.filterBy.bind(this, 'name')} value={this.getPattern('name')}/>
            </div>
            <div className="column column-1"></div>
            <div className="column column-1">
                <input onChange={this.filterBy.bind(this, 'author')} value={this.getPattern('author')}/>
            </div>
            <div className="column column-1">
                <input onChange={this.filterBy.bind(this, 'genre')} value={this.getPattern('genre')}/>
            </div>
            <div className="column track-list--item__duration"></div>
        </div>
    }
});

var SortHeader = React.createClass({
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
        return <div className="row track-list-header">
            <div className="column track-list--item__avatar" onClick={this.sortBy.bind(this,'name')}>
                Название
                {this.getSortStatus('name')}
            </div>
            <div className="column column-1"></div>
            <div className="column column-1" onClick={this.sortBy.bind(this,'author')}>
                Исполнитель
                {this.getSortStatus('author')}
            </div>
            <div className="column column-1" onClick={this.sortBy.bind(this,'genre')}>
                Жанр
                {this.getSortStatus('genre')}
            </div>
            <div className="column track-list--item__duration" onClick={this.sortBy.bind(this,'duration')}>
                Продолжительность
                {this.getSortStatus('duration')}
            </div>
        </div>
    }
});

var Pagintor = React.createClass({
    displayName: '',
    getPages() {
        var pages = List.length/ListModel.get('limit')
        if(pages <= 5) {
            return map(new Array(pages), (value, index) => {
                return index;
            });
        }
    },
    toPage(page) {
        ListModel.set('page', page);
    },
    toPrev() {
        ListModel.prevPage();
    },
    toNext() {
        ListModel.nextPage();
    },
    render() {
        var currentPage = ListModel.get('page');
        return <div className='paginator'>
            <span className='paginator-item' onClick={this.toPrev} >prev</span>
            {
                map(this.getPages(), (value)=> {
                    return <span
                        className={'paginator-item'+(currentPage == value ? ' current' : '')}
                        onClick={this.toPage.bind(this,value)}
                        key={value}>
                        {value}
                    </span>
                })
            }
            <span className='paginator-item' onClick={this.toNext} >next</span>
        </div>
    }
})

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
                    <FilterHeader />
                    <SortHeader />

                    {this.getItems()}
                </div>
            </div>
            <Pagintor />
        </div>
        </div>
    }
})