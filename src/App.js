import "./App.css";
import React from "react";

const IMAGE_HEIGHT = 200;

class ImageList extends React.Component {

    render() {
        const cats = this.props.cats;
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
                <legend>Enter count</legend>
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
            count: 0,
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

    componentDidMount() {
        this.addCat();
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    deleteCat = () => {
        const countToDelete = this.state.countToDelete
        this.setState((prevState) => {
            const buffArray = prevState.images.slice(countToDelete, prevState.images.length);
            return {
                images: buffArray,
                count: buffArray.length,
            }
        });
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
                        const buffArray = prevState.images.concat(arrayOfData)
                        return {
                            count: buffArray.length,
                            images: buffArray,
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

        const handleCountChange = (countToDelete) => {
            this.setState({countToDelete: countToDelete});
        }

        const cats = this.state.images.map((data) => {
            return (
                <div key={data.id}>
                    <img src={data.url} height={IMAGE_HEIGHT} alt="could not download"/>
                </div>)
        });

        const countToDelete = this.state.countToDelete;
        return (<div>
            <div style={divStyle}>
                <p>Count of cats: {this.state.count}</p>
                <button onClick={this.deleteCat}>delete {countToDelete} cats</button>
                <InputForm onCountChange={handleCountChange} count={countToDelete}/>
            </div>
            <ImageList cats={cats}/>
        </div>);
    }
}

export default App;
