import React from "react";
import {deleteImage} from "../actions";
import {connect} from "react-redux";
import PropTypes from 'prop-types';

function DeleteButton(props) {
    const deleteCat = () => {
        const countToDelete = props.countToDelete;
        if (countToDelete !== 0) {
            props.deleteImages(countToDelete);
        }
    }
    return (<button onClick={deleteCat}>delete {props.countToDelete} cats</button>)
}

const mapStateToProps = state => ({
    countToDelete: Number(state.countToDelete),
    images: state.images
})

const mapDispatchToProps = dispatch => ({
    deleteImages: (countToDelete) => dispatch(deleteImage(countToDelete))
})

DeleteButton.defaultProps = {
    countToDelete: 0,
}

DeleteButton.propTypes = {
    countToDelete: PropTypes.number,
    deleteImages: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton)
