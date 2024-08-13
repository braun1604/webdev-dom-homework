"use strict";
import { renderComments } from "./renderComments.js";
import { fetchPromise } from "./api.js";
import { initEventListener } from "./helper.js";
import { copyText } from "./helper.js";

let comments = [];

initEventListener(comments);
fetchPromise();
renderComments(comments);
copyText();
