import React, { useState, useEffect } from 'react';
import Header from './Header';
import BarChart from './BarChart';
import Description from './Description';
import './App.css';

const App = () => {
  
  // Set state for gdp data, if data is loading, if there is an error.
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Set chart size and padding.
  const size = {width: 1000, height: 700, padding: 50};

  // Call useEffect hook to call data from the api.
  useEffect( () => {
    const fetchData = async () => {
      // Alert users that data is being loaded. 
      setIsLoading(true);

      // Use try/catch to catch errors (rejected promises) from 
      // the fetch and convert resolved promises to js objects.
      try {
        // Get response from api (either data or error).
        const res = await fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json");
        // If successful, convert data to js object.
        const data = await res.json();
        // Set data in state.
        setData(data.data)    
        // If data was returned succesfully, ensure isError is set to false.
        setIsError(false);
      
      } catch(err) {
        // If promise is rejected, set isError to true.
        setIsError(true);
        // Clear old data, if any, by resetting state.
        setData([]);
      }
      // Set isLoading to false as either data or an error has been returned.
      setIsLoading(false);
    } 

  // Fetch the data
  fetchData();
  // Dependency array, will cause rerender only when these values change.
  }, [isError, setData]);

  return (
    
    <div className="App">

      {/* Simple chart title. */}
      <Header />
      
      {/* Render the error if one exists. */}
      { isError && 
        <div> 
          <p>Error. The data is not loading correctly.</p>
          <p>{data.errors}</p>
        </div> }

      {/* Render loading message or the bar chart once data is returned from the api. */}
      { isLoading ? <div>Loading chart...</div> : <BarChart size={size} data={data} /> }

      {/* Simple description. */}
      <Description />
      
    </div>
  );
}

export default App;
