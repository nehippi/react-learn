import "./App.css";
import React from "react";

const IMAGE_HEIGHT = 200;

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


class InputForm extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.onCountChange(e.target.value);
    }

    render() {
        const count = this.props.count;
        return (
            <fieldset>
                <label>Enter count</label>
                <input type="number" value={count}
                       onChange={this.handleChange}/>
            </fieldset>
        );
    }
}


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            countToDelete: 0,
            isFetching: false,
            images: [],
        };
    }

    handleScroll = (e) => {
        const bottom = e.target.scrollingElement.scrollHeight - IMAGE_HEIGHT - e.target.scrollingElement.scrollTop <= e.target.scrollingElement.clientHeight + 1;
        if (bottom) {
            this.addCat();
        }
    }

    handleCountChange = (countToDelete) => {
        this.setState({countToDelete});
    }

    componentDidMount() {
        this.addCat();
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    deleteCat = () => {
        if (this.state.countToDelete !== 0) {
            const {countToDelete} = this.state;
            this.setState((prevState) => {
                const images = prevState.images.slice(countToDelete);
                return {
                    images,
                }
            });
        }
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
                    this.setState((prevState) => {
                        const images = [...prevState.images, ...arrayOfData];
                        return {
                            images,
                            isFetching: false
                        }
                    });
                });
        }
    }

    render() {
        const divStyle = {
            position: 'sticky',
            top: '20px',
            marginLeft: '400px',
            width: '200px',
        };

        const {countToDelete,images} = this.state;
        return (<div>
            <div style={divStyle}>
                <p>Count of cats: {images.length}</p>
                <button onClick={this.deleteCat}>delete {countToDelete} cats</button>
                <InputForm onCountChange={this.handleCountChange} count={countToDelete}/>
            </div>
            <ImageList data={images}/>
        </div>);
    }
}

export default App;
