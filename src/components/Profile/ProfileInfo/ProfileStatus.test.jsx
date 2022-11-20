import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus Component", () => {//describe мы описываем компонент который мы тестим
    test("status from the props should be in the state", () => {
      const component = create(<ProfileStatus status="it-kamasutra.com" />);//create фейково создает и рендерит компоненту
      const instance = component.getInstance();//getInstance возвращает экземпляр соответствующий корневому элементу(ProfileStatus), если таковой существует и instance по сути это ProfileStatus
      expect(instance.state.status).toBe("it-kamasutra.com");//проверяем что у обьекта (ProfileStatus) пришел status
    });//проверяем приходит ли status в ProfileStatus

    test(`after creation <span> should be displayed`, () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span).not.toBeNull();//длина span должна быть 1
      });;//проверяем span

      test("after creation <input> shouldn`t be displayed", () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" />);
        const root = component.root;
        expect(() => {
            let input = root.findByType("input");
        }).toThrow();// на старте при findByType("input") будет ошибка (toThrow)
      });;//проверяем input

      test(`after creation <span> should contains correct status`, () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" />);
        const root = component.root;
        let span = root.findByType("span");
        expect(span.children[0]).toBe("it-kamasutra.com");//children с нулевым елементом([0]) отображает тот текс который мы передали в toBe ("it-kamasutra.com")
      });;//проверяем что у span текст тот который status

      test(`<input> should be displayed in EditMode instead of span`, () => {
        const component = create(<ProfileStatus status="it-kamasutra.com" />);
        const root = component.root;
        let span = root.findByType("span");
        span.props.onDoubleClick();
        let input = root.findByType("input");
        expect(input.props.value).toBe("it-kamasutra.com");//значение input.props.value отображает тот текс который мы передали в toBe ("it-kamasutra.com")
      });;//проверяем input

      test(`callback should be called`, () => {
        const mockCallback = jest.fn();//mockCallback создается с помощью jest.fn
        const component = create(<ProfileStatus status="it-kamasutra.com" updateStatus={mockCallback} />);
        const instance = component.getInstance();
        instance.deActivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);//значение mockCallback.mock.calls.length говорит о том сколько нас раз вызвали - ответ 1 toBe (1)
      });;//специальная функция mockCallback умеет читать сколько раз ее вызывали
  })

  