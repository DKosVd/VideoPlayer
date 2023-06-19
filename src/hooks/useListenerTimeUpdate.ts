import { useEffect } from "react";

type TUseListenerTimeUpdateProps = {
  videoPlayer: React.RefObject<HTMLVideoElement>;
  updateCurrentTime: (time: number) => void;
};

export const useListenerTimeUpdate = ({
  videoPlayer,
  updateCurrentTime,
}: TUseListenerTimeUpdateProps) => {
  useEffect(() => {
    videoPlayer.current?.addEventListener("timeupdate", () => {
      if (videoPlayer.current) {
        updateCurrentTime(videoPlayer.current.currentTime);
      }
    });
    return () => {};
  }, [videoPlayer]);
};
