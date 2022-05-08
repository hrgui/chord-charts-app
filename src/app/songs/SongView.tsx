import * as React from "react";
import SongSectionView from "./components/SongSectionView";
import ChordSelect from "./components/ChordSelect";

import ConnectedYoutubeView from "./components/YoutubeView";
import classnames from "classnames";
import { ToolbarSpacer } from "lib/layout/ToolbarSpacer";
import { createPortal } from "react-dom";
import { SongSectionsNavMenu } from "./CurrentSongNavMenu";
import { Button } from "react-daisyui";
import MaterialSymbol from "ui/icons/MaterialSymbol";
import { twMerge } from "tailwind-merge";
import { getOrCreateElement } from "lib/layout/portalSelector";

interface SongViewProps {
  isLoading?: boolean;
  isError?: any;
  data?: any;
  settings?: any;
  classes?: any;
  lyricsDisabled?: boolean;
  chordsDisabled?: boolean;
  onChangeSettings?: any;
  screenWrap?: boolean;
}

export const SongViewKey = ({
  overrideKey,
  onChange,
  className,
  classes,
}: {
  overrideKey;
  onChange;
  className?;
  classes?;
}) => {
  return (
    <ChordSelect classes={classes} className={className} value={overrideKey} onChange={onChange} />
  );
};

function Song({
  sections,
  overrideKey,
  baseKey,
  sectionsSettings = {},
  setSectionSettings,
  chordsDisabled,
  lyricsDisabled,
  screenWrap,
}) {
  if (!sections) {
    return null;
  }

  return (
    <div className={classnames("song-view-container", { screenWrap: screenWrap })}>
      {sections.map((section, i) => {
        const sectionSettings: any = sectionsSettings[i] || {};

        return (
          <SongSectionView
            data-testid={`songSectionView-${i}`}
            key={`songSectionView-${i}`}
            onRequestHide={() => {
              setSectionSettings({ index: i, hide: true });
            }}
            overrideKey={overrideKey}
            songKey={baseKey}
            section={section}
            hide={sectionSettings.hide}
            chordsDisabled={chordsDisabled}
            lyricsDisabled={lyricsDisabled}
          />
        );
      })}
    </div>
  );
}

const SongView = (props: SongViewProps) => {
  let {
    data,
    isError,
    settings = {},
    lyricsDisabled: _lyricsDisabled = false,
    chordsDisabled: _chordsDisabled = false,
    screenWrap: _screenWrap = false,
    onChangeSettings = () => null,
  } = props;
  const [sectionsSettings, _setSectionSettings] = React.useState(settings.sectionsSettings || {});
  const [overrideKey, _setOverrideKey] = React.useState(settings.overrideKey || (data && data.key));
  const [lyricsDisabled, setLyricsDisabled] = React.useState(
    settings.lyricsDisabled || _lyricsDisabled
  );
  const [chordsDisabled, setChordsDisabled] = React.useState(
    settings.chordsDisabled || _chordsDisabled
  );
  const [screenWrap, setScreenWrap] = React.useState(settings.screenWrap || _screenWrap);
  // drawer hidden in mobile by default by css, so we set it to true
  const [drawerHidden, setDrawerVisibility] = React.useState(true);

  React.useEffect(() => {
    if (!settings.overrideKey) {
      return;
    }

    if (settings.overrideKey !== overrideKey) {
      _setOverrideKey(settings.overrideKey);
    }
  }, [overrideKey, settings.overrideKey]);

  function setOverrideKey(x) {
    onChangeSettings({ overrideKey: x }, data);
    _setOverrideKey(x);
  }

  function setSectionSettings({ index, hide }) {
    const sectionSettings = {
      ...(sectionsSettings[index] || {}),
      ...{ index, hide },
    };
    const _sectionsSettings = { ...sectionsSettings, [index]: sectionSettings };
    _setSectionSettings(_sectionsSettings);
    onChangeSettings({ sectionsSettings: _sectionsSettings }, data);
  }

  function handleToggleLyricsVisibility() {
    const newLyricsState = !lyricsDisabled;
    setLyricsDisabled(newLyricsState);
    onChangeSettings({ lyricsDisabled: newLyricsState }, data);
  }

  function handleToggleChordsVisibility() {
    const newChordsState = !chordsDisabled;
    setChordsDisabled(newChordsState);
    onChangeSettings({ chordsDisabled: newChordsState }, data);
  }

  function handleToggleScreenWrap() {
    const newScreenWrapState = !screenWrap;
    setScreenWrap(newScreenWrapState);
    onChangeSettings({ screenWrap: newScreenWrapState }, data);
  }

  if (!data) {
    data = {};
  }

  if (isError) {
    console.error(isError);
    return null;
  }

  const appBarEndContent = createPortal(
    <div className="flex items-center">
      <Button size="xs" onClick={() => setDrawerVisibility(!drawerHidden)}>
        <MaterialSymbol icon="settings" />
      </Button>
      <ChordSelect
        className="select-sm"
        value={overrideKey}
        onChange={(e) => setOverrideKey(e.target.value)}
      />
    </div>,
    getOrCreateElement("#appBarEnd")
  );

  const printContent = (
    <div className="print uppercase printSongBar">
      <div style={{ display: "flex" }}>
        {data.title} <div style={{ marginLeft: "auto" }}>Key: {overrideKey}</div>
      </div>
    </div>
  );

  const drawerContent = (
    <div
      className={twMerge(
        classnames("bg-base-200 hidden sm:block xl:w-[426px]", {
          ["block sm:hidden"]: !drawerHidden,
        })
      )}
    >
      <ConnectedYoutubeView className={"youtube-view-input"} value={data.youtube} />
      <div className="pl-2 pr-2">
        <SongSectionsNavMenu
          sections={data.sections}
          sectionsSettings={sectionsSettings}
          onSetSectionSettings={setSectionSettings}
        />
      </div>
    </div>
  );

  return (
    <div className={classnames("flex flex-col lg:flex-row-reverse")}>
      {appBarEndContent}
      {drawerContent}
      <div className={classnames("printSong overflow-hidden p-2 mt-2 max-w-full flex-grow")}>
        {printContent}
        <Song
          screenWrap={screenWrap}
          lyricsDisabled={lyricsDisabled}
          chordsDisabled={chordsDisabled}
          setSectionSettings={setSectionSettings}
          baseKey={data.key}
          overrideKey={overrideKey}
          sections={data.sections}
          sectionsSettings={sectionsSettings}
        />
        <ToolbarSpacer />
      </div>
    </div>
  );
};

export default SongView;
