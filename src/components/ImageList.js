import React from "react";
import {connect} from 'react-redux'
import PropTypes from "prop-types";

const IMAGE_HEIGHT = 200; //todo: clarify how to define common constants

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
    countToDelete: PropTypes.array,
}

export default connect()(ImageList);