import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styles from '../scss/Countdown.scss';

class Countdown extends Component {
    constructor(props) {
        super(props);
        this.state = {current: props.number};
    }

    componentDidMount() {
        setTimeout(() => {
          this.countDownAndRedirect();
        }, 1000);
    }

    countDownAndRedirect() {
        if (this.state.current - 1 > 0) {
            this.setState({current: this.state.current - 1});
            setTimeout(() => {
                this.countDownAndRedirect();
              }, 1000);
        } else {
            let {redirectTo} = this.props;
            window.location.replace(redirectTo);
        }
    }

    render() {
        return (
            <div className={'countdown'}>
                <div className={'countdownBack'}/>
                <p className={'countdownText'}>{this.state.current}</p>
            </div>
        );
    }
}

Countdown.propTypes = {
    number: PropTypes.number,
    redirectTo: PropTypes.string
};

export default Countdown;