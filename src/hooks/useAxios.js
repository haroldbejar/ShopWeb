import { useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  requestData,
  receiveData,
  receiveError,
} from "../redux/slices/dataSlice";

const useAxios = () => {
  const dispatch = useDispatch();

  const fetchData = useCallback(
    async (url, method, data = null) => {
      try {
        dispatch(requestData());

        let response;
        if (method === "GET") {
          response = await axios.get(url);
        } else if (method === "POST") {
          response = await axios.post(url, data);
        } else if (method === "PUT") {
          response = await axios.put(url, data);
        } else if (method === "DELETE") {
          response = await axios.delete(url);
        }

        dispatch(receiveData(response.data));
      } catch (error) {
        dispatch(receiveError(error.message));
      }
    },
    [dispatch]
  );

  return { fetchData };
};

export default useAxios;
