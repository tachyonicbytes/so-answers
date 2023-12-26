import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

async function invokeTauriCommand(command: any) {
  return invoke("tauri", command);
}



function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  interface DialogFilter {
    /** Filter name. */
    name: string
    /**
     * Extensions to filter, without a `.` prefix.
     * @example
     * ```typescript
     * extensions: ['svg', 'png']
     * ```
     */
    extensions: string[]
  }

  interface OpenDialogOptions {
    /** The title of the dialog window. */
    title?: string
    /** The filters of the dialog. */
    filters?: DialogFilter[]
    /** Initial directory or file path. */
    defaultPath?: string
    /** Whether the dialog allows multiple selection or not. */
    multiple?: boolean
    /** Whether the dialog is a directory selection or not. */
    directory?: boolean
    /**
     * If `directory` is true, indicates that it will be read recursively later.
     * Defines whether subdirectories will be allowed on the scope or not.
     */
    recursive?: boolean
  }

  async function open(
    options: OpenDialogOptions = {}
  ): Promise<null | string | string[]> {
    if (typeof options === 'object') {
      Object.freeze(options)
    }
    let res = invokeTauriCommand({
      __tauriModule: 'Dialog',
      message: {
        cmd: 'openDialog',
        options
      }
    })

    return res as any;
  }



  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
          open();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
