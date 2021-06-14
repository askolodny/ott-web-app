import React, { useContext, useEffect, useState } from 'react';
import type { Config } from 'types/Config';
import type { PlaylistItem } from 'types/playlist';
import type { WatchHistoryItem } from 'types/watchHistory';

import { watchHistoryStore, useWatchHistoryUpdater } from '../../stores/WatchHistoryStore';
import { ConfigContext } from '../../providers/ConfigProvider';
import { addScript } from '../../utils/dom';

import styles from './Cinema.module.scss';

type Props = {
  item: PlaylistItem;
  onPlay?: () => void;
  onPause?: () => void;
  onComplete?: () => void;
  isTrailer?: boolean;
};

const Cinema: React.FC<Props> = ({ item, onPlay, onPause, onComplete, isTrailer = false }: Props) => {
  const config: Config = useContext(ConfigContext);
  const [initialized, setInitialized] = useState(false);
  const file = item.sources?.[0]?.file;
  const scriptUrl = `https://content.jwplatform.com/libraries/${config.player}.js`;
  const enableWatchHistory = config.options.enableContinueWatching && !isTrailer;

  const createWatchHistoryItem = (): WatchHistoryItem | undefined => {
    const player = window.jwplayer && (window.jwplayer('cinema') as jwplayer.JWPlayer);

    if (!player) return;

    return {
      mediaid: item.mediaid,
      position: player.getPosition(),
    } as WatchHistoryItem;
  };
  const watchHistory = watchHistoryStore.useState((state) => state.watchHistory);
  const updateWatchHistory = useWatchHistoryUpdater(createWatchHistoryItem, enableWatchHistory);

  useEffect(() => {
    const getPlayer = () => window.jwplayer && (window.jwplayer('cinema') as jwplayer.JWPlayer);
    const loadVideo = () => {
      const player = getPlayer();
      player.setup({ file, image: item.image, title: item.title, autostart: 'viewable' });
      player.on('ready', () => {
        const { watchHistory } = watchHistoryStore.getRawState();
        const position = watchHistory.find((historyItem) => historyItem.mediaid === item.mediaid)?.position;

        if (position && enableWatchHistory) {
          setTimeout(() => player.seek(position), 1000);
        }
      });
      player.on('play', () => onPlay && onPlay());
      player.on('pause', () => onPause && onPause());
      player.on('complete', () => onComplete && onComplete());
    };

    if (config.player && !initialized) {
      getPlayer() ? loadVideo() : addScript(scriptUrl, loadVideo);
      setInitialized(true);
    }
  }, [
    item,
    onPlay,
    onPause,
    onComplete,
    config.player,
    file,
    scriptUrl,
    initialized,
    watchHistory,
    enableWatchHistory,
    updateWatchHistory,
  ]);

  return <div className={styles.Cinema} id="cinema" />;
};

export default Cinema;
