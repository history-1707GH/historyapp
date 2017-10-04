
import React from 'react';
import { createStore } from 'redux';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
import store, { selectedPlace, getCurrentLocation } from '../client/store';

chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('does checkout button disable/enable?', () => {
  let fakeStore
  beforeEach('Create testing store from reducer', () => {
      fakeStore = createStore(store);
  });
  
  

})