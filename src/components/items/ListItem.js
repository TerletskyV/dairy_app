import React, { Component } from 'react';

class ListItem extends Component {

    render() {
        return (
            <li className={"list-group-item list-group-item-action d-flex justify-content-between align-items-center" + (this.props.isActive ? ' isActive' : '')} id={this.props.id} onClick={this.props.onClick}>
                <h6>
                    {this.props.text} <span className="badge badge-info badge-pill">{this.props.commentNumber || 0}</span>
                </h6>
                <button className="btn btn-outline-danger ml-auto" onClick={ev => this.props.deleteItem(ev.target.parentNode.id)} >Delete</button>
            </li>
        );
    }
}

export default ListItem;