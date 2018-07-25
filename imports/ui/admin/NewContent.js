import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import NewText from './NewText.js';
import NewVideo from './NewVideo.js';
import NewImage from './NewImage.js';
import NewCode from './NewCode.js';

import { Contents } from '../../api/contents.js';
import { Lectures } from '../../api/lectures.js';

class NewContent extends Component {
	render() {
		return(
			<Tabs
				className="mt-5"
				selectedTabClassName={css(style.selectedTab)}
				selectedTabPanelClassName={css(style.selectedPanel)}>
			    <TabList className={css(style.tabList)}>
			      <Tab className={css(style.tabTitle)}>Rich Text</Tab>
			      <Tab className={css(style.tabTitle)}>Video URL</Tab>
			      <Tab className={css(style.tabTitle)}>Image URL</Tab>
			      <Tab className={css(style.tabTitle)}>Code</Tab>
			    </TabList>

			    <TabPanel className={css(style.tabPanel)}>
			    	<NewText lectureId={this.props.lectureId}/>
			    </TabPanel>
			    <TabPanel className={css(style.tabPanel)}>
			     	<NewVideo lectureId={this.props.lectureId}/>
			    </TabPanel>
			    <TabPanel className={css(style.tabPanel)}>
			     	<NewImage lectureId={this.props.lectureId}/>
			    </TabPanel>
			    <TabPanel className={css(style.tabPanel)}>
			     	<NewCode lectureId={this.props.lectureId}/>
			    </TabPanel>
		  </Tabs>
		);
	}
}

export default NewContent;

const style = StyleSheet.create({
	tabTitle: {
		display: 'inline',
		padding: '15px',
		margin: '0',
		':hover': {
			cursor: 'pointer',
		},
	},
	selectedTab: {
		backgroundColor: 'white',
		border: '1px solid #ced4da',
		borderBottom: 'none',
		borderRadius: '5px 5px 0 0',
	},
	tabList: {
		margin: '0'
	},
	selectedPanel: {
		border: '1px solid #ced4da',
		padding: '20px',
        backgroundColor: 'white',
	}
});