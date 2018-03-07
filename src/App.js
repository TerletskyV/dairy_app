import React, { Component } from 'react';

import './App.css';

import { generateItemKey } from './helpers/generateItemKey';
import Storage from './helpers/storage';

import Items from './components/items/Items';
import Comments from './components/comments/Comments';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: []
    }

    this.storage = new Storage('dairy_app_items');

    this.getCurrentActiveItem = this.getCurrentActiveItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setActive = this.setActive.bind(this);
    this.addComment = this.addComment.bind(this);
    this.addItem = this.addItem.bind(this);
  }

  componentWillMount() {
    this.setState({
      items: this.storage.getItems(),
    })
  }

  getCurrentActiveItem() {
    const items = this.storage.getItems();
    let filtered = items.filter(item => item.active === true)

    return filtered[0] || null;
  }

  addItem(text) {
    this.storage.setItem({
      id: generateItemKey(),
      text,
      comments: [],
      active: false
    });

    this.setState({
      items: this.storage.getItems()
    });
  }

  deleteItem(id) {
    this.storage.removeItem(id)

    this.setState({
      items: this.storage.getItems()
    });
  }

  setActive(id) {
    let items = this.storage.getItems().map(item => {
      item.active = item.id === id;
      return item;
    });

    this.storage.setItems(items);

    this.setState({
      items
    });
  }

  addComment(comment) {
    let activeItem = this.getCurrentActiveItem();
    activeItem.comments.push(comment);
    this.storage.setItem(activeItem);

    this.setState({
      items: this.storage.getItems()
    });
  }

  render() {
    const activeItem = this.getCurrentActiveItem();

    return (
      <div className="row">
        <div className="col-sm-2">
          <div className="side-block bg-dark">
            <h3 className="text-light"> DAIRY APP </h3>
            <h6 className="text-muted"> Comment with no sense </h6>
          </div>
        </div>
        <div className="col-sm-5">
          <Items items={this.state.items}
            addItem={this.addItem}
            deleteItem={this.deleteItem}
            setActive={this.setActive}
          />
        </div>
        <div className="col-sm-5">
          <Comments comments={activeItem ? activeItem.comments : []}
            addComment={this.addComment} />
        </div>
      </div>
    );
  }
}

export default App;
