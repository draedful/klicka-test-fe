import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table';
import List from '../api/list.js';

export default React.createClass({
    displayName: 'List',
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
        })
    },
    render() {
        return <Table
            rowHeight={50}
            headerHeight={50}
            rowsCount={this.state.items.length}
            width={1000}
            height={500}
            >
            <Column
                cell={<ImageCell data={dataList} col="avartar" />}
                fixed={true}
                width={50}
                />
        </Table>
    }
})