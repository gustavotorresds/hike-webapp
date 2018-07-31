import React, { Component } from 'react';

import { withTracker } from 'meteor/react-meteor-data';

class Index extends Component {
    render() {
        return (
            <div>
              <h1>Index</h1>
            </div>
        );
    }
}

export default withTracker((props) => {
	return {

	};
})(Index);