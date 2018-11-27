export const createReimburse = (reimburse)=>{
    return (dispatch,getState, {getFirebase, getFirestore})=>{
        //
        const firestore = getFirestore();
        firestore.collection('reimburseRequests').add({
            ...reimburse,
            createAt: new Date()
        }).then(()=>{
            dispatch({ type:'CREATE_REIMBURSE',reimburse})
        }).catch((err)=>{
            dispatch({ type:'CREATE_REIMBURSE_ERR',err})
        })
        console.log('reimburse actions',reimburse);
        
    }
}