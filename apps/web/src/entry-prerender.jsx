import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppProviders, AppShell } from './App.jsx';

/** Server markup for "/" that main.jsx hydrates, so the client keeps these DOM nodes instead of repainting them. */
export function render() {
  return renderToString(
    <AppProviders helmetContext={{}}>
      <StaticRouter location="/">
        <AppShell />
      </StaticRouter>
    </AppProviders>,
  );
}
