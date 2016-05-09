import React from 'react';
import map from 'lodash/map';

import List from '../../api/list.js';
import Track from './item.js';
import FilterHeader from './filter.js';
import SortHeader from './sort.js';
import Pagination from './paginator.js';

import 'style!css!sass!style/tracks_list.scss';

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
        return map(this.state.items, item => <Track key={item._id} track={item}/>)
    },
    next () {
        List.next().then(() => {
            requestAnimationFrame(() => {
                this.refs.list.scrollTop = this.refs.table.offsetHeight;
            })
        })
    },
    render() {
        return <div>

            <FilterHeader />
            <Pagination />
            <div className="track-list" ref='list'>
                <div className="track-list--wrapper">
                    <div className="table" ref='table'>

                        <SortHeader />
                        {this.getItems()}
                    </div>
                </div>
            </div>
        </div>
    }
})