import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES, CRUD_USER, CommonUtils } from '../../../utils'
import * as actions from '../../../store/actions'
import './UserRedux.scss'
import { selectFilter } from 'react-bootstrap-table2-filter';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { first, last } from 'lodash';
import TableManageUser from './TableManageUser';
class ProductManage extends Component {

    constructor(prop) {
        super(prop)
        this.state = {
            genderArr: [],
            roleArr: [],
            positionArr: [],
            previewImage: '',
            isOpen: false,


            email: '',
            password: '',
            fisrtName: '',
            lastName: '',
            address: '',
            phonenumber: '',
            gender: '',
            role: '',
            position: '',
            avatar: '',

            action: '',
            editUserId: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getRoleStart()
        this.props.getPositionStart()
        // try {
        //     let res = await getAllCodeService(`gender`)
        //     if (res && res.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        //     console.log(res)
        // } catch (e) {
        //     console.log(e)
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                genders: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }

        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux
            this.setState({
                roleArr: arrRole,
                roles: arrRole && arrRole.length > 0 ? arrRole[0].key : ''
            })
        }

        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux
            this.setState({
                positionArr: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : ''
            })
        }

        if (prevProps.listUsers !== this.props.listUsers) {
            let arrGenders = this.props.genderRedux
            let arrRole = this.props.roleRedux
            let arrPosition = this.props.positionRedux

            this.setState({
                email: '',
                password: '',
                fisrtName: '',
                lastName: '',
                address: '',
                phonenumber: '',
                genders: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
                roles: arrRole && arrRole.length > 0 ? arrRole[0].key : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : '',
                img: '',
                previewImage: '',
                action: CRUD_USER.CREATE
            })
        }
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            const objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImage: objectUrl,
                avatar: base64
            })
        }
    }

    handleOnClickImage = () => {
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkIsValue()
        let { action } = this.state
        if (isValid === false) return

        if (action === CRUD_USER.CREATE) {
            this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.fisrtName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }

        if (action === CRUD_USER.EDIT) {
            this.props.editUserRedux({
                id: this.state.editUserId,
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.fisrtName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phonenumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar: this.state.avatar
            })
        }
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checkIsValue = () => {
        let isValid = true
        let arrCheck = [`email`, `password`, `fisrtName`,
            `lastName`, `address`, `phonenumber`]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                alert("this is parameter: " + arrCheck[i])
                break;
            }
        }
        return isValid
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = ''
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }

        this.setState({
            editUserId: user.id,
            email: user.email,
            password: 'HARDCODE',
            fisrtName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phonenumber: user.phonenumber,
            genders: user.gender,
            roles: user.roleId,
            position: user.positionId,
            avatar: '',
            previewImage: imageBase64,
            action: CRUD_USER.EDIT
        })
    }

    render() {
        let language = this.props.language
        let genders = this.state.genderArr
        let isGetGender = this.props.isLoadingGender
        let roles = this.state.roleArr
        let positions = this.state.positionArr
        let { email, password, fisrtName,
            lastName, address, phonenumber,
            gender, role, position, avatar
        } = this.state
        return (
            <div className='user-redux-container'>
                <div className="title">User redux</div>
                <div>{isGetGender === true ? 'Loanding Data' : ''}</div>
                <div className='container'>
                    <div className='row'>
                        <span><FormattedMessage id="manage-user.add" /></span>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.email" /></label>
                            <input
                                className='from-control'
                                type='email'
                                style={{ width: `100%` }}
                                value={email}
                                onChange={(event) => { this.onChangeInput(event, 'email') }}
                                disabled={this.state.action === CRUD_USER.EDIT ? true : false}
                            />
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.password" /></label>
                            <input
                                className='from-control'
                                type='password'
                                style={{ width: `100%` }}
                                value={password}
                                onChange={(event) => { this.onChangeInput(event, 'password') }}
                                disabled={this.state.action === CRUD_USER.EDIT ? true : false}

                            />
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.first-name" /></label>
                            <input
                                className='from-control'
                                type='text'
                                style={{ width: `100%` }}
                                value={fisrtName}
                                onChange={(event) => { this.onChangeInput(event, 'fisrtName') }}
                            />
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.last-name" /></label>
                            <input
                                className='from-control'
                                type='text'
                                style={{ width: `100%` }}
                                value={lastName}
                                onChange={(event) => { this.onChangeInput(event, 'lastName') }}
                            />
                        </div>
                        <div className='col-9'>
                            <label><FormattedMessage id="manage-user.address" /></label>
                            <input
                                className='from-control'
                                type='text'
                                style={{ width: `100%` }}
                                value={address}
                                onChange={(event) => { this.onChangeInput(event, 'address') }}
                            />
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.phone-number" /></label>
                            <input
                                className='from-control'
                                type='text'
                                style={{ width: `100%` }}
                                value={phonenumber}
                                onChange={(event) => this.onChangeInput(event, 'phonenumber')}
                            />
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.gender" /></label>
                            <select className='form-control'
                                onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                value={gender}
                            >
                                {genders && genders.length > 0 &&
                                    genders.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.roleID" /></label>
                            <select className='form-control'
                                onChange={(event) => { this.onChangeInput(event, 'role') }}
                                value={role}
                            >
                                {roles && roles.length > 0 &&
                                    roles.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.position" /></label>
                            <select className='form-control'
                                onChange={(event) => { this.onChangeInput(event, 'position') }}
                                value={position}
                            >
                                {positions && positions.length > 0 &&
                                    positions.map((item, index) => {
                                        return (
                                            <option key={index} value={item.key}>
                                                {language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className='col-3'>
                            <label><FormattedMessage id="manage-user.img" /></label>
                            <div className='preview-img-container'>
                                <input id='previewImg' type='file' hidden
                                    onChange={(event) => this.handleOnChangeImage(event)}
                                />
                                <label className='label-upload' htmlFor='previewImg'>
                                    Tải ảnh
                                    <i className='fas fa-upload'></i>
                                </label>
                                <div
                                    className='preview-img'
                                    value={avatar}
                                    style={{ backgroundImage: `url(${this.state.previewImage})` }}
                                    onClick={() => this.handleOnClickImage()}
                                ></div>
                            </div>
                        </div>

                        <div className='col-12 mt-3'>
                            <button
                                className={this.state.action === CRUD_USER.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                                type='submit'
                                onClick={() => this.handleSaveUser()}

                            >
                                {this.state.action === CRUD_USER.EDIT ?
                                    <FormattedMessage id="manage-user.edit" />
                                    :
                                    <FormattedMessage id="manage-user.save" />
                                }
                            </button>
                        </div>
                        <div className='col-12 mb-5'>
                            <TableManageUser
                                handleEditUserFromParent={this.handleEditUserFromParent}
                                action={this.state.action}
                            />
                        </div>
                    </div>
                </div>

                {
                    this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImage}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        isLoadingGender: state.admin.isLoading,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        editUserRedux: (data) => dispatch(actions.editUser(data))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
