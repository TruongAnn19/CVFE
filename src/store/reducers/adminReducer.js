import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoading: false,
    genders: [],
    roles: [],
    positions: [],
    users: []
}

const adminReducer = (state = initialState, action) => {
    let copyState = { ...state }
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            copyState.isLoading = true
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            copyState.isLoading = false
            copyState.genders = action.data
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_FAIDED:
            copyState.isLoading = false
            copyState.genders = []
            return {
                ...copyState,
            }

        case actionTypes.FETCH_ROLE_START:
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            copyState.roles = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_ROLE_FAIL:
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_START:
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            copyState.positions = action.data
            return {
                ...copyState,
            }
        case actionTypes.FETCH_POSITION_FAIL:
            return {
                ...state,
            }
        case actionTypes.FETCH_USER_SUCCESS:
            copyState.users = action.users
            return {
                ...copyState,
            }
        case actionTypes.FETCH_USER_FAIL:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;