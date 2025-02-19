import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from './apiConfig';
import { useNavigate } from 'react-router-dom';
import { AxiosResponse } from 'axios';

interface PersonalInputForm {
  account: string;
  password: string;
  name: string;
  email: string;
  phone: string;
}

interface BusinessInputForm {
  account: string;
  password: string;
  name: string;
  email: string;
  registrationNumber: string;
  startDate: string;
  ownerName: string;
  companyName: string;
}

export const signupPersonal = async (data: PersonalInputForm): Promise<AxiosResponse | null> => {
  const response = await axiosInstance.post('/auth/join', data);
  return response;
};

export const checkAccountAvailability = async (account: string): Promise<AxiosResponse | null> => {
  const response = await axiosInstance.post('/auth/check', null, {
    params: { account },
  });
  return response.data;
};

export const sendVerificationCode = async (phone: string): Promise<AxiosResponse | null> => {
  const response = await axiosInstance.post('/auth/certification', null, {
    params: { phone },
  });
  return response.data;
};

export const authVerify = async (
  identifier: string,
  code: string
): Promise<AxiosResponse | null> => {
  const response = await axiosInstance.post('/auth/verify', {
    identifier,
    code,
  });
  return response;
};

export const signupBusiness = async (data: BusinessInputForm): Promise<string | null> => {
  const response = await axiosInstance.post('/auth/join/business', data);
  return response.data;
};

export const useSignupPersonal = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signupPersonal,
    onSuccess: data => {
      console.log('✅ 회원가입 성공:', data);

      if (data) {
        console.log('응답 헤더:', data);
      }
      navigate('/signup/personal/details');
    },
    onError: error => {
      console.error('❌ 회원가입 실패:', error);
    },
  });
};

export const useSignupBusiness = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signupBusiness,
    onSuccess: data => {
      console.log('✅ 비즈니스 회원가입 성공:', data);

      if (data) {
        console.log('응답 헤더:', data);
      }
      navigate('/signup/business/details');
    },
    onError: error => {
      console.error('❌ 비즈니스 회원가입 실패:', error);
    },
  });
};
