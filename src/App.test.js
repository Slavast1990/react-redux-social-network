import React from 'react';
import ReactDOM from 'react-dom';
import SamuraiJSApp from './App';

it('renders without crashing', () => {//тест на отрисовку нашей компоненты SamuraiJSApp
  const div = document.createElement('div');//createElement() позволяет создать и вернуть новый элемент с заданым тегом div
  ReactDOM.render(<SamuraiJSApp />, div);
  ReactDOM.unmountComponentAtNode(div);// unmountComponentAtNode - Удалите установленный компонент React из DOM и очистите его обработчики событий и состояние
});
