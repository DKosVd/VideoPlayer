import { useEffect, useState } from "react";

type TUseVideoPlayer = {
  isPlaying: boolean;
  isMuted: boolean;
};

export const useVideoPlayer = (
  videoPlayerElement: React.RefObject<HTMLVideoElement>
) => {
  const [videoPlayerState, setVideoPlayerState] = useState<TUseVideoPlayer>({
    isPlaying: false,
    isMuted: true,
  });

  useEffect(() => {
    videoPlayerState.isPlaying
      ? videoPlayerElement.current?.play()
      : videoPlayerElement.current?.pause();
  }, [videoPlayerState.isPlaying, videoPlayerElement]);

  const handlePlayVideo = () => {
    setVideoPlayerState((state) => ({
      ...state,
      isPlaying: !state.isPlaying,
    }));
  };

  useEffect(() => {
    if (videoPlayerElement.current) {
      videoPlayerElement.current.muted = videoPlayerState.isMuted;
    }
  }, [videoPlayerState.isMuted, videoPlayerElement]);

  const handleMutedVideo = () => {
    setVideoPlayerState((state) => ({
      ...state,
      isMuted: !state.isMuted,
    }));
  };

  return {
    handlePlayVideo,
    handleMutedVideo,
  };
};
