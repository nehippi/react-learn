import "./App.css";
import React from "react";

class Image extends React.Component {
    constructor(props) {
        super(props);
        this.addCat = this.addCat.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.imageHeigh = "200";
        this.state = {
            isFirstTime: true,
            error: null,
            isLoaded: false,
            images: [],
            catsElements: [],
            makeTimeout: false
        };
        window.addEventListener("scroll", this.handleScroll);
    }

    handleScroll = (e) => {
        const bottom = e.target.scrollingElement.scrollHeight - this.imageHeigh - e.target.scrollingElement.scrollTop <= e.target.scrollingElement.clientHeight + 1;
        if (bottom) {
            this.addCat();
        }
    }


    addCat() {
        console.log("addCat")
        fetch("https://api.thecatapi.com/v1/images/search?limit=10")
            .then((response) => {
                return response.json();
            })
            .then((arrayOfData) => {
                const buffArray = [];
                arrayOfData.map((data) => {
                    console.log(data);
                    buffArray.push(
                        <div>
                            <img src={data.url} width="200" height={this.imageHeigh}/>
                        </div>
                    );
                });
                this.setState({
                    images: this.state.images.concat(buffArray)
                });
            });
    }


    render() {
        const style = {
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute', // Найдите
        }
        if (this.state.isFirstTime) {
            this.addCat()
            this.setState({
                isFirstTime: false
            });
        }
        const cats = this.state.images;
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
