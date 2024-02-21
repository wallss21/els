import axios from "axios";

// export function checkIfEmailIsUnique(value){
//     var response = await axios. checkEmail(value)
//     if(response.isUnique) {
//       return true;
//     }
  
//     return 'Sorry, this email is already used';
//   }

export const validationScheme = {
  first_name: "required|string|min:3|max:40|alpha",
  last_name: "required|string|min:3|max:40|alpha",
  email: "required|string|email|",
  address: "required|string|max:100|contains_one:st,str,ave,avenue,#",
  country: "required|string",
  province: "required|string",
  suburb: "required|string|max:100",
  postcode: "required|max:32|min:4",
  phone: "required|string|max:14|min:6",
  delivery: "required|string|contains_one:express,standard|max:8|min:7",
};
