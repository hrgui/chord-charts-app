import * as React from "react";
import { List, ListItem, ListItemText, ListItemIcon, ListSubheader } from "ui/List";
import ListItemLink from "lib/layout/ListItemLink";
import { useUserData } from "lib/hooks/useUserData";
import { useGlobalSongActions } from "lib/hooks/useGlobalSongActions";
import { useAppBarActions } from "lib/hooks/useAppBarActions";
import { useTranslation } from "react-i18next";
import Divider from "ui/Divider";
import MaterialSymbol from "ui/icons/MaterialSymbol";

export function CurrentSongNavMenuPlaceholder() {
  return <div id="currentSongNavMenu" />;
}

export function SongSectionsNavMenu({
  sections,
  sectionsSettings,
  onSetSectionSettings,
}: {
  sections?;
  sectionsSettings?;
  onSetSectionSettings?;
}) {
  const { t } = useTranslation();

  if (!sections) {
    return null;
  }

  return (
    <List dense>
      <ListSubheader>{t("song:navMenu/title")}</ListSubheader>
      {sections.map((section, i) => {
        const title = section.title || `${t("song:untitledSection")}: ${i + 1}`;
        const sectionSettings = (sectionsSettings && sectionsSettings[i]) || {};

        return (
          <ListItem
            key={i}
            button
            onClick={(e) => {
              onSetSectionSettings({
                index: i,
                hide: !sectionSettings.hide,
              });
            }}
          >
            <ListItemIcon>
              {!sectionSettings.hide ? (
                <MaterialSymbol icon="toggle_on" />
              ) : (
                <MaterialSymbol icon="toggle_off" />
              )}
            </ListItemIcon>
            <ListItemText primary={title} />
          </ListItem>
        );
      })}
    </List>
  );
}

export interface CurrentSongNavMenuProps {
  song;
  sectionsSettings;
  handleSetSectionSettings: ({ index, hide }) => any;
  onToggleLyricsVisibility;
  onToggleChordsVisibility;
  onToggleScreenWrap;
  chordsDisabled;
  lyricsDisabled;
  screenWrap;
}

export function CurrentSongNavMenu(props: CurrentSongNavMenuProps) {
  const { t } = useTranslation();
  const user = useUserData() || {};
  const deleteSong = () => {};
  const { toggleYoutube } = useGlobalSongActions() || {};
  const { toggleControlsPanel } = useAppBarActions();
  const {
    onToggleChordsVisibility,
    onToggleScreenWrap,
    onToggleLyricsVisibility,
    chordsDisabled,
    lyricsDisabled,
    screenWrap,
  } = props;

  const { song, handleSetSectionSettings, sectionsSettings } = props;
  const { id } = song;

  return (
    <List dense>
      <ListSubheader>Song Controls</ListSubheader>
      <ListItemLink onClick={(e) => toggleControlsPanel()} to={`/song/${id}/edit`}>
        <ListItemIcon>
          <MaterialSymbol icon="edit" />
        </ListItemIcon>
        <ListItemText primary={t("edit")} />
      </ListItemLink>
      <ListItem
        button
        onClick={async () => {
          alert("SONG DELETE not implemented yet");
        }}
      >
        <ListItemIcon>
          <MaterialSymbol icon="delete" />
        </ListItemIcon>
        <ListItemText primary={t("delete")} />
      </ListItem>
      <Divider />
      {/* <ListItem
        button
        onClick={(e) => {
          toggleYoutube();
        }}
      >
        <ListItemIcon>
          {!isVideoHidden ? (
            <MaterialSymbol icon="toggle_on" />
          ) : (
            <MaterialSymbol icon="toggle_off" />
          )}
        </ListItemIcon>
        <ListItemText primary={`${t("video")}: ${!isVideoHidden ? t("on") : t("off")}`} />
      </ListItem> */}
      <ListItem
        button
        onClick={(e) => {
          onToggleScreenWrap();
        }}
      >
        <ListItemIcon>
          {screenWrap ? <MaterialSymbol icon="toggle_on" /> : <MaterialSymbol icon="toggle_off" />}
        </ListItemIcon>
        <ListItemText primary={`${t("screenWrap")}: ${screenWrap ? t("on") : t("off")}`} />
      </ListItem>
      <ListItem
        button
        onClick={(e) => {
          onToggleLyricsVisibility();
        }}
      >
        <ListItemIcon>
          {!lyricsDisabled ? (
            <MaterialSymbol icon="toggle_on" />
          ) : (
            <MaterialSymbol icon="toggle_off" />
          )}
        </ListItemIcon>
        <ListItemText primary={`${t("lyrics")}: ${!lyricsDisabled ? t("on") : t("off")}`} />
      </ListItem>
      <ListItem
        button
        onClick={(e) => {
          onToggleChordsVisibility();
        }}
      >
        <ListItemIcon>
          {!chordsDisabled ? (
            <MaterialSymbol icon="toggle_on" />
          ) : (
            <MaterialSymbol icon="toggle_off" />
          )}
        </ListItemIcon>
        <ListItemText primary={`${t("chords")}: ${!chordsDisabled ? t("on") : t("off")}`} />
      </ListItem>
      <SongSectionsNavMenu
        sectionsSettings={sectionsSettings}
        onSetSectionSettings={handleSetSectionSettings}
        sections={song.sections}
      />
    </List>
  );
}
