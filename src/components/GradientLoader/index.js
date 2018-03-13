import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './gradient-loader.scss';

export const GradientLoader = ({ className }) => {
    return (
        <div
            className={classNames('gradient-loader', {
                [className]: className
            })}
        >
            <div className="animated-background">
                <div className="background-masker first-end" />
                <div className="background-masker second-line" />
                <div className="background-masker second-end" />
                <div className="background-masker third-line" />
                <div className="background-masker third-end" />
            </div>
        </div>
    );
};

GradientLoader.propTypes = {
    className: PropTypes.string
};

export default GradientLoader;
