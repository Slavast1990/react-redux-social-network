import React from 'react';
import { connect } from 'react-redux';
import { follow, setCurrentPage, unfollow, toggleIsFollowingInProgress, getUsers } from '../../redux/users-reducer';
import axios from 'axios';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import {usersAPI} from '../../api/api'
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

class UsersContainer extends React.Component {
    componentDidMount() {

        this.props.getUsers(this.props.currentPage, this.props.PageSize);
       
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.PageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                PageSize={this.props.PageSize}
                currentPage={this.props.currentPage}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        PageSize: state.usersPage.PageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}


export default withAuthRedirect(connect(mapStateToProps,
     { follow, unfollow, setCurrentPage, toggleIsFollowingInProgress, getUsers })(UsersContainer));
