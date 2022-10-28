import {Component} from "preact"

export class SplitList extends Component<{}, {filters: {name: string; from: string}[]}> {
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
        {filters.map(({name, from: from}) => (
          <div className="sg-filter-item" key={name}>
            <a href={`#search/in%3Ainbox+from%3A${from}`}>#{name}</a>
          </div>
        ))}
      </div>
    )
  }
}
