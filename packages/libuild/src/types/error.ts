export { Message as EsbuildError } from 'esbuild';

export interface Position {
  line: number;
  column: number;
}
export interface Range {
  start: Position;
  end: Position;
}

export interface OffsetRange {
  start: number;
  end: number;
}

export enum ErrorLevel {
  Ignore,
  Warn,
  Error,
}

export interface CodeFramePosition {
  line: number;
  column?: number;
}

export interface CodeFrameFileOption {
  filePath: string;
}

export interface CodeFrameNormalOption {
  filePath: string;
  fileContent: string;
  start?: CodeFramePosition;
  end?: CodeFramePosition;
}

/**
 * Compatible with esbuild
 */
export interface CodeFrameLineOption {
  filePath: string;
  lineText: string;
  start?: CodeFramePosition;
  length?: number;
}

export type CodeFrameOption = CodeFrameFileOption | CodeFrameNormalOption | CodeFrameLineOption;

export interface ControllerOption {
  /**
   * No stack displayed
   * @default `true`
   */
  noStack?: boolean;
  /**
   * No color displayed
   * @default `false`
   */
  noColor?: boolean;
}

export interface LibuildErrorInstance {
  prefixCode?: string;
  code: string;
  message: string;
  reason?: string;
  stack?: string;
  path?: string;
  /**
   * @default`'Error'`
   */
  level?: keyof typeof ErrorLevel;
  hint?: string;
  referenceUrl?: string;
  setControllerOption(opt: ControllerOption): void;
  setCodeFrame(opt: CodeFrameOption): void;
}

export interface LibuildErrorsData {
  errors: LibuildErrorInstance[];
  warnings: LibuildErrorInstance[];
}

export type LibuildErrorParams = Omit<
  LibuildErrorInstance,
  'code' | 'message' | 'path' | 'setControllerOption' | 'setCodeFrame' | 'toOverlayPayload'
> & {
  code?: string;
  controller?: ControllerOption;
  codeFrame?: CodeFrameOption;
};
