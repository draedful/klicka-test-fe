import React from 'react';
import map from 'lodash/map';

import 'style!css!bootstrap';
import 'style!css!style/tracks_list.scss';
import List from '../../api/list.js';
import Track from './item.js';
import SortHeader from './sort.js';
import Pagination from './paginator.js';

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
            <div className="track-list" ref='list'>
                <div className="track-list--wrapper">
                    <table className="table table-striped table-bordered table-hover table-condensed" ref='table'>
                        <SortHeader />
                        <tbody>
                        {this.getItems()}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination />
        </div>
    }
})