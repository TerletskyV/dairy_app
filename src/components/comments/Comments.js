import React, { Component } from 'react';

import './Comments.css';

import { generateItemKey } from '../../helpers/generateItemKey';

class Comments extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: generateItemKey(),
            text: '',
            author: 'anonymous',
            avatar: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }

    handleChange(ev) {
        this.setState({
            text: ev.target.value
        })
    }

    submitComment(ev) {
        if (ev.key === 'Enter' && ev.ctrlKey && this.state.text) {
            this.props.addComment(this.state);

            this.setState({
                id: generateItemKey(),
                text: '',
                author: 'anonymous',
                avatar: ''
            })
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <h2 className="text-secondary card-title"> Comments </h2>
                </div>
                <ul className="list-group list-group-flush comments">
                    {this.props.comments ? this.props.comments.map(item => (
                        <li className="list-group-item" key={item.id}>
                            <div className="row">
                                <div className="col-sm-1 p-2">
                                    <div className="avatar"></div>
                                </div>
                                <div className="col-sm-11">
                                    {item.text}
                                </div>
                            </div>
                        </li>
                    )) : ''}
                </ul>
                <div className="row">
                    <div className="input-group">
                        <div className="col-sm-1">
                            <div className="avatar"></div>
                        </div>
                        <div className="col-sm-11">
                            <textarea className="form-control"
                                onChange={this.handleChange}
                                onKeyDown={this.submitComment}
                                value={this.state.text}></textarea>
                        </div>
                    </div >
                </div>
            </div >
        )
    }
}

export default Comments;