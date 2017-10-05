
import React from 'react';
import { createStore } from 'redux';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import CheckIn from '../client/components/CheckIn';
import { selectedPlace, getCurrentLocation } from '../client/store'
const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

chai.use(chaiEnzyme());
chai.use(sinonChai);

//***bypassing a L from leaflet import that was causing a bug
GLOBAL.window = {};
GLOBAL.document = {
  documentElement: {
    style: {}
  },
  getElementsByTagName: function () { return []; },
  createElement: function () { return {}; }
};
GLOBAL.navigator = {
  userAgent: 'nodejs'
};
GLOBAL.L = require('leaflet');
//***

describe('does checkout button disable/enable?', () => {
  const fakeLocFar = [55, 50]
  const fakeLocClose = [40, -74]
  const fakePlace = { lat: 40, lon: -74 }

  let fakeStore
  const initialState = {}

  beforeEach(() => {
    fakeStore = mockStore(initialState)
  })

  afterEach(() => {
    fakeStore.clearActions()
  })


  it('button locks when far', () => {
    //setting selected place and faraway location
    fakeStore.dispatch(selectedPlace(fakePlace))
    fakeStore.dispatch(getCurrentLocation(fakeLocFar))
    //setting up component
    const comp = shallow(<CheckIn store={fakeStore} />)
    const deepComp=comp.dive()
    //assertion
    expect(deepComp.find('button').prop('disabled')).to.be.equal(true)
  });

  it('button unlocks when close', () => {
    //setting selected place and closeby location
    fakeStore.dispatch(selectedPlace(fakePlace))
    fakeStore.dispatch(getCurrentLocation(fakeLocClose))
    //setting up component
    const comp = shallow(<CheckIn store={fakeStore} />)
    const deepComp=comp.dive()
    //assertion
    expect(deepComp.find('button').prop('disabled')).to.be.equal(false)
  });

  it('button unlocks when close and locks again when user moved far away', () => {
    fakeStore.dispatch(selectedPlace(fakePlace))
    fakeStore.dispatch(getCurrentLocation(fakeLocClose))
    //setting up component
    const comp = shallow(<CheckIn store={fakeStore} />)
    const deepComp=comp.dive()
    //assertion
    expect(deepComp.find('button').prop('disabled')).to.be.equal(false)
    //setting selected place and faraway location
    fakeStore.dispatch(getCurrentLocation(fakeLocFar))
    //assertion
    expect(deepComp.find('button').prop('disabled')).to.be.equal(true)
  });

})