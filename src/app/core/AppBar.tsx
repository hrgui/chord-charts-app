import * as React from "react";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import classnames from "classnames";
import styled from "styled-components/macro";
import { useGetAppBarData } from "lib/hooks/useGetAppBarData";
import { useAppBarActions } from "lib/hooks/useAppBarActions";

interface NavBarProps {
  classes?: any;
  navMenuHidden?: boolean;
  title?: string;
  subtitle?: string;
  onShowNavMenu?: any;
  onHideNavMenu?: any;
  rightPanel?: any;
  userPanel?: any;
  state?: string;
  appName?: string;
}

export function AppBarTitle({ children }) {
  return (
    <Typography variant="h6" color="inherit">
      {children}
    </Typography>
  );
}

export function AppBarSubtitle({ children }) {
  return (
    <Typography variant="subtitle1" color="inherit">
      {children}
    </Typography>
  );
}

function useIntersection(options) {
  const [observerEntry, setEntry] = React.useState({});
  const elRef = React.useRef(null);

  React.useEffect(() => {
    if (!elRef.current) {
      return;
    }

    const observer = new IntersectionObserver((entries) => setEntry(entries[0]), options);
    observer.observe(elRef.current as any);
    return () => observer.disconnect();
  }, [options]);
  return { observerEntry, elRef };
}
const StyledAppBar = styled(MuiAppBar)`
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};

  &.AppBar-isTopBar {
    box-shadow: none;
  }
`;

const StyledIconButton = styled(IconButton)`
  margin-left: -18px;
  margin-right: 10px;
`;

const TopBarContent = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const LeftSide = styled.div`
  &.LeftSide-songBarTextMobile {
    & h6 {
      max-width: 280px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
`;
const RightSide = styled.div`
  margin-left: auto;
`;

export const AppBar = (props: NavBarProps) => {
  const { navMenuHidden = false, onShowNavMenu, onHideNavMenu, title, userPanel, state } = props;
  const hasDualBar = state === "song" || state === "setlist";
  const { observerEntry, elRef } = useIntersection({ threshold: 1 });
  const { setStickyState } = useAppBarActions();
  const isSingle = !(observerEntry as any).isIntersecting;

  React.useEffect(() => {
    setStickyState(isSingle);
    return () => {
      setStickyState(false);
    };
  }, [isSingle, setStickyState]);

  const leftIcon = (
    <StyledIconButton
      data-testid={"navMenuToggle"}
      onClick={navMenuHidden ? onShowNavMenu : onHideNavMenu}
      color="inherit"
      aria-label="Menu"
    >
      <MenuIcon />
    </StyledIconButton>
  );

  return (
    <>
      <StyledAppBar
        position={"sticky"}
        color="primary"
        className={classnames("print-hidden", {
          "AppBar-isTopBar": hasDualBar,
        })}
      >
        <div ref={elRef} />
        <Toolbar>
          <TopBarContent>
            {leftIcon}
            <LeftSide>
              {state === "song" || state === "setlist" ? (
                <div id="songTitle"></div>
              ) : (
                <AppBarTitle>{title}</AppBarTitle>
              )}
            </LeftSide>
            <RightSide>{userPanel}</RightSide>
          </TopBarContent>
        </Toolbar>
      </StyledAppBar>
    </>
  );
};

const ConnectedAppBar = (props: NavBarProps) => {
  const config = useGetAppBarData();
  const { toggleNavMenu } = useAppBarActions();

  if (!config) {
    return null;
  }

  const {
    page: { title, subtitle },
  } = config;
  return (
    <>
      <AppBar
        appName={config.appName}
        state={config.navBarState}
        title={title}
        subtitle={subtitle}
        navMenuHidden={config.navMenuHidden}
        onShowNavMenu={toggleNavMenu}
        onHideNavMenu={toggleNavMenu}
      />
    </>
  );
};

export default ConnectedAppBar;
