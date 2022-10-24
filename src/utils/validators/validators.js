export const required = value => {
    if (value) return undefined; //если есть значение возвращает undefined
    return 'Field is required'; // если нет вернет сообщение Field is required
     
}


export const MaxLengthCreator = (maxLenght) => value => { // MaxLengthCreator функция которая возвращает другую функцию value (санка)
    if (value.length > maxLenght) return `Max length is ${maxLenght} symbols`; //если  значение больше maxLenght тогда возвращает ошибку Max length is 10 symbols
    return undefined; // в противном случае вернет undefined
}