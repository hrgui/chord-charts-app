import classnames from "classnames";
import * as React from "react";
import { twMerge } from "tailwind-merge";

import MaterialSymbol from "~/ui/icons/MaterialSymbol";

interface SetlistSongPaginationProps {
  currentIndex: number;
  length: number;
  onChange?: (index: number) => void;
}

export const SetlistSongPagination = (props: SetlistSongPaginationProps) => {
  const { currentIndex, length, onChange } = props;
  const buttonsHolder = React.useRef(null);

  React.useEffect(() => {
    const buttonsHolderEl: any = buttonsHolder.current;
    const buttonToScrollTo: any =
      buttonsHolderEl &&
      buttonsHolderEl.querySelector(`.song-pgn-${currentIndex}`);

    if (buttonToScrollTo && buttonToScrollTo.scrollIntoView) {
      buttonToScrollTo.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentIndex, length]);

  function handleChange(index) {
    onChange?.(index);
  }

  const buttons = Array.from(new Array(length)).map((_, index) => (
    <button
      className={twMerge(
        classnames(`btn btn-ghost min-w-auto song-pgn-${index}`, {
          ["bg-base-100"]: currentIndex === index,
        })
      )}
      onClick={() => {
        handleChange(index);
      }}
      key={index}
    >
      {index + 1}
    </button>
  ));

  //TODO fixme
  const width = "xl";
  return (
    <div className="flex items-center">
      <button data-testid="prev" onClick={() => handleChange(currentIndex - 1)}>
        <MaterialSymbol icon="navigate_before" />
      </button>
      <div ref={buttonsHolder} className={classnames(`pageNumbers-${width}`)}>
        {buttons}
      </div>
      <button data-testid="next" onClick={() => handleChange(currentIndex + 1)}>
        <MaterialSymbol icon="navigate_next" />
      </button>
    </div>
  );
};
