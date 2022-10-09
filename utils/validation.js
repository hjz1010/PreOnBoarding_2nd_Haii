const validationEmail = (email) => {
  const emailRegExp = new RegExp(/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/);
  if (!emailRegExp.test(email)) {
    const err = new Error("이메일 형식이 맞지 않습니다.");
    err.statusCode = 400;
    throw err;
  }
};

const validationPassword = (password) => {
  const pwRegExp = new RegExp(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20}$)/);
  if (!pwRegExp.test(password)) {
    const err = new Error("비밀번호 형식이 맞지 않습니다.");
    err.statusCode = 400;
    throw err;
  }
};

const validationName = (name) => {
  const nameRegExp = new RegExp(/^[가-힣]{2,4}|[a-zA-Z]{2,10}\s[a-zA-Z]{2,10}$/);
  if (!nameRegExp.test(name)) {
    const err = new Error("이름 형식이 맞지 않습니다.");
    err.statusCode = 400;
    throw err;
  }
};

const validationPhone = (phoneNumber) => {
  const phoneRegExp = new RegExp(/01[016789]-[^0][0-9]{2,3}-[0-9]{3,4}/);
  if (!phoneRegExp.test(phoneNumber)) {
    const err = new Error("휴대폰번호 형식이 맞지 않습니다.");
    err.statusCode = 400;
    throw err;
  }
};

module.exports = { validationEmail, validationPassword, validationName, validationPhone };
