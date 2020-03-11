import React, { Component } from 'react';
import Logo from '../../media/ajillapinkblue.png';
import PlayingIcon from '../../media/playingicon.png';
import Right from '../Right/right';

class Navigation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewercount: 0,
            showStatsModal: false
        }

        this.handleViewerUpdate = this.handleViewerUpdate.bind(this);
        this.toggleStatsModal = this.toggleStatsModal.bind(this);
    }

    toggleStatsModal() {
        this.setState({
            showStatsModal: !this.state.showStatsModal
        })
    }

    handleViewerUpdate(viewcount) {
        setInterval(() => {
            fetch(this.props.api + '/viewcount')
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    viewercount: result
                })
            })
        }, 10000)
    }

    componentDidMount() {
        fetch(this.props.api + '/viewcount')
        .then(res => res.json())
        .then((result) => {
            this.setState({
                viewercount: result
            })
        })

        this.handleViewerUpdate();
    }

    render() {
        return(
            <>
                {
                    this.state.showStatsModal &&
                    <div className="modal">
                        <div className="modal-content">
                            <iframe src="https://sullygnome.com/channel/ajilla" height="100%" width="100%">

                            </iframe>
                        </div>
                    </div>
                }
                <div className="navblur">
                </div>
                <div className="navigation">
                    <div className="content">
                        <div className="left">
                            <div className="infowrap live">
                                <div className="dot">
                                </div>
                                <div>
                                    {this.state.viewercount}
                                </div>
                            </div>
                            <div className="infowrap song">
                                <img src={PlayingIcon} alt="Now Playing Icon" />
                                <div className="songoverflow">
                                    {this.props.artist} - {this.props.song}
                                </div>
                            </div>
                        </div>

                        <div className={this.state.showStatsModal ? "mid midactive" : "mid"}>
                            <img src={Logo} alt="logo" onClick={this.toggleStatsModal}/>
                        </div>

                        <Right sendScreenType={this.props.updateScreenType} currentscreentype={this.props.currentscreentype}/>

                    </div>
                </div>
            </>
        );
    }
}

export default Navigation;