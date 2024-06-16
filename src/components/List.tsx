// import React from 'react'
import { ReactNode } from "react";

type Propss<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
};

export default function List<T>({ items, renderItem }: Propss<T>) {
  // return <ul>{items.map((item) => renderItem(item))}</ul>;
}
