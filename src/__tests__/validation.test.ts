import {
  validateAccount,
  validatePassword,
  validatePasswordMatch,
  validatePhone,
  validateEmail,
} from '../utils/validation';

describe('개인 회원가입 유효성 검사 단위 테스트', () => {
  it('아이디는 대문자나 소문자, 숫자를 포함해 8글자 이상이어야 한다.', () => {
    expect(validateAccount('medigerUser123')).toBe(true);
    expect(validateAccount('medigerUser')).toBe(false);
    expect(validateAccount('medigeruser123')).toBe(true);
    expect(validateAccount('User123')).toBe(false);
    expect(validateAccount('MEDIGER123')).toBe(true);
  });

  it('비밀번호는 대문자, 소문자, 숫자, 특수문자를 포함해 8글자 이상이어야 한다.', () => {
    expect(validatePassword('medigerUser123@')).toBe(true);
    expect(validatePassword('medigerUser@')).toBe(false);
    expect(validatePassword('medigeruser123@')).toBe(false);
    expect(validatePassword('medigerUser123')).toBe(false);
    expect(validatePassword('MEDIGER123@')).toBe(false);
    expect(validatePassword('User1@')).toBe(false);
  });

  it('설정할 비밀번호와 확인할 비밀번호가 일치해야 한다.', () => {
    expect(validatePasswordMatch('123abc@@@', '123abc@@@')).toBe(true);
    expect(validatePasswordMatch('123abc@@@', '123abc###')).toBe(false);
  });

  it('핸드폰 번호는 하이픈 없이 숫자 11자로 작성해야 한다.', () => {
    expect(validatePhone('01012345678')).toBe(true);
    expect(validatePhone('010-1234-5678')).toBe(false);
    expect(validatePhone('12345678')).toBe(false);
  });

  it('이메일은 @, 도메인 주소, 온점(.)을 포함한 형식으로 작성해야 한다.', () => {
    expect(validateEmail('mediger@gmail.com')).toBe(true);
    expect(validateEmail('mediger@gmailcom')).toBe(false);
    expect(validateEmail('medigergmail.com')).toBe(false);
    expect(validateEmail('mediger#gmail.com')).toBe(false);
  });
});
