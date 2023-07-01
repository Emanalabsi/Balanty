import React, { FC, ReactElement, useState } from 'react';

import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

import {
  Form,
  ImageWrap,
  OtherLink,
  SignButton,
  Wrapper,
} from './LoginWrapper.styled';
import InputWrap from './Input';
import TitleWrap from './Title';
import GoogleIcon from '../../assets/image-2.svg';
import LinkWrap from './Link';
import { loginSchema } from '../../validation';
import { loginProps, signupProps } from '../../interfaces';
import { useAuth } from '../../hooks';

const LoginWrapper: FC = (): ReactElement => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginProps>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    },
  });

  // const [userData, setUserData] = useState<signupProps>({
  //   username: '',
  //   email: '',
  //   phone: '',
  //   password: '',
  //   confirmPassword: '',
  // });

  const { login } = useAuth();
  const { pathname } = useLocation();
  let isPlayer = true;

  if (!(pathname.split('/')[1] === 'player')) {
    isPlayer = false;
  }
  const onSubmit: SubmitHandler<loginProps> = async data => {
    try {
      const user = await axios.post(
        `http://localhost:8080/api/v1/${
          isPlayer ? 'player/login' : 'stadium/login'
        }`,
        {
          username: data.username,
          password: data.password,
        },
      );
      login(user.data.data);
      window.location.href = '/home';
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert('There an error when logging a user');
    }
  };

  return (
    <Wrapper isPlayer={isPlayer}>
      <ImageWrap isPlayer={isPlayer} />
      <Form>
        {isPlayer ? (
          <TitleWrap caption="دخول كلاعب" />
        ) : (
          <TitleWrap caption="دخول كملعب" />
        )}
        <Box component="form" noValidate autoComplete="off">
          <InputWrap
            name="username"
            type="text"
            label={isPlayer ? 'اسم اللاعب' : 'اسم الملعب'}
            placeholder={isPlayer ? 'ادخل اسم اللاعب' : 'ادخل اسم الملعب'}
            errors={errors}
            control={control}
          />
          <InputWrap
            control={control}
            name="password"
            type="password"
            label="كلمة المرور"
            placeholder="ادخل كلمة المرور"
            errors={errors}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {isPlayer ? (
              <LinkWrap url="/player/signup" caption="تسجيل كلاعب" />
            ) : (
              <LinkWrap url="/stadium/signup" caption="تسجيل كملعب" />
            )}
            <OtherLink href="/">عودة إلى الرئيسية</OtherLink>
          </div>
          <SignButton
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            disableElevation
          >
            تسجيل دخول
          </SignButton>
          <SignButton
            sx={{ background: '#E6E6E6 !important', color: '#868686' }}
            variant="contained"
            disableElevation
          >
            تسجيل دخول من خلال
            <img
              style={{
                width: '20px',
                height: '20px',
                verticalAlign: 'middle',
                marginRight: '0.7rem',
              }}
              src={GoogleIcon}
              alt="Google Icon"
            />
          </SignButton>
        </Box>
      </Form>
    </Wrapper>
  );
};

export default LoginWrapper;
