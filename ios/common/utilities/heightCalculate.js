

/**
  calculates how many characters, including spaces, can fit onto one line.
  varies with font, but usually a font's width is half of it's x-height (font-size)
*/
var _charsPerLine = function(fontSize, width) {
  return width / (fontSize * .5);
}

var _mathCharsPerLine = function(width) {
  let factor = 240/22;
  return width / factor;
}

/**
heightCalculate: given an HTML string that may or may not contain:
  <p>, <img>, Mathjax
  calculate the approximate height needed given the available width and the font size.
*/
function heightCalculate(text, fontSize, width) {

  let lineHeight = fontSize*1.4;

  if (!text) return lineHeight;

  // see whether the string contains math
  // let isThereInlineMathRegex = /\\\((.*)(?=\\\))/g;

  // console.log(text);

  // we can have 3 types of things that contribute to vertical space:
  // 1) just normal text, 2) equations, 3) images

  // TODO: strip out image elements because we shouldn't count them as part of line length.
  // we'll handle them separately
  let imageIndex = text.indexOf('<img');
  let nonImageText = imageIndex > -1 ? text.substr(0, imageIndex) : text;
  let nonImageMathText = nonImageText.replace(/\\\((.*?)\\\)/g, '');
  nonImageMathText = nonImageMathText.replace(/<.*?>/g, '');

  // console.log(nonImageMathText);

  // 1) add a line for every N characters, add a line for every additional paragraph tag
  // if there is an image, then we subtract one line because we're not counting the paragraph that wraps the image
  let lines = nonImageMathText.length / _charsPerLine(fontSize, width);
  // console.log('num nonmath chars:', nonImageMathText.length, '. chars per line: ', _charsPerLine(fontSize, width), ', so start with ', lines, 'lines');

  let paragraphs = nonImageText.match(/<p>/g);
  if (paragraphs && paragraphs.length > 1) {
    lines += paragraphs.length - 1;
    if (imageIndex > -1) lines--;
  }

  // 2) add extra lines for every mathjax equation, because those are space-consuming
  let equations = text.match(/\\\((.*?)\\\)/g);
  if (equations) {
    let mathCharsPerLine = _mathCharsPerLine(width);

    for (var eqn of equations) {
      let eqnChars = eqn.replace(/\\\(|\\\)|\s/g, '');
      lines = lines + (eqnChars.length / mathCharsPerLine);
      // console.log('adding',  (eqnChars.length / mathCharsPerLine), 'line due to', eqnChars);

      // if we have an equation that's long enough to take up space on its own, likely it'll displace non-math
      if (eqnChars.length > mathCharsPerLine/2) {
        // lines = lines + .5;
      }
    }

  }

  lines = Math.ceil(lines);

  let height = lines * lineHeight;

  // if the string contains an image, then we need to add the height of the image
  if (imageIndex > -1) {
    height = 0;

    let heightMatch = text.match(/height:(.*?)px/);
    if (heightMatch && heightMatch[0]) {
      imageHeight = parseInt(heightMatch[0].replace('height:',''));
      height += imageHeight;
      // console.log('image height', imageHeight, 'total height', height);
    }
  } else {
     height = Math.max(2*lineHeight, lines * lineHeight);
  }

  // console.log('num lines:', lines, 'height: ', height);



  return height;
}


module.exports = heightCalculate;
