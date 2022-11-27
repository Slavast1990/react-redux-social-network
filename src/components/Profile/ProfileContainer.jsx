import React from 'react';
import Profile from "./Profile";
import { connect } from "react-redux";
import { getStatus, getUserProfile, updateStatus, savePhoto, SaveProfile } from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { compose } from "redux";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push("/login");
            }
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidMount() {//мы заходим единожды в profile и когда меняется url на другой profile компонента не монтируется поетому добавляем componentDidUpdate

        this.refreshProfile();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {//компонента меняется каждый раз когда в ней поменялись либо state либо props
        if (this.props.match.params.userId != prevProps.match.params.userId) { //если текущие props не равны приходящим props то срабатывает componentDidUpdate
            this.refreshProfile();
        }
    }

    render() {
        // console.log("RENDER PROFILE")
        return (
            <Profile {...this.props}
                savePhoto={this.props.savePhoto}
                IsOwner={!this.props.match.params.userId}//я являюсь владельцем страницы если есть userId(!! двойное отрицание true)
                profile={this.props.profile}
                status={this.props.status}
                updateStatus={this.props.updateStatus} />
        )
    }
}

let mapStateToProps = (state) => {
    // console.log("mapStateToProps")
    return ({
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth
    })
};

export default compose(
    connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, SaveProfile }),//все ети данные из UI конектим к business
    withRouter
)(ProfileContainer);