import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import NewText from './NewText.js';
import NewVideo from './NewVideo.js';
import NewImage from './NewImage.js';

import { Contents } from '../../api/contents.js';
import { Lectures } from '../../api/lectures.js';

class NewContent extends Component {

	render() {
		return(
			<Tabs>
		    <TabList>
		      <Tab>Rich Text</Tab>
		      <Tab>Video URL</Tab>
		      <Tab>Image URL</Tab>
		    </TabList>

		    <TabPanel>
		    	<NewText lectureId={this.props.lectureId}/>
		    </TabPanel>
		    <TabPanel>
		     	<NewVideo lectureId={this.props.lectureId}/>
		    </TabPanel>
		    <TabPanel>
		     	<NewImage lectureId={this.props.lectureId}/>
		    </TabPanel>
		  </Tabs>
		);
	}
}

export default NewContent;