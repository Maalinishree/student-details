import axios from "axios";

export function getStudentDetails() {
    return axios
      .get(` https://api.myjson.com/bins/1dlper`)
      .then(function(response) {
        return response;
      })
      .catch(function(error) {
        return error;
      });
  }