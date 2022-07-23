import { isInvalidDate } from '@utils/assertion';
import dayjs from 'dayjs';
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
    name: yup.string().optional().notRequired(),
    idx: yup.number().required('미디어 주소를 입력해주세요.'),
  }),
  price: yup.string().test('price', '숫자만 입력이 가능합니다', (price) => {
    if (!price) return false;
    // 정규식 소수점 및 숫자만 입력 (수수점은 존재 할 수도 없을 수 도 있음)
    const regex = /^[0-9]+(\.[0-9]+)?$/;
    if (price.match(regex)) {
      return true;
    }
    return false;
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
  story: yup.object().shape({
    media: common.media.required('미디어를 등록해주세요.'),
    title: yup
      .string()
      .max(100, '최대 100자 내외로 입력해주세요.')
      .required('제목을 입력해주세요.'),
    externalSite: yup
      .string()
      .url('연관 사이트는 URL 형식으로 입력해주세요.')
      .nullable()
      .optional()
      .notRequired(),
    description: yup
      .string()
      .max(1000, '최대 1000자 내외로 입력해주세요.')
      .required('내용을 입력해주세요.'),
    backgroundColor: yup
      .string()
      .matches(/^#[0-9a-fA-F]{6}$/, '색상 형식으로 입력해주세요.')
      .nullable()
      .optional(),
    tags: yup
      .array()
      .of(yup.string().required())
      .max(5, '최대 5개까지 입력해주세요.')
      .optional(),
    price: yup
      .number()
      .test('invalid_price', '가격 형식으로 입력해주세요.', (value) => {
        if (value && isNaN(value)) return false;
        if (value === 0) return false;
        return true;
      })
      .required('가격을 입력해주세요.'),
    supply: yup
      .number()
      .min(1, '발행 수는 최소 1개 입니다.')
      .test('invalid_price', '발행 수는 최소 1개 입니다.', (value) => {
        if (!value) return false;
        if (isNaN(value)) return false;
        if (value <= 0) return false;
        return true;
      })
      .required('발행 수를 입력해주세요.'),
    isPublic: yup
      .boolean()
      .oneOf([true, false])
      .required('공개 여부를 선택해주세요.'),
    rangeDate: yup
      .array()
      .of(yup.date().required('시작일을 선택해주세요.'))
      .length(2, '시작일과 종료일을 선택해주세요.')
      .test(
        'rangeDate_beign',
        '종료일은 시작일 이후로 선택해주세요.',
        (value) => {
          if (!value) return false;
          const [begin, end] = value;
          if (isInvalidDate(begin) || isInvalidDate(end)) return false;
          if (dayjs(begin).isAfter(dayjs(end))) return false;
          return true;
        },
      )
      .test('rangeDate_end', '시작일은 오늘 이후로 선택해주세요.', (value) => {
        if (!value) return false;
        const [begin] = value;
        if (!begin) return false;
        if (isInvalidDate(begin)) return false;
        if (dayjs(begin).isBefore(dayjs())) return false;
        return true;
      })
      .required('공개 기간을 선택해주세요.'),
  }),
};
