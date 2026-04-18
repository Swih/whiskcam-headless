// =============================================================================
// Article: How to Watch AVI on iPhone (Cat Cam Footage) — Problem-solve angle
// =============================================================================

export default function HowToWatchAviOnIphoneCatCam() {
  return (
    <article className="prose-article">
      {/* ---- Answer-first intro ---- */}
      <p className="lead">
        iPhones do not play AVI files natively. To watch cat collar camera footage on an iPhone,
        you have three working options: install VLC (free), use a third-party player like Infuse,
        or convert AVI to MP4 first. For most cat camera owners, VLC is the fastest path because
        it plays AVI directly from a USB-C SD card reader without conversion.
      </p>

      <p>
        Many affordable cat collar cameras record in AVI format because it uses less battery and
        storage than MP4. That&apos;s great for the camera — less great for the iPhone in your
        pocket, which has never supported AVI without a third-party app. Here&apos;s what actually
        works in April 2026, tested on iPhone 14 and iPhone 15.
      </p>

      {/* ---- Why AVI is a problem ---- */}
      <h2>Why Your iPhone Won&apos;t Play the Cat Camera File</h2>
      <p>
        When you plug the SD card from a collar camera into your iPhone with a USB-C or Lightning
        adapter, one of three things happens:
      </p>
      <ul>
        <li>The file shows up in Photos but won&apos;t open (most common)</li>
        <li>The file doesn&apos;t show up at all (AVI not recognized by Photos)</li>
        <li>
          A thumbnail appears but tapping it produces an error like &quot;This video cannot be
          played.&quot;
        </li>
      </ul>
      <p>
        This happens because Apple Photos only reliably supports MOV, MP4 (H.264/HEVC), and M4V.
        AVI is a container format from the Windows 98 era and Apple has never added native decoder
        support for it. No iOS update will change this — you need a third-party app.
      </p>

      {/* ---- Method 1: VLC ---- */}
      <h2>Method 1: VLC (Free, Works for 90% of Users)</h2>
      <p>
        VLC for Mobile is a free open-source video player. It plays AVI, MKV, WMV, and almost
        every other format without conversion. This is the fastest route for most people.
      </p>

      <h3>Step-by-step with VLC</h3>
      <ol>
        <li>Install VLC for Mobile from the App Store (free, no ads, no subscription)</li>
        <li>
          Plug your SD card into your iPhone using a USB-C SD reader (USB-C iPhones 15 and newer)
          or Lightning SD Camera Reader (iPhones 14 and older)
        </li>
        <li>Open the Files app, navigate to the SD card under &quot;Locations&quot;</li>
        <li>Tap the AVI file you want to view</li>
        <li>
          If Files tries to open it with Photos and fails, tap Share → &quot;Open in VLC&quot;
        </li>
        <li>
          Alternatively, in Files, long-press the file → Share → Save to VLC Documents. Then open
          VLC and play from there.
        </li>
      </ol>

      <p>
        To save the video into your Photos library (for posting to TikTok, Instagram, or sharing),
        VLC will need to convert it first. The conversion is lossless-quality but takes time
        (1-2 minutes per minute of footage, depending on phone age).
      </p>

      {/* ---- Method 2: Infuse ---- */}
      <h2>Method 2: Infuse (Premium, Smoother Experience)</h2>
      <p>
        Infuse is a paid video player ($9.99/year or $99.99 lifetime as of 2026). It plays AVI
        natively and offers better scrubbing, chapter support, and network streaming. If you file
        through a lot of camera footage regularly, it&apos;s worth it. For occasional use, VLC is
        enough.
      </p>

      <h3>When Infuse is better than VLC</h3>
      <ul>
        <li>You want smooth frame-by-frame scrubbing (VLC stutters on some AVIs)</li>
        <li>You have footage on a NAS or cloud drive and want to stream it</li>
        <li>You prefer a cleaner, less cluttered UI</li>
      </ul>

      {/* ---- Method 3: Convert ---- */}
      <h2>Method 3: Convert AVI to MP4 First</h2>
      <p>
        If you want the video to live in your Camera Roll permanently (and play there without any
        app), conversion is the way. Three approaches, in order of convenience:
      </p>

      <h3>On the iPhone itself (Media Converter app)</h3>
      <p>
        The free Media Converter app on the App Store takes AVI and spits out MP4 without sending
        the file anywhere. It takes roughly 1.5× real-time to convert (a 10-minute clip takes
        ~15 minutes).
      </p>

      <h3>On a computer (HandBrake, free)</h3>
      <p>
        If you have a Mac or Windows PC, HandBrake is the gold-standard free converter. Load the
        AVI, choose &quot;iPhone Fast 1080p30&quot; preset, hit Start Encode. 10× real-time on a
        modern machine.
      </p>

      <h3>Online (cloudconvert.com, free for small files)</h3>
      <p>
        Only for short clips and footage you don&apos;t mind uploading. For cat cameras
        this is usually fine — footage of a cat in your living room isn&apos;t sensitive — but be
        aware you&apos;re sending the file to a third party.
      </p>

      {/* ---- Comparison table ---- */}
      <h2>Which Method Should You Use?</h2>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Method</th>
              <th>Cost</th>
              <th>Speed</th>
              <th>Saves to Camera Roll</th>
              <th>Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>VLC</td>
              <td>Free</td>
              <td>Instant playback</td>
              <td>Yes (after conversion)</td>
              <td>Occasional viewing</td>
            </tr>
            <tr>
              <td>Infuse</td>
              <td>$10/year</td>
              <td>Instant playback</td>
              <td>No (playback only)</td>
              <td>Frequent, clean UX</td>
            </tr>
            <tr>
              <td>Media Converter app</td>
              <td>Free</td>
              <td>1.5× real-time</td>
              <td>Yes</td>
              <td>Iphone-only workflow</td>
            </tr>
            <tr>
              <td>HandBrake (computer)</td>
              <td>Free</td>
              <td>10× real-time</td>
              <td>Yes (after AirDrop)</td>
              <td>Batch conversion</td>
            </tr>
            <tr>
              <td>CloudConvert</td>
              <td>Free (small)</td>
              <td>Depends on upload</td>
              <td>Yes</td>
              <td>Short one-off clips</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ---- Recommended SD reader ---- */}
      <h2>Which SD Card Reader to Buy for iPhone</h2>
      <p>
        The reader matters. Cheap unbranded readers on Amazon sometimes don&apos;t work with iOS
        because they don&apos;t carry the required MFi certification. Options that work reliably
        as of 2026:
      </p>
      <ul>
        <li>
          <strong>USB-C iPhones (15, 16, 17):</strong> Any USB-C SD reader works. Anker, UGREEN,
          and Apple&apos;s own USB-C to SD Card Reader are reliable.
        </li>
        <li>
          <strong>Lightning iPhones (14 and older):</strong> You need the official Apple Lightning
          to SD Card Camera Reader (~€35) or a certified MFi equivalent. Most cheap no-brand
          Lightning readers do not mount the SD card reliably.
        </li>
      </ul>
      <p>
        The Whiskcam pack includes a USB-C adapter that works with USB-C iPhones directly. For
        Lightning iPhones, you&apos;ll still need Apple&apos;s Camera Reader separately.
      </p>

      {/* ---- Posting to TikTok ---- */}
      <h2>Posting Cat Camera Footage to TikTok or Instagram</h2>
      <p>
        TikTok and Instagram don&apos;t accept AVI uploads. The video must be in MP4 in your
        Camera Roll before you can upload. The fastest workflow:
      </p>
      <ol>
        <li>Plug SD card into iPhone via USB-C or Lightning reader</li>
        <li>Open VLC, play the file to confirm it&apos;s what you want</li>
        <li>In VLC, tap the share icon → &quot;Save to Photos&quot; (VLC auto-converts to MP4)</li>
        <li>Open TikTok or Instagram, upload from Camera Roll as normal</li>
      </ol>
      <p>
        On a 2023 iPhone (A16 chip), a 2-minute AVI clip takes approximately 20-30 seconds to
        convert and save to Photos. Older iPhones take longer.
      </p>

      {/* ---- Troubleshooting ---- */}
      <h2>Troubleshooting Common Issues</h2>

      <h3>My SD card doesn&apos;t show up in Files</h3>
      <p>
        Wait 10 seconds after plugging it in — iOS sometimes takes time to recognize external
        storage. If it still doesn&apos;t show, the reader may not be compatible. Try a different
        reader or plug the SD into a computer to verify the card isn&apos;t damaged.
      </p>

      <h3>VLC plays the video but there&apos;s no sound</h3>
      <p>
        Some collar cameras record in AVI with a rare audio codec (ADPCM). VLC supports this but
        occasionally needs to be force-closed and reopened. If that doesn&apos;t fix it, convert
        to MP4 with HandBrake using the &quot;AAC&quot; audio preset.
      </p>

      <h3>The video is green or corrupted</h3>
      <p>
        This is usually a damaged file (the SD card was removed during recording). The rest of
        the files on the card are likely fine — just skip the damaged one. To prevent this in the
        future, always power off the camera before removing the SD card.
      </p>

      <h3>Playback is choppy on my iPhone</h3>
      <p>
        VLC handles almost any codec but not always smoothly. If playback stutters, export to MP4
        using HandBrake with the &quot;iPhone Fast 1080p30&quot; preset — the result plays
        perfectly on any iPhone.
      </p>

      {/* ---- FAQ ---- */}
      <h2>Frequently Asked Questions</h2>

      <h3>Do all cat collar cameras use AVI?</h3>
      <p>
        No. Lower-cost cameras often default to AVI because it uses less CPU. Premium cameras and
        newer models increasingly default to MP4. Check your camera&apos;s specs — if it lists
        MJPEG or AVI output, it&apos;s AVI.
      </p>

      <h3>Can I just email the video to myself?</h3>
      <p>
        Yes, but most email providers block attachments over 25 MB, which is about 2 minutes of
        1080P footage. Better workflow is Files → iCloud Drive → open on iPhone in VLC.
      </p>

      <h3>Is there an iPhone-to-MP4 shortcut?</h3>
      <p>
        Yes. Apple Shortcuts has a built-in &quot;Encode Media&quot; action that can convert video
        files. Set it to &quot;Highest Quality, MP4 container&quot; for good results. This is the
        fastest path if you do this daily.
      </p>

      <h3>Does iPhone 15 USB-C change anything?</h3>
      <p>
        Yes, in a good way. USB-C iPhones read SD cards faster than Lightning models and accept a
        wider range of inexpensive readers. If you&apos;re buying a new iPhone specifically to
        handle cat camera footage, USB-C models are noticeably better.
      </p>

      <h3>Will Whiskcam work natively with iPhone in future firmware?</h3>
      <p>
        Firmware can change the file format on the camera side. Whiskcam records in AVI by default
        but we&apos;re testing an MP4 firmware option for 2026 units. Existing owners can use
        the methods above without any hardware changes.
      </p>

      {/* ---- Bottom line ---- */}
      <h2>The Bottom Line</h2>
      <p>
        AVI on iPhone is a one-time setup problem, not an ongoing hassle. Install VLC, buy a
        proper USB-C or MFi SD reader, and the workflow from &quot;cat returns home&quot; to
        &quot;video on TikTok&quot; takes roughly 90 seconds. If you&apos;re considering a collar
        camera, don&apos;t let file format be the reason you skip it — the solutions above are
        free and reliable.
      </p>
      <p>
        For more on setting up a collar camera for the first time, see our{" "}
        <a href="/blog/are-cat-collar-cameras-safe">safety guide</a> and our{" "}
        <a href="/blog/best-cat-collar-cameras-2026">camera comparison</a>.
      </p>
    </article>
  );
}
