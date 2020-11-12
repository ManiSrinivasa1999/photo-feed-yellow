import React from 'react';
import axios from 'axios';

export default class Images extends React.Component {
  state = {
    images: [],
  };

  componentDidMount() {
    axios
      .get(
        'https://api.unsplash.com/search/photos?query=random&client_id=ribDIB12qExVwBVZXk392PWEqRlkGdKTwenGefJ91o4'
      )
      .then((res) => {
        console.log(res.data);
        this.setState({ images: res.data.results });
      });
  }

  render() {
    return (
      <ul>
        {this.state.images.map((result) => (
          <div>
            <img
              src={result.urls.raw}
              id={result.user.id}
              key={result.user.id}
              alt=''
              height='500px'
              width='500px'
            />
          </div>
        ))}
      </ul>
    );
  }
}
