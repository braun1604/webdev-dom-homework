"use strict";
import { notion } from "./notion.js";
import { fetchPromise } from "./api.js";

async function App() {
  await fetchPromise();
  notion();
}
App();
 