import { ReactNode } from 'react';
import css from './Section.module.css';

type SectionProps = {
  children: ReactNode;
};

export const Section = ({ children }: SectionProps) => {
  return <section className={css.container}>{children}</section>;
};
