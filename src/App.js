import "./App.css";
import React from "react";

const IMAGE_HEIGHT = 200;

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
        this.props.childFunc(this.deleteCat);
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }



    deleteCat = () =>{
        const countToDelete = this.props.countToDelete
        this.setState((prevState) => {
            const buffArray = prevState.images;
            buffArray.slice(0,countToDelete);
            return {images: buffArray}
        });
    }

    addCat = () => {
        if (!this.state.isFetching) {
            console.log("addCat")
            this.setState({
                isFetching: true
            });
            fetch("https://api.thecatapi.com/v1/images/search?limit=5")
                .then((response) => {
                    return response.json();
                })
                .then((arrayOfData) => {
                    this.setState((prevState) => {
                        const buffArray = prevState.images.concat(arrayOfData)
                        this.props.updateParentState(buffArray.length);
                        return {
                            images: buffArray,
                            isFetching: false
                        }
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
        if(this.state.images.length>20){
            this.deleteCat();
        }
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
            count: null,
            countToDelete: null,
            childFunc: null
        };

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
        const updateParentState = (count) => {
            this.setState({count: count});
        }

        const setFunction = (func) => {
            this.setState({childFunc: func})
        }

        const handleClick = () => {
        this.state.childFunc();
        }

        const countToDelete = this.state.countToDelete;
        return (<div>
            <div style={divStyle}>
                <p>Count of cats: {this.state.count}</p>
                <button onClick={handleClick}>delete {countToDelete} cats</button>
                <InputForm  onCountChange={handleCountChange} count={countToDelete}/>
            </div>
            <Image updateParentState={updateParentState} childFunc={setFunction()}/>
        </div>);
    }
}

export default App;
