import React from "react";
import {addImages} from "../actions";
import {connect} from "react-redux";
import ImageList from "./ImageList";
import PropTypes from "prop-types";

const IMAGE_HEIGHT = 200;

class ImageListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
        };
    }

    handleScroll = (e) => {
        const bottom = e.target.scrollingElement.scrollHeight - IMAGE_HEIGHT - e.target.scrollingElement.scrollTop <= e.target.scrollingElement.clientHeight + 1;
        if (bottom) {
            this.addCat();
        }
    }

    componentDidMount() {
        this.addCat();
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    addCat = () => {
        if (!this.state.isFetching) {
            this.setState({
                isFetching: true
            });
            fetch("https://api.thecatapi.com/v1/images/search?limit=10")
                .then((response) => {
                    return response.json();
                })
                .then((arrayOfData) => {
                    this.props.addImagesToStore(arrayOfData)
                    this.setState({
                        isFetching: false
                    });
                });

        }
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
        addImagesToStore: (data) => dispatch(addImages(data)),
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