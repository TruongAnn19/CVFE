import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';


class About extends Component {

    render() {


        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Video
                </div>
                <div className='secion-about-content'>
                    <div className='content-left'>
                        <iframe
                            width="100%"
                            height="400px"
                            src="https://www.youtube.com/embed/BsNm0Zv6hnE?list=RDBsNm0Zv6hnE"
                            title="NẮNG LUNG LINH - NGUYỄN THƯƠNG (OFFICIAL MUSIC VIDEO)"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen>

                        </iframe>
                    </div>
                    <div className='content-right'>
                        <p>
                            Hello Would!
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
