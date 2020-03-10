import React, { Component } from 'react';

class Bigscreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="bigscreen">
                <div className="player">
                    <iframe
                        src="https://player.twitch.tv/?channel=ajilla"
                        height="100%"
                        width="100%"
                        frameborder="0"
                        scrolling="false"
                        allowfullscreen="true">
                    </iframe>
                </div>
                {
                    this.props.screenType == "chat" &&
                    <div className="chat">
                        <iframe frameborder="0"
                            scrolling="no"
                            id="chat_embed"
                            src="https://www.twitch.tv/embed/ajilla/chat"
                            height="100%"
                            width="100%">
                        </iframe>
                    </div>
                }
            </div>
        );
    }
}

export default Bigscreen;