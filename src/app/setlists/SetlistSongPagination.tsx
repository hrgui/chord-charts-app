import * as React from "react";
import classnames from "classnames";
import MaterialSymbol from "ui/icons/MaterialSymbol";

interface SetlistSongPaginationProps {
  currentIndex;
  length;
  onChange?;
  classes?;
}

export const SetlistSongPagination = (props: SetlistSongPaginationProps) => {
  const { currentIndex, length, onChange } = props;
  const buttonsHolder = React.useRef(null);

  React.useEffect(() => {
    const buttonsHolderEl: any = buttonsHolder.current;
    const buttonToScrollTo: any =
      buttonsHolderEl && buttonsHolderEl.querySelector(`.song-pgn-${currentIndex}`);

    if (buttonToScrollTo && buttonToScrollTo.scrollIntoView) {
      buttonToScrollTo.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentIndex, length]);

  function handleChange(index) {
    onChange(index);
  }

  const buttons = Array.from(new Array(length)).map((_, index) => (
    <button
      className={`btn min-w-auto song-pgn-${index}`}
      onClick={(e) => {
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
    <div className="h-[36px] flex items-center">
      <button data-testid="prev" onClick={(_) => handleChange(currentIndex - 1)}>
        <MaterialSymbol icon="navigate_before" />
      </button>
      <div ref={buttonsHolder} className={classnames(`pageNumbers-${width}`)}>
        {buttons}
      </div>
      <button data-testid="next" onClick={(_) => handleChange(currentIndex + 1)}>
        <MaterialSymbol icon="navigate_next" />
      </button>
    </div>
  );
};
