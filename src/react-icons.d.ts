/* react-icons v5 declares IconType as returning ReactNode (which TS rejects as
   JSX because ReactNode includes undefined). Override the type. */
import 'react-icons';

declare module 'react-icons' {
  export type IconType = (props: IconBaseProps) => JSX.Element;
}

declare module 'react-icons/lib' {
  export type IconType = (props: IconBaseProps) => JSX.Element;
}
