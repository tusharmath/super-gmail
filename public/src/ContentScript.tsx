import {render} from "preact"

import {Component} from "preact"
import "../css/sg-content.css"
import {QuickFilters} from "./QuickFilters"
import {SplitList} from "./SplitList"

export class App extends Component<
  {},
  {
    filters: {name: string; from: string}[]
    showFilterForm: boolean
  }
> {
  componentWillMount(): void {
    this.setState({filters: QuickFilters, showFilterForm: true})
  }

  toggleFilterForm(): void {
    this.setState({showFilterForm: !this.state.showFilterForm})
  }

  addFilter(filter: {name: string; from: string} | undefined): void {
    if (filter) {
      this.setState({filters: [...this.state.filters, {name: filter.name, from: filter.from}]})
    }
    this.setState({showFilterForm: false})
  }

  render() {
    const filters = this.state.filters
    console.log({state: this.state})
    return (
      <div className="sg-container">
        <SplitList filters={filters} />
      </div>
    )
  }
}

render(<App />, document.body)
