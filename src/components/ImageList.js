import React from "react";
import PropTypes from "prop-types";
import {IMAGE_HEIGHT} from "../constants";


class ImageList extends React.Component {
    render() {
        const cats = this.props.data.map((data) => {
            return (
                <div key={data.id}>
                    <img src={data.url} height={IMAGE_HEIGHT} alt="could not download"/>
                </div>)
        });
        return (
            <div>
                {cats}
            </div>
        );
    }
}

ImageList.defaultProps = {
    data: [],
}

ImageList.propTypes = {
    data: PropTypes.array,
}

export default ImageList

