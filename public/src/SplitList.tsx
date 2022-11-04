import {Component} from "preact"
import {Filter} from "./QuickFilters"

export class SplitList extends Component<{}, {filters: Filter[]}> {
  componentWillMount(): void {
    this.setState({filters: []})
    chrome.storage.sync.get(["filters"], ({filters}) => {
      if (filters instanceof Array) {
        this.setState({filters: filters})
      }
    })

    chrome.storage.onChanged.addListener(({filters: {newValue, oldValue}}) => {
      this.setState({filters: newValue})
    })
  }
  render() {
    const filters = this.state.filters
    return (
      <div className="sg-filter-row">
        <div className="sg-filter-item" key={name}>
          <a href={`#inbox`}>#Inbox</a>
        </div>
        {filters.map(({name, search}) => (
          <div className="sg-filter-item" key={name}>
            <a href={`#search/${search}`}>#{name}</a>
          </div>
        ))}
      </div>
    )
  }
}
