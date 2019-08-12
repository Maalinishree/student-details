const initialState ={
    studentData:[]
}

const reducer = ( state = initialState,action) => {
    const newState = { ...state };
    if(action.type === "STUDENT_DETAILS"){
        newState.studentData= action.studentData;
    }
    return newState;
}

export default reducer;