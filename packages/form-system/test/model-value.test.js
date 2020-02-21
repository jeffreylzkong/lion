import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';

import '@lion/checkbox-group/lion-checkbox-group.js';
import '@lion/checkbox/lion-checkbox.js';

import '@lion/radio-group/lion-radio-group.js';
import '@lion/radio/lion-radio.js';

import '@lion/select-rich/lion-select-rich.js';
import '@lion/select-rich/lion-options.js';
import '@lion/option/lion-option.js';

describe('model value', () => {
  describe('consistent init dispatch count', () => {
    const consistentCount = 1;

    let eventSpy;
    beforeEach(() => {
      eventSpy = sinon.spy();
    });

    it('should apply to checkbox-group', async () => {
      await fixture(html`
        <lion-checkbox-group @model-value-changed="${eventSpy}">
          <lion-checkbox .choiceValue="${'option 1'}"></lion-checkbox>
          <lion-checkbox .choiceValue="${'option 2'}"></lion-checkbox>
          <lion-checkbox .choiceValue="${'option 3'}"></lion-checkbox>
        </lion-checkbox-group>
      `);
      expect(eventSpy.callCount).to.equal(consistentCount);
    });

    it('should apply to checkbox', async () => {
      await fixture(html`
        <lion-checkbox @model-value-changed="${eventSpy}" .choiceValue="${'option'}">
        </lion-checkbox>
      `);
      expect(eventSpy.callCount).to.equal(consistentCount);
    });

    it('should apply to radio-group', async () => {
      await fixture(html`
        <lion-radio-group @model-value-changed="${eventSpy}">
          <lion-radio .choiceValue="${'option 1'}"></lion-radio>
          <lion-radio .choiceValue="${'option 2'}"></lion-radio>
        </lion-radio-group>
      `);
      expect(eventSpy.callCount).to.equal(consistentCount);
    });

    it('should apply to radio', async () => {
      await fixture(html`
        <lion-radio @model-value-changed="${eventSpy}" .choiceValue="${'option'}"> </lion-radio>
      `);
      expect(eventSpy.callCount).to.equal(consistentCount);
    });

    it('should apply to select-rich', async () => {
      await fixture(html`
        <lion-select-rich @model-value-changed="${eventSpy}">
          <lion-options slot="input">
            <lion-option .choiceValue="${'option1'}"></lion-option>
            <lion-option .choiceValue="${'option2'}"></lion-option>
            <lion-option .choiceValue="${'option3'}"></lion-option>
          </lion-options>
        </lion-select-rich>
      `);
      expect(eventSpy.callCount).to.equal(consistentCount);
    });
  });
});
