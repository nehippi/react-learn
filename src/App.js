import "./App.css";
import React from "react";

let IMAGE_HEIGHT = 200;

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            error: null,
            isLoaded: false,
            images: [],
            catsElements: [],
            makeTimeout: false
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
            console.log("addCat")
            this.setState({
                isFetching: true
            });
            fetch("https://api.thecatapi.com/v1/images/search?limit=10")
                .then((response) => {
                    return response.json();
                })
                .then((arrayOfData) => {
                    const buffArray = [];
                    arrayOfData.forEach((imageData) => {
                        console.log(imageData);
                        buffArray.push(imageData);
                    });
                    this.setState({
                        images: this.state.images.concat(buffArray),
                        isFetching: false
                    });
                });
        }
    }


    render() {
        const cats = this.state.images.map((data) => {
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

function App(props) {
    return <Image/>;
}

export default App;
