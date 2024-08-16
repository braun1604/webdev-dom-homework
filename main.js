"use strict";
// import { renderComments } from "./renderComments.js";
// import { fetchPromise } from "./api.js";
// import { initEventListener } from "./helper.js";
// import { copyText } from "./helper.js";
// import { renderLogin } from "./loginPage.js";
import { notion } from "./notion.js";
// import { registration } from "./registration.js";
import { fetchPromise } from "./api.js";


async function App() {
    await fetchPromise();
    notion();
}
App()


