import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Counter} from "../components/Counter";
import {DeleteButton} from "../components/DeleteButton";
import ImageList from "../components/ImageList";
import {ImageListContainer} from "../components/ImageListContainer";
import {InputForm} from "../components/InputForm";
import {END, START} from "../constants";
import {addCat, addImages} from "../actions";

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
        const wrapper = shallow(<ImageList images={[{id: 1, url: "src/logo.svg"}]}/>);
        expect(wrapper).toMatchSnapshot();
    });
});

describe("Image list container render", () => {
    it("should render ImageListContainer", () => {
            const addImagesToStore = jest.fn();
            const wrapper = shallow(<ImageListContainer images={[{id: 1, url: "src/logo.svg"}]}
                                                        addImagesToStore={addImagesToStore}/>);
            expect(wrapper).toMatchSnapshot();
        }
    )
    ;
});

describe("Image list container handle scroll to bottom", () => {
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

describe("Image list container handle scroll not in bottom", () => {
    it("should not call function when in not bottom in ImageListContainer", () => {
            const addImagesToStore = jest.fn();
            const wrapper = shallow(<ImageListContainer images={[]} addImagesToStore={addImagesToStore}/>);
            const event = {
                target: {
                    scrollingElement: {
                        scrollHeight: 1000000,
                        clientHeight: 0,
                        scrollTop: 0,
                    }
                }
            }
            wrapper.simulate('scroll', event)
            expect(addImagesToStore).not.toBeCalledTimes(2);
        }
    )
    ;
});

describe("Input Form render", () => {
    it("should render InputForm", () => {
        const wrapper = shallow(<InputForm countToDelete={1} updateCountToDelete={jest.fn()}/>);
        expect(wrapper).toMatchSnapshot();
    });
});

describe("Input Form onChange", () => {
    it("should handle onChange in InputForm", () => {
        const updateCountToDelete = jest.fn()
        const wrapper = shallow(<InputForm class="a" countToDelete={1} updateCountToDelete={updateCountToDelete}/>);
        const event = {target: {value: 2}}
        wrapper.find("input").simulate('change', event)
        expect(updateCountToDelete).toHaveBeenCalledWith(2)

    });
});

describe('Test thunk action when is not fetching', () => {
    it('addCat should start fetching when isFetching=false', () => {
        const obj = {test: 'test'};
        const body = new Blob([JSON.stringify(obj, null, 2)], {type: 'application/json'});
        const resp = new Response(body, {status: 200})
        global.fetch = jest.fn().mockResolvedValueOnce(resp)
        const func = addCat();
        const dispatch = jest.fn();
        const getState = jest.fn(() => ({isFetching: false}));
        return func(dispatch, getState).then(() => {
            expect(dispatch).toHaveBeenCalledWith({type: START});
            expect(fetch).toHaveBeenCalledWith("https://api.thecatapi.com/v1/images/search?limit=10");
            expect(dispatch).toHaveBeenCalledWith({type: END});
            expect(dispatch).toHaveBeenCalledWith(addImages({"test": "test"}));
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