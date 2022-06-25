import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import {  fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullname: 'janbo',
      email: 'janbo@mail.com',
      password: '12345',
    },
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert('Не удалось регистрироваться');
    }
    if ('token' in data.payload) {
      localStorage.setItem('token', data.payload.token);
    } else {
      alert('Не удалось авторизоваться');
    }
  };

  // useEffect()

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullname?.message)}
          helperText={errors.fullname?.message}
          {...register('fullname', { required: 'Укажите полное имя' })}
          className={styles.field}
          label="Полное имя"
          fullWidth
        />
        <TextField
          type={'email'}
          error={Boolean(errors.email?.message)}
          {...register('email', { required: 'Укажите почту' })}
          helperText={errors.email?.message}
          className={styles.field}
          label="E-Mail"
          fullWidth
        />
        <TextField
          type={'password'}
          error={Boolean(errors.password?.message)}
          {...register('password', { required: 'Укажите пароль' })}
          helperText={errors.password?.message}
          className={styles.field}
          label="Пароль"
          fullWidth
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
