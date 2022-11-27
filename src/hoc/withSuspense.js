import React from "react";
import Preloader from "../components/common/Preloader/Preloader";




export const withSuspense = (Component) => {
    return (props) => {
        return <React.Suspense fallback={<div>loading...</div>//Suspense (“задержка”) позволяет показать запсное содержание, пока  не подгрузилась компонента(данные) показывает Loading
        } >
        <Component {...props} />
        </React.Suspense>
    };
}

