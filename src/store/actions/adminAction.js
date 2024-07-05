import actionTypes from './actionTypes';
import {
    getAllCodeService, createNewUserSevice, getAllUsers,
    deleteUserSevice, editUserSevice
} from '../../services/userService';
import { toast } from 'react-toastify';
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.FETCH_GENDER_START })
        try {
            let res = await getAllCodeService("GENDER")
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else (
                dispatch(fetchGenderFaided())
            )
        } catch (e) {
            dispatch(fetchGenderFaided())
            console.log(e)
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFaided = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("ROLE")
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else (
                dispatch(fetchRoleFaided())
            )
        } catch (e) {
            dispatch(fetchRoleFaided())
            console.log(e)
        }
    }
}

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFaided = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCodeService("POSITION")
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else (
                dispatch(fetchPositionFaided())
            )
        } catch (e) {
            dispatch(fetchPositionFaided())
            console.log(e)
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFaided = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserSevice(data)
            if (res && res.errCode === 0) {
                toast.success("Create New User Success!")
                dispatch(createNewUserSuccess())
                dispatch(fetchAllUserStart())
            } else (
                dispatch(createNewUserFaided())
            )
        } catch (e) {
            dispatch(createNewUserFaided())
            console.log(e)
        }
    }
}

export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_USSER_SUCCESS
})

export const createNewUserFaided = () => ({
    type: actionTypes.CREATE_USER_FAIL
})

export const fetchAllUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL")
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                toast.error('Fetch all user error ')
                dispatch(fetchAllUserFaided())
            }

        } catch (e) {
            toast.error('Fetch all user error ')
            dispatch(fetchAllUserFaided())
            console.log(e)
        }
    }
}

export const fetchAllUserSuccess = (userData) => ({
    type: actionTypes.FETCH_USER_SUCCESS,
    users: userData
})

export const fetchAllUserFaided = () => ({
    type: actionTypes.FETCH_USER_FAIL
})

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserSevice(userId)
            if (res && res.errCode === 0) {
                toast.success("Delete User Success!")
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error('Delete User Faided!')
                dispatch(deleteUserFaided())
            }
        } catch (e) {
            toast.error('Delete User Faided!')
            dispatch(deleteUserFaided())
            console.log(e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFaided = () => ({
    type: actionTypes.DELETE_USER_FAID
})


export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserSevice(data)
            if (res && res.errCode === 0) {
                toast.success("Edit User Success!")
                dispatch(editUserSuccess())
                dispatch(fetchAllUserStart())
            } else {
                toast.error('Edit User Faided!')
                dispatch(editUserFaided())
            }
        } catch (e) {
            toast.error('Edit User Faided!')
            dispatch(editUserFaided())
            console.log(e)
        }
    }
}

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFaided = () => ({
    type: actionTypes.EDIT_USER_FAID
})