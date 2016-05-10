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
        return <ul className='pagination pagination-lg'>
            <li className={List.allowPrev() ? '' : 'disabled'}><a href="#" onClick={this.toPrev}>&laquo;</a></li>
            {
                map(this.getPages(), (value)=> {
                    return <li className={currentPage == value ? 'active' : ''}><a href="#"  onClick={this.toPage.bind(this,value)}>{value}</a></li>
                })
            }
            <li className={List.allowNext() ? '' : 'disabled'}><a href="#" onClick={this.toNext}>&raquo;</a></li>
        </ul>
    }
})