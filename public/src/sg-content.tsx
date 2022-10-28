import {render, Component} from "preact"
import "../css/sg-content.css"
import {App} from "./components/App"

window.addEventListener("load", (event) => {
  render(<App />, document.body)
})
