export default function HowToWatchAviOnIphoneCatCam() {
  return (
    <article className="prose-article">
      <p className="lead">
        If your iPhone sees the camera&apos;s AVI file but will not play it,
        first copy a short clip from the card into Files and try a compatible
        player such as VLC. If your editor rejects the clip, convert a copy to a
        supported format. Viewing, copying and converting are different steps.
      </p>
      <p>
        Whiskcam records AVI video and currently requires a separate MicroSD
        card. This guide uses Apple and VideoLAN documentation, reviewed
        September 25, 2026. It does not claim a completed test on every iPhone,
        reader or camera file.
      </p>
      <h2>1. Connect the card to the correct iPhone port</h2>
      <p>
        Use a reader that matches your iPhone&apos;s connector and supports your
        card. USB-C and Lightning are different connectors; an adapter that fits
        physically is not proof of compatible storage access. Apple's{" "}
        <a href="https://support.apple.com/guide/iphone/external-storage-devices-iph95baac91f/ios">
          external storage guide
        </a>{" "}
        explains connection and power requirements.
      </p>
      <p>
        Remove the card after stopping recording and switching the camera off
        according to its instructions. Keep the original recordings until you
        have checked a copy. Do not format the card to solve a connection
        problem before backing it up.
      </p>
      <h2>2. Find a short recording in Files</h2>
      <ol>
        <li>Connect the reader and open Files.</li>
        <li>Open Browse and look for the connected storage under Locations.</li>
        <li>
          Find a recent recording and copy a short file to a folder on your
          iPhone.
        </li>
        <li>
          Check that the copy has a plausible file size before disconnecting the
          reader.
        </li>
      </ol>
      <p>
        If no storage appears, check the connector, reader compatibility, power
        and card format against Apple&apos;s guidance. Test the same card on a
        computer if available. An inaccessible card and an unsupported video
        codec are different problems.
      </p>
      <h2>3. Open the copy with a compatible player</h2>
      <p>
        <a href="https://docs.videolan.me/vlc-user/ios/3.X/en/support/faq/faqios.html">
          VideoLAN documents playback of many formats in VLC for iOS without
          conversion
        </a>
        . Use the available Open In or Share option from Files to send the
        copied file to VLC, or import it using the player&apos;s supported file
        workflow. Menu names vary with the installed versions.
      </p>
      <p>
        AVI is a container. Its extension alone does not identify every video
        and audio codec inside it, and a damaged file may fail in any player.
        Try one known-good recording before transferring an entire card.
      </p>
      <h2>4. Convert a copy if your editor needs it</h2>
      <p>
        Playing an AVI in VLC does not automatically turn it into MP4. Earlier
        instructions here incorrectly suggested that sharing to Photos
        guaranteed conversion. Use a converter with an explicit output format
        and retain the original. For a computer workflow, the{" "}
        <a href="https://handbrake.fr/docs/en/latest/introduction/quick-start.html">
          official HandBrake quick-start guide
        </a>{" "}
        explains opening a source, choosing a preset and encoding a copy. A
        broadly compatible starting point is MP4 with H.264 video and AAC audio,
        if your destination editor supports them.
      </p>
      <p>
        Check the exported copy for picture, sound, duration and orientation.
        Changing the filename from .avi to .mp4 does not convert the content.
        Choose conversion software from its official source and avoid uploading
        private footage to an unfamiliar converter.
      </p>
      <h2>Troubleshooting: what fails, and what to check</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Problem</th>
              <th scope="col">Next check</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Card not visible</th>
              <td>Reader, connector, power and supported card format.</td>
            </tr>
            <tr>
              <th scope="row">File copies but does not play</th>
              <td>
                A compatible player; compare with another short recording.
              </td>
            </tr>
            <tr>
              <th scope="row">Picture but no sound</th>
              <td>Player audio settings, recorded audio and codec support.</td>
            </tr>
            <tr>
              <th scope="row">Player works, editor refuses</th>
              <td>Export a converted copy to a format the editor accepts.</td>
            </tr>
            <tr>
              <th scope="row">Empty or cut-off file</th>
              <td>
                Recording stopped correctly, available card space and a fresh
                handheld test.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>Preparing a cat POV clip for Reels, TikTok or Shorts</h2>
      <p>
        Import a short compatible copy into your editor. Inspect a vertical crop
        before export: a wide-angle recording can lose the subject at the edges.
        Keep an original version, avoid exposing neighbours or private
        interiors, and check sound before posting.
      </p>
      <p>
        For camera selection, see our{" "}
        <a href="/blog/best-cat-collar-cameras-2026">
          cat collar camera buying guide
        </a>
        . For the kit and recording limitations, read{" "}
        <a href="/what-is-whiskcam">what Whiskcam includes</a>. No camera
        purchase is needed to troubleshoot a file you already have.
      </p>
      <h2>What information helps support diagnose a problem?</h2>
      <p>
        Note your iPhone model, iOS version, reader connector, camera model,
        file extension and which step fails. Share a short non-private sample
        only if requested through your support conversation. Never share account
        passwords or private recordings publicly.
      </p>
    </article>
  );
}
