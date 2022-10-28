import {render, Component} from "preact"
import "../css/sg-content.css"

const QuickFilters: {name: string; url: string}[] = [
  {name: "Github", url: "github"},
  {name: "LinkedIn", url: "linkedin"},
]

class CreateSplit extends Component<
  {onSubmit: (ev: {name: string; from: string} | undefined) => unknown},
  {from: string; name: string}
> {
  componentWillMount(): void {
    this.setState({from: "", name: ""})
  }

  setFrom(e: EventTarget): void {
    const value = (e as HTMLInputElement).value
    this.setState({from: value, name: value})
  }

  setName(e: EventTarget): void {
    this.setState({name: (e as HTMLInputElement).value})
  }

  render() {
    return (
      <div className="sg-filter-form">
        <div>
          <h3>From</h3>
          <input type="text" onChange={(e) => this.setFrom(e.target)} value={this.state.from} />
        </div>

        <div>
          <h3>Name</h3>
          <input type="text" onChange={(e) => this.setName(e.target)} value={this.state.name} />
        </div>

        <div>
          <button onClick={() => this.props.onSubmit(this.state)}>Save</button>
          <button onClick={() => this.props.onSubmit(undefined)}>Cancel</button>
        </div>
      </div>
    )
  }
}

class App extends Component<
  {},
  {
    filters: {name: string; url: string}[]
    showFilterForm: boolean
  }
> {
  componentWillMount(): void {
    this.setState({filters: QuickFilters, showFilterForm: false})
  }

  toggleFilterForm(): void {
    this.setState({showFilterForm: !this.state.showFilterForm})
  }

  addFilter(filter: {name: string; from: string} | undefined): void {
    if (filter) {
      this.setState({filters: [...this.state.filters, {name: filter.name, url: filter.from}]})
    }
    this.setState({showFilterForm: false})
  }

  render() {
    const filters = this.state.filters
    return (
      <div className="sg-container">
        <div className="sg-filter-row">
          {filters.map(({name, url}) => (
            <div className="sg-filter-item" key={name}>
              <a href={`#search/in%3Ainbox+from%3A${url}`}>#{name}</a>
            </div>
          ))}

          <div className="sg-filter-item">
            <button onClick={() => this.toggleFilterForm()}>{"++"}</button>
          </div>
        </div>

        {this.state.showFilterForm ? <CreateSplit onSubmit={(filter) => this.addFilter(filter)} /> : <></>}
      </div>
    )
  }
}

window.addEventListener("load", (event) => {
  render(<App />, document.body)
})
