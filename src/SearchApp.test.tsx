


import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import axios from "axios";
import SearchView from "./SearchApp";
import ResultItem, { ResultItemProps } from "./SearchApp";
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });


jest.mock("axios");

describe("SearchView component", () => {
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchView />);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render the component without errors", () => {
    expect(wrapper.length).toBe(1);
  });

  it("should set the search value when input is changed", () => {
    const input = wrapper.find("input");
    input.simulate("change", { target: { value: "test" } });

    expect(wrapper.find("input").prop("value")).toEqual("test");
  });

  it("should make API call when search button is clicked", () => {
    const responseData = {
      resultCount: 1,
      results: [
        {
          trackId: 123,
          artworkUrl100: "http://example.com/image.jpg",
          trackName: "Test Song",
          artistName: "Test Artist",
          previewUrl: "http://example.com/preview.mp3",
          collectionViewUrl: "http://example.com/album",
        },
      ],
    };
    const axiosGetMock = jest.spyOn(axios, "get").mockResolvedValueOnce({
      data: responseData,
    });

    const searchButton = wrapper.find("button").at(0);
    wrapper.setState({ searchValue: "test" });
    searchButton.simulate("click");

    expect(axiosGetMock).toHaveBeenCalledWith(
      "https://itunes.apple.com/search?term=test"
    );
    expect(wrapper.state("searchResults")).toEqual(responseData.results);
    expect(wrapper.find(ResultItem).length).toBe(1);
  });

  it("should play/pause preview audio when play/pause button is clicked", () => {
    const result: ResultItemProps["result"] = {
      trackId: 123,
      artworkUrl100: "http://example.com/image.jpg",
      trackName: "Test Song",
      artistName: "Test Artist",
      previewUrl: "http://example.com/preview.mp3",
      collectionViewUrl: "http://example.com/album",
    };
    wrapper.setState({ searchResults: [result] });
    const resultItem = wrapper.find(ResultItem);
    const playButton = resultItem.find("button").at(0);

    expect(resultItem.state("isPlaying")).toBe(false);
    playButton.simulate("click");
    expect(resultItem.state("isPlaying")).toBe(true);
    playButton.simulate("click");
    expect(resultItem.state("isPlaying")).toBe(false);
  });
});

