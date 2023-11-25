import axios from "axios";
  
export const fetchAllQuestions = async() => {
    let response = await axios.get('https://opentdb.com/api.php?amount=15&type=multiple');
    // console.log("response --> ", response);
    return response.data;
}  