import Ironhide, { Loading, Loaded } from './';
import assume from 'assume';
import React from 'react';

describe('Ironhide', function () {
  describe('Loading', function () {
    it('exposes a Loading component', function () {
      assume(Loading).is.a('function');
    });
  });

  describe('Loaded', function () {
    it('exposes a Loading component', function () {
      assume(Loading).is.a('function');
    });
  });
});
