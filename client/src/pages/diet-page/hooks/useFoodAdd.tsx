import { useCallback, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { customAxios } from 'common/api';

type ValidationResponse = {
  message: string;
};

interface IFood {
  name: string;
  carbohydrate: number;
  protein: number;
  fat: number;
  quantity: number;
  calories: number;
}

interface IResult {
  status: number;
  data: [IFood];
}

const useFoodAdd = () => {
  const [error, setError] = useState<Error['message']>('');
  const [isLoading, setLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [result, setResult] = useState<IResult>();
  const addFood = useCallback((data: object) => {
    setLoading(true);
    customAxios
      .post(`/api/food/register`, data)
      .then((response) => {
        setResult({ status: response.status, data: response.data });
        setError('');
        setShowError(false);
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          console.log('catch', err);
          const responseError = err as AxiosError<ValidationResponse>;
          if (responseError && responseError.response) {
            setError(responseError.response.data.message);
            setShowError(true);
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    addFood,
    result,
    isLoading,
    error,
    showError,
  };
};

export default useFoodAdd;