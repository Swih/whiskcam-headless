export default function IFilmedMyCatFor7DaysWhatILearned() {
  const days = [
    [
      "1",
      "Check the setup",
      "Record a short handheld clip, verify storage and playback, and check the collar instructions before considering a supervised fitting.",
    ],
    [
      "2",
      "Check comfort",
      "If the collar and equipment are suitable, try a brief supervised recording. Record your cat’s response; stop if the equipment causes discomfort.",
    ],
    [
      "3",
      "Check framing",
      "Review whether the lens sees fur, ground or useful surroundings. Do not compromise fit to get a more dramatic angle.",
    ],
    [
      "4",
      "Describe a familiar activity",
      "If your cat tolerates the setup, record a short familiar activity. Write what the clip actually shows, not what you assume happened off camera.",
    ],
    [
      "5",
      "Repeat a comparable observation",
      "Compare similar times or activities if appropriate. Note gaps, lighting and recording duration before drawing conclusions.",
    ],
    [
      "6",
      "Test the phone workflow",
      "Copy a clip, confirm picture and sound, and try an edited copy. Preserve the original and exclude footage exposing other people’s privacy.",
    ],
    [
      "7",
      "Review whether it was useful",
      "Look for repeated observations, missing periods and comfort issues. Decide whether a wearable adds value or a stationary camera would suit the goal better.",
    ],
  ];
  return (
    <article className="prose-article">
      <p className="lead">
        A seven-day cat-camera diary can help organise short observations, but
        it is not a reason to keep a cat wearing a camera for seven days. Start
        with fit, comfort and playback. Record only when appropriate, stop if
        your cat resists, and treat missing footage as unknown.
      </p>
      <p>
        Editorial clarification, September 25, 2026: this page is now a
        practical diary template. The earlier first-person story was not
        accompanied by verifiable trial notes in our editorial records. The plan
        below does not claim that Whiskcam completed that experiment or measured
        a named cat&apos;s routine.
      </p>
      <h2>Choose a question before recording</h2>
      <p>
        Ask something footage can actually answer, such as whether a particular
        lens angle captures a familiar route or how a clip looks on your phone.
        A short recording cannot establish a cat&apos;s full daily routine,
        diagnose a health condition or tell you its live location.
      </p>
      <p>
        For watching a room while you are away, consider a stationary camera
        first. For a wearable, read our{" "}
        <a href="/blog/are-cat-collar-cameras-safe">fit and safety guide</a>.
        The plan is optional and should stop whenever the setup is unsuitable.
      </p>
      <h2>A flexible seven-day observation plan</h2>
      {days.map(([day, title, body]) => (
        <section key={day}>
          <h3>
            Day {day}: {title}
          </h3>
          <p>{body}</p>
        </section>
      ))}
      <h2>Keep a record you can check later</h2>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th scope="col">Field</th>
              <th scope="col">What to record</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Date and time</th>
              <td>
                Actual recording time; note if the camera clock is incorrect.
              </td>
            </tr>
            <tr>
              <th scope="row">Setup</th>
              <td>Camera model, collar, mount and measured total weight.</td>
            </tr>
            <tr>
              <th scope="row">Conditions</th>
              <td>Location, lighting and supervision.</td>
            </tr>
            <tr>
              <th scope="row">Comfort</th>
              <td>Observed response and why a session ended.</td>
            </tr>
            <tr>
              <th scope="row">Recording</th>
              <td>Duration, gaps, file name and usable picture/sound.</td>
            </tr>
            <tr>
              <th scope="row">Observation</th>
              <td>What is visible; keep guesses in a separate note.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h2>What you cannot infer from a handful of clips</h2>
      <p>
        A sleeping clip does not show the percentage of a full day spent asleep.
        No visitor in one recording does not prove no visitor ever appears.
        Video ending does not establish why it ended: check battery, storage and
        recording settings. Changes in behaviour deserve context, not a
        diagnosis based on edited highlights.
      </p>
      <h2>Storage and battery planning</h2>
      <p>
        Make a short test with your exact card and settings. Back up the
        original before formatting or deleting anything. Stop recording
        according to the manual so the current file can finish writing.
        Whiskcam&apos;s continuous runtime remains unverified; do not plan
        around a guaranteed two-hour session.
      </p>
      <p>
        If the recording is AVI, our{" "}
        <a href="/blog/how-to-watch-avi-on-iphone-cat-cam">
          iPhone playback guide
        </a>{" "}
        separates card access, viewing and conversion. A compatible MicroSD card
        is currently required separately for Whiskcam.
      </p>
      <h2>What would make a useful published trial?</h2>
      <p>
        Keep the original clips, a photo of the weighed setup, actual durations
        and any unsuccessful attempts. State which claims were measured and
        which came from the manufacturer. Do not generalise one cat&apos;s
        experience to every cat or guarantee a camera is safe because one
        session looked calm.
      </p>
      <p>
        For equipment choices and limitations, see the{" "}
        <a href="/blog/best-cat-collar-cameras-2026">
          cat collar camera comparison
        </a>
        . Whiskcam publishes this page and sells one of the products described
        there.
      </p>
    </article>
  );
}
