import React from "react";
import ReactDOM from "react-dom";
import Masonry from "react-masonry-component";

import "./styles.css";

function Search({ onChange, onSubmit }) {
  return (
    <div className="search">
      <input type="text" onChange={onChange} />
      <input type="submit" onClick={onSubmit} />
    </div>
  );
}

function Gallery({ posts }) {
  return (
    <div className="gallery__container">
      <Masonry className={"my-gallery-class"}>{posts}</Masonry>
    </div>
  );
}

class App extends React.Component {
  state = {
    subreddit: "earthporn",
    posts: []
  };

  componentDidMount() {
    this.getPosts();
  }

  getPosts() {
    fetch(`https://www.reddit.com/r/${this.state.subreddit}.json`)
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({ posts: response.data.children });
      })
      .catch(error => {
        throw error;
      });
  }

  renderPosts() {
    const childElements = this.state.posts.map(element => {
      const { post_hint, name, title, url, permalink } = element.data;

      if (post_hint === "image") {
        return (
          <li className="image-element-class" key={name} title={title}>
            <a href={`https://www.reddit.com${permalink}`}>
              <img src={url} />
            </a>
          </li>
        );
      }
    });

    return childElements;
  }

  onChange = event => {
    this.setState({ subreddit: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();

    this.getPosts();
  };

  render() {
    return (
      <div className="App">
        <Search onChange={this.onChange} onSubmit={this.onSubmit} />
        <Gallery posts={this.renderPosts()} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
