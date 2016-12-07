


function wrapHTML (markup) {

  return `
  <DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.mathjax.org/mathjax/2.6-latest/MathJax.js?config=TeX-AMS_HTML"></script>

        <style type="text/css">
          * {
          -webkit-touch-callout: none;
          -webkit-user-select: none; /* Disable selection/copy in UIWebView */
          }
          body {
            font-family: 'Open Sans', sans-serif;
            font-size: 14px;
            line-height: 1.4;
          }

          .collapsible__header {
            padding-top: 0em;
          }

          .collapsible__body:last-of-type {
            padding-bottom: 2.5em;
          }
        </style>
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700" rel="stylesheet">
      </head>

      <body>
        <div id="markup">
          ${markup}
        </div>

        <script>
            MathJax.Hub.Config({
              "HTML-CSS": { scale: 100, linebreaks: { automatic: true } },
              displayAlign: "left",
              TeX: {
                extensions: ['cancel.js']
              }
           });
        </script>

        <script type="text/javascript">
            var el = document.getElementById('markup');
            var rawHeight = parseInt(Math.max(el.offsetHeight, el.clientHeight));

            document.title = rawHeight + 14*1.4*2;

            window.location.hash = Math.random();
        </script>

      </body>


    </html>`;
};

module.exports = wrapHTML;
