export const addCredentials = (userCredentials) => {
  return (dispatch) => {
     dispatch({
       type:'addCredentials',
       payload: userCredentials
     })
  }
}