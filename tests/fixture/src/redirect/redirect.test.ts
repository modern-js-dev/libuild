import { getLibuilderTest, expect } from '@modern-js/libuild-test-toolkit';

describe('fixture:redirect', () => {
  it('redirect', async () => {
    const bundler = await getLibuilderTest({
      root: __dirname,
      resolve: {
        alias: {
          '@': 'src',
        },
      },
      bundle: false,
      input: ['./src'],
    });
    await bundler.build();
    const jsOutput = bundler.getJSOutput();
    Object.entries(jsOutput).map(([path, chunk]) => {
      if (path.endsWith('.module.js')) {
        expect(chunk.contents.includes('import "./style.module.css"')).to.be.true;
      } else {
        expect(chunk.contents.includes('import a from "./style.module"')).to.be.true;
        expect(chunk.contents.includes('import b from "./assets/logo.5d5d9eef.svg"')).to.be.true;
      }
    });
  });
});