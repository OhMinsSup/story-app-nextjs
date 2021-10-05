import * as yup from 'yup';
import caver from '@klaytn/caver';

export const signUpSchema = yup.object().shape({
  nickname: yup.string().required('닉네임을 입력해주세요.'),
  email: yup
    .string()
    .email('이메일 형식으로 입력해주세요.')
    .required('이메일을 입력해주세요.'),
  walletAddress: yup
    .string()
    .test('wallet address testing', '지갑 유형으로 입력해주세요', (value) => {
      if (!value) return false;
      if (caver?.utils.isAddress(value)) {
        return true;
      }
      return false;
    })
    .required('지갑 주소를 입력해주세요.'),
  gender: yup.string().oneOf(['M', 'F']),
  profileUrl: yup.string().notRequired(),
  signature: yup
    .string()
    .required(
      'signature를 입력해주세요. 계속된 오류가 있으면 다시 로그인부터 시도해주세요.',
    ),
});

export const mediaSchema = yup.object().shape({
  contentUrl: yup.string().required('미디어 주소를 입력해주세요.'),
  idx: yup.number().required('미디어 주소를 입력해주세요.'),
});

export const publishSchema = yup.object().shape({
  name: yup.string().required('이름을 입력해주세요.'),
  media: mediaSchema.nullable(true).required('미디어를 등록해주세요.'),
  description: yup.string().required('내용을 입력해주세요.'),
  backgroundColor: yup
    .string()
    .matches(/^#[0-9a-fA-F]{6}$/, '색상 형식으로 입력해주세요.')
    .notRequired(),
  externalUrl: yup
    .string()
    .matches(
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
      '외부 URL형식으로 입력해주세요.',
    )
    .notRequired(),
});
