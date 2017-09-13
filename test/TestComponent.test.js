/**
 * Created by jean.h.ma on 10/08/2017.
 */
import React from "react";
import {mount} from "enzyme";
import TestComponent from '../src/components/TestComponent'

describe("render `<TestComponent/>` ", ()=> {
	const wrapper = mount((
		<TestComponent/>
	));
	test(`text container 'hello'`, ()=> {
		const titleEl = wrapper.find('p');
		const text = titleEl.text();
		expect(text).toContain('hello')
	});
})