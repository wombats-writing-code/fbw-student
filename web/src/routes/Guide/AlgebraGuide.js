import React, { Component } from 'react'

const AlgebraGuide = (props) => {
  return (
    <div className="guide">
      <section className="splash-banner text-center flex-container align-center justify-center">
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/La-znUNWCxE" frameborder="0" allowfullscreen></iframe>
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
                <img className="medium-7 columns" src={require("./assets/login-1.png")} />
                <img className="medium-5 columns" src={require("./assets/login-2.png")} />
              </div>
              <p>It will redirect you back to Fly-by-Wire...wait for it...</p>
              <div className="row">
                <img className="medium-8 columns" src={require("./assets/login-3.png")} />
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
                <img className="medium-6 columns" src={require("./assets/missions-1.png")}/>
                <img className="medium-6 columns" src={require("./assets/missions-2.png")}/>
              </div>
              <p>
                A Mission consists of <span className="">goals</span>.
                Each goal tests your ability to do something, and every goal has a few Target questions.
                You need to get every Target question in the goal correct in order to achieve the goal.
              </p>

              <div className="row">
                <img className="medium-7 columns" src={require("./assets/missions-3.png")}/>
              </div>
            </li>
            <li className="instruction">
              <p>Select a Target to start. Do your best to answer it.</p>
              <p><b>Write down all of your work</b> as you attempt the problem as this is what is expected on exams.</p>
              <p>If you get it right, great! Move on to the next one.</p>
              <div className="row">
                <img className="medium-6 columns" src={require("./assets/do-question-correct.png")}/>
              </div>
              <p>If you get it wrong, Fly-by-Wire will tell you why you got it wrong, and give you a next question that addresses your misunderstanding.
                This is called a <span className="bold">Waypoint</span> question.
              </p>
              <div className="row">
                <img className="medium-8 columns" src={require("./assets/do-question-1.png")}/>
              </div>
              <p>
                <b>Read the solution explanation</b>.
                Compare the solution to your written work and see if you can pinpoint your error.
              </p>
              <div className="row">
                <img className="medium-10 columns" src={require("./assets/do-question-2.png")}/>
              </div>
              <p>
                Then, try to answer the next question. If you get it wrong, Fly-by-Wire will give you an easier question.
              </p>
              <p>In this way, you work down to the most fundamental concepts. When you get a Waypoint question right, you work up towards Target concepts.</p>
            </li>
            <li className="instruction">
              <p>When you answer all of the Waypoint questions correctly, you will have <i>navigated</i> the route &mdash; you should now be ready to try the next Target question. </p>
              <div className="row">
                <img className="medium-6 columns" src={require("./assets/do-question-3.png")}/>
              </div>
            </li>
            <li className="instruction">
              <p>If you do not achieve a goal, you get to try it again in Phase II.</p>
            </li>
            <li className="instruction">
              <p>To log out, click on the <span className="button-ref">Logout</span> button: </p>
              <img className="" src={require("./assets/logout-button.png")}/>

              <p><b>Important!</b> Then, click on the link to your myACC D2L account:</p>
              <img className="" src={require("./assets/logout-link.png")}/>

              <p>You <b>must</b> logout from your myACC D2L account!</p>
              <img className="" src={require("./assets/logout-d2l.png")}/>
            </li>

          </ol>
        </div>
      </section>
    </div>
  )
}

export default AlgebraGuide
