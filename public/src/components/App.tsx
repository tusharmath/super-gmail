import {Component} from "preact"
import {CreateSplit} from "./CreateSplit"
import {SplitList} from "./SplitList"

const QuickFilters: {name: string; from: string}[] = [
  {name: "Github", from: "github"},
  {name: "LinkedIn", from: "linkedin"},
]

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
    return (
      <div className="sg-container">
        <SplitList filters={filters} onInsert={() => this.toggleFilterForm()} />
        {this.state.showFilterForm ? (
          <CreateSplit filters={this.state.filters} onSubmit={(filter) => this.addFilter(filter)} />
        ) : (
          <></>
        )}
      </div>
    )
  }
}
