import { klayUnits } from '@utils/utils';
import * as yup from 'yup';

export const common = {
  email: yup
    .string()
    .email('이메일 형식으로 입력해주세요.')
    .required('이메일을 입력해주세요.'),
  password: yup
    .string()
    .test(
      'password',
      '영문/숫자/특수문자를 조합한 8~20자로 입력해주세요.',
      (password) => {
        if (!password) return false;
        const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%&^*+=-\d])(?=.*[0-9]).{8,20}$/;
        if (password.match(regex)) {
          return true;
        }

        return false;
      },
    )
    .required('비밀번호를 입력해 주세요.'),
  nickname: yup
    .string()
    .min(2, '2자 이상 입력해주세요.')
    .max(20, '20자 이하로 입력해주세요.')
    .required('닉네임을 입력해주세요.'),
  gender: yup.string().oneOf(['M', 'F']).required('성별을 선택해 주세요.'),
  media: yup.object().shape({
    contentUrl: yup.string().required('미디어 주소를 입력해주세요.'),
    name: yup.string(),
    idx: yup.number().required('미디어 주소를 입력해주세요.'),
  }),
};

export const schema = {
  login: yup.object().shape({
    email: common.email,
    password: common.password,
  }),
  signup: yup.object().shape({
    nickname: common.nickname,
    email: common.email,
    password: common.password,
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], '비밀번호가 일치하지 않습니다.')
      .required('비밀번호 확인을 입력해주세요.'),
    gender: common.gender,
  }),
  keystore: yup.object().shape({
    file: yup.mixed().required('keystore 파일을 입력해 주세요.'),
    password: yup.string().required('비밀번호를 입력해 주세요.'),
  }),
  publish: yup.object().shape({
    name: yup.string().required('이름을 입력해주세요.'),
    media: common.media.nullable(true).required('미디어를 등록해주세요.'),
    description: yup.string().required('내용을 입력해주세요.'),
    backgroundColor: yup
      .string()
      .matches(/^#[0-9a-fA-F]{6}$/, '색상 형식으로 입력해주세요.')
      .notRequired(),
    externalUrl: yup
      .string()
      .url('외부 URL형식으로 입력해주세요.')
      .notRequired(),
    tags: yup.array().of(yup.mixed()).notRequired(),
    unit: yup.string().oneOf(klayUnits).required('단위를 입력해주세요.'),
    price: yup
      .string()
      .test('price', '숫자만 입력이 가능합니다', (price) => {
        if (!price) return true;
        const regex = /^[0-9]+$/;
        if (price.match(regex)) {
          return true;
        }
        return false;
      })
      .required('가격을 입력해주세요.'),
  }),
};
