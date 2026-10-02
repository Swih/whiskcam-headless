// =============================================================================
// Article: 5 Weird Things People Discovered With a Cat Collar Camera
// Angle: Commonly reported owner observations, explained with cited sources.
// Rewritten 2026-10: removed named "case studies", beta-tester claims and
// invented prevalence figures. These are patterns owners describe, not
// Whiskcam test results.
// =============================================================================

import { PRODUCT_FACTS as f } from "lib/content";

const sources = {
  kays: "https://doi.org/10.1111/acv.12563",
  ncsu: "https://news.ncsu.edu/2020/03/domestic-cat-effects/",
  rspcaFeeding:
    "https://www.rspca.org.uk/adviceandwelfare/pets/general/feedingpeoplespets",
  cpFighting:
    "https://www.cats.org.uk/help-and-advice/cat-behaviour/cats-and-fighting",
  icatcareHome: "https://icatcare.org/articles/making-your-home-cat-friendly",
  cpStress: "https://www.cats.org.uk/help-and-advice/health/cat-stress",
} as const;

export default function FiveWeirdDiscoveriesFromCatCollarCameras() {
  return (
    <article className="prose-article">
      {/* ---- Answer-first intro ---- */}
      <p className="lead">
        Owners who put a camera on their cat often find something they
        didn&apos;t expect: a neighbour who feeds the cat, a nap spot nobody
        knew about, a regular meeting with another cat, or a fear of something
        harmless. Here are five commonly reported discoveries and what the
        behaviour research says about why they happen.
      </p>

      <h2>Where These Stories Come From</h2>
      <p>
        These are patterns that cat owners commonly describe when they share
        collar camera clips online and in cat communities. They are not results
        from Whiskcam testing, and they are not individual case reports we have
        verified. We do not include names, ages or exact figures for that
        reason. Nobody has published reliable data on how often each pattern
        happens, so treat them as things worth looking out for, not predictions.
        Where there is research or welfare guidance on the underlying behaviour,
        we link to it.
      </p>

      {/* ---- Story 1 ---- */}
      <h2>
        1. The Second Home (or: &quot;Your Cat Has a Roommate You&apos;ve Never
        Met&quot;)
      </h2>
      <p>
        The classic discovery: a cat with outdoor access that seems to have a
        dull routine turns out to visit the same neighbour&apos;s garden, garage
        or kitchen regularly. Sometimes the neighbour has been leaving out food
        or a blanket. Sometimes they have assumed the cat is a stray.
      </p>
      <p>
        That fits what we know about where pet cats go. The international Cat
        Tracker study followed 925 pet cats with GPS. It found that most stayed
        within about 100 m of home, an area that usually covers a few
        neighbouring gardens (
        <a href={sources.ncsu}>NC State University summary</a>;{" "}
        <a href={sources.kays}>Kays et al., 2020, Animal Conservation</a>). If
        one of those gardens offers food, warmth or a quiet place to sleep, it
        can easily become part of the routine.
      </p>
      <p>
        The RSPCA notes that many cats will take an extra meal even when they
        are well fed at home. Being fed elsewhere can cause weight gain or
        allergic reactions, and can mean the cat comes home less often (
        <a href={sources.rspcaFeeding}>
          RSPCA: why you shouldn&apos;t feed other people&apos;s pets
        </a>
        ). It does not mean your cat prefers the other person. It is usually a
        sign that the cat has found a reliable resource nearby.
      </p>

      {/* ---- Story 2 ---- */}
      <h2>2. The Hidden Nap Location Nobody Checks</h2>
      <p>
        Owners often think they know where their cat sleeps: the armchair, the
        bed, the sunny windowsill. Footage sometimes shows another spot
        entirely, such as behind an appliance, on top of a wardrobe, or inside a
        cupboard or laundry basket. The spot may also change with the seasons.
      </p>
      <p>
        This is less strange than it looks. International Cat Care explains that
        cats feel safe resting in high places, and that hiding places are an
        essential part of everyday life for a cat (
        <a href={sources.icatcareHome}>
          International Cat Care: making your home cat friendly
        </a>
        ). An enclosed, warm, quiet corner meets those needs. Without footage,
        owners rarely see how long a cat spends in a spot like that.
      </p>
      <p>
        The practical check is safety. A spot next to a running appliance, a
        heater or anything that could trap or pinch a cat should be blocked off,
        and you can offer a safer enclosed bed nearby.
      </p>

      {/* ---- Story 3 ---- */}
      <h2>3. The Staring Session With Another Cat</h2>
      <p>
        Another commonly shared clip: two neighbourhood cats on a garden wall or
        fence, sitting a short distance apart, watching each other for a long
        time, then one walks away. No fight, no play.
      </p>
      <p>
        Cats Protection notes that cats prefer to avoid conflict and that
        fighting is a last resort. It suggests that owners of cats who clash
        arrange to let them out at different times (
        <a href={sources.cpFighting}>Cats Protection: cats and fighting</a>).
        Cats in the same neighbourhood often use shared routes at different
        times. A calm, distant stand-off can be part of how they manage that.
      </p>
      <p>
        Not every stare is friendly, though. Cats Protection also lists long
        periods of staring out of a window or cat flap as a possible sign of
        tension with neighbourhood cats. In footage, look at body language:
        flattened ears, a lashing tail, crouching or growling suggest a
        standoff, not a peaceful truce.
      </p>

      {/* ---- Story 4 ---- */}
      <h2>4. The Food-Stealing Expedition</h2>
      <p>
        A related discovery: a cat that is gaining weight despite unchanged
        portions turns out to be eating elsewhere. The cat might be getting
        treats at one back door, or finishing another cat&apos;s bowl through a
        neighbour&apos;s cat flap.
      </p>
      <p>
        The RSPCA describes exactly this problem. Owners have no control over
        what or how much their cat is fed elsewhere. It suggests a snap-safe,
        quick-release &quot;don&apos;t feed me&quot; collar for cats on a diet
        or with allergies (<a href={sources.rspcaFeeding}>RSPCA</a>). If your
        cat&apos;s weight is changing for no obvious reason, talk to your vet
        before assuming it is a neighbour. Weight changes can also have medical
        causes.
      </p>

      {/* ---- Story 5 ---- */}
      <h2>5. The Thing They&apos;re Actually Afraid Of</h2>
      <p>
        Owners often have a fixed idea of what scares their cat: the vacuum
        cleaner, the doorbell. Footage sometimes shows something different. A
        cat may calmly ignore the vacuum but take a wide detour around an
        ordinary object, like a box, a bag or a new piece of furniture, and back
        away from it with flattened ears.
      </p>
      <p>
        We can&apos;t know why a particular cat fears a particular object, but
        cats can link everyday objects with earlier unpleasant experiences. Cats
        Protection lists hiding, a tense crouched posture, flattened ears and
        wide pupils among signs of stress, and says cats are good at hiding how
        they feel (<a href={sources.cpStress}>Cats Protection: cat stress</a>).
        A camera can catch reactions that happen when nobody is in the room.
      </p>

      {/* ---- Why collar cams ---- */}
      <h2>Why Collar Cameras Reveal What Regular Cameras Don&apos;t</h2>
      <p>
        A fixed home camera only covers what is in its frame. Once the cat
        leaves the room, the recording stops being useful. It cannot follow the
        cat to the garage next door, onto the garden wall or into the cupboard.
      </p>
      <p>
        A collar camera roughly follows what is in front of the cat&apos;s head.
        There are limits. It adds weight to the collar. The wide-angle lens can
        distort distances. Clips are often shaky. Low-light footage depends on
        the camera: Whiskcam has no night vision, while some other collar
        cameras list infrared recording. GPS is better for location. For more on
        indoor routines, see our guide to{" "}
        <a href="/blog/what-cats-do-when-alone-at-home">
          what cats do when alone at home
        </a>
        .
      </p>

      {/* ---- What to do ---- */}
      <h2>What to Do With What You Find</h2>
      <p>Most discoveries like these are harmless. A few practical notes:</p>
      <ul>
        <li>
          <strong>Second feeder situations:</strong> Start with a friendly
          conversation. Make sure the neighbour knows the cat has a home, and
          explain any diet or allergy concerns. A quick-release &quot;don&apos;t
          feed me&quot; collar is another option the RSPCA mentions.
        </li>
        <li>
          <strong>Hidden nap spots:</strong> If the spot is safe, leave it. If
          it is near a running appliance, a heat source or anything that could
          trap or pinch, block it and offer a safer enclosed bed nearby.
        </li>
        <li>
          <strong>Unexpected fears:</strong> Don&apos;t force your cat to
          approach the object. Move it somewhere neutral, give your cat space
          and a way to avoid it, and speak to your vet or a qualified
          behaviourist if the fear affects daily life.
        </li>
      </ul>

      {/* ---- FAQ ---- */}
      <h2>Frequently Asked Questions</h2>

      <h3>Do all outdoor cats have a second home?</h3>
      <p>
        No, and there is no reliable figure for how many do. GPS research shows
        most pet cats stay within about 100 m of home, so neighbouring gardens
        are often part of their range. A cat that is regularly fed or sheltered
        by a neighbour is a common story, but how often it happens is unknown.
      </p>

      <h3>
        Is it ethical to film a cat going into a neighbor&apos;s property?
      </h3>
      <p>
        Rules on recording, especially audio, differ by country and region, so
        check what applies where you live. Out of respect, tell a neighbour if
        your cat regularly goes into their home or enclosed garden. Don&apos;t
        publish footage of the inside of someone else&apos;s home without their
        permission.
      </p>

      <h3>How often should I review footage to spot patterns?</h3>
      <p>
        There is no set rule. Many owners find a weekly review easier than
        checking every clip daily. Cats tend to follow routines, so writing down
        rest spots, routes and encounters in a simple log makes repeated
        patterns easier to see.
      </p>

      <h3>Can short recording sessions reveal cat behavior patterns?</h3>
      <p>
        Yes, if you repeat them. One short clip shows a moment, not a pattern.
        Several short sessions at similar times of day, over a few weeks, will
        show what repeats. Short sessions also let you check that your cat
        tolerates the collar and camera.
      </p>

      {/* ---- Bottom line ---- */}
      <h2>The Bottom Line</h2>
      <p>
        Collar cameras don&apos;t change your cat. They make you a more
        attentive observer of a small animal whose life is more social and more
        routine-driven than most people assume. The discoveries are rarely
        dramatic. They are small, specific and often easy to act on.
      </p>
      <p>
        If you want to record your own cat&apos;s day, the{" "}
        <a href="/what-is-whiskcam">Whiskcam Original</a> is a {f.weightGrams} g
        collar camera that records 1080P video to a MicroSD card. The card is
        sold separately. It has no night vision, and its continuous battery
        runtime has not been independently verified, so start with short,
        supervised sessions. Whiskcam publishes this article and sells that
        camera.
      </p>

      {/* ---- Sources ---- */}
      <h2>Sources</h2>
      <ul>
        <li>
          <a href={sources.kays}>
            Kays R. et al. (2020). The small home ranges and large local
            ecological impacts of pet cats. Animal Conservation 23: 516–523
          </a>
        </li>
        <li>
          <a href={sources.ncsu}>
            NC State University News: Keeping cats indoors could blunt adverse
            effects to wildlife (2020)
          </a>
        </li>
        <li>
          <a href={sources.rspcaFeeding}>
            RSPCA: Why you shouldn&apos;t feed other people&apos;s pets
          </a>
        </li>
        <li>
          <a href={sources.cpFighting}>Cats Protection: Cats and fighting</a>
        </li>
        <li>
          <a href={sources.cpStress}>Cats Protection: Cat stress</a>
        </li>
        <li>
          <a href={sources.icatcareHome}>
            International Cat Care: Making your home cat friendly
          </a>
        </li>
      </ul>
    </article>
  );
}
