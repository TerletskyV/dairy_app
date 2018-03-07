import React, { Component } from 'react';

import './Items.css';


import InputForm from './InputForm';
import ListItem from './ListItem';

class Items extends Component {
    constructor(props) {
        super(props)

        this.setActive = this.setActive.bind(this);
    }

    setActive(ev) {
        if (ev.target.innerText.toLowerCase() != 'delete') {
            this.props.setActive(ev.target.id)
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h2 className="text-secondary card-title">Items</h2>
                    <InputForm
                        addItem={this.props.addItem} />
                    <br />
                    <ul className="list-group list-group-flush">
                        {this.props.items.map(item => <ListItem key={item.id}
                            id={item.id}
                            text={item.text}
                            isActive={item.active}
                            commentNumber={item.comments.length}
                            deleteItem={this.props.deleteItem}
                            onClick={this.setActive} />)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Items;