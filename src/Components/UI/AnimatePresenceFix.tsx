import { AnimatePresence as FMAnimatePresence } from 'framer-motion';
import { FC, PropsWithChildren } from 'react';

interface APProps {
  initial?: boolean;
  custom?: unknown;
  onExitComplete?: () => void;
  presenceAffectsLayout?: boolean;
  mode?: 'sync' | 'wait' | 'popLayout';
  propagate?: boolean;
}

/* framer-motion v11 returns Element | undefined; TS expects Element | null.
   Wrap to satisfy strict JSX.Element. */
export const AnimatePresence: FC<PropsWithChildren<APProps>> =
  FMAnimatePresence as unknown as FC<PropsWithChildren<APProps>>;
