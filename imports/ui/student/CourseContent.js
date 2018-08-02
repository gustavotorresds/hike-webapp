/*
 * TODO: is it fine to use the method dangerouslySetInnerHTML()?
 * TODO: I don't feel good about having the content as a state. I feel like it
 * shold be a prop.
 */

import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { StyleSheet, css } from 'aphrodite';

import { Contents } from '../../api/contents.js';
import { Lectures } from '../../api/lectures.js';

import LectureComments from './LectureComments.js';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/styles/hljs';

class ContentListItemRaw extends Component {
    componentDidUpdate(prevProps, prevState) {
        if(prevProps !== this.props) {
            const cont = this.props.content;
            if(!cont) {
                console.log('RETURNING');
                return;
            }

            if(cont.type === 'text') {
                this.setState({
                    rawHtml: cont.core,
                    type: 'text',
                });
            } else if(cont.type === 'video') {
                this.setState({
                    url: cont.core,
                    type: 'video',
                });
            } else if (cont.type === 'image') {
                this.setState({
                    url: cont.core,
                    type: 'image',
                });
            } else if(cont.type === 'code') {
                this.setState({
                    code: cont.core.code,
                    language: cont.core.language,
                    type: 'code',
                });
            }
        }
    }

    render() {
        let content = null;
        if(this.state) {
            if(this.state.type === 'text') {
                content = <div dangerouslySetInnerHTML={{__html: this.state.rawHtml }}/>; 
            } else if(this.state.type === 'video') {
                content = <div className="embed-responsive embed-responsive-16by9">
                  <iframe className="embed-responsive-item" src={this.state.url} allowFullScreen></iframe>
                </div>
            } else if(this.state.type === 'image') {
                // TODO: allow different image sizes
                content = <img className="img-fluid" src={this.state.url}/>
            } else if(this.state.type === 'code') {
                // TODO: include file name
                content = <div>
                    <div className={css(style.aceHeader)}>{this.state.language}</div>
                    <SyntaxHighlighter language={this.state.language} style={monokaiSublime}>{this.state.code}</SyntaxHighlighter>
                </div>;
            }
        }

        return (
            <div className="row mb-5">
                <div className="col-md-12">
                    <div className={css(style.contentItem)}>
                        {content}
                    </div>
                </div>
            </div>
        );
    }
}

const ContentListItem = withTracker((props) => {
    Meteor.subscribe('content', props.contentId);

    return {
        content: Contents.findOne({_id: props.contentId}),
    }
})(ContentListItemRaw);

class CourseContent extends Component {
    renderContents() {
        if(this.props.lecture && this.props.lecture.contents) {
            const contentsList = this.props.lecture.contents.map((contentId) => {
                return <ContentListItem key={contentId} contentId={contentId}/>
            });

            return contentsList;
        }
    }

    render() {
        const content = this.props.hasAccess ?
            <div>
                {this.renderContents()}
                <LectureComments lectureId={this.props.lectureId}/>
            </div> :
            <div className={css(style.blockedContainer)}>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <div className="text-center">
                            Oi! :) Que bom que vc tem interesse na Hike! Para ter acesso, é só clicar no botão abaixo!
                        </div>
                        <img className="img-fluid" src="/locker.png"/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center">
                        <a className="btn btn-primary" href={'/buy/' + this.props.courseId}>Quero esse curso f0d#@!</a>
                    </div>
                </div>
            </div>;

        return (
            <div className="container">
                <h3 className="mt-4 mb-5">{this.props.lecture ? this.props.lecture.title : ''}</h3>
                {content}                
            </div>
        );
    }
}

export default withTracker((props) => {
    Meteor.subscribe('lecture', props.lectureId);

    return {
        lecture: Lectures.findOne({_id: props.lectureId})
    };
})(CourseContent);

const style = StyleSheet.create({
    contentItem: {
        margin: '0'
    },
    aceHeader: {
        backgroundColor: 'black',
        color: 'white',
        textTransform: 'uppercase',
        padding: '10px',
        fontSize: '10pt',
    },
    blockedContainer: {
        backgroundColor: '#E5E5E5',
        padding: '50px',
    }
});
