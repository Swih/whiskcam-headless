// =============================================================================
// Article: Where Does My Outdoor Cat Actually Go? — GPS research + camera angle
// Rewritten 2026-10: every study figure below was checked against the cited
// paper or the institution's own summary. Unverifiable studies, percentages,
// "concentric zone" time shares and named-cat anecdotes were removed.
// =============================================================================

import { PRODUCT_FACTS as f } from "lib/content";

const sources = {
  kays: "https://doi.org/10.1111/acv.12563",
  ncsu: "https://news.ncsu.edu/2020/03/domestic-cat-effects/",
  natgeo:
    "https://www.nationalgeographic.com/animals/article/cat-tracker-shows-where-pets-go",
  denmark: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9311815/",
  vcaNocturnal:
    "https://vcahospitals.com/resources/behavior-cat/true-or-false-cats-are-nocturnal",
  rspcaFeeding:
    "https://www.rspca.org.uk/adviceandwelfare/pets/general/feedingpeoplespets",
  cpFighting:
    "https://www.cats.org.uk/help-and-advice/cat-behaviour/cats-and-fighting",
  cpLost:
    "https://www.cats.org.uk/help-and-advice/lost-found-and-feral-cats/lost-a-cat",
} as const;

export default function WhereDoesMyOutdoorCatActuallyGo() {
  return (
    <article className="prose-article">
      {/* ---- Answer-first intro ---- */}
      <p className="lead">
        Most pet cats with outdoor access stay much closer to home than their
        owners imagine. In the largest GPS study of pet cats, 925 cats in six
        countries had an average home range of about 3.6 hectares, and most
        spent their time within roughly 100 m of home. A few cats do roam
        widely, but they are the exception.
      </p>

      <p>
        When people imagine their outdoor cat&apos;s day, they picture long
        expeditions. GPS research mostly says otherwise. Below is what the
        published tracking studies found, what a collar camera can add, and how
        to work out your own cat&apos;s territory. We cite each figure to its
        study. Whiskcam Team has not run its own tracking or camera study.
      </p>

      {/* ---- The science ---- */}
      <h2>The Surprising Science of Cat Range</h2>
      <p>
        Two GPS studies of owned cats with outdoor access give a consistent
        picture.
      </p>
      <ul>
        <li>
          <strong>The international Cat Tracker study</strong> (Kays et al.,
          2020, <em>Animal Conservation</em>). Researchers worked with citizen
          scientists to track 925 pet cats from six countries. The largest
          groups came from Australia, New Zealand, the US and the UK. Excluding
          three outliers, the average home range of the remaining 875 cats was
          3.6 ha (±5.6 ha). The authors conclude that the cats&apos; impact was
          concentrated within about 100 m of their homes (
          <a href={sources.kays}>paper</a>;{" "}
          <a href={sources.ncsu}>NC State University summary</a>). According to
          National Geographic&apos;s report on the project, more than half the
          cats stayed within about 2.5 acres (roughly 1 ha), and 7% covered more
          than 25 acres (<a href={sources.natgeo}>National Geographic</a>).
        </li>
        <li>
          <strong>A Danish GPS study</strong> (Jensen et al., 2022,{" "}
          <em>Animals</em>). Researchers tracked 97 cats for about seven days
          each. The median cat spent about 5 hours a day away from home, moved
          about 2.4 km a day, and had a home range of about 5 ha. Cats older
          than seven roamed less, intact males had much larger ranges than
          neutered males, and cats with access to nature areas ranged further (
          <a href={sources.denmark}>Jensen et al., 2022</a>).
        </li>
      </ul>
      <p>
        The factors line up across both studies. In the Cat Tracker data, older
        cats roamed less: no cat over seven years old had a home range larger
        than 0.25 km². Rural cats had ranges about 1.6 times larger than urban
        cats, and males and unneutered cats moved further. Only 10 of the
        tracked cats were unneutered, however, so the authors caution that their
        sample was small for comparing intact and neutered cats.
      </p>
      <p>
        Daily distance and home range are different measures. A cat can walk a
        couple of kilometres in a day, as in the Danish study, while still
        circling inside a small area of nearby gardens.
      </p>
      <p>
        A methodological note: GPS collars have accuracy limits, tracking
        periods were short (often about a week), and the cats came from owners
        willing to volunteer. Your cat may differ from the averages. The
        consistency between independent studies is what makes the overall
        picture credible.
      </p>

      {/* ---- The concentric pattern ---- */}
      <h2>The Core Territory Pattern</h2>
      <p>
        A useful way to think about your own cat&apos;s territory is as layers
        around your home. This is an observation framework, not a measured
        breakdown, so we don&apos;t assign time percentages to each layer.
      </p>
      <ul>
        <li>
          <strong>Home base:</strong> your garden, porch or yard and the area
          immediately around the house.
        </li>
        <li>
          <strong>Neighbouring gardens:</strong> fence tops, hedges, shared
          paths and the yards next door. The Cat Tracker team described the
          typical range as usually covering a few neighbours&apos; yards (
          <a href={sources.ncsu}>NC State</a>). Other cats often use these areas
          too.
        </li>
        <li>
          <strong>Occasional destinations:</strong> a particular shed, a field
          edge or a quiet corner of the wider neighbourhood that the cat visits
          now and then.
        </li>
        <li>
          <strong>Rare long trips:</strong> uncommon. In the Cat Tracker study,
          only three of 925 cats ranged over more than 1 km².
        </li>
      </ul>

      {/* ---- What cameras add ---- */}
      <h2>What Cameras Show That GPS Can&apos;t</h2>
      <p>
        GPS tells you a cat went somewhere. It doesn&apos;t tell you why. A dot
        on a map that sits in a neighbour&apos;s garage for 20 minutes is
        interesting but not very useful on its own. A collar camera can supply
        the context: what the cat was looking at, what it was doing and who it
        met.
      </p>
      <p>
        Questions a camera can help answer, which a GPS track usually
        can&apos;t:
      </p>
      <ul>
        <li>Is the cat resting somewhere warm, or hiding from something?</li>
        <li>
          Is a repeated route following a scent trail, another cat or a food
          source?
        </li>
        <li>
          Is a long stop at a neighbour&apos;s house about food, shelter or
          company?
        </li>
      </ul>
      <p>
        The trade-off: a camera does not record coordinates, adds weight to the
        collar, and only shows what is in front of the cat. A GPS tracker is the
        better tool if location is what you need.
      </p>

      {/* ---- Time patterns ---- */}
      <h2>The Time Patterns of an Outdoor Cat&apos;s Day</h2>
      <p>
        Cats are crepuscular, which means they are most active around dawn and
        dusk. They often nap for 12 to 16 hours a day in short bursts spread
        across the day and night (
        <a href={sources.vcaNocturnal}>VCA Animal Hospitals</a>). For most
        outdoor cats, that means:
      </p>
      <ul>
        <li>
          <strong>Around dawn:</strong> a likely activity peak, with patrols,
          hunting-type behaviour and encounters with other cats.
        </li>
        <li>
          <strong>Middle of the day:</strong> often quieter, with resting in a
          shaded spot or a sunny patch.
        </li>
        <li>
          <strong>Around dusk:</strong> a second likely peak.
        </li>
        <li>
          <strong>Night:</strong> varies a lot between cats, and depends on
          whether your cat is kept in overnight.
        </li>
      </ul>
      <p>
        The tracking studies above measured range and distance, not exact hours
        of activity. Your own cat&apos;s timing may differ, so record at
        different times of day to see when your cat is actually active.
        Neighbourhood cats often use the same areas at different times. Cats
        Protection suggests that owners of cats who clash agree to let them out
        at different times (
        <a href={sources.cpFighting}>Cats Protection: cats and fighting</a>).
      </p>

      {/* ---- Secondary home ---- */}
      <h2>The Secondary Home Phenomenon</h2>
      <p>
        Some outdoor cats have a &quot;second address&quot;: a neighbour who
        feeds them, a shed or greenhouse that is reliably open, or a family who
        thinks of the cat as partly theirs. There is no reliable figure for how
        common this is. Given how small most cats&apos; ranges are, it is
        usually somewhere very close to home.
      </p>
      <p>
        The RSPCA notes that many cats will take an extra meal even when they
        are well fed, and that being fed elsewhere can mean a cat comes home
        less often and gains weight (<a href={sources.rspcaFeeding}>RSPCA</a>).
        A polite conversation usually sorts it out. Make sure the neighbour
        knows the cat has a home, and explain any diet or allergy concerns. For
        more owner-reported examples, see{" "}
        <a href="/blog/5-weird-discoveries-from-cat-collar-cameras">
          five weird things people discovered with a cat collar camera
        </a>
        .
      </p>

      {/* ---- When to worry ---- */}
      <h2>When to Worry About Range Changes</h2>
      <p>
        Most range variation is normal. Cats shift routes when new cats move
        into the area, with the seasons and as they age. A few patterns are
        worth paying attention to.
      </p>
      <ul>
        <li>
          <strong>A sudden, large expansion of range:</strong> possibly a
          conflict with a new cat nearby, or a change in where food is
          available.
        </li>
        <li>
          <strong>Missing for longer than usual:</strong> act early. Cats
          Protection advises checking sheds, garages and cupboards, asking
          neighbours to check theirs, and contacting your microchip database,
          local vets and shelters (
          <a href={sources.cpLost}>Cats Protection: lost a cat</a>).
        </li>
        <li>
          <strong>Coming home wet, shivering, injured or disoriented:</strong>{" "}
          contact your vet.
        </li>
        <li>
          <strong>Weight loss together with a wider range:</strong> worth a vet
          check. Food sources may have changed, but weight loss can also be a
          sign of illness.
        </li>
        <li>
          <strong>Sudden reluctance to go out, or more hiding:</strong> possibly
          a frightening encounter or a conflict with another cat.
        </li>
      </ul>

      {/* ---- How to map ---- */}
      <h2>How to Map Your Cat&apos;s Territory</h2>
      <p>
        If you&apos;re curious about your own cat&apos;s range, you have a few
        options depending on how much precision you want.
      </p>
      <ul>
        <li>
          <strong>GPS tracker (Tractive, Weenect and similar):</strong> reports
          location to a phone app and usually needs a subscription. Check the
          manufacturer&apos;s listed weight and add it to the collar load.
        </li>
        <li>
          <strong>Collar camera over a few weeks:</strong> shows behaviour and
          recognisable landmarks but not precise coordinates. Best for
          understanding what the cat does rather than exactly where.
        </li>
        <li>
          <strong>Both, at different times:</strong> GPS for the map, camera for
          the context. Weigh the total load before adding devices to a collar.
        </li>
        <li>
          <strong>Neighbourhood observation:</strong> ask neighbours, and check
          common cat routes like fence tops and hedges.
        </li>
      </ul>
      <p>
        For a zero-cost starting point, draw a circle of about 100 m around your
        home on a map. Based on the Cat Tracker research, that is where many pet
        cats spend much of their time outdoors. Your cat may differ. For a
        detailed comparison of tracking options, see our deep dive on{" "}
        <a href="/blog/cat-collar-camera-vs-gps-tracker-2026">
          cat collar cameras vs GPS trackers
        </a>
        .
      </p>

      {/* ---- Famous ranges ---- */}
      <h2>A Few Famous Cat Ranges</h2>
      <p>
        Individual cats from the Cat Tracker study show how wide the spread can
        be:
      </p>
      <ul>
        <li>
          <strong>Typical ranges:</strong> the paper shows example cats with
          home ranges of 1.6 ha (Katniss Everdeen, USA), 3.3 ha (Theo, New
          Zealand) and 4.3 ha (Bugsy, Australia) (
          <a href={sources.kays}>Kays et al., 2020</a>).
        </li>
        <li>
          <strong>Larger than average:</strong> Worf, a UK cat, had a home range
          of 16.2 ha.
        </li>
        <li>
          <strong>Max</strong>, a neutered tomcat in south-west England, walked
          about 1.7 km along a road between two villages twice during his
          tracking period (<a href={sources.natgeo}>National Geographic</a>;
          Kays et al.).
        </li>
        <li>
          <strong>Penny</strong>, a young female from the suburbs of Wellington,
          New Zealand, roamed the hills behind her house and covered more than
          three square miles. She was the study&apos;s widest-ranging cat (
          <a href={sources.natgeo}>National Geographic</a>).
        </li>
      </ul>
      <p>
        The takeaway: outliers exist, and some cats really do roam. The typical
        cat in these studies, though, stayed within a few gardens of home.
      </p>

      {/* ---- FAQ ---- */}
      <h2>Frequently Asked Questions</h2>

      <h3>How far do outdoor cats typically roam?</h3>
      <p>
        Less than most owners think. In the Cat Tracker study of 925 pet cats,
        the average home range was about 3.6 ha, and most cats stayed within
        roughly 100 m of home. Only three ranged over more than 1 km². Older
        cats roamed less. Males, unneutered cats and rural cats tended to range
        further.
      </p>

      <h3>Where does my cat go at night?</h3>
      <p>
        It depends on the cat. Cats are most active around dawn and dusk, and
        many outdoor cats stay within a few gardens of home. If your cat is out
        overnight, the best way to find out is to track or record them, and
        there is no reliable universal pattern. Keeping cats in at night is a
        choice many owners make for safety.
      </p>

      <h3>Should I keep my cat indoors to limit roaming?</h3>
      <p>
        That&apos;s a personal decision with legitimate arguments on both sides.
        Outdoor access brings risks from traffic, fights and getting lost, and
        outdoor cats affect local wildlife. It also gives cats stimulation that
        is hard to replicate indoors. A catio, harness walks or supervised
        garden time can be a middle ground.
      </p>

      <h3>Can I know where my cat goes without a GPS?</h3>
      <p>
        Partially, yes. A collar camera gives you behaviour and recognisable
        landmarks, even without exact coordinates. Combined with asking
        neighbours and checking common cat routes like fence tops and hedges,
        you can often piece together the rough territory over a few weeks.
      </p>

      {/* ---- Bottom line ---- */}
      <h2>The Bottom Line</h2>
      <p>
        Your outdoor cat probably roams less than you think. Large GPS studies
        agree on that. The more interesting question isn&apos;t whether your cat
        goes far. It&apos;s what they do in the small area they actually use.
      </p>
      <p>
        For stories owners commonly report once they start recording,{" "}
        <a href="/blog/5-weird-discoveries-from-cat-collar-cameras">
          this piece
        </a>{" "}
        covers five common discoveries. If you want to record your own
        cat&apos;s outdoor routine, the{" "}
        <a href="/what-is-whiskcam">Whiskcam Original</a> is a {f.weightGrams} g
        collar camera that records 1080P video to a MicroSD card. The card is
        sold separately. It has no night vision or GPS, and its continuous
        battery runtime has not been independently verified, so plan short
        sessions around dawn or dusk. Read our{" "}
        <a href="/blog/are-cat-collar-cameras-safe">
          collar camera safety guide
        </a>{" "}
        first. Whiskcam publishes this article and sells that camera.
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
          <a href={sources.natgeo}>
            National Geographic: &apos;Cat Tracker&apos; study shows where pet
            cats go when they&apos;re outside
          </a>
        </li>
        <li>
          <a href={sources.denmark}>
            Jensen H.A. et al. (2022). Movement patterns of roaming companion
            cats in Denmark: a study based on GPS tracking. Animals 12(14): 1748
          </a>
        </li>
        <li>
          <a href={sources.vcaNocturnal}>
            VCA Animal Hospitals: True or false, cats are nocturnal
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
          <a href={sources.cpLost}>Cats Protection: Lost a cat</a>
        </li>
      </ul>
    </article>
  );
}
