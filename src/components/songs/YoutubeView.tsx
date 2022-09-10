import classnames from "classnames";
import * as qs from "qs";
import Youtube from "react-youtube";

import { useGlobalSongActions } from "~/hooks/useGlobalSongActions";

export const YoutubeView = ({ value, className }: { value; className? }) => {
  const getYoutubeId = (youtubeUrl) => {
    if (youtubeUrl.indexOf("://youtu.be/") !== -1) {
      const parts = youtubeUrl.split("/");
      return parts[parts.length - 1];
    }

    const params = qs.parse(youtubeUrl.split("?")[1]);

    if (params.v) {
      return params.v;
    }

    return null;
  };

  const youtubeId = value ? getYoutubeId(value) : null;

  if (!youtubeId) {
    return null;
  }

  return (
    <div
      data-testid="youtube-container"
      className={classnames(className, "print-hidden")}
    >
      <Youtube videoId={youtubeId} opts={{ height: "240px", width: "426px" }} />
    </div>
  );
};

export function ConnectedYoutubeView({ value, className }) {
  const { toggleYoutube } = useGlobalSongActions() || {};

  if (!value) {
    return null;
  }

  return (
    <YoutubeViewer
      value={value}
      onClose={toggleYoutube}
      className={className}
    />
  );
}

function YoutubeViewer({ value, className }: any) {
  return <YoutubeView className={className} value={value} />;
}

export default ConnectedYoutubeView;
