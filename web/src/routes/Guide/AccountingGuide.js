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
            (Chrome, Safari, or FireFox are fine), and go to fbw-student.mit.edu.</p>
          <p>Click on the "myACC" Arapahoe button, and enter your myACC credentials.</p>
          <p>Once you log in, you'll be redirected to your Fly-by-Wire dashboard.</p>
          <p>There you'll see a list of your classes, with your section number on them.</p>
          <p>So if you pretend this is an accounting one.</p>
          <p>You click it, and then you'll see your list of missions.</p>
          <p>I have one here that I'll go into.</p>
          <p>You'll see that at the very top of the mission is a progress bar,
            that tells you there are eight questions in the mission that you need to do.</p>
          <p>And then there is a list of goals.</p>
          <p>Each of these goals maps to a learning objective from your unit.</p>
          <p>Within the goals, you can see these target questions.</p>
          <p>When I click a different goal, I'll see a list of different target
            questions that address this learning outcome.</p>
          <p>Each of the goals also has a list of the number of unfinished
            target questions within that goal.</p>
          <p>Let me click one.</p>
          <p>You can see these two target questions.</p>
          <p>Do your best to answer the target questions.</p>
          <p>Write down all your work as you attempt the problems.</p>
          <p>For this question, calculate accounts on the balance sheet, I'm
            going to pick .... hm, let's see here.</p>
          <p>Which one of these do I think is correct.</p>
          <p>Let's try this one.</p>
          <p>The first one.</p>
          <p>Woohoo!</p>
          <p>I've gotten that correct.</p>
          <p>You'll see there is a checkmark.</p>
          <p>There is a solution.</p>
          <p>If I want to go through the worked solution and compare it to my work.</p>
          <p>The progress bar has updated.</p>
          <p>I have finished one of the eight questions.</p>
          <p>And the number of unfinished questions in this goal has gone down to one.</p>
          <p>You'll also see that there is an "Achieved" icon here for that target question.</p>
          <p>So I can then move on to another target question.</p>
          <p>Same goal.</p>
          <p>If I pick a different answer, submit.</p>
          <p>I see that this time I got it wrong.</p>
          <p>There is a worked solution if I'd like to understand where I
            maybe made a misstep.</p>
          <p>Fly-by-Wire will then generate a waypoint question, which is a
            more fundamental learning outcome.</p>
          <p>And it is a slightly easier question.</p>
          <p>This one is calculate total equity.</p>
          <p>The idea is that if I get this easier question right, it might
            help me answer additional target quesitons correctly the next time.</p>
          <p>So let's see.</p>
          <p>I will try to answer this one correctly.</p>
          <p>I got that waypoint question correct.</p>
          <p>And it will bring me back to the original target question.</p>
          <p>I have another chance to answer this correctly.</p>
          <p>I'll do my best to answer this correctly this time.</p>
          <p>I have the target question correct, and when I go back to the top,
            I now have two out of my eight targets finished.</p>
          <p>I have a "Tried" badge on this target question, and I have a
            "Tried" on the goal.</p>
          <p>So I know I've done all the questions for that goal.</p>
          <p>So you'll continue this process until you try all of the questions
            in your mission.</p>
          <p>Once you've completed all of your target questions in the mission,
            Fly-by-Wire will generate a personalized
            Phase 2 mission for you that includes questions similar to the ones that you
            missed on your Phase 1 mission.</p>
          <p>Fly-by-Wire saves your work automatically,
            so if you need to leave your mission at any time and come back to it later, you can.
            Just be sure to log out of Fly-by-Wire up here at the top right. And you
            will also have to log out of your ACC D2L portal direclty on the D2L page,
            also here on the top-right.</p>
        </div>
      </article>
    )
  }

  return (
    <div className="guide">
      <section className="splash-banner text-center flex-container align-center justify-center">
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/SHQgG7R9FRw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
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
