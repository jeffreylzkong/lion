import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';

import '@lion/checkbox-group/lion-checkbox-group.js';
import '@lion/checkbox/lion-checkbox.js';

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
          <lion-checkbox label="option 1" .choiceValue="${'option 1'}"></lion-checkbox>
          <lion-checkbox label="option 2" .choiceValue="${'option 2'}"></lion-checkbox>
          <lion-checkbox label="option 3" .choiceValue="${'option 3'}"></lion-checkbox>
        </lion-checkbox-group>
      `);
      expect(eventSpy.callCount).to.equal(consistentCount);
    });

    it('should apply to checkbox', async () => {
      await fixture(html`
        <lion-checkbox @model-value-changed="${eventSpy}" label="option" .choiceValue="${'option'}">
        </lion-checkbox>
      `);
      expect(eventSpy.callCount).to.equal(consistentCount);
    });
  });
});
