import {Component} from "preact"
import {Filter} from "./QuickFilters"

const DeleteButton = (_: {onClick?: (e: EventTarget) => unknown}) => {
  return (
    <button
      className={`px-4 py-2 h-8 bg-red-200 hover:bg-red-300 border-solid border border-red-400 w-20 rounded-md uppercase drop-shadow-md flex items-center justify-center`}
      onClick={(e) => _?.onClick(e.target)}
    >
      {"Delete"}
    </button>
  )
}
const AddButton = (_: {onClick?: (e: EventTarget) => unknown}) => {
  return (
    <button
      className={`px-4 py-2 h-8 bg-blue-200 hover:bg-blue-300 border-solid border border-blue-400 w-20 rounded-md uppercase drop-shadow-md flex items-center justify-center`}
      onClick={(e) => _?.onClick(e.target)}
    >
      {"Add"}
    </button>
  )
}

const Input = (_: {value?: string; placeholder?: string; onChange?: (e: EventTarget) => unknown}) => (
  <input
    className="border-solid border border-indigo-400 px-4 py-2 flex-1 w-80 rounded-md h-8"
    type="text"
    value={_.value}
    placeholder={_.placeholder}
    onChange={(e) => _?.onChange(e.target)}
  />
)

export class CreateSplit extends Component<
  {onSubmit?: (ev: {name: string; from: string} | undefined) => unknown},
  {filters: Filter[]; name: string; search: string}
> {
  componentWillMount(): void {
    this.setState({filters: [], search: "", name: ""})

    chrome.storage.sync.get(["filters"], ({filters}) => {
      if (filters instanceof Array) {
        this.setState({filters: filters, search: "", name: ""})
      }
    })
  }

  setSearch(e: EventTarget): void {
    const value = (e as HTMLInputElement).value
    this.setState({search: value})
  }

  setName(e: EventTarget): void {
    this.setState({name: (e as HTMLInputElement).value})
  }

  sync(filters: Filter[]) {
    chrome.storage.sync.set({filters}, () => this.setState({filters}))
  }

  insert(): void {
    const filters = [...this.state.filters, {name: this.state.name, search: this.state.search}]
    this.sync(filters)
    this.setState({name: "", search: ""})
  }

  remove(i: number): void {
    const filters = this.state.filters.filter((e) => e !== this.state.filters[i])
    this.sync(filters)
  }

  render() {
    return (
      <div className="">
        <div className="px-8 py-8">
          <div className="">
            <div className="border-dotted border border-indigo-400 divide-y">
              {this.state.filters.map(({name, search: from}, i) => (
                <div className="flex flex-row space-x-2 px-4 items-center py-2">
                  <div className="flex-1 w-80">
                    <div className="w-48">
                      <strong className={"text-sm"}>{name}</strong>
                    </div>

                    <span className={"font-mono"}> {from}</span>
                  </div>

                  <DeleteButton onClick={() => this.remove(i)} />
                </div>
              ))}
            </div>

            <div className="flex flex-row space-x-2 mt-4 items-center">
              <Input placeholder={"Label"} value={this.state.name} onChange={(e) => this.setName(e)} />
              <Input placeholder={"Filter"} value={this.state.search} onChange={(e) => this.setSearch(e)} />
              <AddButton onClick={() => this.insert()} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
