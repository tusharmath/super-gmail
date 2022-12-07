import {Component} from "preact"
import {Filter} from "./QuickFilters"

type ButtonInput = {label: string; onClick?: (e: EventTarget) => unknown}

const DestroyButton = (_: ButtonInput) => {
  return (
    <button
      className={`px-4 py-2 h-8 bg-red-200 hover:bg-red-300 border-solid border border-red-400 w-20 rounded-md uppercase drop-shadow-md flex items-center justify-center`}
      onClick={(e) => _?.onClick(e.target)}
    >
      {_.label}
    </button>
  )
}

const UpdateButton = (_: ButtonInput) => {
  return (
    <button
      className={`px-4 py-2 h-8 bg-amber-200 hover:bg-amber-300 border-solid border border-amber-400 w-20 rounded-md uppercase drop-shadow-md flex items-center justify-center`}
      onClick={(e) => _?.onClick(e.target)}
    >
      {_.label}
    </button>
  )
}

const CreateButton = (_: {label: string; onClick?: (e: EventTarget) => unknown}) => {
  return (
    <button
      className={`px-4 py-2 h-8 bg-blue-200 hover:bg-blue-300 border-solid border border-blue-400 w-20 rounded-md uppercase drop-shadow-md flex items-center justify-center`}
      onClick={(e) => _?.onClick(e.target)}
    >
      {_.label}
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
  {filters: Filter[]; name: string; search: string; edit?: number}
> {
  private syncSchedule: number
  componentWillMount(): void {
    this.setState({filters: [], search: "", name: ""})

    chrome.storage.sync.get(["filters"], ({filters}) => {
      if (filters instanceof Array) {
        this.setState({filters: filters, search: "", name: ""})
      }
    })
  }

  setSearch(e: EventTarget): void {
    const value = (e as HTMLInputElement).value.trim()
    this.setState({search: value})
  }

  setName(e: EventTarget): void {
    this.setState({name: (e as HTMLInputElement).value.trim()})
  }

  sync(filters: Filter[]) {
    clearTimeout(this.syncSchedule)
    setTimeout(() => {
      chrome.storage.sync.set({filters}, () => this.setState({filters}))
    }, 300)
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

  editLabel(i: number, e: EventTarget): void {
    const filters = this.state.filters.map((f, j) => (j === i ? {...f, name: (e as HTMLInputElement).value} : f))
    this.sync(filters)
  }

  editFilter(i: number, e: EventTarget): void {
    const filters = this.state.filters.map((f, j) => (j === i ? {...f, search: (e as HTMLInputElement).value} : f))
    this.sync(filters)
  }

  render() {
    return (
      <div className="">
        <div className="px-8 py-8">
          <div className="">
            <div className="border-dotted border border-indigo-400 divide-y">
              {this.state.filters.map(({name, search}, i) => {
                return (
                  <div className="flex flex-row space-x-2 px-4 py-2 items-center">
                    <div className="flex-1">
                      <div className="flex flex-row">
                        <input
                          className="px-2 py-2 w-40 mr-2 h-8 font-bold text-ellipsis"
                          type="text"
                          value={name}
                          placeholder={"Label"}
                          onChange={(e) => this.editLabel(i, e.target)}
                        />
                        <input
                          className="px-2 py-2 flex-1 h-8 font-mono text-ellipsis"
                          type="text"
                          value={search}
                          placeholder={"Label"}
                          onChange={(e) => this.editFilter(i, e.target)}
                        />
                      </div>
                    </div>

                    <DestroyButton label="Delete" onClick={() => this.remove(i)} />
                  </div>
                )
              })}
            </div>

            {this.renderCreateSplit({
              name: this.state.name,
              search: this.state.search,
              onChange: {label: this.setName.bind(this), filter: this.setSearch.bind(this)},
            })}
          </div>
        </div>
      </div>
    )
  }

  private renderCreateSplit(_: {
    name: string
    search: string
    onChange: {label: (_: EventTarget) => unknown; filter: (_: EventTarget) => unknown}
  }) {
    return (
      <div className="flex flex-row space-x-2 mt-4 items-center">
        <Input placeholder={"Label"} value={this.state.name} onChange={(e) => this.setName(e)} />
        <Input placeholder={"Filter"} value={this.state.search} onChange={(e) => this.setSearch(e)} />
        <CreateButton label="Add" onClick={() => this.insert()} />
      </div>
    )
  }
}
