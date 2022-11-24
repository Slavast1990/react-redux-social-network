import React from "react";
import { create } from "react-test-renderer";
import Paginator from "./Paginator";

describe("Paginator component test", () => {
    test("pages count is 11 but should be show only 10", () => {
        const component = create (<Paginator totalItemsCount={11} PageSize={1} portionSize={10} />);
        const root = component.root;
        let spans = root.findAllByType("span");
        expect(spans.length).toBe(10);
    });//должно показываться только 10 span

    test("If pages count is more then 10 button NEXT should be present", () => {
        const component = create (<Paginator totalItemsCount={11} PageSize={1} portionSize={10} />);
        const root = component.root;
        let button = root.findAllByType("button");
        expect(button.length).toBe(1);
    });//должны проверить что появилась button

});
