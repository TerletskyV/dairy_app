import React, { Component } from 'react';

class InputForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            inputValue: '',
            valid: true
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(ev) {
        this.setState({
            inputValue: ev.target.value
        });
    }

    handleSubmit(ev) {
        ev.preventDefault();

        if (this.state.inputValue) {

            this.props.addItem(this.state.inputValue);

            this.setState({
                inputValue: '',
                valid: true
            });
        } else {
            this.setState({
                valid: false
            });
        }
    }

    render() {
        return (
            <form className="form-row" onSubmit={this.handleSubmit}>
                <div className="col-sm-9">
                    <input type="text" className="form-control" placeholder={this.state.valid ? "Type name here..." : "Type something!"}
                        onChange={this.handleChange} value={this.state.inputValue} />
                </div>
                <div className="col-sm-3">
                    <button className="form-control btn btn-info" onClick={this.handleSubmit}> Add new </button>
                </div>
            </form>
        )
    }
}

export default InputForm;