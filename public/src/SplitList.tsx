import {Component} from "preact"
import {Filter} from "./QuickFilters"

export class SplitList extends Component<{}, {filters: Filter[]; url: Location}> {
  componentWillMount(): void {
    this.setState({filters: [], url: window.location})
    chrome.storage.sync.get(["filters"], ({filters}) => {
      if (filters instanceof Array) {
        this.setState({filters: filters})
      }
    })

    chrome.storage.onChanged.addListener(({filters: {newValue, oldValue}}) => {
      this.setState({filters: newValue})
    })

    window.addEventListener("hashchange", () => {
      this.setState({url: window.location})
    })
  }

  selectedCSS(given: string) {
    const hash = given
      .trim()
      .split(" ")
      .map((i) => encodeURIComponent(i))
      .join("+")
    const id = this.state.url.hash.indexOf(hash)

    return id > -1 ? "sg-filter-item sg-filter-item-selected" : "sg-filter-item"
  }

  render() {
    const filters = this.state.filters
    return (
      <div className="sg-filter-row">
        {filters
          .sort((a, b) => (a.name > b.name ? 1 : -1))
          .map(({name, search}) => (
            <div className={this.selectedCSS(search)} key={name}>
              <a href={`#search/${search}`}>#{name}</a>
            </div>
          ))}
      </div>
    )
  }
}
