import { CollarWeightCalculator } from "components/blog/collar-weight-calculator";
import { COLLAR_GUIDANCE_URL, SAFETY_FAQS } from "./safety-facts";

export default function AreCatCollarCamerasSafe() {
  return (
    <article className="prose-article">
      <p className="lead">
        A cat collar camera is not automatically safe because it is light. The
        complete setup, collar release, fit and your cat&apos;s response all
        matter. Start by checking whether your cat tolerates a properly fitted
        collar at all. If equipment changes their movement or causes distress,
        remove it.
      </p>
      <p>
        Whiskcam publishes this guide and sells a collar camera. This is
        practical product guidance, not a veterinary assessment or a report of
        independently measured safety. Sources and wording were reviewed on
        September 25, 2026.
      </p>
      <nav aria-label="Safety guide contents">
        <ul>
          <li>
            <a href="#weight">Camera weight and the complete setup</a>
          </li>
          <li>
            <a href="#collar-fit">Breakaway collar and fit</a>
          </li>
          <li>
            <a href="#stop-signs">Signs to stop a trial</a>
          </li>
          <li>
            <a href="#first-use">Before your first recording</a>
          </li>
          <li>
            <a href="#questions">Common safety questions</a>
          </li>
        </ul>
      </nav>
      <h2 id="weight">How heavy is too heavy for a cat collar camera?</h2>
      <p>
        Our sources do not establish a universal gram limit for a pet camera.
        Earlier wording on this page treated 3–5% of body weight as a veterinary
        safety rule. That was too certain: a ratio alone cannot tell you whether
        a particular setup is suitable, nor how long a cat should wear it.
      </p>
      <p>
        Weigh the collar, camera, clip or mount, identification tag and any
        tracker together. Check the shape as well as the grams: a projecting
        mount can snag, swing or press against the body. A 24 g camera is not a
        24 g complete setup.
      </p>
      <CollarWeightCalculator />
      <p>
        For worked arithmetic examples, see the{" "}
        <a href="/blog/cat-collar-weight-chart-by-size">
          collar-load chart and calculator
        </a>
        . Use the figures to describe the equipment accurately when discussing
        it with your vet, not as a pass/fail test.
      </p>
      <h2 id="collar-fit">
        Choose a quick-release collar and check the mounted fit
      </h2>
      <p>
        <a href={COLLAR_GUIDANCE_URL}>
          Cats Protection recommends a quick-release collar
        </a>{" "}
        if you choose to use one, with room for two fingers to fit underneath.
        Follow the collar manufacturer&apos;s fitting instructions and check the
        fit regularly. That general collar guidance does not certify a camera
        attachment.
      </p>
      <ul>
        <li>Keep the camera mount clear of the clasp and release mechanism.</li>
        <li>
          Check for loose or damaged parts, sharp edges and snagging points.
        </li>
        <li>
          Check that the camera cannot press into the throat or interfere with
          eating, drinking or grooming.
        </li>
        <li>
          Never secure a breakaway clasp closed to prevent losing the camera.
        </li>
      </ul>
      <p>
        A release collar can reduce entanglement risk; it cannot eliminate every
        risk. Losing the equipment is preferable to preventing its release.
      </p>
      <h2 id="stop-signs">When should I remove the camera?</h2>
      <p>
        Do not wait for a promised five-minute adjustment period. Remove the
        equipment if your cat freezes, repeatedly scratches or bites at it,
        walks differently, struggles, hides or tries to escape it. Check the fit
        and consider a stationary camera instead.
      </p>
      <p>
        These observations do not diagnose a medical condition. If pain,
        breathing difficulty, injury or unusual movement persists after removal,
        seek veterinary help. If your cat repeatedly resists the setup,
        recording footage is not a reason to keep trying.
      </p>
      <h2 id="first-use">Checks before your first recording</h2>
      <ol>
        <li>
          Read the camera and collar instructions. Ask your vet about
          suitability if your cat is young, has mobility or health concerns, is
          recovering, or does not tolerate a collar.
        </li>
        <li>
          Charge the camera off your cat. Inspect the housing and battery, and
          keep cables and small parts out of reach.
        </li>
        <li>
          Record a short handheld test and check playback. This avoids fitting
          the camera while troubleshooting storage or an adapter.
        </li>
        <li>
          Check the complete mounted fit and keep the release unobstructed.
        </li>
        <li>
          Try a brief supervised session in familiar surroundings. End it at the
          first sign of discomfort rather than aiming for a fixed duration.
        </li>
        <li>
          Remove the setup afterwards and inspect the collar area and
          attachment.
        </li>
      </ol>
      <h2>Indoor, outdoor and wet-weather use</h2>
      <p>
        Furniture and loose cables can catch equipment indoors; fences,
        vegetation and other obstacles add risks outside. A camera does not make
        unsupervised roaming safe. Do not use it in rain or near water unless
        the exact device and attachment are rated for those conditions.
      </p>
      <p>
        Whiskcam records video for later playback. It has no live view or GPS,
        and its battery running out does not tell you where your cat is. See{" "}
        <a href="/blog/cat-collar-camera-vs-gps-tracker-2026">
          camera versus GPS tracker
        </a>{" "}
        if locating your cat is the aim.
      </p>
      <h2>Is a stationary camera a better choice?</h2>
      <p>
        A fixed camera can show a feeding area, bed or room without adding
        weight to your cat. It is a useful alternative for cats that resist
        wearable equipment. Position cables and the device out of reach, and
        avoid filming people or private spaces without appropriate permission.
      </p>
      <h2 id="questions">Frequently asked questions</h2>
      {SAFETY_FAQS.map((item) => (
        <section key={item.question}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </section>
      ))}
      <h2>Compare equipment after checking suitability</h2>
      <p>
        Our{" "}
        <a href="/blog/best-cat-collar-cameras-2026">
          cat collar camera comparison
        </a>{" "}
        lists weight, recording features and kit contents with manufacturer
        references. Those specifications help compare products; none substitutes
        for checking the fit and response of your own cat.
      </p>
    </article>
  );
}
