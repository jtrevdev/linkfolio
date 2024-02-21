'use client';
import React, { useEffect, useState } from 'react';

type AccordionProps = {
  items: {
    id: number;
    label: string;
    renderContent: React.ReactNode;
  }[];
  keepOthersOpen: boolean;
};
const Accordion = ({ items, keepOthersOpen }: AccordionProps) => {
  const [accordionItems, setAccordionItems] = useState<
    | null
    | {
        id: number;
        label: string;
        renderContent: React.ReactNode;
        toggled: boolean;
      }[]
  >(null);

  useEffect(() => {
    if (items) {
      setAccordionItems([
        ...items.map((item) => ({
          ...item,
          toggled: false,
        })),
      ]);
    }
  }, [items]);

  function handleAccordionToggle(clickedItem: {
    id: number;
    label: string;
    renderContent: React.ReactNode;
    toggled: boolean;
  }) {
    if (accordionItems === null) return;
    setAccordionItems([
      ...accordionItems.map((item) => {
        let toggled = item.toggled;
        if (clickedItem.id === item.id) {
          toggled = !item.toggled;
        } else if (!keepOthersOpen) {
          toggled = false;
        }

        return {
          ...item,
          toggled,
        };
      }),
    ]);
  }

  return (
    <div>
      {accordionItems?.map((listItem, index) => {
        return (
          <div className={`${listItem.toggled ? '' : ''}`} key={index}>
            <button
              className='toggle'
              onClick={() => handleAccordionToggle(listItem)}
            >
              <p>{listItem.label}</p>
              <div>{listItem.toggled ? '-' : '+'}</div>
            </button>
            <div>{listItem.renderContent}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
