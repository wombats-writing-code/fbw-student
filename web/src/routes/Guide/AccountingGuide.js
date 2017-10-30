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
          <p>I see that I have a mission due on Tuesday, January 31.</p>
          <p>If I click on "See Missions", I'll see all the missions that are waiting
            for me.</p>
          <p>Because my first accounting exam is coming up, I have a test 1 review mission.</p>
          <p>A mission consists of goals.</p>
          <p>The goals are found along the top of your screen.</p>
          <p>A goal is a learning objective from the unit.</p>
          <p>When you click on a goal, you will see some number of target questions.</p>
          <p>These icons below the goals are targets.</p>
          <p>If you click on one of them, you'll be given a practice problem that
            aligns with the goal.</p>
          <p>So I'm going to select this goal, and I see that there are two target
            questions associated with that goal, and I'm going to click on one of them.</p>
          <p>Do your best to answer the target questions.</p>
          <p>Write down all your work as you attempt the problems.</p>
          <p>So I'm going to select answer choice b and click submit,
            and I see that I got the question correct.</p>
          <p>Fly-by-Wire tells me "good job, you've reached the end of the route.
            Please try another target question."</p>
          <p>So if I go back up to the top I see that this target has turned green, and this
            target up here is now marked as achieved.</p>
          <p>So I can select another target question and try to answer this one.</p>
          <p>This time I'm going to select answer choice c, which is incorrect.</p>
          <p>Fly-by-Wire also tells me that I might need to
            review a more fundamental learning outcome and gives me an easier question
            that is aligned with this learning objective that you see right here.</p>
          <p>The idea is that if I get this easier question right, it might help me answer the next
            target question correctly.</p>
          <p>Fly-by-Wire also shows me a solution to the original target question,
            so that I can review that solution and compare it to my own and see
            where I might have made a mistake.</p>
          <p>Now I'm going to try to answer the waypoint question.</p>
          <p>I'm going to select answer choice C.</p>
          <p>Click submit, and see that I got it correct.</p>
          <p>Fly-by-Wire tells me "good job, you've reached the
            end of the route. Please try another target question."</p>
          <p>In this case, I've completed all the target questions for this given goal,
            and so I'm going to go on to another goal and work on those questions.</p>
          <p>So you'll continue this process until you try all of the questions in your mission.</p>
          <p>Once you've completed all of your target questions in the mission,
            Fly-by-Wire will generate a personalized
            Phase 2 mission that includes questions like the ones that you
            missed on your Phase 1 mission.</p>
          <p>Fly-by-Wire saves your work automatically,
            so if you need to leave your mission and come back to it later, just be
            sure to log out of Fly-by-Wire and also log out of the D2L portal.</p>
        </div>
      </article>
    )
  }

  return (
    <div className="guide">
      <section className="splash-banner text-center flex-container align-center justify-center">
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/zmFWxZcsxoY" frameborder="0" allowfullscreen></iframe>
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
            src={require('@wombats-writing-code/fbw-platform-common/assets/show-more--down@2x.png')} />
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
