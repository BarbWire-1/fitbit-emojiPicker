
import document from "document";
import {emojisHex} from "./fitmoji";
import { fixedFromCharCode } from "./readUTF";

const buttons = document.getElementById("buttons");
const single = document.getElementById("single");

const emojiNumber = single.getElementById("emojiCode");
const emoji = single.getElementById("emoji");
const nextEmoji = buttons.getElementById("nextEmoji");
const lastEmoji = buttons.getElementById("lastEmoji");




// CLICK THROUGH EMOJIS 
// (single view with hex)
const n = emojisHex.length;
nextEmoji.text = "⏩";
lastEmoji.text = "⏪";
console.log(n)
let counter = 0;

const assignEmoji = (c) => {
  let displayHex = (hex) => {return `0x${("00000" +hex.toString(16)).slice(-5)}`};
  
  emojiNumber.text = String(c);//how can I have 0xA9 here instaed 169???
  emojiNumber.text = displayHex(emojisHex[c]);
  emoji.text = fixedFromCharCode(emojisHex[c]);
  console.log(fixedFromCharCode(emojisHex[c]));
};

nextEmoji.onclick = () => {
  if(counter<n) {
    let c = counter % n;
    counter++;
    assignEmoji(c)
  } else {
    return;
  };
};

lastEmoji.onclick = () => {
  if(counter>0) {
    counter--;
    let c = counter % n;
    assignEmoji(c);
  } else {
    return;
  };
};
//emoji.text = fixedFromCharCode(0x1F372);

//TODO check and really understand the polyfill
//TODO check why astral plane chars don't work. other format needed?



    
   



