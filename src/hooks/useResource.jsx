import axios from 'axios';
import React, { useEffect, useState } from 'react'

function useResource(url) {
    const [categories , setCategories] = useState([]);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState('');
    const getData = async () => {
        try {
            const { data } = await axios.get(url);
            console.log(data);
            setCategories(data.categories);
          } catch {
            console.log(error);
            setError('Error to Loade Data!');
          } finally {
            setLoader(false);
          }
    }
    useEffect(() => {
      getData();
    }, []);
  
  return {categories,error, loader}
}

export default useResource