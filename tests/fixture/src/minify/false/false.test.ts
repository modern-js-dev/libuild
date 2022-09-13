import { expect, getLibuilderTest } from '@modern-js/libuild-test-toolkit';

describe('fixture:minify', () => {
  it('when `minify` is `false`', async () => {
    const bundler = await getLibuilderTest({
      root: __dirname,
    });
    await bundler.build();
    const jsOutput = bundler.getJSOutput();
    const jsChunk = Object.values(jsOutput);
    expect(jsChunk.length === 1).to.be.true;
    expect(jsChunk[0].contents).toMatchSnapshot();
  });
});
