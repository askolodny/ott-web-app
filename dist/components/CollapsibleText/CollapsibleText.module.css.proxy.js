
export let code = "._collapsibleText_12ck1_1 {\n  position: relative;\n  padding-bottom: 20px;\n}\n\n._dummyDiv_12ck1_6 {\n  position: absolute;\n  visibility: hidden;\n}\n\n._textContainer_12ck1_11 {\n  overflow: hidden;\n  transition: max-height 0.1s ease-out;\n}\n\n._textContainer_12ck1_11._collapsed_12ck1_15 {\n  mask-image: linear-gradient(-180deg, black 10%, rgba(0, 0, 0, 0) 100%);\n  -webkit-mask-image: linear-gradient(-180deg, black 10%, rgba(0, 0, 0, 0) 100%);\n  /* stylelint-disable-line */\n}\n\n._chevron_12ck1_21 {\n  position: absolute;\n  bottom: 20px;\n  left: calc(50% - 24px / 2);\n  width: 24px;\n  height: 24px;\n  outline: none;\n  cursor: pointer;\n  opacity: 1;\n}\n\n._chevron_12ck1_21 > svg {\n  transform: rotate(90deg);\n}\n\n._chevron_12ck1_21._expanded_12ck1_34 > svg {\n  transform: rotate(270deg);\n}";
let json = {"collapsibleText":"_collapsibleText_12ck1_1","dummyDiv":"_dummyDiv_12ck1_6","textContainer":"_textContainer_12ck1_11","collapsed":"_collapsed_12ck1_15","chevron":"_chevron_12ck1_21","expanded":"_expanded_12ck1_34"};
export default json;

// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';

  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}