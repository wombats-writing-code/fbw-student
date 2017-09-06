import React, { Component } from 'react'

const AlgebraGuide = (props) => {
  let transcript = <article
    aria-expanded={props.transcriptExpanded}
    className="transcript"></article>

  if (props.transcriptExpanded) {
    transcript = (
      <article
        aria-expanded={props.transcriptExpanded}
        className="transcript transcript__expanded">
        <div className="row">
          <h3 className="columns">Video Transcript</h3>
        </div>
        <div className="row">
          <p>To access your Fly-by-Wire assignments, open up a web browser
            (Chrome, Safari, or FireFox is fine), and go to fbw-student.mit.edu.</p>
          <p>Click on the Arapahoe "MyACC" button, and enter your MyACC credentials.</p>
          <p>Once you log in, you'll be redirected to your Fly-by-Wire dashboard.</p>
          <p>I see that I have a mission due on Thursday, February 2,
            so if I click on "See Missions", I'll see all the missions that are waiting
            for me.</p>
          <p>Since my Unit 1 exam is coming up, I have a Fly-by-Wire
            mission waiting for me to complete, so I'm going to click on
            Unit 1 Review - Phase I.</p>
          <p>And this is what I will see.</p>
          <p>A mission consists of goals.</p>
          <p>You'll see the goals along the top of your screen.</p>
          <p>A goal is a learning objective from the unit.</p>
          <p>When you click on a goal, you will see some number of target questions.</p>
          <p>These icons below the goals are targets.</p>
          <p>If you click on one of them, you'll be given a practice problem that
            aligns with the goal above.</p>
          <p>Do your best to answer the target questions.</p>
          <p>Write down all your work as you attempt the problems, as this is what is expected
            on your exams.</p>
          <p>So for this problem, I'm going to select answer choice a, hit submit,
            and I see that I got a green checkmark and that the target
            is shown as being achieved.</p>
          <p>Alright, so let's move on to the next target question, and I'm going
            to select choice d.</p>
          <p>Click submit.</p>
          <p>This time I see that I got the question wrong.</p>
          <p>Fly-by-Wire also tells me that I might need to
            review a more fundamental objective and gives me an easier question
            that addresses this learning objective.</p>
          <p>The idea is that if I get this easier question right, it might help me answer the next
            target question correctly.</p>
          <p>Fly-by-Wire also shows me a solution to the original target question,
            so you can review that solution and compare it to your own and see
            where you might have made a misstep.</p>
          <p>So I'm going to take a look at the waypoint question.</p>
          <p>Hit submit, and see that I got it right, and it says "good job, you've reached the
            end of the route. Please try another target question."</p>
          <p>So if I go back up to the top, I see that Fly-by-Wire has recorded
            this target as "tried", and now I'm going to go on to the third
            target question.</p>
          <p>So you'll do this for each of the goals in your mission, and your
            personal goal is to get as many targets right as possible.</p>
          <p>When you've submitted your Phase 1 mission, you'll receive a personalized
            Phase 2 mission with more practice problems like the ones that you
            missed on your first mission.</p>
          <p>Fly-by-Wire saves your work automatically,
            so if you need to leave your mission and come back to it later, just be
            sure to log out and also log out of the D2L portal.</p>
        </div>
      </article>
    )
  }

  return (
    <div className="guide">
      <section className="splash-banner text-center flex-container align-center justify-center">
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/hTz-B5kg6sg" frameBorder="0" allowFullScreen></iframe>
        <button
          aria-label={props.transcriptExpanded ? "Hide transcript" : "Show transcript"}
          aria-pressed={props.transcriptExpanded}
          type="checkbox"
          id="transcript-toggle"
          onClick={props.onClickToggleTranscript}
          className={props.transcriptExpanded ? "toggle-me toggle-me__pressed" : "toggle-me"}>
          <span className="transcript-button-label">Transcript</span>
          <img
            aria-hidden
            className={props.transcriptExpanded ? "arrow-toggle arrow-toggle__expanded": "arrow-toggle"}
            src={require('fbw-platform-common/assets/show-more--down@2x.png')} />
        </button>
        {transcript}
      </section>
      <section className="instructions" id="instructions">
        <div className="row">
          <h2 className="columns">How to use FbW</h2>
        </div>
        <div className="row">
          <ol className="instruction-list">
            <li className="instruction">
              <p>Go to <a className="fbw-app-link" href="http://fbw-student.mit.edu" target="_blank">fbw-student.mit.edu</a>.</p>
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
                  src={require("./assets/missions-3.png")}/>
              </div>
            </li>
            <li className="instruction">
              <p>Select a Target to start. Do your best to answer it.</p>
              <p><b>Write down all of your work</b> as you attempt the problem as this is what is expected on exams.</p>
              <p>If you get it right, great! Move on to the next one.</p>
              <div className="row">
                <img
                  alt="A target question answered correctly"
                  className="medium-6 columns"
                  src={require("./assets/do-question-correct.png")}/>
              </div>
              <p>If you get it wrong, Fly-by-Wire will tell you why you got it wrong, and give you a next question that addresses your misunderstanding.
                This is called a <span className="bold">Waypoint</span> question.
              </p>
              <div className="row">
                <img
                  alt="A sequence of two questions, showing how a target question answered incorrectly generates a review question"
                  className="medium-8 columns"
                  src={require("./assets/do-question-1.png")}/>
              </div>
              <p>
                <b>Read the solution explanation</b>.
                Compare the solution to your written work and see if you can pinpoint your error.
              </p>
              <div className="row">
                <img
                  alt="Each answered question has a solution block that you should review"
                  className="medium-10 columns"
                  src={require("./assets/do-question-2.png")}/>
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
                  className="medium-6 columns"
                  src={require("./assets/do-question-3.png")}/>
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
