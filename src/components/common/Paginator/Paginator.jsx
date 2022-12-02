import React, {useState} from 'react';
import styles from './Paginator.module.css';
import cn from  "classnames";

let Paginator = ({totalItemsCount, PageSize, currentPage, onPageChanged, portionSize = 10}) => {

    let pagesCount = Math.ceil(totalItemsCount / PageSize);//количество страниц (pagesCount) = общее количество страниц / количество порций страниц (10)(видеть 10 кнопочек)

    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);//пушится массив страниц от одного до конца; 
    }

    let portionCount = Math.ceil(pagesCount / portionSize);// сколько всего порций = количество сраниц/размер порций(10)
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;//определяем левую границу порции - пример для первой страницы (1 - 1) * 10 + 1 = 1 - левая граница первой порции начинается с первой странички
    let rightPortionPageNumber = portionNumber * portionSize;//определяем правую границу порции - 1 * 10 = 10 первая порция заканчивается на 10 страничке



    return  <div className={styles.paginator}>
        {portionNumber > 1 &&
        <button onClick={() => {setPortionNumber(portionNumber - 1)}}>PREV</button>//показывай кнопку PREV в том случае если portionNumber больше 1 - установи setPortionNumber(пришла из хук) = порция текущая - 1
        }
            {pages
            .filter(p => p >= leftPortionPageNumber && p<=rightPortionPageNumber)// с помощью filter проверяем какие нам страницы рисовать - отрисовыем только те страницы которые больше или равны левой границы (leftPortionPageNumber) и меньше либо равны правой границы (rightPortionPageNumber)
            .map((p) => { 
                return <span className={ cn({
                    [styles.selectedPage]: currentPage === p 
                }, styles.pageNumber)}//c помощью cn (classnames) добавляем через запятую несколько классов;styles.selectedPage берем в квадратные скобки потому что свойство не может быть строка
                key={p}
                    onClick={(event) => { 
                        onPageChanged(p); 
                    }}>{p}</span>
            })}
            { portionCount > portionNumber &&
            <button onClick={() => {setPortionNumber(portionNumber + 1)}}>NEXT</button>// стрелка NEXT показывается portionCount(количество порций) больше чем текущая порций которую мы показываем
            }
        </div>
       
}

export default Paginator;