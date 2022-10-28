import {Component} from "preact"

const Button = (_: {name: string; theme: string}) => (
  <button className={`px-4 py-2 border bg-${_.theme}-100 hover:bg-${_.theme}-200 border-${_.theme}-300 rounded-lg`}>
    {_.name}
  </button>
)

const Input = (_: {value?: string; placeholder?: string}) => (
  <input
    className="border-dotted border border-indigo-400 px-4 py-2 flex-1"
    type="text"
    value={_.value}
    placeholder={_.placeholder}
  />
)

export class CreateSplit extends Component<
  {onSubmit: (ev: {name: string; from: string} | undefined) => unknown; filters: {name: string; from: string}[]},
  {filters: {name: string; from: string}[]}
> {
  componentWillMount(): void {
    this.setState({filters: this.props.filters})
  }

  setFrom(e: EventTarget): void {
    const value = (e as HTMLInputElement).value
    // this.setState({from: value, name: value})
  }

  setName(e: EventTarget): void {
    // this.setState({name: (e as HTMLInputElement).value})
  }

  render() {
    return (
      <div className="bg-white drop-shadow-xl mx-8 my-12 rounded-lg border border-solid border-gray-200">
        <div className="px-8 pt-8">
          <div className="text-xl py-4">Edit Smart Filters</div>
          <div className="space-y-2">
            {this.state.filters.map(({name, from}) => (
              <div className="flex flex-row space-x-2">
                <Input value={from} />
                <Input value={name} />

                <Button name="Delete" theme="red" />
              </div>
            ))}

            <div className="flex flex-row space-x-2">
              <Input placeholder={"Patten"} />
              <Input placeholder={"Label"} />
              <Button name="Delete" theme="red" />
            </div>
          </div>
        </div>

        <div className="flex flex-row space-x-4 px-20 py-4 flex justify-center">
          <Button name="Cancel" theme="gray" />
          <Button name="Save" theme="teal" />
        </div>
      </div>
    )
  }
}
