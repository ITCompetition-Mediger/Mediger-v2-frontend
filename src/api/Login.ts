import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from './apiConfig';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';

interface LoginForm {
  account: string;
  password: string;
}

export const login = async (data: LoginForm): Promise<AxiosResponse | null> => {
  const response = await axiosInstance.post('/auth/login', data);
  return response;
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: data => {
      console.log('✅ 로그인 성공:', data);

      if (data) {
        console.log('응답 헤더:', data);
      }
      navigate('/');
    },
    onError: error => {
      console.error('❌ 로그인 실패:', error);
    },
  });
};
