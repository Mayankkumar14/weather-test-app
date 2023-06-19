# Weather Test APP

# App deployed 
- App is deployed on `netlify`.
URL: https://weather-test-task-react.netlify.app

- Backend app is deployed on `render`
Backend Endpoint: https://cors-new.onrender.com/https://us-central1-mobile-assignment-server.cloudfunctions.net/weather  

This Backend server is working as a proxy server and It is giving us the response from the mentioned 
`weather` API.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Tech stack used:
- Frontend: React, materialUI and contextAPI

# Used Typescript for type checking. 

# Steps to start the App:
- **Step-1**: Update the following environment variables (You can check `.env` file)
  - REACT_APP_WEATHER_API_ENDPOINT: URL of weather API.
    Default value: `https://us-central1-mobile-assignment-server.cloudfunctions.net/weather`
  - LOCAL_PROXY: Local Backend Server URL.
    Deafult value: `http://127.0.0.1:8080`
  - DEPLOYED_PROXY_SERVER_URL: Deployed backend app URL.   

  Note: The default values of variables mentioned in file config.ts i.e `/src/utils/config.ts`
- **Step-2**: Use `npm i` command to install the dependencies.
- **Step-3**: Use `npm start` to start the server. 
  

# Some points about App architecture:
- On the local environment, we are using nodeJS proxy server for fetching data from weatherAPI. (due to CORS issue, I have created the server as mentioned in the doc)

- These app has following routes:
  - /cities: For displaying all the cities in alphabatical sorted order.
  - /cities/hidden: A user can show/hide the city. For this, we have additional route for displaying the hidden cities. 
  - /cities/:city: This route will display the date-wise temprature data of city in chronological order.

- Used localStorage for maintaining the cache. Please have a look at some points below for more technical info:
  - At first, we are calling an API ad storing the response in localStorage.
  - If user refresh the page then we are displaying the data from local storage if data exist.
  - Here, we don't have an API for fetching the tempratures details city wise. So apart from storing cities data, we are also storing tempratures data city wise in localStorage and we are displaying same info on `/cities/:city` route.

- Fetching the Latest Cities Data: If user wants to fetch the latest data. Then on the `/cities` route, we have one button 'Fetch Latest Data'. 

- If user is offline, then we are displaying the appropriate message and notification also, in this case, we are displaying the old cache data.
      
