import React from 'react';
import axios from 'axios';

class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }
  componentDidMount() {
    const that = this;
    axios.get(`http://www.reddit.com/r/reactjs.json`)
      .then(response => {
        const posts = response.data.data.children.map(obj => obj.data);
        this.setState ({posts});
      })
      .catch(function (error) {
        that.setState ({error})
      });
    }
    render () {
      return (
        <div className="App">
          <header className="App-header">
            {this.state.error && (
              <span>{this.state.error.message}</span>
            )}
            {this.state.posts.length >0 && (
              <ul>
                {this.state.posts.map((post, index) => {
                  return <li key={index}>{post.title}</li>
                })}
              </ul>
            )}
            {(!this.state.posts.length && !this.state.error) && (
              <span>loading..</span>
            )}
          </header>
        </div>
      );
    }
}
export default AppClass;
