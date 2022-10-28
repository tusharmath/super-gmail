import {Component} from "preact"

const QuickFilters: {name: string; url: string}[] = [
  {name: "Github", url: "github"},
  {name: "LinkedIn", url: "linkedin"},
]

export class SplitList extends Component<{filters: {name: string; from: string}[]; onInsert: () => unknown}, {}> {
  render() {
    const filters = this.props.filters
    return (
      <div className="sg-filter-row">
        {filters.map(({name, from: from}) => (
          <div className="sg-filter-item" key={name}>
            <a href={`#search/in%3Ainbox+from%3A${from}`}>#{name}</a>
          </div>
        ))}

        <div className="sg-filter-item">
          <button onClick={() => this.props.onInsert()}>Edit</button>
        </div>
      </div>
    )
  }
}
