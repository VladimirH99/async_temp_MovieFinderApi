function delayPromise(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time);
  });
}

function userReg() {
  return new Promise(function(resolve, reject) {
    delayPromise(500).then(() => {
      if (Math.random() > 0.2) {
        resolve({
          msg: 'User registration success',
          id: 1,
        });
      } else {
        reject({ msg: 'User registration error' });
      }
    });
  });
}

function userAuth(id) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (Math.random() > 0.2) {
        resolve({
          msg: `Auth user #${id}`,
          token: 'kjgjhfdsfdshgj',
        });
      } else {
        reject({ msg: 'Auth error' });
      }
    }, 500);
  });
}

function userData(token) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if (Math.random() > 0.2) {
        resolve({
          msg: `Get token data ${token}`,
          data: {
            id: 1,
            name: 'Some',
          },
        });
      } else {
        reject({ msg: 'Error in data' });
      }
    }, 500);
  });
}

export { userReg, userAuth, userData };
