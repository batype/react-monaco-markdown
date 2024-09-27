import React from 'react';
import NextIcon from '../NextIcon';
import './index.css';

export type HTextProps = {
  title: string;
  Component: React.ElementType;
};
export default function HText({ title, Component }: HTextProps) {
  const href = (
    <a href={`#${title}`} className="mr-1 hover:underline">
      <NextIcon type="link" size={14} />
    </a>
  );

  return (
    <Component id={`${title}`} className="h-box">
      {href}
      {title}
    </Component>
  );
}

export type hProps = {
  children: string;
};
export const H1 = (props: hProps) => (
  <HText title={props?.children} Component={'h1'} />
);

export const H2 = (props: hProps) => (
  <HText title={props?.children} Component={'h2'} />
);

export const H3 = (props: hProps) => (
  <HText title={props?.children} Component={'h3'} />
);

export const H4 = (props: hProps) => (
  <HText title={props?.children} Component={'h4'} />
);

export const H5 = (props: hProps) => (
  <HText title={props?.children} Component={'h5'} />
);

export const H6 = (props: hProps) => (
  <HText title={props?.children} Component={'h6'} />
);
