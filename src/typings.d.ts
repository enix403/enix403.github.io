declare module '*.md' {
  import { Component } from 'svelte';
  const Comp: Component;
  export = Comp;
  export const metadata: Record<string, string>;
}