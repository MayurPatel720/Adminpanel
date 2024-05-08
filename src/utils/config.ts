console.log(
  `Server is running in ${process.env.NODE_ENV || "development"} mode!`
);
console.log(process.env);

export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
