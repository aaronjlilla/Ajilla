import React, {Component} from 'react';

//Link Icons
import DonateIcon from '../../media/buttons/donate.png';
import MailIcon from '../../media/buttons/mail.png';
import SubscribeIcon from '../../media/buttons/subscribe.png';
import YoutubeIcon from '../../media/buttons/youtube.png';
import TwitterIcon from '../../media/buttons/twitter.png';
import TwitchIcon from '../../media/buttons/twitch.png';
import DiscordIcon from '../../media/buttons/discord.png';

//Control Icons
import ExpandIcon from '../../media/buttons/expand.png';
import ChatIcon from '../../media/buttons/chat.png';

import LinkButton from './links/button';
import ControlButton from './controls/button';

class Right extends Component {
    constructor(props) {
        super(props);

        this.state = {
            linkbuttons: [
                {name: "donate", icon: DonateIcon, location: "https://streamelements.com/ajilla/tip", helper: "Donate"},
                {name: "mail", icon: MailIcon, location: "mailto:aaronjlilla@gmail.com", helper: "E-Mail"},
                {name: "subscribe", icon: SubscribeIcon, location: "https://www.twitch.tv/subs/ajilla", helper: "Subscribe"},
                {name: "youtube", icon: YoutubeIcon, location: "#", helper: "Youtube"},
                {name: "twitter", icon: TwitterIcon, location: "#", helper: "Twitter"},
                {name: "twitch", icon: TwitchIcon, location: "https://twitch.tv/ajilla", helper: "Twitch"},
                {name: "discord", icon: DiscordIcon, location: "https://discord.gg/shDyXDU", helper: "Discord"}
            ],
            controlbuttons: [
                {name: "fullscreen", icon: ExpandIcon, helper: "Full Screen"},
                {name: "chat", icon: ChatIcon, helper: "Show Chat"}
            ]
        }

        this.handleLinkClick = this.handleLinkClick.bind(this);
        this.handleControlClick = this.handleControlClick.bind(this);
    }

    handleLinkClick(location) {
        if (location !== "#") {
            window.open(location, '_blank');
        }
    }

    handleControlClick(type) {
        this.props.sendScreenType(type);
    }

    render() {
        return(
        <div className="right">
            <div className="controlswrap">
                {
                    this.state.controlbuttons.map(button => {
                        return <ControlButton type={button.name} icon={button.icon} handler={this.handleControlClick} helper={button.helper} active={(button.name == this.props.currentscreentype) ? true : false}/>
                    })
                }
            </div>
            <div className="buttonwrap">
                {
                    this.state.linkbuttons.map(button => {
                        return <LinkButton icon={button.icon} alt={button.name} location={button.location} handler={this.handleLinkClick} helper={button.helper}/>
                    })
                }
            </div>
        </div>
        );
    }
}

export default Right;