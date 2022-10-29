import {render} from "preact"

import {Component} from "preact"
import "../css/Content.css"
import {SplitList} from "./SplitList"

export class App extends Component {
  render() {
    return (
      <div className="sg-container">
        <SplitList />
      </div>
    )
  }
}

render(<App />, document.body)
