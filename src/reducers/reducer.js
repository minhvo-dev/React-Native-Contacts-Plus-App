export const initialState = {
  authUser: null,
  contacts: [],
  userInfo: null,
  snackbar: {
    visible: false,
    message: ""
  }
};

const compareContacts = (a, b) => {
  const nameA = a.name.toLowerCase();
  const nameB = b.name.toLowerCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "RESET_APP_STATE":
      return initialState;
    case "SET_AUTH_USER":
      return {
        ...state,
        authUser: action.payload
      };
    case "SET_SNACK_BAR":
      return {
        ...state,
        snackbar: {
          visible: action.payload.visible,
          message: action.payload.message ? action.payload.message : state.snackbar.message
        }
      };
    case "ADD_NEW_CONTACT":
      return {
        ...state,
        contacts: [
          ...state.contacts,
          action.payload
        ].sort(compareContacts)
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(contact => contact.id === action.payload.id ? action.payload : contact).sort(compareContacts)
      };
    case "REMOVE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(contact => contact.id !== action.payload)
      };
    case "SET_USER_INFO":
      return {
        ...state,
        userInfo: action.payload
      };
    case "SET_CONTACTS":
      return {
        ...state,
        contacts: action.payload
      };
    default:
      return state;
  }
};

export const resetAppState = () => ({
  type: "RESET_APP_STATE"
});

export const setAuthUser = (authUser) => ({
  type: "SET_AUTH_USER",
  payload: authUser
});

export const setSnackbar = (visible, message) => ({
  type: "SET_SNACK_BAR",
  payload: { visible, message }
});

export const addNewContact = (contact) => ({
  type: "ADD_NEW_CONTACT",
  payload: contact
});

export const updateContact = (contact) => ({
  type: "UPDATE_CONTACT",
  payload: contact
});

export const removeContact = (id) => ({
  type: "REMOVE_CONTACT",
  payload: id
});

export const setUserInfo = (userInfo) => ({
  type: "SET_USER_INFO",
  payload: userInfo
});

export const setContacts = (contacts) => {
  return ({
    type: "SET_CONTACTS",
    payload: contacts.sort(compareContacts)
  });
};