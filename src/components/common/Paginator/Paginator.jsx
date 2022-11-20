import React from "react";
import styles from './Paginator.module.css';

let Paginator = ({totalUsersCount, PageSize, currentPage, onPageChanged}) => {

    let pagesCount = Math.ceil(totalUsersCount / PageSize);

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }



    return  <div>
            {pages.map(p => {
                return <span className={currentPage === p && styles.selectedPage}
                    onClick={(event) => { onPageChanged(p); }}>{p}</span>
            })}
        </div>
       
}

export default Paginator;