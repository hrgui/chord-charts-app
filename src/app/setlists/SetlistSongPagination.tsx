import * as React from "react";
import styled from "styled-components";
import classnames from "classnames";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

interface SetlistSongPaginationProps {
  currentIndex;
  length;
  onChange?;
  classes?;
}

const Container = styled.div`
  height: 36px;
  display: flex;
  align-items: center;

  .pageNumbers-xs {
    max-width: 160px;
    overflow-x: scroll;
    display: flex;
    flex-wrap: nowrap;
  }
`;

const StyledButton = styled.button`
  min-width: auto;
`;

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
    <StyledButton
      className={`song-pgn-${index}`}
      onClick={(e) => {
        handleChange(index);
      }}
      key={index}
      variant={currentIndex === index ? "contained" : "text"}
    >
      {index + 1}
    </StyledButton>
  ));

  //TODO fixme
  const width = "xl";
  return (
    <Container>
      <button data-testid="prev" onClick={(_) => handleChange(currentIndex - 1)}>
        <NavigateBeforeIcon />
      </button>
      <div ref={buttonsHolder} className={classnames(`pageNumbers-${width}`)}>
        {buttons}
      </div>
      <button data-testid="next" onClick={(_) => handleChange(currentIndex + 1)}>
        <NavigateNextIcon />
      </button>
    </Container>
  );
};
