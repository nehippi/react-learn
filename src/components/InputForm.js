import React from "react";
import {updateCountToDelete} from "../actions";
import {connect} from "react-redux";
import PropTypes from "prop-types";

export function InputForm(props) {
    const handleChange = (e) => {
        props.updateCountToDelete(e.target.value);
    }

    return (
        <fieldset>
            <label>Enter count</label>
            <input type="number" value={props.countToDelete}
                   onChange={handleChange} min={0}/>
        </fieldset>
    );
}

const mapStateToProps = state => ({
    countToDelete: state.countToDelete
})

const mapDispatchToProps = dispatch => ({
    updateCountToDelete: countToDelete => dispatch(updateCountToDelete(countToDelete))
})

InputForm.defaultProps = {
    countToDelete: 0,
}

InputForm.propTypes = {
    countToDelete: PropTypes.number,
    updateCountToDelete: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(InputForm);
