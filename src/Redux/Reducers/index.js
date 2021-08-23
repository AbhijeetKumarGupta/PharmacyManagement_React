const initialState = {
  empList: [],
  medList: [],
  orders: [],
  adminCred: [],
  salesCred: [],
  isAdmin: false,
  isSale: false,
};

const setState = (state = initialState, { type, payload }) => {
  switch (type) {
    case "UP_EMP_LIST":
      return { ...state, empList: payload };
    case "SET_EMP":
      return { ...state, empList: payload };
    case "SET_MED":
      return { ...state, medList: payload };
    case "SET_ORDER":
      return { ...state, orders: payload };
    case "SET_IS_ADMIN":
      return { ...state, isAdmin: payload };
    case "SET_IS_SALE":
      return { ...state, isSale: payload };
    case "SET_CRED_ADMIN":
      return { ...state, adminCred: payload };
    case "SET_CRED_SALE":
      return { ...state, salesCred: payload };

    default:
      return state;
  }
};

export default setState;
