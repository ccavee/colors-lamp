/** @jest-environment jsdom */

const {formatColorResults, searchColor} = require("../js/code.js");

describe("formatColorResults", () => {
  test("joins color names with the UI line break", () => {
    expect(formatColorResults(["Red", "Blue"])).toBe("Red<br />\r\nBlue");
  });

  test("rejects values that do not match the API results array", () => {
    expect(() => formatColorResults({color: "Red"})).toThrow("Color results must be an array");
  });
});

describe("color search integration", () => {
  beforeEach(() => {
    document.body.innerHTML = '<input id="searchText" value="blue"><span id="colorSearchResult"></span><p></p>';
  });

  test("sends the search request and renders the API JSON results", () => {
    const xhr = {
      open: jest.fn(),
      setRequestHeader: jest.fn(),
      send: jest.fn(function (payload) {
        this.payload = payload;
        this.readyState = 4;
        this.status = 200;
        this.responseText = JSON.stringify({results: ["Blue", "Light Blue"], error: ""});
        this.onreadystatechange();
      }),
    };
    global.XMLHttpRequest = jest.fn(() => xhr);

    searchColor();

    expect(xhr.open).toHaveBeenCalledWith("POST", "../LAMPAPI/SearchColors.php", true);
    expect(JSON.parse(xhr.payload)).toEqual({search: "blue", userId: 0});
    expect(document.getElementById("colorSearchResult").textContent).toBe("Color(s) has been retrieved");
    expect(document.querySelector("p").innerHTML).toBe("Blue<br>\nLight Blue");
  });

  test("reports a malformed API response instead of rendering it", () => {
    const xhr = {
      open: jest.fn(),
      setRequestHeader: jest.fn(),
      send: jest.fn(function () {
        this.readyState = 4;
        this.status = 200;
        this.responseText = JSON.stringify({results: "Blue"});
        this.onreadystatechange();
      }),
    };
    global.XMLHttpRequest = jest.fn(() => xhr);

    searchColor();

    expect(document.getElementById("colorSearchResult").textContent).toBe("Invalid response from server");
    expect(document.querySelector("p").textContent).toBe("");
  });
});
