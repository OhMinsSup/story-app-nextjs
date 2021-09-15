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
