import { SubmitHandler, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useLogin } from '../api/Login';

interface LoginForm {
  account: string;
  password: string;
}

const Login = () => {
  const { mutate: login } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = postData => {
    try {
      login(postData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[calc(100vh-3.75rem)] bg-gradient-to-b from-white to-main-color-200 flex items-center justify-center ">
      <div className="p-16 px-24 bg-white border shadow-xs rounded-3xl border-black-100">
        <p className="mb-1 text-2xl font-bold text-black-800">로그인</p>
        <p className="mb-6 text-black-400">로그인하고 더 많은 서비스를 즐겨보세요!</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <label className="mt-4 text-sm text-black-800">아이디</label>
          <input
            type="text"
            placeholder="mediger"
            {...register('account', { required: '아이디를 입력해주세요.' })}
            className="p-3 px-5 my-1 bg-white border w-80 rounded-2xl border-black-100 focus:outline-none focus:bg-black-50"
            autoComplete="off"
          />
          {errors.account && <p className="text-sm text-red-500">{errors.account.message}</p>}

          <label className="mt-4 text-sm text-black-800">비밀번호</label>
          <input
            type="password"
            placeholder="* * * * * *"
            {...register('password', { required: '비밀번호를 입력해주세요.' })}
            className="p-3 px-5 my-1 bg-white border w-80 rounded-2xl border-black-100 focus:outline-none focus:bg-black-50"
            autoComplete="off"
          />
          {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}

          <button
            type="submit"
            className="w-full p-2 my-1 mt-4 text-center text-white cursor-pointer bg-main-color-500 rounded-2xl"
          >
            로그인
          </button>
        </form>

        <div className="flex justify-between px-8 mt-10">
          <p className="text-sm underline cursor-pointer underline-offset-2 text-black-400">
            <Link to="/signup/personal">회원가입 →</Link>
          </p>
          <p className="text-sm underline cursor-pointer underline-offset-2 text-black-400">
            아이디/비밀번호 찾기 →
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
