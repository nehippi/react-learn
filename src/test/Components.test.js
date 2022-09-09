import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Counter} from "../components/Counter";
import {DeleteButton} from "../components/DeleteButton";
import ImageList from "../components/ImageList";
import {ImageListContainer} from "../components/ImageListContainer";
import {InputForm} from "../components/InputForm";
import {ADD, END, START} from "../constants";
import {addCat} from "../actions";

configure({adapter: new Adapter()});


describe("Counter", () => {
    it("should render counter", () => {
        const wrapper = shallow(<Counter count={1}/>);
        expect(wrapper).toMatchSnapshot();
    });
});

describe("Delete button render", () => {
    it("should render Delete button", () => {
        const deleteImages = jest.fn();
        const wrapper = shallow(<DeleteButton countToDelete={1} deleteImages={deleteImages}/>);
        expect(wrapper).toMatchSnapshot();
    });
});

describe("Delete button onClick", () => {
    it("should handle onClick in Delete button", () => {
        const deleteImages = jest.fn();
        const wrapper = shallow(<DeleteButton countToDelete={1} deleteImages={deleteImages}/>);
        wrapper.find("button").simulate("click")
        expect(deleteImages).toHaveBeenCalled();
    });
});

describe("Image list", () => {
    it("should render ImageList", () => {
        const wrapper = shallow(<ImageList images={[]}/>);
        expect(wrapper).toMatchSnapshot();
    });
});

describe("Image list container render", () => {
    it("should render ImageListContainer", () => {
            const addImagesToStore = jest.fn();
            const wrapper = shallow(<ImageListContainer images={[]} addImagesToStore={addImagesToStore}/>);
            expect(wrapper).toMatchSnapshot();
        }
    )
    ;
});

describe("Image list container handle scroll", () => {
    it("should handle scroll to bottom in ImageListContainer", () => {
            const addImagesToStore = jest.fn();
            const wrapper = shallow(<ImageListContainer images={[]} addImagesToStore={addImagesToStore}/>);
            const event = {
                target: {
                    scrollingElement: {
                        scrollHeight: 0,
                        clientHeight: 0,
                        scrollTop: 0,
                    }
                }
            }
            wrapper.simulate('scroll', event)
            expect(addImagesToStore).toHaveBeenCalled();
        }
    )
    ;
});

describe("Input Form render", () => {
    it("should render InputForm", () => {
        const wrapper = shallow(<InputForm countToDelete={1} updateCountToDelete={jest.fn}/>);
        expect(wrapper).toMatchSnapshot();
    });
});

describe("Input Form onChange", () => {
    it("should handle onChange in InputForm", () => {
        const updateCountToDelete = jest.fn()
        const wrapper = shallow(<InputForm class="a" countToDelete={1} updateCountToDelete={updateCountToDelete}/>);
        const event = {target: {value: 2}}
        wrapper.find("input").simulate('change', event)
        expect(updateCountToDelete).toHaveBeenCalled()

    });
});

describe('Test thunk action when is not fetching', () => {
    it('addCat should start fetching when isFetching=false', () => {
        global.fetch = jest.fn().mockResolvedValueOnce([])
        const func = addCat();
        const dispatch = jest.fn();
        const getState = jest.fn(() => ({isFetching: false}));
        return func(dispatch, getState).then(() => {
            expect(dispatch).toHaveBeenCalledWith({type: START});
            expect(fetch).toHaveBeenCalledWith("https://api.thecatapi.com/v1/images/search?limit=10");
            expect(dispatch).toHaveBeenCalledWith({type: ADD})
            expect(dispatch).toHaveBeenCalledWith({type: END});
        });

    })
})

describe('Test thunk action when is Fetching', () => {
    it('addCat should not start fetching when isFetching=true', () => {
        global.fetch = jest.fn().mockResolvedValueOnce([])
        const func = addCat();
        const dispatch = jest.fn();
        const getState = jest.fn(() => ({isFetching: true}));
        return func(dispatch, getState).then(() => {
            expect(dispatch).not.toHaveBeenCalled();
            expect(fetch).not.toHaveBeenCalled();
        });

    })
})