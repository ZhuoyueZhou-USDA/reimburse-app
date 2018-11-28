export const createReimburse = reimburse => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authId = getState().firebase.auth.uid;
    firestore
      .collection("reimburseRequests")
      .add({
        ...reimburse,
        createAt: new Date(),
        status: "New",
        submitFirstName: profile.firstName,
        submitLastName: profile.lastName,
        userId: authId
      })
      .then(() => {
        dispatch({ type: "CREATE_REIMBURSE", reimburse });
      })
      .catch(err => {
        dispatch({ type: "CREATE_REIMBURSE_ERR", err });
      });
    console.log("reimburse actions", reimburse);
  };
};

export const updateReimburseStatus = reimburse =>{

  return (dispatch, getState, { getFirebase, getFirestore }) => {
    //
    const firestore = getFirestore();
   console.log('reimburse update',reimburse);
   
   let docRef= firestore
      .collection("reimburseRequests")
      .doc(reimburse.id);
      let update_pr ={};
      docRef.get().then(()=>{
       
        update_pr['status']=reimburse.status
        docRef.update(update_pr);
      }).then(() => {
        dispatch({ type: "UPDATE_REIMBURSE", reimburse });
      })
      .catch(err => {
        dispatch({ type: "UPDATE_REIMBURSE_ERR", err });
      });
    console.log("reimburse actions", reimburse);
  };
}