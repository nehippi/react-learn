import React from "react";
import {addCat} from "../actions";
import {connect} from "react-redux";
import ImageList from "./ImageList";
import PropTypes from "prop-types";
import {IMAGE_HEIGHT} from "../constants";

export class ImageListContainer extends React.Component {
    handleScroll = (e) => {
        const bottom = e.target.scrollingElement.scrollHeight - IMAGE_HEIGHT - e.target.scrollingElement.scrollTop <= e.target.scrollingElement.clientHeight + 1;
        if (bottom) {
            this.props.addImagesToStore();
        }
    }

    componentDidMount() {
        this.props.addImagesToStore();
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }


    render() {
        return (
            <ImageList data={this.props.images}/>
        );
    }

}

function mapStateToProps(state) {
    return {
        images: state.images,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addImagesToStore: () => dispatch(addCat()),
    }
}



ImageListContainer.defaultProps = {
    images: [],
}

ImageListContainer.propTypes = {
    images: PropTypes.array,
    addImagesToStore: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageListContainer)