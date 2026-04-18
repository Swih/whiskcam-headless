// =============================================================================
// Article: Where Does My Outdoor Cat Actually Go? — GPS + camera research angle
// =============================================================================

export default function WhereDoesMyOutdoorCatActuallyGo() {
  return (
    <article className="prose-article">
      {/* ---- Answer-first intro (50-60 words) ---- */}
      <p className="lead">
        Most outdoor cats spend 80% of their time within 100 meters of home. GPS tracking studies
        across three continents consistently show a median daily range of 40-200 m for domestic
        cats — far smaller than owners imagine. The remaining 20% is where things get interesting:
        second gardens, shared territories, and routes that repeat with startling precision.
      </p>

      <p>
        When people imagine their outdoor cat&apos;s day, they picture long expeditions. The
        footage and the data say otherwise. Domestic cats are small-range predators with tight
        routines, and the last fifteen years of GPS research has been quietly dismantling the myth
        of the wandering housecat. What follows is what multi-university tracking studies have
        found, what collar camera footage adds on top, and the specific patterns you can expect
        from your own cat.
      </p>

      {/* ---- The science ---- */}
      <h2>The Surprising Science of Cat Range</h2>
      <p>
        A handful of academic studies have converged on a consistent picture of how far outdoor
        cats actually roam. The findings across continents are more similar than different.
      </p>
      <ul>
        <li>
          <strong>University of Roehampton</strong> (Kays et al., pooled international dataset):
          tracking data from 925 cats across six countries reported a median daily range of
          approximately 200 m from home, with most individuals staying well under 1 hectare.
        </li>
        <li>
          <strong>Royal Veterinary College UK</strong>: 79 domestic cats in a suburban sample had a
          mean home range of about 23 hectares (0.23 km²) using 95% kernel density estimation —
          with the core 50% range an order of magnitude smaller.
        </li>
        <li>
          <strong>North Carolina State University</strong>: in the Cat Tracker project covering 925
          owned outdoor cats, roughly 44% of individuals stayed inside a 1-hectare area
          surrounding their home.
        </li>
        <li>
          <strong>Nishimura, 2015 (Japan)</strong>: urban cats showed significantly smaller ranges
          than rural ones, with dense residential areas producing the tightest territories on
          record.
        </li>
      </ul>
      <p>
        The overall pattern: suburban cats tend to range further than tightly-packed urban cats,
        and rural farm cats — despite the open land available — often stick closer to the barn or
        house than you&apos;d guess. Intact male cats generally cover 2-3× the area of intact
        females, and spayed or neutered cats of both sexes show 50-70% smaller ranges than intact
        counterparts.
      </p>
      <p>
        A methodological note: none of these studies are definitive. Sample sizes range from
        dozens to a thousand cats, GPS collars have their own accuracy limits (especially under
        tree cover), and self-selected study participants skew toward engaged owners. Treat the
        numbers as directional. The consistency across independent studies is what gives them
        weight, not any single result.
      </p>

      {/* ---- The concentric pattern ---- */}
      <h2>The Core Territory Pattern</h2>
      <p>
        The data from these studies, combined with camera footage, suggests that outdoor cat
        territory is best understood as four concentric zones. Time allocation is remarkably
        consistent across individuals.
      </p>
      <ul>
        <li>
          <strong>Inner territory (0-20 m):</strong> the garden, the porch, the immediate
          surroundings of the home. Cats spend roughly 60-70% of their outdoor time here. This is
          the zone they patrol most intensely and defend most actively.
        </li>
        <li>
          <strong>Secondary territory (20-100 m):</strong> neighbors&apos; gardens, shared
          pathways, hedges, and low walls. Around 20-30% of outdoor time. Familiar ground, but not
          exclusively theirs — often shared with 2-4 other neighborhood cats on a rotating basis.
        </li>
        <li>
          <strong>Exploration zone (100-500 m):</strong> occasional patrols and less-visited
          corners of the wider neighborhood. 5-10% of outdoor time. Many cats have specific
          destinations here rather than random wandering.
        </li>
        <li>
          <strong>Rare excursions (500 m+):</strong> weather-dependent, breeding-driven, or
          triggered by following another cat or a food source. Under 5% of outdoor time for most
          individuals, and some cats never leave zone 3.
        </li>
      </ul>
      <p>
        Most outdoor cats never travel more than 500 m from home in their entire lives, even in
        rural settings. The notion of a cat &quot;disappearing for miles&quot; is usually an
        artifact of human imagination, not GPS data.
      </p>

      {/* ---- What cameras add ---- */}
      <h2>What Cameras Show That GPS Can&apos;t</h2>
      <p>
        GPS tells you a cat went somewhere. It doesn&apos;t tell you why. A dot on a map says
        &quot;he was at coordinates 48.85, 2.34 for 20 minutes,&quot; which is interesting but
        not actionable. Collar camera footage fills in the motive layer — and the motive is
        usually the part that matters.
      </p>
      <p>
        A few examples drawn from combined GPS + camera recordings:
      </p>
      <ul>
        <li>
          GPS showed a cat spending 40 minutes inside a neighbor&apos;s garage. Camera footage
          revealed he was sitting directly in front of a heating vent — the garage was simply the
          warmest accessible spot on a cold morning.
        </li>
        <li>
          GPS showed a cat walking the same straight line three times a day, across three
          gardens. Camera footage showed the cat repeatedly nose-down, following the same scent
          trail — almost certainly another cat&apos;s marking route.
        </li>
        <li>
          GPS showed 20 minutes of zero movement in an unusual location. The owner assumed the
          cat was hiding. Camera footage showed the cat grooming calmly in a patch of afternoon
          sun, eyes half-closed, completely at ease.
        </li>
      </ul>
      <p>
        GPS alone gives you location. Camera alone gives you behavioral context without
        coordinates. Combining both gets you the full picture: where, how long, and — finally —
        why. For most owner questions, the &quot;why&quot; is the only part that produces
        actionable changes.
      </p>

      {/* ---- Time patterns ---- */}
      <h2>The Time Patterns of an Outdoor Cat&apos;s Day</h2>
      <p>
        Cats are crepuscular, which means their activity peaks at dawn and dusk. Outdoor cat
        movement data follows this pattern almost without exception.
      </p>
      <ul>
        <li>
          <strong>Dawn (05:30-07:30):</strong> the largest activity block of the day. Hunting-like
          behavior, longest-range patrols, highest likelihood of encounters with prey or other
          cats.
        </li>
        <li>
          <strong>Midday (11:00-15:00):</strong> usually resting, often in the garden, in a shaded
          spot, or a favorite sun patch. Many cats are functionally invisible during this window.
        </li>
        <li>
          <strong>Evening (18:00-20:30):</strong> a second activity peak, shorter in duration than
          dawn. Social encounters with other cats are most common here, since overlapping outdoor
          schedules converge around dusk.
        </li>
        <li>
          <strong>Night (22:00-04:00):</strong> highly variable. Cats that come home to sleep
          inside are inactive. Cats that stay outside overnight often cover more ground in these
          hours than during the entire rest of the day — especially unneutered males.
        </li>
      </ul>
      <p>
        Footage review of multi-night recordings consistently shows that 3:00-5:00 AM is the most
        common window for feline social encounters: territorial check-ins, shared gaze sessions,
        and occasional brief confrontations. Almost no humans ever see this.
      </p>

      {/* ---- Secondary home ---- */}
      <h2>The Secondary Home Phenomenon</h2>
      <p>
        Around 20-25% of outdoor cats in dense residential neighborhoods have what can fairly be
        called a &quot;second address.&quot; This isn&apos;t abandonment and it&apos;s not
        preference — it&apos;s territory expansion that happens to include another reliable human.
      </p>
      <p>
        The most common patterns, documented across shared footage and owner reports:
      </p>
      <ul>
        <li>
          An elderly neighbor who feeds the cat occasionally, often starting with a single meal
          and hardening into a routine over months.
        </li>
        <li>
          A shed, garage, or greenhouse that&apos;s reliably left open and offers warmth,
          shelter, or predictable shade.
        </li>
        <li>
          A second family who considers the cat partly theirs, complete with a nickname that
          differs from the cat&apos;s real one.
        </li>
      </ul>
      <p>
        The cat, in all these cases, still &quot;belongs&quot; to the primary owner in every
        meaningful sense — sleeping at home, recognizing the owner&apos;s voice, returning for
        vet visits. They&apos;ve simply added a second base to their territory in the same way a
        coworker might have a favorite cafe near the office. A polite conversation between
        neighbors almost always resolves the situation into an informal shared-parenting
        arrangement. Details on these discoveries sit in our piece on{" "}
        <a href="/blog/5-weird-discoveries-from-cat-collar-cameras">five weird things people
        discovered with a cat collar camera</a>.
      </p>

      {/* ---- When to worry ---- */}
      <h2>When to Worry About Range Changes</h2>
      <p>
        Most range variation is normal. Cats expand their territory seasonally, shift routes when
        new cats move into the neighborhood, and develop new preferences over time. A few
        patterns, though, are worth paying attention to.
      </p>
      <ul>
        <li>
          <strong>Range suddenly expanded 3× or more:</strong> usually a sign of a territory
          conflict — a new rival cat pushing yours further afield — or a resource change such as
          a neighbor&apos;s feeder closing.
        </li>
        <li>
          <strong>Missing 48+ hours when previously never absent:</strong> worth actively
          investigating. Possible causes include illness, accidental confinement (garage, shed,
          basement), injury, or a trap.
        </li>
        <li>
          <strong>Coming home wet, shivering, or visibly disoriented:</strong> may indicate a
          fall into water, getting locked somewhere cold, or an encounter that needs closer
          veterinary attention.
        </li>
        <li>
          <strong>Weight loss combined with wider range:</strong> the cat may be hunting
          harder because a food source has changed — either at home, at a secondary feeder, or
          through a change in neighborhood prey availability.
        </li>
        <li>
          <strong>Behavioral change after a range expansion:</strong> withdrawal, hiding,
          reluctance to go out — possible trauma from a near-miss with a car, a dog encounter,
          or a fight.
        </li>
      </ul>

      {/* ---- How to map ---- */}
      <h2>How to Map Your Cat&apos;s Territory</h2>
      <p>
        If you&apos;re curious about your own cat&apos;s range, you have a few options depending on
        how much precision you want and how much you&apos;re willing to spend.
      </p>
      <ul>
        <li>
          <strong>GPS tracker (Tractive, Weenect, similar):</strong> accurate, passive, runs in the
          background, reports live location to a phone app. Requires a monthly subscription and
          adds 25-40 g to the collar.
        </li>
        <li>
          <strong>Collar camera over 2-3 weeks:</strong> shows behavior in rich detail but
          doesn&apos;t give precise coordinates. Best for understanding what the cat does, not
          where.
        </li>
        <li>
          <strong>Both combined:</strong> the complete picture. GPS for the map, camera for the
          motive. This is the setup used by most of the research groups doing serious outdoor cat
          work.
        </li>
        <li>
          <strong>Citizen science projects:</strong> Cat Tracker (UK and US), Pet Tracker, and
          similar academic programs loan equipment to owners in exchange for data. Free, useful,
          limited-duration.
        </li>
      </ul>
      <p>
        For a zero-cost estimate: draw a 100 m radius circle on Google Maps around your house.
        Based on the research, that&apos;s where your cat spends roughly 80% of their outdoor
        time. Accurate enough for most practical purposes. For a more detailed comparison of
        tracking options, see our deep dive on{" "}
        <a href="/blog/cat-collar-camera-vs-gps-tracker-2026">cat collar cameras vs GPS
        trackers</a>.
      </p>

      {/* ---- Famous ranges ---- */}
      <h2>A Few Famous Cat Ranges</h2>
      <p>
        The individual stories behind the data help calibrate expectations. A few documented
        examples from published studies and shared camera footage:
      </p>
      <ul>
        <li>
          <strong>Snowy</strong> (featured on Upworthy with publicly shared camera footage): a
          suburban shorthair with a daily range within 300 m of home, almost entirely composed of
          four specific neighboring properties visited in rotation.
        </li>
        <li>
          <strong>Mr. Kitters</strong> (indoor cat with supervised outdoor access): roughly 30
          minutes outside per day, range capped at the single back garden and one adjacent
          fence-top path.
        </li>
        <li>
          <strong>Anonymous male farm cat</strong> (Roehampton international dataset): a documented
          home range of approximately 155 hectares — the extreme outlier of the study and
          more than 300× the median.
        </li>
      </ul>
      <p>
        The takeaway: outliers exist, and some cats genuinely do roam. But the typical cat is
        closer to Snowy than to the farm cat, even in environments that would theoretically
        support wider ranging.
      </p>

      {/* ---- FAQ ---- */}
      <h2>Frequently Asked Questions</h2>

      <h3>How far do outdoor cats typically roam?</h3>
      <p>
        Median daily range across the major GPS studies sits between 40 and 200 m from home, with
        most cats keeping roughly 80% of their outdoor time inside a 100 m radius. Intact males
        roam 2-3× further than females, and suburban cats range further than urban ones. Ranges
        over 500 m are uncommon, and ranges over 1 km are rare outliers.
      </p>

      <h3>Where does my cat go at night?</h3>
      <p>
        If your cat comes home to sleep, almost nowhere — most indoor-nighters are inactive from
        roughly 22:00 to 04:00. Cats that stay outside overnight often cover their widest ground
        between 03:00 and 05:00, with the most frequent activity being social encounters with
        other neighborhood cats on shared walls, paths, and garden boundaries.
      </p>

      <h3>Should I keep my cat indoors to limit roaming?</h3>
      <p>
        That&apos;s a personal decision with legitimate arguments on both sides. Indoor-only cats
        live longer on average and face fewer road, predator, and fight risks. Outdoor access
        provides mental stimulation that&apos;s hard to replicate indoors. A middle-ground option
        — catio, harness walks, or supervised garden access — preserves most of the enrichment
        without the risk exposure.
      </p>

      <h3>Can I know where my cat goes without a GPS?</h3>
      <p>
        Partially, yes. A collar camera gives you rich behavioral context and identifiable
        landmarks, even if it doesn&apos;t tell you exact coordinates. Combined with neighborhood
        observation — asking neighbors, checking common cat corridors like fence tops and hedges
        — you can usually reconstruct the rough territory in a couple of weeks without paying for
        GPS subscriptions.
      </p>

      {/* ---- Bottom line ---- */}
      <h2>The Bottom Line</h2>
      <p>
        Your outdoor cat almost certainly roams less than you think. The research is consistent,
        the camera footage confirms it, and the concentric-zones model holds up across cats,
        countries, and landscapes. The interesting question isn&apos;t whether your cat goes far —
        it&apos;s what they do in the small area they actually use.
      </p>
      <p>
        For specific stories of what people have found when they started recording,{" "}
        <a href="/blog/5-weird-discoveries-from-cat-collar-cameras">this piece</a> covers five of
        the most common discoveries. If you want to record your own cat&apos;s outdoor day, the{" "}
        <a href="/what-is-whiskcam">Whiskcam Original</a> is a 26 g collar camera built for 1-2
        hour sessions — enough to capture a full dawn patrol or evening route in one recording.
      </p>
    </article>
  );
}
