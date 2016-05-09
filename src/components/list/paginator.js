import React from 'react';
import map from 'lodash/map';

import List from '../../api/list.js';

import 'style!css!sass!style/paginator.scss';

var PAGE_LIMIT = 5;

export default React.createClass({
    displayName: 'Pagination',
    getPages() {
        /**
         * TODO: Ваще хрень какая-то, пока писал запутался
         * */
        var pages = List.pages,
            currentPage = List.currentPage,
            delta = Math.ceil((PAGE_LIMIT-1)/2),
            from = currentPage - delta > 0 ?  currentPage - delta : 0,
            to = currentPage + delta < pages ? List.currentPage + delta + 1 : pages;

        var slice = [];

        for(var i =from; i < to ; i++) {
            slice.push(i+1);
        }

        return slice;
    },
    toPage(page) {
        List.toPage(page);
    },
    toPrev() {
        List.prev();
    },
    toNext() {
        List.next();
    },
    render() {
        var currentPage = List.currentPage;
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