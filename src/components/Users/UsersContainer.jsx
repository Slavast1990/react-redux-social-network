import React from 'react';
import { connect } from 'react-redux';
import { follow, setCurrentPage, unfollow, toggleIsFollowingInProgress, requestUsers } from '../../redux/users-reducer';
import axios from 'axios';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { usersAPI } from '../../api/api'
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../redux/users-selectors';

class UsersContainer extends React.Component {
    componentDidMount() {
        const { currentPage, PageSize } = this.props;
        this.props.getUsers(currentPage, PageSize);

    }

    onPageChanged = (pageNumber) => {
        const {PageSize} = this.props;
        this.props.getUsers(pageNumber, PageSize);
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
    console.log("mapStateToProps USERS")
    return {
        users: getUsers(state),//используем users-selectors
        PageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
}



export default compose(
    // withAuthRedirect,
    connect(mapStateToProps,
        { follow, unfollow, setCurrentPage, toggleIsFollowingInProgress, getUsers: requestUsers })
)(UsersContainer);

