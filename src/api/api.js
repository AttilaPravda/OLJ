import axios from 'axios'

export const calcByNames = (firstname, secondname) => {
  const result = axios({
    method: "GET",
    url: "https://love-calculator.p.rapidapi.com/getPercentage",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "love-calculator.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_API_KEY
    },
    params: {
      fname: firstname,
      sname: secondname
    }
  })
    .then(response => {
      return response.data
    })
    .catch(error => {
      return error
    });

    return result
};
