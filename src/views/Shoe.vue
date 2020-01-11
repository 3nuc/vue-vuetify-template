<template>
  <div>
    <audio ref="player" controls></audio>
    <button ref="stopButton" @click="handleClick">
      Stop
    </button>
    <a id="downloadButton" ref="downloadButton">Download</a>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class Home extends Vue {
  shouldStopRecordingNextFrame = false;
  isStopped = false;
  $refs!: {
    player: HTMLAudioElement;
    recorder: HTMLInputElement;
    stopButton: HTMLButtonElement;
    downloadButton: HTMLAnchorElement;
  };

  mounted() {
    this.getMicrophonePermissions();
  }

  handleClick() {
    this.shouldStopRecordingNextFrame = true;
    console.log(this.shouldStopRecordingNextFrame, "yes");
  }

  getMicrophonePermissions() {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(stream => this.handleMicrophonePermissionSuccess(stream));
  }

  handleMicrophonePermissionSuccess(stream: MediaStream) {
    if (window.URL) this.$refs.player.srcObject = stream;
    else this.$refs.player.src = (stream as unknown) as string;
    const options = { mimeType: "audio/webm" };
    let recordedChunks: any = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener("dataavailable", (e: any) => {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }

      if (this.shouldStopRecordingNextFrame && this.isStopped === false) {
        mediaRecorder.stop();
        this.isStopped = true;
      }

      mediaRecorder.addEventListener("stop", () => {
        console.log("stop");
        this.$refs.downloadButton.href = URL.createObjectURL(
          new Blob(recordedChunks)
        );
        this.$refs.downloadButton.download = "actest.wav";
      });
    });
  }
}
</script>
