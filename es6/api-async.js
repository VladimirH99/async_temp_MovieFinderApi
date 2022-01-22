let timeout = ms => new Promise(r => setTimeout(r, ms));
let _throw = m => {
  throw new Error(m);
};

async function userReg() {
  await timeout(500);

  return Math.random() > 0.2
    ? {
        msg: 'User registration success',
        id: 1,
      }
    : _throw('User registration error');
}

async function userAuth(id) {
  await timeout(500);

  return Math.random() > 0.2
    ? {
        msg: `Auth user #${id}`,
        token: 'kjgjhfdsfdshgj',
      }
    : _throw('Auth error');
}

async function userData(token) {
  await timeout(500);

  return Math.random() > 0.2
    ? {
        msg: `Get token data ${token}`,
        data: {
          id: 1,
          name: 'Some',
        },
      }
    : _throw('Error in data');
}

export { userReg, userAuth, userData };