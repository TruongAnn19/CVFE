import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { FormattedMessage } from 'react-intl';


class HandBook extends Component {

    render() {


        return (
            <div className='section-share section-medical-facility'>
                <div className='section-contanier'>
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id='homeheader.Hand-book' /></span>
                        <button className='btn-section'><FormattedMessage id='homeheader.Seemore' /></button>
                    </div>
                    <div className='section-body '>
                        <Slider {...this.props.settings}>
                            <div className='specialty-customize'>
                                <div className='bg-img section-medical-facility'></div>
                                <h3>1</h3>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-img section-medical-facility'></div>
                                <h3>2</h3>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-img section-medical-facility'></div>
                                <h3>3</h3>
                            </div>
                            <div className='specialty-customize'>
                                <div className='bg-img section-medical-facility'></div>
                                <h3>4</h3>
                            </div>

                        </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
