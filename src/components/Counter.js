import React from "react";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

export function Counter(props) {
    return (
        <p>Count of cats: {props.count}</p>
    );
}

const mapStateToProps = state => ({
    count: state.images.length
})

Counter.propTypes = {
    count: PropTypes.number
}

Counter.defaultProps={
    count: 0
}

export default connect(mapStateToProps)(Counter);
