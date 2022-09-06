import React from "react";
import {addImages, endDowloadingImages, startDowloadingImages} from "../actions";
import {connect} from "react-redux";
import ImageList from "./ImageList";
import PropTypes from "prop-types";
import {IMAGE_HEIGHT} from "../constants";

class ImageListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
        };
    }

    handleScroll = (e) => {
        const bottom = e.target.scrollingElement.scrollHeight - IMAGE_HEIGHT - e.target.scrollingElement.scrollTop <= e.target.scrollingElement.clientHeight + 1;
        if (bottom&&!this.props.isFetching) {
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
        isFetching: state.isFetching,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addImagesToStore: () => dispatch(addCat()),
    }
}

function addCat(){
    return (dispatch) => {
        dispatch(startDowloadingImages())
        fetch("https://api.thecatapi.com/v1/images/search?limit=10")
            .then((response) => {
                return response.json();
            })
            .then((arrayOfData) => {
                dispatch(addImages(arrayOfData));
                dispatch(endDowloadingImages())
            });

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