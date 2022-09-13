import type { ImportKind, Loader } from 'esbuild';
import { MinifyOptions as TerserMinifyOptions } from 'terser';
import type { Resolve, ResolveNormalized } from './resolve';
import type { LogLevel, ILogger } from '../logger';
import type { LibuildPlugin } from '../builder';
import type { Style } from './style';

export * from './resolve';
export * from './config-loader';
export * from './style';

type Minify = 'esbuild' | 'terser' | false | TerserMinifyOptions;

type Format = 'esm' | 'cjs' | 'umd' | 'iife';

type Input =
  | {
      [name: string]: string;
    }
  | string[];

type SourceMap = boolean | 'inline' | 'external';

type Globals = Record<any, any>;

type Define = Record<string, string>;

type External = (string | RegExp)[];

type Platform = 'node' | 'browser';

export type Asset = {
  name?: string | ((filePath: string) => string);
  /**
   * For image, specify the limit size to inline
   * @default 0
   */
  limit?: number;
  publicPath?: string | ((filePath: string) => string);
};
export interface UserConfig {
  /**
   * @default true
   */
  bundle?: boolean;
  /**
   * Entry points.
   * @default { index: './src/index.ts '}
   */
  input?: Input;
  /**
   * The directory for output
   * @default 'dist'
   */
  outdir?: string;
  /**
   * @see https://esbuild.github.io/api/#entry-names
   */
  entryNames?: string;
  /**
   * @see https://esbuild.github.io/api/#chunk-names
   */
  chunkNames?: string;
  /**
   * Module format
   * @default 'esm'
   */
  format?: Format | ((chunkName: string) => Format);
  /**
   * Code splitting
   * @default false
   */
  splitting?: boolean;
  /**
   * Clean output directory before build
   * @default false
   */
  clean?: boolean;
  /**
   * Minify JS
   * @default false
   */
  minify?: Minify;
  /**
   * When file changed builder will rebuild under watch mode.
   * @default false
   */
  watch?: boolean;
  /**
   * The level of the console log
   * @default 'info'
   */
  logLevel?: LogLevel;
  /**
   * Options for enhanced-resolve
   */
  resolve?: Resolve;
  /**
   * Plugins for libuild
   */
  plugins?: LibuildPlugin[];
  /**
   * Compile target
   * @see https://esbuild.github.io/api/#target
   * @default 'es2015''
   */
  target?: string;
  /**
   * The mode of sourcemap
   * @default false
   */
  sourceMap?: SourceMap;
  /**
   * Global variables, only used in umd format
   * @default {}
   */
  globals?: Globals;
  /**
   * Default Excluded your dependencies and peerDependencies
   */
  external?: External;
  /**
   * @see https://esbuild.github.io/api/#define
   */
  define?: Define;
  /**
   * @see https://esbuild.github.io/api/#platform
   * @default 'node'
   */
  platform?: Platform;
  /**
   * Emit esbuild metafile
   * @see https://esbuild.github.io/api/#metafile
   * @default false
   */
  metafile?: boolean;
  /**
   * Options for style
   */
  style?: Style;
  /**
   * Options for asset
   */
  asset?: Asset;
  /**
   * @see https://esbuild.github.io/api/#loader
   */
  loader?: Record<string, Loader>;
  /**
   * @see https://esbuild.github.io/api/#inject
   */
  inject?: string[];
}

export interface CLIConfig extends UserConfig {
  /**
   * project root dir
   */
  root?: string;
  /**
   * The path of config file, default by `libuild.config.ts`.
   */
  configFile?: string;
}

export interface BuildConfig extends Required<CLIConfig> {
  logger: ILogger;
  resolve: ResolveNormalized;
  css_resolve: (id: string, dir: string) => string;
  node_resolve: (id: string, dir: string, kind?: ImportKind) => string;
}
