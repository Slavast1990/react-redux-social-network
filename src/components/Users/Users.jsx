import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

let Users = ({ currentPage, totalUsersCount, PageSize, onPageChanged, users, ...props }) => {
    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged} totalItemsCount={totalUsersCount} PageSize={PageSize} />
        <div>
            {//Paginator это отрисовка станичек(количество юзеров, текущая страница и т.д.)
                users.map(u => <User user={u}
                    followingInProgress={props.followingInProgress}//берем с props так как аргументов много
                    unfollow={props.unfollow}
                    follow={props.follow}
                    key={u.id} />)
            }
        </div>
    </div>
}
export default Users;