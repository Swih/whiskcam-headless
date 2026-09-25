import { CollarWeightCalculator } from "components/blog/collar-weight-calculator";
import { COLLAR_GUIDANCE_URL, WEIGHT_FAQS } from "./safety-facts";
import { PRODUCT_FACTS } from "lib/content";

export default function CatCollarWeightChartBySize() {
  return (
    <article className="prose-article">
      <p className="lead">
        To calculate a collar-camera load, add the weight of every worn item,
        divide by your cat&apos;s weight in grams and multiply by 100. The
        percentage describes the load; it is not a safe-weight limit. Use your
        cat&apos;s measured weight, not a breed average.
      </p>
      <p>
        Whiskcam publishes this guide and sells a {PRODUCT_FACTS.weightGrams} g
        camera. This page was revised on September 25, 2026 to replace
        unsupported safe-weight thresholds with transparent arithmetic and
        fitting considerations.
      </p>
      <h2>Cat collar weight chart: what the numbers actually mean</h2>
      <p>
        The 40 g setup below is an illustrative total, not a recommendation or a
        measured Whiskcam bundle. It might comprise a 24 g camera plus 16 g of
        other items, but you must weigh your own collar and attachments.
      </p>
      <div
        role="region"
        aria-label="Illustrative collar load table"
        tabIndex={0}
        className="overflow-x-auto"
      >
        <table>
          <caption>
            Illustrative 40 g complete setup — no safety verdict
          </caption>
          <thead>
            <tr>
              <th scope="col">Measured cat weight</th>
              <th scope="col">Setup weight</th>
              <th scope="col">Percentage of body weight</th>
            </tr>
          </thead>
          <tbody>
            {[2, 3, 4, 5, 6, 7, 8].map((kg) => (
              <tr key={kg}>
                <th scope="row">{kg} kg</th>
                <td>40 g</td>
                <td>{((40 / (kg * 1000)) * 100).toFixed(2)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        The formula is{" "}
        <strong>setup grams ÷ (cat kilograms × 1,000) × 100</strong>. For
        pounds, divide by approximately 2.20462 to convert to kilograms first.
        The calculator performs the conversion for you.
      </p>
      <CollarWeightCalculator />
      <h2>Include the collar, mount, tags and tracker</h2>
      <p>
        Weigh the assembled equipment on a scale that resolves grams. Include
        the collar itself, camera, mount, tag, bell and any tracking device.
        Check whether the manufacturer&apos;s listed camera weight includes its
        mount or storage. An action camera&apos;s charging pod may be separate
        from the worn camera body.
      </p>
      <p>
        Record the measured total and the exact components. If you change a
        collar or add a tracker, weigh it again. For choosing between devices,
        our{" "}
        <a href="/blog/cat-collar-camera-vs-gps-tracker-2026">
          camera versus GPS guide
        </a>{" "}
        explains why recording video and live location are different needs.
      </p>
      <h2>Why this chart does not give a 3% or 5% safe limit</h2>
      <p>
        Earlier versions presented these ratios as veterinary limits for daily
        or short-session wear. The sources available for this guide do not
        establish such a universal recommendation for pet collar cameras. We
        removed the pass/fail labels and session durations rather than turn a
        percentage into a safety promise.
      </p>
      <p>
        Two setups with the same weight can differ in bulk, balance, position
        and snagging points. Your cat&apos;s condition, collar fit and response
        are not captured in the formula. A larger cat does not automatically
        tolerate larger equipment.
      </p>
      <h2>Collar fit and individual suitability</h2>
      <p>
        <a href={COLLAR_GUIDANCE_URL}>Cats Protection&apos;s collar guidance</a>{" "}
        recommends a quick-release design and a fit allowing two fingers
        underneath. Keep the release mechanism clear of mounts. Remove equipment
        if it changes your cat&apos;s movement or causes distress.
      </p>
      <p>
        Ask your vet before choosing wearable equipment for a kitten or a cat
        with health, mobility or recovery concerns. A breed label or body weight
        does not replace that assessment. See our{" "}
        <a href="/blog/are-cat-collar-cameras-safe">
          camera safety and fitting checklist
        </a>{" "}
        for a supervised first-use approach.
      </p>
      <h2>Choosing a lighter or simpler setup</h2>
      <p>
        Compare complete mounted weights, not headline camera weights. Decide
        which function you need and avoid stacking accessories without a reason.
        A stationary camera is an alternative when your aim is watching an
        indoor area, or when your cat does not tolerate a wearable.
      </p>
      <p>
        Our <a href="/blog/best-cat-collar-cameras-2026">camera comparison</a>{" "}
        separates manufacturer-listed weights, recording features and package
        contents so you can ask the right questions before buying.
      </p>
      <h2>Frequently asked questions</h2>
      {WEIGHT_FAQS.map((item) => (
        <section key={item.question}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </section>
      ))}
    </article>
  );
}
