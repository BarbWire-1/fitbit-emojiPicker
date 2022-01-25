interface String {
  fromCodePoint (num: number): string;
}
 (function(stringFromCharCode) {
  var defineProperty = (function() {
    // IE 8 only supports `Object.defineProperty` on DOM elements
    try {
      var object = {};
      var $defineProperty = Object.defineProperty;
      //@ts-ignore
      var result = $defineProperty(object, object, object) && $defineProperty;
    } catch(error) {}
    return result;
  }());
  var fromCodePoint = function(_) {
    'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
    
    var codeUnits = [], codeLen = 0, result = "";
    for (var index=0, len = arguments.length; index !== len; ++index) {
      var codePoint = +arguments[index];
      // correctly handles all cases including `NaN`, `-Infinity`, `+Infinity`
      // The surrounding `!(...)` is required to correctly handle `NaN` cases
      // The (codePoint>>>0) === codePoint clause handles decimals and negatives
      if (!(codePoint < 0x10FFFF && (codePoint>>>0) === codePoint))
        throw RangeError("Invalid code point: " + codePoint);
    
      if (codePoint <= 0xFFFF) { // BMP code point _ONLY THESE SEEM TO DISPLAY
        codeLen = codeUnits.push(codePoint);
      // THIS SHOWS "NO GLYPH" in display BW
      } else { // Astral code point; split in surrogate halves
        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        codePoint -= 0x10000;
        codeLen = codeUnits.push(
          (codePoint >> 10) + 0xD800,  // highSurrogate
          (codePoint % 0x400) + 0xDC00 // lowSurrogate
        );
      }
      if (codeLen >= 0x3fff) {
        result += stringFromCharCode.apply(null, codeUnits);
        codeUnits.length = 0;
      }
    }
    return result + stringFromCharCode.apply(null, codeUnits);
  };
  if (defineProperty) {// IE 8 only supports `Object.defineProperty` on DOM elements
    Object.defineProperty(String, "fromCodePoint", {
      "value": fromCodePoint, 
      "configurable": true, 
      "writable": true
    });
  } else {
    //@ts-ignore
    String.prototype.fromCodePoint = String.fromCodePoint;
  }
}());

//TODO check this function (not working)