import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showPopover: false
        }

        this.showPopOver = this.showPopOver.bind(this);
        this.hidePopOver = this.hidePopOver.bind(this);
    }

    showPopOver() {
        this.setState({
            showPopover: true
        })
    }

    hidePopOver() {
        this.setState({
            showPopover: false
        })
    }

    render() {
        return(
            <div className="button" onClick={() => this.props.handler(this.props.location)}>
                {
                    this.state.showPopover &&
                    <div className="popover">{this.props.helper}</div>
                }
                <div className="buttoncontent" onMouseEnter={this.showPopOver} onMouseLeave={this.hidePopOver}>
                    <img src={this.props.icon} alt={this.props.alt} />
                </div>
            </div>
        );
    }
}

export default Button;