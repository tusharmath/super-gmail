import {render, Component} from "preact"

import {CreateSplit} from "./CreateSplit"
import {Filters, QuickFilters} from "./QuickFilters"

class App extends Component<{}, {filters: Filters}> {
  componentWillMount(): void {
    this.setState({filters: QuickFilters})
  }

  addFilter(filter: {name: string; from: string} | undefined): void {
    if (filter) {
      this.setState({filters: [...this.state.filters, {name: filter.name, from: filter.from}]})
    }
  }
  render() {
    return <CreateSplit onSubmit={(filter) => this.addFilter(filter)} />
  }
}

render(<App />, document.body)
