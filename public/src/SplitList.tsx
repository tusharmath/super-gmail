import {Component} from "preact"

export class SplitList extends Component<{filters: {name: string; from: string}[]}, {}> {
  render() {
    const filters = this.props.filters
    return (
      <div className="sg-filter-row">
        {filters.map(({name, from: from}) => (
          <div className="sg-filter-item" key={name}>
            <a href={`#search/in%3Ainbox+from%3A${from}`}>#{name}</a>
          </div>
        ))}
      </div>
    )
  }
}
