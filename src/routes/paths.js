// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

// const ROOTS_AUTH = '/auth';
const CLIENT_ROOTS_DASHBOARD = '/client-dashboard';
const ADMIN_ROOTS_DASHBOARD = '/admin-dashboard';

// ----------------------------------------------------------------------

// export const PATH_AUTH = {
//   root: ROOTS_AUTH,
//   login: path(ROOTS_AUTH, '/login'),
//   register: path(ROOTS_AUTH, '/register'),
//   loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
//   registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
//   verify: path(ROOTS_AUTH, '/verify'),
//   resetPassword: path(ROOTS_AUTH, '/reset-password'),
//   newPassword: path(ROOTS_AUTH, '/new-password'),
// };

export const ADMIN_PATH_DASHBOARD = {
  root: ADMIN_ROOTS_DASHBOARD,
  user: {
    root: path(ADMIN_ROOTS_DASHBOARD, '/user'),
    users: path(ADMIN_ROOTS_DASHBOARD, '/user/users'),
    edit: (name) => path(ADMIN_ROOTS_DASHBOARD, `/user/users/${name}/edit`),
    new: path(ADMIN_ROOTS_DASHBOARD, '/user/users/new'),
  },
  question: path(ADMIN_ROOTS_DASHBOARD, '/question'), 
};


export const CLIENT_PATH_DASHBOARD = {
  root: CLIENT_ROOTS_DASHBOARD,
  user: {
    users: path(CLIENT_ROOTS_DASHBOARD, '/users'),
  },
};
