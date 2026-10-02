import { Fragment } from "react";
import { LEGAL_FAQS, LEGAL_SOURCES as s } from "./legal-facts";

export default function IsItLegalToPutACameraOnYourCat() {
  return (
    <article className="prose-article">
      <p className="lead">
        Putting a camera on your own cat is generally not illegal in itself. The
        legal questions start with what the camera captures once your cat leaves
        your home: neighbours, their gardens, people in the street and, above
        all, their conversations. Here is what UK, EU and US rules say, and the
        simple habits that keep cat POV footage on the right side of them.
      </p>
      <p>
        <strong>Not legal advice.</strong> This guide summarises official
        sources checked on October 2, 2026. Rules vary by country and state, and
        a lawyer or your national data protection authority can advise on your
        situation. Whiskcam sells a cat collar camera.
      </p>
      <nav
        aria-label="In this guide"
        className="not-prose my-8 rounded-xl bg-wk-warm p-6"
      >
        <p className="font-semibold">In this guide</p>
        <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <li>
            <a href="#short-answer">The short answer</a>
          </li>
          <li>
            <a href="#uk">UK: the ICO and home cameras</a>
          </li>
          <li>
            <a href="#eu">EU: the household exemption</a>
          </li>
          <li>
            <a href="#us">US: video, audio and consent</a>
          </li>
          <li>
            <a href="#posting">Posting footage online</a>
          </li>
          <li>
            <a href="#welfare">Your cat&apos;s welfare</a>
          </li>
          <li>
            <a href="#checklist">A practical checklist</a>
          </li>
          <li>
            <a href="#questions">Common questions</a>
          </li>
        </ul>
      </nav>

      <h2 id="short-answer">
        Is it legal to put a camera on your cat? The short answer
      </h2>
      <ul>
        <li>
          <strong>Inside your own home:</strong> recording your cat for your own
          viewing is usually a private, household matter.
        </li>
        <li>
          <strong>Neighbours&apos; property and public places:</strong> once a
          camera captures other people, privacy and data protection rules can
          apply, even if the camera is on a pet.
        </li>
        <li>
          <strong>Sound:</strong> recording conversations is treated more
          strictly than video in the UK, the EU and the US.
        </li>
        <li>
          <strong>Sharing:</strong> posting footage of identifiable people
          online is where most problems start.
        </li>
      </ul>
      <p>
        A cat collar camera is unusual because nobody points it. Your cat
        decides where it goes, which is exactly why you should review footage
        before keeping or sharing it.
      </p>

      <h2 id="uk">UK: what the ICO says about home cameras</h2>
      <p>
        UK GDPR does not apply to processing &ldquo;by an individual in the
        course of a purely personal or household activity&rdquo; (
        <a href={s.ukGdprArt2}>UK GDPR, Article 2</a>). The Information
        Commissioner&apos;s Office explains where that stops for home cameras:
        if a camera captures someone else&apos;s property, a public area or a
        communal space, data protection law applies (
        <a href={s.icoHomeCctv}>ICO: home CCTV systems</a>). The same page notes
        that cameras can capture images and voices of other people, which is
        their personal information.
      </p>
      <p>
        The ICO has no guidance written specifically for pet-worn cameras. Our
        reading is that a camera on an outdoor cat that wanders into gardens and
        streets is likely to capture exactly what the ICO describes. In practice
        that means having a clear reason to keep footage, not keeping more than
        you need, deleting it regularly and responding if someone asks about
        recordings of them.
      </p>
      <p>
        On sound, the ICO&apos;s guidance for organisations states that audio
        recording, particularly continuous recording, is more privacy intrusive
        than purely visual recording (
        <a href={s.icoAudio}>ICO: surveillance and data protection</a>). A 2021
        county court case, <em>Fairhurst v Woodard</em>, reached a similar view
        about a neighbour&apos;s doorbell and cameras: the court treated the
        audio as more problematic than the video. It is a county court decision,
        so it is persuasive rather than binding.
      </p>

      <h2 id="eu">EU: the household exemption is narrow</h2>
      <p>
        GDPR has the same exemption for purely personal or household activity.
        The Court of Justice of the EU held in <em>Ryneš</em> (C-212/13) that a
        home camera which also monitors a public space is not purely personal or
        household processing (<a href={s.rynes}>judgment C-212/13</a>).
      </p>
      <p>
        The European Data Protection Board&apos;s guidelines on video devices
        say the exemption must be read narrowly. A camera covering your own
        garden is covered provided it does not extend, even partially, to a
        public space or neighbouring property. The same guidelines give examples
        that do fall under the exemption, such as action-camera footage kept for
        personal entertainment or holiday videos shown to friends and family (
        <a href={s.edpbVideo}>EDPB Guidelines 3/2019</a>).
      </p>
      <p>
        Cat POV clips you watch at home sit closest to those examples. Footage
        of neighbours that you keep or distribute does not. National criminal
        laws on secret recording, for example in France and Germany, apply on
        top of GDPR, so check local rules if you record audio.
      </p>

      <h2 id="us">US: video is less restricted than audio</h2>
      <p>
        US law varies by state, but two principles appear consistently. Video of
        places where people have no reasonable expectation of privacy is
        generally less restricted than sound. Recording private spaces such as
        bathrooms or bedrooms can be a crime under state voyeurism laws; in
        California, for example, viewing such areas with a camera with intent to
        invade privacy is an offence (
        <a href={s.calPenal647}>California Penal Code §647</a>).
      </p>
      <p>
        Audio is governed by the federal Wiretap Act, which prohibits
        intercepting oral communications unless a party to the conversation
        consents (<a href={s.wiretap}>18 U.S.C. §2511</a>). It protects
        conversations where people expect privacy (
        <a href={s.wiretapDefinitions}>18 U.S.C. §2510</a>). A cat owner who is
        not present is not a party to a neighbour&apos;s conversation, so
        one-party consent does not help. Several states, including California,
        Florida, Illinois, Maryland, Massachusetts, Montana, New Hampshire,
        Pennsylvania and Washington, require consent from every party to a
        confidential conversation, according to the Reporters Committee for
        Freedom of the Press (<a href={s.rcfp}>RCFP recording guide</a>; see
        also <a href={s.calPenal632}>California Penal Code §632</a>).
      </p>

      <h2 id="posting">Posting cat camera footage online</h2>
      <p>
        Sharing is where household use usually ends. The EU Court of Justice has
        held that publishing personal data on the internet to an indefinite
        number of people is not a household activity, and that posting a video
        on YouTube without restricting access can fall under GDPR (
        <a href={s.buivids}>Buivids, C-345/17</a>). The EDPB treats number
        plates and other details that identify passers-by as personal data.
      </p>
      <p>
        Before posting a cat POV video, watch it to the end. Cut or blur faces,
        number plates and house numbers, and remove sound that includes other
        people&apos;s voices. Clips of your cat, your home and empty landscapes
        rarely raise these issues.
      </p>

      <h2 id="welfare">Your cat&apos;s welfare is part of the legal picture</h2>
      <p>
        We found no law that bans or specifically regulates cat collar cameras.
        In England and Wales, the Animal Welfare Act 2006 requires owners to
        take reasonable steps to protect a pet from pain, injury and disease and
        to let it behave normally (
        <a href={s.animalWelfareAct}>Animal Welfare Act 2006, section 9</a>).
        The government&apos;s code of practice for cats asks owners to make sure
        collars fit properly with a quick-release mechanism (
        <a href={s.defraCatCode}>Defra cat welfare code</a>).
      </p>
      <p>
        A camera that changes how your cat moves, or that blocks the collar
        release, is a welfare problem before it is a legal one. Our{" "}
        <a href="/blog/are-cat-collar-cameras-safe">
          cat collar camera safety guide
        </a>{" "}
        covers fit, total load and when to stop a trial.
      </p>

      <h2 id="checklist">A practical checklist for cat camera owners</h2>
      <ol>
        <li>Record mainly at home and in your own garden at first.</li>
        <li>Turn audio off if your camera allows it, especially outdoors.</li>
        <li>
          Review footage soon after each session and delete clips of other
          people you do not need.
        </li>
        <li>
          Blur or cut faces, number plates and house numbers before sharing.
        </li>
        <li>
          If a neighbour objects, stop recording near their property and delete
          what you hold of them.
        </li>
        <li>
          Use a properly fitted quick-release collar and keep sessions short and
          supervised.
        </li>
      </ol>
      <p>
        For sharing ideas that keep the focus on your cat, see our{" "}
        <a href="/blog/cat-pov-tiktok-viral-guide-2026">
          cat POV filming guide
        </a>
        . To understand where your cat actually goes before recording outdoors,
        read{" "}
        <a href="/blog/where-does-my-outdoor-cat-actually-go">
          where outdoor cats go
        </a>{" "}
        and our{" "}
        <a href="/blog/best-cat-collar-cameras-2026">
          cat collar camera comparison
        </a>
        .
      </p>

      <h2 id="questions">Frequently asked questions</h2>
      {LEGAL_FAQS.map(({ question, answer }) => (
        <Fragment key={question}>
          <h3>{question}</h3>
          <p>{answer}</p>
        </Fragment>
      ))}
      <p>
        Spotted an error or a rule that has changed? Write to{" "}
        <a href="mailto:support@whiskcam.com">support@whiskcam.com</a>.
      </p>
    </article>
  );
}
