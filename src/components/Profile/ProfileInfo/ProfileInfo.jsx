import React, { useState } from 'react';
import Preloader from '../../common/Preloader/Preloader';
import classes from './ProfileInfo.module.css';
import ProfileStatus from "./ProfileStatus"
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import userPhoto from '../../../assets/images/user.png';
import ProfileDataForm from './ProfileDataForm';


const ProfileInfo = ({ profile, status, updateStatus, IsOwner, savePhoto, SaveProfile }) => {

  let [editMode, setEditMode] = useState(false);//useState это хук изначальное стартовое значение которого будет false(наподобии локального state)

  if (!profile) {
    return <Preloader />
  }

  const onMainPhotoSelected = (event) => {
    if (event.target.files.length) {//если у нас есть фото
      savePhoto(event.target.files[0]);//передаем фото в savePhoto (внешний мир)
    }
  };

  const onSubmit = (FormData) => {//сюда придут данные из ProfileDataForm
     SaveProfile(FormData).then(() => {// функция асинхронна то есть только после того как она отработает сработает setEditMode
         setEditMode(false)//после того как мы передали наши данные режим редактирования отключается
     })
    }//мы вызываем SaveProfile и передаем в него FormData(наши даные из ProfileDataForm)

  return (

    <div>
      <div className={classes.descriptionBlock}>
        <img src={profile.photos.large || userPhoto} className={classes.mainPhoto}//либо фото с бекенда либо userPhoto; либо там true либо тут true  
        />
        {IsOwner && <input type={"file"} onChange={onMainPhotoSelected} />//кликая на input type={"file"} мы можем выбрать файл; когда будет выбран файл у нас сработает onChange  
        }
        { editMode ?  <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/> : <ProfileData goToEditeMode={ () => {setEditMode(true)} } profile={profile} IsOwner={IsOwner}/> //если editMode true то ProfileDataForm если false то <ProfileData profile={profile}; initialValues={profile} в режиме редактирования присутствуют стартовые значения (ни с чем не связано! только profile)
        } 
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  )
}

const ProfileData = ({ profile, IsOwner, goToEditeMode  }) => {
  return <div>
     { IsOwner && <div><button onClick={goToEditeMode}>edit</button></div> //если мы IsOwner отображается button
    }
    <div>
      <b>Full name</b> : {profile.fullName}
    </div>
    <div>
      <b>looking for a job</b> : {profile.lookingForAJob ? "yes" : "no"}
    </div>
    {profile.lookingForAJob &&
      <div>
        <b>My professionals skills</b> : {profile.lookingForAJobDescription}
      </div>
    }
    <div>
      <b>Aboute me</b> : {profile.aboutMe}
    </div>
    <div>
      <b>Contacts</b> : {Object.keys(profile.contacts).map(key => {//Object.keys перебирает все подобьеты profile.contacts
        return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />//с помощью map на каждое имя свойства мы хотим отрисовать Contact с приходящими props contactTitle(приходит свойство key) contactValue(мы обращаемся к контактам и через квадратные скобки прочитаем значение свойства по етому ключу)
      })//обязательно когда map передаем key в Contact так как мы ее используем там
      }
    </div>
  </div>
}



const Contact = ({ contactTitle, contactValue }) => {// пример в документации contactTitle=github, contactValue=required(string)(значение)
  return <div className={classes.contact}><b>{contactTitle}</b>: {contactValue}</div> 
}

export default ProfileInfo;