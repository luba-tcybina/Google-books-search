import axios from "axios";
import config from "../config";
import { KeyObject } from "crypto";

const StatusCode = {
  SUCCESS: 200,
  REDIRECTION: 300,
  CLIENT_ERROR: 400,
  SERVER_ERROR: 500
};

export const getSavedBooks = async () => {
  try {
    const res = await axios.request({
      url: "/api/books",
      baseURL: config.apiBaseUrl,
      method: "GET"
    });

    if (res.status == StatusCode.SUCCESS) {
      console.log("GET books", res.data);
      return res.data.books;
    }
  } catch (err) {}
  return null;
};

export const saveBook = async bookInfo => {
  try {
    const res = await axios.request({
      url: "/api/books",
      baseURL: config.apiBaseUrl,
      method: "POST",
      data: { bookInfo: bookInfo }
    });
    if (res.status == StatusCode.SUCCESS) {
      console.log("save book", res.data);
      return true;
    }
  } catch (err) {
    console.log("GET books Error: ", err);
  }
  return false;
};

export const deleteBook = async bookInfo => {
  try {
    const res = await axios.request({
      url: "/api/books",
      baseURL: config.apiBaseUrl,
      method: "DELETE",
      data: { id: bookInfo._id }
    });
    if (res.status == StatusCode.SUCCESS) {
      console.log("delete book", res.data);
      return true;
    }
  } catch (err) {
    console.log("GET books Error: ", err);
  }
  return false;
};

export const getBooksFromGoogle = async keyword => {
  try {
    const baseUrl = "https://www.googleapis.com/books/v1/volumes?q=";

    const res = await axios.request({
      url: baseUrl + keyword,
      // baseURL: config.apiBaseUrl,
      method: "GET"
    });

    if (res.status == StatusCode.SUCCESS) {
      console.log("GET books from google", res.data);
      const result = res.data.items.map(item => {
        const volumeInfo = item.volumeInfo;
        return {
          title: volumeInfo.title,
          authors: volumeInfo.authors,
          image: volumeInfo.imageLinks.thumbnail,
          description: volumeInfo.description,
          link: volumeInfo.infoLink
        };
      });
      console.log("reeer", result)
      return result;
    }
  } catch (err) {}
  return null;
};
