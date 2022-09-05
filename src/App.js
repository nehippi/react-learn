import "./App.css";
import InputForm from "./components/InputForm";
import React from "react";
import DeleteButton from "./components/DeleteButton";
import ImageListContainer from "./components/ImageListContainer";
import Counter from "./components/Counter";


class App extends React.Component {
    render() {
        const divStyle = {
            position: 'sticky',
            top: '20px',
            marginLeft: '400px',
            width: '200px',
        };

        return (<div>
            <div style={divStyle}>
                <Counter/>
                <DeleteButton/>
                <InputForm/>
            </div>
            <ImageListContainer/>
        </div>);
    }
}

export default App;
