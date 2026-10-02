// =============================================================================
// Article: What Cats Actually Do When Alone at Home — cited behaviour guide
// Rewritten 2026-10: the earlier version presented percentages from an
// unverifiable "footage review". This version relies on cited welfare and
// veterinary sources and frames camera use as the owner's own observation.
// =============================================================================

import { PRODUCT_FACTS as f } from "lib/content";

const sources = {
  cpAlone:
    "https://www.cats.org.uk/cats-blog/how-long-can-you-leave-a-cat-alone",
  cpSeparation:
    "https://www.cats.org.uk/cats-blog/does-my-cat-have-separation-anxiety",
  cpStress: "https://www.cats.org.uk/help-and-advice/health/cat-stress",
  cpFighting:
    "https://www.cats.org.uk/help-and-advice/cat-behaviour/cats-and-fighting",
  icatcareHome: "https://icatcare.org/articles/making-your-home-cat-friendly",
  icatcareMultiCat: "https://icatcare.org/articles/multi-cat-households",
  vcaNocturnal:
    "https://vcahospitals.com/resources/behavior-cat/true-or-false-cats-are-nocturnal",
  vcaEnrichment:
    "https://vcahospitals.com/know-your-pet/cat-behavior-and-training---enrichment-for-indoor-cats",
  srpStudy:
    "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0230999",
} as const;

export default function WhatCatsDoWhenAloneAtHome() {
  return (
    <article className="prose-article">
      {/* ---- Answer-first intro ---- */}
      <p className="lead">
        Most cats left alone at home spend much of the time resting in short
        naps, then fit grooming, eating, looking outside, exploring and brief
        play between them. Cats are most active around dawn and dusk, so a quiet
        midday is normal. What varies is how well each cat copes, and that is
        what is worth watching for.
      </p>

      <p>
        Most owners never see this part of their cat&apos;s day. This guide
        brings together what veterinary and welfare organisations say about cats
        left on their own, which behaviours are normal, which ones can point to
        stress, and what to look for if you record your own cat. Whiskcam Team
        has not run a behaviour study, so this article contains no activity
        percentages. Every cat is different, and your own observations will tell
        you more than an average would.
      </p>

      {/* ---- What sources say ---- */}
      <h2>What Welfare Charities Say About Cats Left Alone</h2>
      <p>
        UK charity Cats Protection says most adult cats can occasionally be left
        alone for up to 12 hours, as long as they have food, fresh water, a
        clean litter tray, safe toys and places to hide and perch. Kittens
        should only be left for a few hours. The charity also warns that boredom
        can lead to overgrooming, overeating or damage to furniture, and that
        cats closely bonded to their owners may show separation-related problems
        (
        <a href={sources.cpAlone}>
          Cats Protection: how long can you leave a cat alone?
        </a>
        ).
      </p>
      <p>
        Separation-related problems are real but not universal. In a 2020
        questionnaire study published in <em>PLOS ONE</em>, owners in one
        Brazilian city answered questions about 223 cats. Around 13% (30 cats)
        met at least one of the researchers&apos; criteria for a possible
        separation-related problem. Those problems were more often reported in
        homes where the cat had no toys or lived without another animal (
        <a href={sources.srpStudy}>de Souza Machado et al., 2020</a>). This was
        one owner-reported sample, not a figure that applies to every cat, and
        the authors point out that owners cannot directly observe what their
        cats do while they are out.
      </p>

      {/* ---- What they do ---- */}
      <h2>The Five Things Cats Commonly Do When Home Alone</h2>
      <p>
        The table below lists common behaviours and what to check in your own
        recordings. It is a guide to observation, not measured data. Time spent
        on each one depends on age, health, the layout of your home and whether
        there are other animals.
      </p>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Behaviour</th>
              <th>Usually means</th>
              <th>Worth noting in footage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sleeping or resting</td>
              <td>Normal energy conservation between active periods</td>
              <td>
                Where they rest, and whether the spot moves during the day
              </td>
            </tr>
            <tr>
              <td>Grooming</td>
              <td>Routine coat care, sometimes calming</td>
              <td>Long sessions on one area, or new bald patches</td>
            </tr>
            <tr>
              <td>Window or door watching</td>
              <td>Interest in movement outside</td>
              <td>
                Tense posture, tail flicking or a fixed stare at other cats
              </td>
            </tr>
            <tr>
              <td>Eating, drinking, litter tray</td>
              <td>Basic needs met through the day</td>
              <td>Food left untouched until you come home</td>
            </tr>
            <tr>
              <td>Exploring and play</td>
              <td>Curiosity and hunting-type behaviour</td>
              <td>Which objects they actually choose to play with</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ---- The nap cycle ---- */}
      <h2>Sleep Isn&apos;t Just Sleep: The Nap Cycle</h2>
      <p>
        Cats are crepuscular, meaning they are most active around dawn and dusk.
        They often spend 12 to 16 hours a day napping, in short bursts spread
        across the day and night rather than one long sleep (
        <a href={sources.vcaNocturnal}>VCA Animal Hospitals</a>). If you are out
        during the middle of the day, a lot of rest is normal.
      </p>
      <p>
        A camera that moves with the cat can show <em>where</em> those naps
        happen. Look for a pattern: does your cat follow the sun across the
        room, choose a high shelf, or go somewhere enclosed? International Cat
        Care notes that cats feel safe resting in high places and that hiding
        places are an essential part of everyday life for a cat (
        <a href={sources.icatcareHome}>
          International Cat Care: making your home cat friendly
        </a>
        ). If recordings show your cat using one spot again and again, keep it
        available.
      </p>

      {/* ---- Window watching ---- */}
      <h2>Why Window-Watching Deserves a Closer Look</h2>
      <p>
        Watching birds, people and traffic can be engaging for an indoor cat,
        and VCA recommends safe resting places with interesting views as part of
        indoor enrichment (
        <a href={sources.vcaEnrichment}>VCA: enrichment for indoor cats</a>).
        But a window is not automatically relaxing. International Cat Care
        explains that large windows can confuse some cats: they can see
        potential dangers outside without understanding that they are safe
        indoors. Cats Protection also lists spending a lot of time staring out
        of the window or cat flap as a possible sign of tension with
        neighbourhood cats (
        <a href={sources.cpFighting}>Cats Protection: cats and fighting</a>).
      </p>
      <p>
        When you review footage, look at body language at the window. Relaxed
        watching with soft eyes and a still tail is different from crouching,
        tail lashing or a long stare at another cat. If it is the second kind,
        International Cat Care suggests partly blocking the lower part of the
        glass, for example with frosted film or plants.
      </p>

      {/* ---- Secret patrol ---- */}
      <h2>The Patrol Route: What to Look for in Your Own Footage</h2>
      <p>
        Many owners notice that their cat walks a similar route through the
        home: checking doors, windows, food and favourite resting places. We
        cannot tell you how often a typical cat does this, because there is no
        reliable figure. What you can do is check your own recordings.
      </p>
      <ul>
        <li>
          Does the route include places you didn&apos;t expect, like a closed
          door?
        </li>
        <li>Does it end in a calm nap, or does it repeat without rest?</li>
        <li>
          Does the pattern change after a new piece of furniture, a visitor or a
          new cat nearby?
        </li>
      </ul>
      <p>
        A route that ends with rest is unremarkable. Restless, repeated pacing
        that does not settle is listed by Cats Protection among the signs of
        stress, so note it and compare it with other changes (
        <a href={sources.cpStress}>Cats Protection: cat stress</a>).
      </p>

      {/* ---- Alone play ---- */}
      <h2>Solo Play: Make Toys Less Predictable</h2>
      <p>
        Many cats ignore expensive toys and pounce on a bottle cap instead.
        There is a reason for that. International Cat Care notes that most cats
        prefer toys that resemble hunting. Toys that move unpredictably hold
        their interest, while motionless toys left lying around soon become
        predictable and boring. It recommends rotating toys and regularly
        bringing in new items, such as cardboard boxes or paper bags, for the
        cat to investigate.
      </p>
      <p>
        VCA suggests short wand-toy sessions each day and puzzle feeders that
        deliver part of a meal (<a href={sources.vcaEnrichment}>VCA</a>). Play
        with your cat before you leave, then set out a puzzle feeder or a new
        box. In your footage, note which items your cat actually goes back to.
      </p>

      {/* ---- Stress signs ---- */}
      <h2>Signs of a Stressed Cat When You&apos;re Not Home</h2>
      <p>
        Cats Protection suggests recording your cat while you are out if you are
        worried about how they cope (
        <a href={sources.cpSeparation}>
          Cats Protection: does my cat have separation anxiety?
        </a>
        ). Signs that the charity associates with stress or separation-related
        problems include:
      </p>
      <ul>
        <li>
          <strong>Restlessness.</strong> Being unable to settle, pacing or
          circling.
        </li>
        <li>
          <strong>Excessive vocalisation.</strong> Repeated meowing or crying
          after you leave. A camera with audio can capture this.
        </li>
        <li>
          <strong>Changes in appetite.</strong> Eating less, or overeating.
        </li>
        <li>
          <strong>More hiding than usual</strong>, or a tense, crouched posture.
        </li>
        <li>
          <strong>Overgrooming</strong>, destructive scratching or toileting
          outside the litter tray.
        </li>
      </ul>
      <p>
        Any of these can also have a medical cause. Cats Protection advises
        seeing your vet first when you notice a change in behaviour (
        <a href={sources.cpStress}>Cats Protection: cat stress</a>). Sitting by
        the door on its own does not mean your cat has separation anxiety. Cats
        sit by doors for many reasons, including sounds in the hallway or a warm
        spot.
      </p>

      {/* ---- Differences ---- */}
      <h2>What Changes with Two Cats vs One</h2>
      <p>
        A second cat is not an automatic fix for loneliness. International Cat
        Care notes that cats in the same home often form separate social
        sub-groups, and some cats prefer to live alone when given the choice.
        Signs of tension can be as subtle as one cat leaving the room when
        another arrives (
        <a href={sources.icatcareMultiCat}>
          International Cat Care: multi-cat households
        </a>
        ).
      </p>
      <p>
        If you already have more than one cat, footage can show whether they
        rest together, groom each other or avoid each other. International Cat
        Care recommends one of each resource per cat plus one extra, placed in
        different locations. That includes food, water, litter trays and beds.
      </p>

      {/* ---- Outdoor access ---- */}
      <h2>Cats With Outdoor Access: A Different Day</h2>
      <p>
        If your cat has a cat flap, their time alone will include time outside.
        That is harder to observe, and a home camera will miss it. GPS research
        suggests that most pet cats stay surprisingly close to home. We cover
        that research in{" "}
        <a href="/blog/where-does-my-outdoor-cat-actually-go">
          where outdoor cats actually go
        </a>
        . Before putting any camera on an outdoor cat, read our{" "}
        <a href="/blog/are-cat-collar-cameras-safe">
          safety considerations for collar cameras
        </a>
        .
      </p>

      {/* ---- How to record ---- */}
      <h2>How to Record and Read Your Own Cat&apos;s Day</h2>
      <p>
        You do not need a lab to learn your cat&apos;s routine. A simple
        approach:
      </p>
      <ul>
        <li>
          Choose your tool. A fixed pet camera covers one room. A collar camera
          follows the cat but adds weight to the collar. An activity tracker
          records movement without showing what the cat is doing.
        </li>
        <li>
          Start with short, supervised sessions if you use a collar camera, and
          stop if your cat freezes, scratches at it or moves differently.
        </li>
        <li>
          Record at different times on different days, such as just after you
          leave and before you return, rather than one long session.
        </li>
        <li>
          Keep a simple log of where your cat rests, what they play with, and
          any of the stress signs above.
        </li>
      </ul>
      <p>
        Our{" "}
        <a href="/blog/i-filmed-my-cat-for-7-days-what-i-learned">
          seven-day cat camera recording plan
        </a>{" "}
        includes a printable observation template.
      </p>

      {/* ---- FAQ ---- */}
      <h2>Frequently Asked Questions</h2>

      <h3>Do cats get lonely when home alone all day?</h3>
      <p>
        Some do. Many adult cats cope with a normal working day if their needs
        are met, but cats closely bonded to their owners can show
        separation-related problems. Signs include excessive vocalisation,
        restlessness, changes in appetite, hiding and toileting outside the
        tray. Check with your vet if you notice them.
      </p>

      <h3>Is it cruel to leave a cat alone for a full workday?</h3>
      <p>
        Not usually, if the basics are covered: food, fresh water, a clean
        litter tray, safe toys, and places to hide and perch. Cats Protection
        says most adult cats can occasionally be left for up to 12 hours.
        Kittens, and cats with health conditions, need more frequent care.
      </p>

      <h3>Will a cat destroy the house when bored?</h3>
      <p>
        It can happen. Cats Protection lists damage to furniture among the
        possible effects of boredom, and destructive behaviour was among the
        problems owners most often reported in the 2020 separation-related
        problems study. Enrichment, play before you leave and puzzle feeders are
        sensible first steps. Recordings can help you see when it happens.
      </p>

      <h3>Do cats really sleep all day?</h3>
      <p>
        Cats often nap for 12 to 16 hours a day, but in short bursts spread
        across the day and night. They are most active around dawn and dusk, so
        a quiet midday while you are out is normal.
      </p>

      <h3>Can I see what my cat does without a camera?</h3>
      <p>
        Partially. Activity trackers show when a cat moves but not what it does.
        Fixed pet cameras show one room. Collar cameras follow the cat but add
        weight to the collar. Each approach has trade-offs.
      </p>

      {/* ---- Bottom line ---- */}
      <h2>The Bottom Line</h2>
      <p>
        A cat home alone is usually not bored all day or asleep all day. The day
        is a series of naps, with grooming, eating, watching and short bursts of
        exploring in between. Once you know your own cat&apos;s pattern, changes
        like pacing, crying, overgrooming or untouched food are easier to spot,
        and you can raise them with your vet.
      </p>
      <p>
        If you want to record what your cat does, the{" "}
        <a href="/what-is-whiskcam">Whiskcam Original</a> is a {f.weightGrams} g
        collar camera that records 1080P video to a MicroSD card. The card is
        sold separately. It has no night vision, and its continuous battery
        runtime has not been independently verified, so plan short sessions.
        Whiskcam publishes this article and sells that camera.
      </p>

      {/* ---- Sources ---- */}
      <h2>Sources</h2>
      <ul>
        <li>
          <a href={sources.cpAlone}>
            Cats Protection: How long can you leave a cat alone?
          </a>
        </li>
        <li>
          <a href={sources.cpSeparation}>
            Cats Protection: Does my cat have separation anxiety?
          </a>
        </li>
        <li>
          <a href={sources.cpStress}>Cats Protection: Cat stress</a>
        </li>
        <li>
          <a href={sources.cpFighting}>Cats Protection: Cats and fighting</a>
        </li>
        <li>
          <a href={sources.icatcareHome}>
            International Cat Care: Making your home cat friendly
          </a>
        </li>
        <li>
          <a href={sources.icatcareMultiCat}>
            International Cat Care: Multi-cat households
          </a>
        </li>
        <li>
          <a href={sources.vcaNocturnal}>
            VCA Animal Hospitals: True or false, cats are nocturnal
          </a>
        </li>
        <li>
          <a href={sources.vcaEnrichment}>
            VCA Animal Hospitals: Enrichment for indoor cats
          </a>
        </li>
        <li>
          <a href={sources.srpStudy}>
            de Souza Machado D. et al. (2020). Identification of
            separation-related problems in domestic cats: A questionnaire
            survey. PLOS ONE 15(4): e0230999
          </a>
        </li>
      </ul>
    </article>
  );
}
