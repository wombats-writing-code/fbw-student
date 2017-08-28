import React, { Component } from 'react'

const AlgebraGuide = (props) => {
  return (
    <div className="guide">
      <section className="splash-banner text-center flex-container align-center justify-center">
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/zmFWxZcsxoY" frameborder="0" allowfullscreen></iframe>
      </section>
      <section className="instructions" id="instructions">
        <div className="row">
          <h2 className="columns">How to use FbW</h2>
        </div>
        <div className="row">
          <ol className="instruction-list">
            <li className="instruction">
              <p>Go to <a href="http://fbw-student.mit.edu" target="_blank">fbw-student.mit.edu</a>.</p>
            </li>
            <li className="instruction">
              <p>Click on the <b>Arapahoe MyACC</b> button</p>
              <p>It should take you to the MyACC screen. Login with your MyACC info.</p>
              <div className="row">
                <img
                  alt="Fly-by-wire ACC login link"
                  className="medium-7 columns"
                  src={require("./assets/login-1.png")} />
                <img
                  alt="My ACC login page"
                  className="medium-5 columns"
                  src={require("./assets/login-2.png")} />
              </div>
              <p>It will redirect you back to Fly-by-Wire...wait for it...</p>
              <div className="row">
                <img
                  alt="Redirecting back to the Fly-by-Wire application after ACC login"
                  className="medium-8 columns"
                  src={require("./assets/login-3.png")} />
              </div>
            </li>
            <li className="instruction">
              <p>
                Before every exam, you will get <b>two</b> FbW missions.
                First, you will get a <span className="bold">Phase I mission</span>.
                Then, after you do Phase I, you will get a personalized <span className="bold">Phase II mission</span>.
              </p>
              <p>Click to your Missions.</p>
              <div className="row">
                <img
                  alt="Phase I assignment icon and text"
                  className="medium-6 columns"
                  src={require("./assets/missions-1.png")}/>
                <img
                  alt="Phase II assignment icon and text"
                  className="medium-6 columns"
                  src={require("./assets/missions-2.png")}/>
              </div>
              <p>
                A Mission consists of <span className="">goals</span>.
                Each goal tests your ability to do something, and every goal has a few Target questions.
                You need to get every Target question in the goal correct in order to achieve the goal.
              </p>

              <div className="row">
                <img
                  alt="Goals and targets, each in their own horizontal carousel"
                  className="medium-7 columns"
                  src={require("./assets/missions-3--accounting.png")}/>
              </div>
            </li>
            <li className="instruction">
              <p>Select a Target to start. Do your best to answer it.</p>
              <p>If you get it right, great! Move on to the next one.</p>
              <div className="row">
                <img
                  alt="A target question answered correctly"
                  className="medium-6 columns"
                  src={require("./assets/do-question-correct--accounting.png")}/>
              </div>
              <p>If you get it wrong, Fly-by-Wire will tell you why you got it wrong, and give you a next question that addresses your misunderstanding.
                This is called a <span className="">Waypoint</span> question.
              </p>
              <div className="row">
                <img
                  alt="A sequence of two questions, showing how a target question answered incorrectly generates a review question"
                  className="medium-10 columns"
                  src={require("./assets/do-question-1--accounting.png")}/>
              </div>
              <p>
                <b>Read the solution explanation</b>.
              </p>
              <div className="row">
                <img
                  alt="Each answered question has a solution block that you should review"
                  className="medium-8 columns"
                  src={require("./assets/do-question-2--accounting.png")}/>
              </div>
              <p>
                Then, try to answer the next question. If you get it wrong, Fly-by-Wire will give you an easier question.
              </p>
              <p>In this way, you work down to the most fundamental concepts. When you get a Waypoint question right, you work up towards Target concepts.</p>
            </li>
            <li className="instruction">
              <p>When you answer all of the Waypoint questions correctly, you will have <i>navigated</i> the route &mdash; you should now be ready to try the next Target question. </p>
              <div className="row">
                <img
                  alt="A fully navigated route will show the 'tried' badge in the target carousel"
                  className="columns"
                  src={require("./assets/do-question-3--accounting.png")}/>
              </div>
            </li>
            <li className="instruction">
              <p>If you do not achieve a goal, you get to try it again in Phase II.</p>
            </li>
            <li className="instruction">
              <p>To log out, click on the <span className="button-ref">Logout</span> button: </p>
              <img
                alt="The logout button for the Fly-by-Wire application"
                className=""
                src={require("./assets/logout-button.png")}/>

              <p><b>Important!</b> Then, click on the link to your myACC D2L account:</p>
              <img
                alt="After logging out of Fly-by-Wire, a link will appear directing you to log out of Desire 2 Learn"
                className=""
                src={require("./assets/logout-link.png")}/>

              <p>You <b>must</b> logout from your myACC D2L account!</p>
              <img
                alt="Log out of the Desire 2 Learn application as well"
                className=""
                src={require("./assets/logout-d2l.png")}/>
            </li>
          </ol>
        </div>
      </section>
    </div>
  )
}

export default AlgebraGuide
