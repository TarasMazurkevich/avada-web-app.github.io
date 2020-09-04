<template>
  <div>
    <Nuxt />
  </div>
</template>

<style lang="scss">
// VARIABLE CSS
:root {
  --color-font-primary: #303030;
  --color-font-secondary: #8C8C8C;
  --color-font-in-colorful: #fff;

  --color-green-main: #349A89;

  --color-bg-block: #fff;
  --color-bg-default: #F2F2F2;

  --color-error: #FF0000;
}

* {
    box-sizing: border-box;

    &[hidden] {
        display: none;
    }

    &::before {
        box-sizing: border-box;
    }

    &::after {
        box-sizing: border-box;
    }
}

html {
    background-color: var(--color-bg-default);
    font-family: 'Roboto', sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    font-size: 10px;
    color: #000;
}

body {
    background-color: var(--color-bg-default);
    font-family: 'Roboto', sans-serif;
    line-height: 1.5;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}

article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
    display: block;
}

img {
    border-style: none;
}

button, input, select, textarea {
    font: inherit;
    margin: 0;
    outline: none;

    &:active {
      outline: none;
    }
}

[type="button"]::-moz-focus-inner, [type="reset"]::-moz-focus-inner, [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
}

blockquote, q {
    quotes: none;

    &:before, &:after {
        content: '';
        content: none;
    }
}

menu, ol, ul, li {
    list-style: none;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

audio, canvas, progress, video {
    display: inline-block;
}

audio:not([controls]) {
    display: none;
    height: 0;
}

[type="checkbox"], [type="radio"] {
    padding: 0;
}

input[type="color"] {
    padding-left: 3px;
    cursor: pointer;
}

[type="number"]::-webkit-inner-spin-button, [type="number"]::-webkit-outer-spin-button {
    height: auto;
}

[type="search"] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
}

[type="search"]::-webkit-search-cancel-button, [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
}

input[type=time]::-webkit-outer-spin-button,
input[type=time]::-webkit-inner-spin-button {
    -webkit-appearance: none;
}

input[type=time] {
    -moz-appearance: textfield;
}

::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.54;
}

::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
}

::-webkit-scrollbar {
    width: 0;
    height: auto;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #888;
}

::-webkit-scrollbar-thumb:hover {
    background: #555;
}

input, select {
    border: none;
    background-color: transparent;
    outline: none;

    &:active {
      outline: none;
    }

    &:focus {
        outline: none;
    }
}

a {
    background-color: transparent;
    text-decoration: none;
    -webkit-text-decoration-skip: objects;
    color: #000;
    outline: none;

    &:active {
      outline: none;
    }

    &:active, &:hover {
        text-decoration: none;
        color: #000;
    }
}

button {
    margin: 0;
    border: none;
    background: none;
    font: inherit;
    text-transform: none;
    outline: none;

    &:active {
      outline: none;
    }

    &::-moz-focus-inner {
        border-style: none;
        padding: 0;
    }
}
</style>
