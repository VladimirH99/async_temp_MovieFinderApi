function userReg(onSuccess, onError) {
  setTimeout(() => {
    if (Math.random() > 0.2)
      onSuccess({
        msg: 'User registration success',
        id: 1,
      });
    else onError({ msg: 'User registration error' });
  }, 500);
}

function userAuth(id, onSuccess, onError) {
  setTimeout(() => {
    if (Math.random() > 0.2)
      onSuccess({
        msg: `Auth user #${id}`,
        token: 'kjgjhfdsfdshgj',
      });
    else onError({ msg: 'Auth error' });
  }, 500);
}

function userData(token, onSuccess, onError) {
  setTimeout(() => {
    if (Math.random() > 0.2)
      onSuccess({
        msg: `Get token data ${token}`,
        data: {
          id: 1,
          name: 'Some',
        },
      });
    else onError({ msg: 'Error in data' });
  }, 500);
}

export { userReg, userAuth, userData };
