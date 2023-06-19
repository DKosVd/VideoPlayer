import { useListenerTimeUpdate } from "../hooks/useListenerTimeUpdate";
import { URL_VIDEO } from "../utils/constants";
import { useAppContextApi } from "../context/apiContext";
import { useRefContext } from "../context";

export const VideoPlayer = () => {
  const videoPlayerRef = useRefContext();
  const { handleSetCurrentTime } = useAppContextApi();

  useListenerTimeUpdate({
    videoPlayer: videoPlayerRef,
    updateCurrentTime: handleSetCurrentTime,
  });

  return (
    <div>
      <video controls id="video_player" ref={videoPlayerRef}>
        <source src={URL_VIDEO} />
      </video>
    </div>
  );
};
