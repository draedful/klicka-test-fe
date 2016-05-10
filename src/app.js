import List from './components/list/list.js';
import React from 'react';
import FilterHeader from './components/list/filter.js';
import 'style!css!style/index.scss';
export default () => {
    return (
        <div className='container'>
            <div className='col-md-4 col-sm-4 col-xs-12 col-lg-4 '>
                <FilterHeader />
            </div>
            <div className='col-md-8 col-sm-8 col-xs-12 col-lg-8 '>
                <List />
            </div>
        </div>
    )
}