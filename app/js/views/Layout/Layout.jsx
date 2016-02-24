import React from 'react';

class Layout extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {main} = this.props;
    return (
      <div className="main">
        {main}
      </div>
    )
  }
}

export default Layout;
