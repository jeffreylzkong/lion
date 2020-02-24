import { expect, fixture, html, unsafeStatic, defineCE } from '@open-wc/testing';
import sinon from 'sinon';

import { LitElement } from '@lion/core';

import '@lion/checkbox-group/lion-checkbox-group.js';
import '@lion/checkbox/lion-checkbox.js';

import '@lion/radio-group/lion-radio-group.js';
import '@lion/radio/lion-radio.js';

import '@lion/select/lion-select.js';
import '@lion/select-rich/lion-select-rich.js';
import '@lion/select-rich/lion-options.js';
import '@lion/option/lion-option.js';

import '@lion/input/lion-input.js';
import '@lion/input-amount/lion-input-amount.js';
import '@lion/input-date/lion-input-date.js';
import '@lion/input-datepicker/lion-input-datepicker.js';
import '@lion/input-email/lion-input-email.js';
import '@lion/input-iban/lion-input-iban.js';
import '@lion/input-range/lion-input-range.js';
import '@lion/textarea/lion-textarea.js';

import '@lion/fieldset/lion-fieldset.js';
import '@lion/form/lion-form.js';

import { FormatMixin } from '@lion/field';

describe('model value', () => {
  describe('consistent init dispatch count', () => {
    const consistentCount = 1;

    let eventSpy;
    beforeEach(() => {
      eventSpy = sinon.spy();
    });

    ['checkbox', 'radio'].forEach(chunk => {
      const groupTag = unsafeStatic(`lion-${chunk}-group`);
      const itemTag = unsafeStatic(`lion-${chunk}`);

      it(`should apply to ${chunk}-group`, async () => {
        await fixture(html`
          <${groupTag} @model-value-changed="${eventSpy}">
            <${itemTag} .choiceValue="${'option1'}"></${itemTag}>
            <${itemTag} .choiceValue="${'option2'}"></${itemTag}>
            <${itemTag} .choiceValue="${'option3'}"></${itemTag}>
          </${groupTag}>
        `);
        expect(eventSpy.callCount).to.equal(consistentCount);
      });

      it(`should apply to ${chunk}`, async () => {
        await fixture(html`
          <${itemTag}
            @model-value-changed="${eventSpy}"
            .choiceValue="${'option'}">
          </${itemTag}>
        `);
        expect(eventSpy.callCount).to.equal(consistentCount);
      });
    });

    it('should apply to select', async () => {
      await fixture(html`
        <lion-select @model-value-changed="${eventSpy}">
          <select slot="input">
            <option value="option1"></option>
            <option value="option2"></option>
            <option value="option3"></option>
          </select>
        </lion-select>
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

    it('should apply to option', async () => {
      await fixture(html`
        <lion-option @model-value-changed="${eventSpy}" .choiceValue="${'option'}"> </lion-option>
      `);
      expect(eventSpy.callCount).to.equal(consistentCount);
    });

    [
      'input',
      'input-amount',
      'input-date',
      'input-datepicker',
      'input-email',
      'input-iban',
      'input-range',
      'textarea',
    ].forEach(suffix => {
      const tag = unsafeStatic(`lion-${suffix}`);
      it(`should apply to ${suffix}`, async () => {
        await fixture(html`
          <${tag} @model-value-changed="${eventSpy}"></${tag}>
        `);
        expect(eventSpy.callCount).to.equal(consistentCount);
      });
    });
  });

  describe('consistent interaction dispatch count', () => {
    it('should apply to checkbox-group', async () => {
      const el = await fixture(html`
        <lion-checkbox-group>
          <lion-checkbox .choiceValue="${'option1'}"></lion-checkbox>
          <lion-checkbox .choiceValue="${'option2'}"></lion-checkbox>
          <lion-checkbox .choiceValue="${'option3'}"></lion-checkbox>
        </lion-checkbox-group>
      `);
      const spy = sinon.spy();
      el.addEventListener('model-value-changed', spy);

      const option2 = el.querySelector('lion-checkbox:nth-child(2)');
      option2.checked = true;
      expect(spy.callCount).to.equal(1);

      spy.resetHistory();

      const option3 = el.querySelector('lion-checkbox:nth-child(3)');
      option3.checked = true;
      expect(spy.callCount).to.equal(1);
    });

    it('should apply to checkbox', async () => {
      const el = await fixture(html`
        <lion-checkbox .choiceValue="${'option'}"></lion-checkbox>
      `);

      const spy = sinon.spy();
      el.addEventListener('model-value-changed', spy);

      el.checked = true;
      expect(spy.callCount).to.equal(1);

      spy.resetHistory();

      el.checked = false;
      expect(spy.callCount).to.equal(1);
    });

    it('should apply to radio-group', async () => {
      const el = await fixture(html`
        <lion-radio-group>
          <lion-radio .choiceValue="${'option1'}"></lion-radio>
          <lion-radio .choiceValue="${'option2'}"></lion-radio>
          <lion-radio .choiceValue="${'option3'}"></lion-radio>
        </lion-radio-group>
      `);

      const spy = sinon.spy();
      el.addEventListener('model-value-changed', spy);

      const option2 = el.querySelector('lion-radio:nth-child(2)');
      option2.checked = true;
      expect(spy.callCount).to.equal(1);

      spy.resetHistory();

      const option3 = el.querySelector('lion-radio:nth-child(3)');
      option3.checked = true;
      expect(spy.callCount).to.equal(1);
    });
  });

  describe('event', () => {
    let el;
    beforeEach(async () => {
      const tag = defineCE(
        class extends FormatMixin(LitElement) {
          render() {
            return html`
              <slot name="input"></slot>
            `;
          }

          get _inputNode() {
            return this.querySelector('input');
          }

          set value(newVal) {
            this._inputNode.value = newVal;
          }

          get value() {
            return this._inputNode.value;
          }
        },
      );
      el = await fixture(`
        <${tag}><input slot="input"></input></${tag}>
      `);
    });

    it('should NOT bubble', async () => {
      const spy = sinon.spy();

      el.addEventListener('model-value-changed', spy);
      el.modelValue = 'foo';

      const e = spy.firstCall.args[0];
      expect(e.bubbles).to.be.false;
    });

    it('should NOT go past component boundaries', () => {
      const spy = sinon.spy();

      el.addEventListener('model-value-changed', spy);
      el.modelValue = 'foo';

      const e = spy.firstCall.args[0];
      expect(e.composed).to.be.false;
    });
  });
});
