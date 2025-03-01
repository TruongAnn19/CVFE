import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from '../../../store/actions'

class TableManageUser extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {

            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteUserRedux(user.id)
    }

    handEditUser = (user) => {
        this.props.handleEditUserFromParent(user)
    }

    render() {
        // console.log("check list user: ", this.props.listUsers)
        let arrUsers = this.state.userRedux
        return (
            <div className="user-container">
                <table id='TableManageUser'>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {
                            arrUsers && arrUsers.length > 0
                            && arrUsers.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button
                                                onClick={() => this.handEditUser(item)}
                                                className="btn-edit" ><i className="fas fa-pencil-alt"></i></button>
                                            <button
                                                onClick={() => this.handleDeleteUser(item)}
                                                className='btn-delete' ><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }


                    </tbody>

                </table>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
