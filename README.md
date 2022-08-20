# @hrgui/chord-charts-app

This is an application that uses [`@hrgui/chord-charts`](https://github.com/hrgui/chord-charts) to display chord charts of songs and setlists for musicians. This is a completely offline application: Storage is local via pouchdb. Users can clear pouchDB, save it to a different file just like any other desktop application.

# Getting Started

## Installation

yarn

## Running Development

```
yarn start
```

## Tech Stack

- [React](https://reactjs.org/) for react componnets.
- [Vite](https://vitejs.dev/) for the development environment
- [Vitest](https://vitest.dev/) for the test environment
- [react-daisyui](https://react.daisyui.com/) and [TailwindCSS](https://tailwindcss.com/) for CSS
- [PouchDB](https://pouchdb.com/) for a wrapper around IndexedDB (pouchdb-browser), local storage.
- [Redux](https://redux.js.org/) and [Redux-Toolkit](https://redux-toolkit.js.org/) / Redux-ToolkitQuery to manage local and querying against PoucHDB
- [FileSystemFileHandle](https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle) for saving to file if available (Chrome) or [FileReader](https://developer.mozilla.org/en-US/docs/Web/API/FileReader) when falling back

# Notes

## Packages

- `events` - this is for `pouchdb` to work with `vite`
