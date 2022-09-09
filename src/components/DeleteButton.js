import React from "react";
import {deleteImage} from "../actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

export function DeleteButton(props) {
    const deleteCat = () => {
        const countToDelete = props.countToDelete;
        if (countToDelete !== 0) {
            props.deleteImages();
        }
    }
    return (<button onClick={deleteCat}>delete {props.countToDelete} cats</button>)
}

const mapStateToProps = state => ({
    countToDelete: state.countToDelete,
})

const mapDispatchToProps = dispatch => ({
    deleteImages: () => dispatch(deleteImage())
})

DeleteButton.defaultProps = {
    countToDelete: 0,
}

DeleteButton.propTypes = {
    countToDelete: PropTypes.number,
    deleteImages: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton)
