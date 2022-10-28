import {Component} from "preact"
import {Filters} from "./QuickFilters"

const Button = (name: string, theme: string) => (
  <button className={`px-4 py-2 bg-${theme}-200 w-20 rounded-md uppercase`}>{name}</button>
)
const DeleteButton = (_: {onClick?: (e: EventTarget) => unknown}) => {
  return (
    <button
      className={`px-4 py-2 bg-red-200 hover:bg-red-300 border-solid border border-red-400 w-20 rounded-md uppercase drop-shadow-md`}
      onClick={(e) => _?.onClick(e.target)}
    >
      {"Delete"}
    </button>
  )
}
const SaveButton = (_: {onClick?: (e: EventTarget) => unknown}) => {
  return (
    <button
      className={`px-4 py-2 bg-blue-200 hover:bg-blue-300 border-solid border border-blue-400 w-20 rounded-md uppercase drop-shadow-md`}
      onClick={(e) => _?.onClick(e.target)}
    >
      {"Save"}
    </button>
  )
}

const Input = (_: {value?: string; placeholder?: string; onChange?: (e: EventTarget) => unknown}) => (
  <input
    className="border-solid border border-indigo-400 px-4 py-2 flex-1 w-80 rounded-md"
    type="text"
    value={_.value}
    placeholder={_.placeholder}
    onChange={(e) => _?.onChange(e.target)}
  />
)

export class CreateSplit extends Component<
  {onSubmit?: (ev: {name: string; from: string} | undefined) => unknown; filters: {name: string; from: string}[]},
  {filters: Filters; name: string; from: string}
> {
  componentWillMount(): void {
    this.setState({filters: this.props.filters, name: "", from: ""})
  }

  setFrom(e: EventTarget): void {
    const value = (e as HTMLInputElement).value
    this.setState({from: value})
  }

  setName(e: EventTarget): void {
    this.setState({name: (e as HTMLInputElement).value})
  }

  insert(): void {
    const filters = [...this.state.filters, {name: this.state.name, from: this.state.from}]
    this.setState({filters, from: "", name: ""})
  }

  remove(i: number): void {
    const filters = this.state.filters.filter((e) => e !== this.state.filters[i])
    this.setState({filters})
  }

  render() {
    return (
      <div className="">
        <div className="px-8 py-8">
          <div className="text-lg py-2">Smart Filters</div>
          <div className="space-y-2">
            {this.state.filters.map(({name, from}, i) => (
              <div className="flex flex-row space-x-2">
                <Input value={from} />
                <Input value={name} />

                <DeleteButton onClick={() => this.remove(i)} />
              </div>
            ))}

            <div className="flex flex-row space-x-2">
              <Input placeholder={"Pattern"} value={this.state.from} onChange={(e) => this.setFrom(e)} />
              <Input placeholder={"Label"} value={this.state.name} onChange={(e) => this.setName(e)} />
              <SaveButton onClick={() => this.insert()} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
