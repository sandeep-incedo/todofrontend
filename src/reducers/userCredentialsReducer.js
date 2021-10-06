const userCredentialsReducer = (state = {}, action) => {
    switch (action.type) {
      case "addCredentials": {
        return {...action.payload};
      }
      default:
        return state;
    }
  };

  export default userCredentialsReducer;