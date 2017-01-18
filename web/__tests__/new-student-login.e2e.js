process.env.NODE_ENV = 'test'

import _ from 'lodash'
import axios from 'axios'

import {
  authenticateD2LStudent,
  RECEIVE_AUTHENTICATE_D2L
} from 'fbw-platform-common/reducers/Login/authenticateD2L'
import {LOGGED_IN, logInUser} from 'fbw-platform-common/reducers/Login/logInUser'

import thunk from 'redux-thunk'
let chai = require('chai');
const chaiHttp = require('chai-http');

let should = require('should');
chai.should();
chai.use(chaiHttp);

const MAT_BANK_ID = 'assessment.Bank%3A58498ccb71e482e47e0ed8ce%40bazzim.MIT.EDU';
const TEST_MISSION_ID = 'assessment.AssessmentOffered%3A58768d4271e48263fb04feb8%40bazzim.MIT.EDU'

const BASE_URL = 'https://fbw-web-backend.herokuapp.com'

const UNIQUE_USERNAME = Math.floor(new Date().getTime()).toString()

describe('student web app', () => {
  it('should not allow unauthorized students to make qbank calls', () => {
    // just verify that students without qbank authz cannot
    // getMissions, as a contrast against the next `it` block
    chai.request(BASE_URL)
    .get(`/middleman/banks/${MAT_BANK_ID}/missions`)
    .set('x-fbw-username', UNIQUE_USERNAME)
    .end((err, res) => {
      res.should.have.status(500);
      //  console.log(result);

      done();
    })
  })

  it('should create qbank authorizations upon LOGIN', () => {
    // which means that you should be able to make calls
    // under that proxyname to something like, getMissions or getBanks
    const store = mockStore({})

    store.dispatch(logInUser('testing', UNIQUE_USERNAME))
    .then( () => {

    })

    let newState = loginReducer({}, {
      type: LOGGED_IN,
      data: {
        url: mockUrl,
        username: 'Butter-Scotch-1145648@acc.edu',
        banks: [{department: 'Sandbox', id: "assessment.Bank%3A58498ccb71e482e47e0ed8ce%40bazzim.MIT.EDU"}]
      }
    });
  //
  //   newState.user.username.should.be.eql('Butter-Scotch-1145648@acc.edu');
  //   newState.user.d2l.authenticatedUrl.should.be.eql(mockUrl)
  //   newState.isLoggedIn.should.be.eql(true);
  //   newState.isVisitor.should.be.eql(false);
  //
  // })
  //
  // it('should create or retrieve the student\'s private bank upon RECEIVE_AUTHENTICATE_D2L', () => {
  //   // means you can make a getBank call with privateAliasId and the username
  //   // or, alternatively, you can make middleman calls to getMission (which
  //   //   calculates the privateBankId for you)
  //   let credentials = _.assign({}, require('../../../d2lcredentials'), {
  //     role: 'instructor'
  //   })
  //
  //   const expectedAction = {
  //     type: RECEIVE_AUTHENTICATE_D2L,
  //     credentials
  //   }
  //   const store = mockStore({})
  //
  //   store.dispatch(authenticateD2LInstructor(credentials))
  //   .then( () => {
  //     store.getActions().should.be.eql(expectedAction)
  //   })
  // })
  //
  // it('should be able to get a list of D2L shared missions', () => {
  //   // this verifies that the private bank was inserted into the hierarchy
  //   //    correctly
  //   let credentials = _.assign({}, require('../../../d2lcredentials'), {
  //     role: 'student'
  //   })
  //
  //   const expectedAction = {
  //     type: RECEIVE_AUTHENTICATE_D2L,
  //     credentials
  //   }
  //   const store = mockStore({})
  //
  //   store.dispatch(authenticateD2LStudent(credentials))
  //   .then( () => {
  //     store.getActions().should.be.eql(expectedAction)
  //   })
  // })
  function deleteMissionAsync(missionId) {
    return chai.request(BASE_URL)
     .delete(`/middleman/banks/${ALGEBRA_BANK_ID}/missions/${missionId}`)
     .then((res) => {
      //  console.log('delete res', res.text)
       return res.text ? JSON.parse(res.text) : null;
     });
  }

  function deleteAuthzAsync(student) {
    return chai.request(BASE_URL)
     .delete(`/middleman/banks/${ALGEBRA_BANK_ID}/missions/${missionId}`)
     .then((res) => {
      //  console.log('delete res', res.text)
       return res.text ? JSON.parse(res.text) : null;
     });
  }

  function cleanUpPromise(student) {
    console.log('cleaning up for', student);

    return chai.request(BASE_URL)
    .get(`/middleman/banks/${ALGEBRA_BANK_ID}/missions`)
    .set('x-fbw-username', student.agentId)
    .then( (res) => {
      res.should.have.status(200);

      let result = JSON.parse(res.text);
      let phaseIIs = _.filter(result, mission => mission.displayName.text.indexOf('Phase II') > -1 || mission.offereds.length == 0);
      // console.log('all missions', result);
      // console.log(result[0].displayName);

      // console.log('missions to be deleted', _.map(phaseIIs, 'displayName.text'));

      // need to delete the bank
      // need to delete the bank hierarchy
      return Q.all(_.map(phaseIIs, mission => deleteMissionAsync(mission.id)))
    })
    .then( res => res)
    .catch( err => err);
  }

  // clean up all the newly-created authorizations, banks, and missions
  after( function(done) {
    this.timeout(20000);

    Q.all(cleanUpPromise(UNIQUE_USERNAME))
    .then( res => {
      console.log('cleaned up for all newly created students', res.text);

      done();
    })
  });
})
