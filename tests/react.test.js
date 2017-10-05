
import React from 'react';
import { createStore } from 'redux';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon';
import sinonChai from 'sinon-chai';
import { shallow } from 'enzyme';
import Checkout from '../client/components/Checkout';

chai.use(chaiEnzyme());
chai.use(sinonChai);

describe('does checkout button disable/enable?', () => {
  const fakeLocFar = [55, 50]
  const fakeLocClose = [40, -74]
  const fakePlace = { lat: 40, lon: -74 }
  let fakeStore

  

  it('lock true', () => {
    function reducer(){
      return {
        selectedPlace: fakePlace,
        currentLocation: fakeLocFar
      }
    }
    fakeStore = createStore(reducer)
    const comp = shallow(<Checkout store={fakeStore} />)
    comp.dive().instance().isLock();
    expect(comp.dive().state('lock')).to.be.equal(true);
  });

  it('lock false', (done) => {
    function reducer(){
      return {
        selectedPlace: fakePlace,
        currentLocation: fakeLocClose
      }
    }
    fakeStore = createStore(reducer)
    const comp = shallow(<Checkout store={fakeStore} />)
    comp.dive().instance().isLock()
    function testing(){
      console.log(comp.dive().state())
      expect(comp.dive().state('lock')).to.be.equal(false);
      done()
    }
    setTimeout(testing, 3000)
  });

  // it('lock false', () => {
  //   getCurrentLocation(fakeLocClose)
  //   expect(shallow(<Checkout />).find('button')).to.have.html('<button type="button" className="btn btn-success" disabled=false> Check in </button>');
  // });

  // it('disabled', () => {

  //   expect(shallow(<Checkout />).find('button')).to.have.html('<button type="button" className="btn btn-success" disabled=true> Check in </button>');
  // });

  // it('enabled', () => {
  //   getCurrentLocation(fakeLocClose)
  //   expect(shallow(<Checkout />).find('button')).to.have.html('<button type="button" className="btn btn-success" disabled=false> Check in </button>');
  // });

})