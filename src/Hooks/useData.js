import { useState, useEffect } from "react";
import axios from "axios";

const useData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (!url) {
        setData([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.log(error);
        setData([]);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useData;