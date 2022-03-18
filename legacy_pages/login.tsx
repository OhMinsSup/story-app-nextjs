// import React from 'react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';

// import { useAlert } from '@hooks/useAlert';

// // components
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import ErrorBoundary from '@components/error/ErrorBoundary';

// // icons
// import LoadingButton from '@mui/lab/LoadingButton';

// // validation
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Controller, useForm } from 'react-hook-form';
// import { schema } from '@libs/validation/schema';
// import { PAGE_ENDPOINTS, RESULT_CODE, STORAGE_KEY } from '@constants/constant';

// // components
// import AuthLayout from '@components/auth/common/AuthLayout';

// // api
// import { useMutationLogin } from '@api/story/auth';
// import { StoryStorage } from '@libs/storage';

// import type { LoginInput } from '@api/schema/story-api';
// import type { SubmitHandler } from 'react-hook-form';

// const initialState = {
//   email: '',
//   password: '',
// };

// function LoginPage() {
//   const router = useRouter();
//   const formRef = React.useRef<HTMLFormElement | null>(null);

//   const { showAlert, Alert } = useAlert();

//   const {
//     control,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<LoginInput>({
//     mode: 'onSubmit',
//     // @ts-ignore
//     resolver: yupResolver(schema.login),
//     criteriaMode: 'firstError',
//     reValidateMode: 'onChange',
//     defaultValues: {
//       ...initialState,
//     },
//   });

//   // 로그인
//   const { mutateAsync, isLoading } = useMutationLogin();

//   const onSubmit: SubmitHandler<LoginInput> = async (input) => {
//     const deviceInfo = await StoryStorage.getItem(STORAGE_KEY.PUSH_TOKEN_KEY);
//     const body = {
//       ...input,
//     };

//     if (deviceInfo && typeof deviceInfo === 'object') {
//       const { deviceId } = deviceInfo;
//       Object.assign(body, { deviceId });
//     }

//     const result = await mutateAsync(body);

//     const {
//       data: { resultCode },
//     } = result;

//     if (RESULT_CODE.OK === resultCode) {
//       return router.replace(PAGE_ENDPOINTS.INDEX);
//     }

//     let message = '에러가 발생했습니다.\n다시 시도해주세요.';
//     switch (resultCode) {
//       case RESULT_CODE.INCORRECT_PASSWORD: {
//         message = '비밀번호가 일치하지 않습니다.';
//         break;
//       }
//       case RESULT_CODE.NOT_EXIST: {
//         message = '존재하지 않는 사용자입니다.';
//         break;
//       }
//     }

//     const params = {
//       content: {
//         text: message,
//       },
//     };

//     showAlert(params);
//   };

//   return (
//     <>
//       <AuthLayout>
//         <Box
//           sx={{
//             marginTop: 8,
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//           }}
//         >
//           <Typography
//             className="font-bold text-center tracking-tight text-gray-700"
//             component="h1"
//             variant="h5"
//           >
//             로그인
//           </Typography>
//           <Box
//             className="space-y-5"
//             sx={{ mt: 1 }}
//             component="form"
//             ref={formRef}
//             onSubmit={handleSubmit(onSubmit)}
//           >
//             <Controller
//               control={control}
//               name="email"
//               render={({ field }) => (
//                 <TextField
//                   required
//                   label="이메일"
//                   placeholder="이메일"
//                   color="info"
//                   variant="standard"
//                   fullWidth
//                   type="text"
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                   error={!!errors?.email?.message}
//                   helperText={errors?.email?.message}
//                   inputRef={field.ref}
//                   {...field}
//                 />
//               )}
//             />

//             <Controller
//               control={control}
//               name="password"
//               render={({ field }) => (
//                 <TextField
//                   required
//                   label="비밀번호"
//                   placeholder="비밀번호"
//                   color="info"
//                   variant="standard"
//                   fullWidth
//                   type="password"
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                   error={!!errors?.password?.message}
//                   helperText={errors?.password?.message}
//                   inputRef={field.ref}
//                   {...field}
//                 />
//               )}
//             />

//             <LoadingButton
//               color="primary"
//               size="large"
//               variant="contained"
//               className="w-full"
//               fullWidth
//               onClick={() => {
//                 formRef.current?.dispatchEvent(
//                   new Event('submit', { cancelable: true, bubbles: true }),
//                 );
//               }}
//               loading={isLoading}
//             >
//               로그인
//             </LoadingButton>
//           </Box>
//           <p className="text-sm text-gray-500 my-4 text-center">
//             <span>계정이 없으신가요?</span>
//             <Link href={PAGE_ENDPOINTS.SIGNUP}>
//               <a className="underline mx-1">회원가입</a>
//             </Link>
//           </p>
//         </Box>
//       </AuthLayout>
//       <Alert />
//       {/* <KeystoreLoginDialog /> */}
//     </>
//   );
// }

// export default LoginPage;

// LoginPage.ErrorBoundary = ErrorBoundary;
