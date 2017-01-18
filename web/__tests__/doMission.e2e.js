process.env.NODE_ENV = 'test'

// import _ from 'lodash'
// import axios from 'axios'
//
// import {
//   authenticateD2LStudent, authenticateD2LInstructor,
//   RECEIVE_AUTHENTICATE_D2L
// } from '../authenticateD2L'
//
// import thunk from 'redux-thunk'
// let chai = require('chai');
// let should = require('should');
// chai.should();
//
//
// import configureMockStore from 'redux-mock-store'
// const middlewares = [ thunk ]
// const mockStore = configureMockStore(middlewares)
//
//
// describe('student web app', () => {
//
//   it('should be able to get questions for a mission', () => {
//     let credentials = _.assign({}, require('../../../d2lcredentials'), {
//       role: 'student'
//     })
//
//     const expectedAction = {
//       type: RECEIVE_AUTHENTICATE_D2L,
//       credentials
//     }
//     const store = mockStore({})
//
//     store.dispatch(authenticateD2LStudent(credentials))
//     .then( () => {
//       store.getActions().should.be.eql(expectedAction)
//     })
//   })
//
//   it('should be able to get submit responses for a mission', () => {
//     let credentials = _.assign({}, require('../../../d2lcredentials'), {
//       role: 'student'
//     })
//
//     const expectedAction = {
//       type: RECEIVE_AUTHENTICATE_D2L,
//       credentials
//     }
//     const store = mockStore({})
//
//     store.dispatch(authenticateD2LStudent(credentials))
//     .then( () => {
//       store.getActions().should.be.eql(expectedAction)
//     })
//   })
//
// })
