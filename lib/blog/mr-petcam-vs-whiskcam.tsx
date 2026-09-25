import { Fragment } from "react";
import { PRODUCT_FACTS as f } from "lib/content";
import {
  COMPARISON_FAQS,
  COMPARISON_SOURCES as sources,
} from "./comparison-facts";
import { BlogProductLink } from "components/blog/product-link";

export default function MrPetcamVsWhiskcam() {
  return (
    <article className="prose-article">
      <p className="lead">
        <strong>Mr Petcam HD</strong> lists a 16 g camera body, infrared LEDs
        and an included 16 GB MicroSD card. <strong>Whiskcam Original</strong>{" "}
        is listed at {f.weightGrams} g and includes a phone adapter and collar,
        but currently requires a separate MicroSD card. Compare the exact
        package, transfer method and fit before choosing; Whiskcam is not the
        lighter option on these published camera-body figures.
      </p>
      <p>
        <strong>Disclosure:</strong> this comparison is published by Whiskcam.
        It uses our product information and manufacturer pages checked September
        25, 2026. It is not an independent hands-on review. We have corrected
        the older Mr Petcam weight, card and night-vision details that did not
        match its current HD listing.
      </p>
      <h2>Mr Petcam HD vs Whiskcam: what is actually different?</h2>
      <div
        className="overflow-x-auto"
        role="region"
        aria-label="Mr Petcam and Whiskcam comparison"
        tabIndex={0}
      >
        <table className="min-w-[560px]">
          <caption>
            Listed specifications and kit contents; check the current bundle
            before buying
          </caption>
          <thead>
            <tr>
              <th scope="col">Buying consideration</th>
              <th scope="col">Mr Petcam HD</th>
              <th scope="col">Whiskcam Original</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Camera-body weight</th>
              <td>16 g, per manufacturer</td>
              <td>{f.weightGrams} g, listed specification</td>
            </tr>
            <tr>
              <th scope="row">Video</th>
              <td>1080P advertised</td>
              <td>{f.resolution}</td>
            </tr>
            <tr>
              <th scope="row">Night recording</th>
              <td>Infrared LEDs advertised</td>
              <td>No night vision</td>
            </tr>
            <tr>
              <th scope="row">MicroSD card</th>
              <td>16 GB listed in HD package</td>
              <td>Required separately</td>
            </tr>
            <tr>
              <th scope="row">Phone transfer</th>
              <td>Check current reader requirements</td>
              <td>Adapter included; AVI player or conversion may be needed</td>
            </tr>
            <tr>
              <th scope="row">Mounting</th>
              <td>Clip and strap listed; verify collar fit</td>
              <td>Collar included; check full mounted fit</td>
            </tr>
            <tr>
              <th scope="row">Battery comparison</th>
              <td>Ask for runtime and recording conditions</td>
              <td>No verified continuous-recording duration published here</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Sources:{" "}
        <a href={sources.mrPetcamWeight}>Mr Petcam&apos;s weight claim</a>,{" "}
        <a href={sources.mrPetcam}>HD features and package contents</a> and{" "}
        <a href="/what-is-whiskcam">Whiskcam product information</a>. Advertised
        infrared capability is not a side-by-side image-quality test.
      </p>
      <h2>Which should you choose?</h2>
      <p>
        <strong>Consider Mr Petcam HD</strong> if the lower listed body weight,
        infrared recording or included memory card addresses your main need.
        Verify the complete wearable setup and phone-transfer method with the
        seller.
      </p>
      <p>
        <strong>Consider Whiskcam</strong> if you want offline daytime footage
        with a phone adapter and collar in the kit. Budget for a separate card,
        confirm your phone connection and allow for AVI playback or conversion.
        It offers no GPS or live stream.
      </p>
      <div className="not-prose my-6 rounded-xl border border-neutral-200 bg-wk-warm p-6">
        <p className="mb-3 text-sm text-neutral-600">
          View the current price, included accessories and delivery terms.
          MicroSD not included.
        </p>
        <BlogProductLink slug="mr-petcam-vs-whiskcam" placement="comparison">
          Check the Whiskcam kit
        </BlogProductLink>
      </div>
      <h2>How should you compare the total price?</h2>
      <p>
        Use the checkout total for your destination: camera bundle, any missing
        card or reader, delivery and applicable taxes. An amount in US dollars
        is not directly comparable to an amount in euros. Avoid relying on a
        dated sale banner or assuming an accessory is included in every bundle.
      </p>
      <h2>Does lighter mean safer for a small cat?</h2>
      <p>
        No single weight establishes suitability. Count the collar, mount and
        tags, and check that the attachment does not interfere with the
        quick-release mechanism. Cats Protection recommends a quick-release
        collar with room for two fingers snugly underneath. Start with a short
        supervised trial and remove the equipment if your cat is uncomfortable.
        Ask your vet about individual suitability.
      </p>
      <p>
        Reference:{" "}
        <a href={sources.collarSafety}>Cats Protection collar guidance</a>.
      </p>
      <h2>What should you check before the first recording?</h2>
      <ul>
        <li>Confirm the exact camera model and current package contents.</li>
        <li>
          Record and play a short sample before attaching anything to your cat.
        </li>
        <li>Check the mount, release mechanism and total load.</li>
        <li>
          Choose a stationary camera for live home monitoring, or a GPS tracker
          for location.
        </li>
      </ul>
      <p>
        For more alternatives, read our{" "}
        <a href="/blog/best-cat-collar-cameras-2026">
          cat collar camera buying guide
        </a>
        . If finding your cat is the priority, compare{" "}
        <a href="/blog/cat-collar-camera-vs-gps-tracker-2026">
          cameras and GPS trackers
        </a>{" "}
        first.
      </p>
      <h2>Frequently asked questions</h2>
      {COMPARISON_FAQS["mr-petcam-vs-whiskcam"].map(({ question, answer }) => (
        <Fragment key={question}>
          <h3>{question}</h3>
          <p>{answer}</p>
        </Fragment>
      ))}
    </article>
  );
}
