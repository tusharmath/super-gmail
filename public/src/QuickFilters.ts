export type Filter = {name: string; search: string}

export const QuickFilters: Array<Filter> = [
  {name: "Github", search: "in:inbox from:github"},
  {name: "LinkedIn", search: "in:inbox from:linkedin"},
]
