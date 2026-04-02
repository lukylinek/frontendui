// import React from "react"
import { createRoot } from "react-dom/client";
import { App } from "./App";

export function mount(el, props = {}) {
    if (!el) throw new Error("MyApp.mount: missing mount element");
    console.log("inside mount, doing to render")
    createRoot(el).render(<App {...props} />);
    console.log("inside mount, render finished")
}

// pro IIFE build to přilepíme na window
if (typeof window !== "undefined") {
    window.MyApp = { mount };
}