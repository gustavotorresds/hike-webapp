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

import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokaiSublime } from 'react-syntax-highlighter/styles/hljs';

class ContentListItem extends Component {
    constructor(props) {
        super(props);

        // Set state according to content.
        const cont = Contents.findOne({_id: this.props.contentId});
        if(cont.type === 'text') {
            this.state = {
                rawHtml: cont.core,
                type: 'text',
            };
        } else if(cont.type === 'video') {
            this.state = {
                url: cont.core,
                type: 'video',
            };
        } else if (cont.type === 'image') {
            this.state = {
                url: cont.core,
                type: 'image',
            };
        } else if(cont.type === 'code') {
            this.state = {
                code: cont.core.code,
                language: cont.core.language,
                type: 'code',
            };
        }
    }

    render() {
        let content = null;
        if(this.state) {
            if(this.state.type === 'text') {
                content = <div dangerouslySetInnerHTML={{__html: this.state.rawHtml }}/>; 
            } else if(this.state.type === 'video') {
                content = <div className="embed-responsive embed-responsive-16by9 mb-5">
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
            <div className="row">
                <div className="col-md-10">
                    <div className={css(style.contentItem)}>
                        {content}
                    </div>
                </div>
            </div>
        );
    }
}

class CourseContent extends Component {
    renderContents() {
        if(this.props.lecture) {
            const contentsList = this.props.lecture.contents.map((contentId) => {
                return <ContentListItem key={contentId} contentId={contentId}/>
            });

            return contentsList;
        }
    }

    render() {
        const content = this.props.hasAccess ?
            <div>{this.renderContents()}</div> :
            <div className={css(style.blockedContainer)}>
                <div className="row justify-content-center">
                    <div class="col-md-4">
                        <div className="text-center">
                            Oi! :) Que bom que vc tem interesse na Hike! Para ter acesso, é só clicar no botão abaixo!
                        </div>
                        <img className="img-fluid" src="/locker.png"/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-6 text-center">
                        <a class="btn btn-primary" href="/pagamento">Quero esse curso f0d#@!</a>
                    </div>
                </div>
            </div>;

        return (
            <div>
                <h2>{this.props.lecture ? this.props.lecture.title : ''}</h2>
                {content}                
            </div>
        );
    }
}

export default withTracker((props) => {
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
