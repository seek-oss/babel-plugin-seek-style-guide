const babel = require('babel-core');
const dedent = require('dedent');

const transform = code => babel.transform(code, {
  plugins: [
    require.resolve('./index')
  ]
});

describe('success', () => {
  test('single import', () => {
    const input = `import { Button } from 'seek-style-guide/react';`;
    const output = `import Button from 'seek-style-guide/react/Button/Button';`;
    expect(transform(input).code).toBe(output);
  });

  test('multiple imports', () => {
    const input = `import { Header, Footer } from 'seek-style-guide/react';`;
    const output = dedent`
      import Header from 'seek-style-guide/react/Header/Header';
      import Footer from 'seek-style-guide/react/Footer/Footer';
    `;
    expect(transform(input).code).toBe(output);
  });

  test('separate imports', () => {
    const input = dedent`
      import { Header } from 'seek-style-guide/react';
      import { Footer } from 'seek-style-guide/react';
    `;
    const output = dedent`
      import Header from 'seek-style-guide/react/Header/Header';
      import Footer from 'seek-style-guide/react/Footer/Footer';
    `;
    expect(transform(input).code).toBe(output);
  });

  test('alised imports', () => {
    const input = `import { Header as Foo, Footer as Bar } from 'seek-style-guide/react';`;
    const output = dedent`
      import Foo from 'seek-style-guide/react/Header/Header';
      import Bar from 'seek-style-guide/react/Footer/Footer';
    `;
    expect(transform(input).code).toBe(output);
  });

  test('partially aliased imports', () => {
    const input = `import { Header as Foo, Footer } from 'seek-style-guide/react';`;
    const output = dedent`
      import Foo from 'seek-style-guide/react/Header/Header';
      import Footer from 'seek-style-guide/react/Footer/Footer';
    `;
    expect(transform(input).code).toBe(output);
  });

  test('irrelevant imports', () => {
    const input = `import { Header, Footer } from 'some-other-package';`;
    expect(transform(input).code).toBe(input);
  });
});

describe('errors', () => {
  test('default import', () => {
    const input = `import StyleGuide from 'seek-style-guide/react';`;
    expect(() => transform(input)).toThrow();
  });

  test('full import', () => {
    const input = `import * as StyleGuide from 'seek-style-guide/react';`;
    expect(() => transform(input)).toThrow();
  });

  test('no imports', () => {
    const input = `import {} from 'seek-style-guide/react';`;
    expect(() => transform(input).code).toThrow();
  });
});
