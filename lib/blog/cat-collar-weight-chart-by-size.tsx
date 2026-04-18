// =============================================================================
// Article: Cat Collar Weight Chart by Size — Reference chart angle
// =============================================================================

export default function CatCollarWeightChartBySize() {
  return (
    <article className="prose-article">
      {/* ---- Answer-first intro (45-60 words) ---- */}
      <p className="lead">
        A cat collar plus camera should weigh less than 3% of your cat&apos;s body weight for daily
        use, and 5% maximum for short sessions. For a 4 kg adult cat, that&apos;s 120 g maximum for
        all-day wear (60 g is ideal). Most modern collar cameras weigh 20-40 g, well within safe
        limits for any healthy adult cat.
      </p>

      <p>
        The 3% rule is simple in principle but easy to misapply. Owners often weigh the camera but
        forget the collar and any tag. They use the cat&apos;s current weight when the cat is
        overweight. They apply the rule to kittens or senior cats where it no longer fits. This
        article gives you the numbers by breed, the edge cases, and the signs that the total
        weight is wrong.
      </p>

      {/* ---- The 3% rule ---- */}
      <h2>The 3% Rule Explained</h2>
      <p>
        The 3-5% guideline comes from wildlife telemetry research. Biologists strapping GPS collars
        and tracking devices to wild animals needed a threshold that wouldn&apos;t alter the
        animal&apos;s behavior or welfare. Decades of field studies converged on the same number:
        keep total device weight under 5% of body mass, and under 3% for long-term or continuous
        wear.
      </p>
      <p>
        Veterinarians adopted the same threshold for pet wearables — activity trackers, GPS tags,
        medical collars, and more recently collar cameras. The logic is identical. A device that
        represents more than 5% of an animal&apos;s body weight starts to measurably affect gait,
        posture, grooming, and stress levels.
      </p>
      <p>
        For cats specifically, 3% is the conservative daily threshold. 5% is acceptable for short
        sessions (one to two hours) but not for all-day wear. Below 2%, you&apos;re in the
        &quot;the cat barely notices it&quot; range — which is where most lightweight collar
        cameras sit on average-size cats.
      </p>

      {/* ---- Weight chart by breed ---- */}
      <h2>Weight Chart by Cat Breed</h2>
      <p>
        The table below uses the typical healthy adult weight for each breed. If your cat weighs
        more than the range listed, use the healthy weight, not the current weight (see the
        overweight section below). A 26 g reference column is included because that&apos;s the
        weight of the Whiskcam Original — most other collar cameras sit in the 20-40 g range, so
        if 26 g is safe, 40 g is usually also safe with margin.
      </p>

      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Breed</th>
              <th>Typical Adult Weight</th>
              <th>3% Daily Limit</th>
              <th>5% Max Session</th>
              <th>26 g Camera Safe?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Domestic Shorthair</td>
              <td>4 kg</td>
              <td>120 g</td>
              <td>200 g</td>
              <td>Yes (0.65%)</td>
            </tr>
            <tr>
              <td>British Shorthair</td>
              <td>5 kg</td>
              <td>150 g</td>
              <td>250 g</td>
              <td>Yes (0.52%)</td>
            </tr>
            <tr>
              <td>Maine Coon</td>
              <td>7 kg</td>
              <td>210 g</td>
              <td>350 g</td>
              <td>Yes (0.37%)</td>
            </tr>
            <tr>
              <td>Siamese</td>
              <td>3.5 kg</td>
              <td>105 g</td>
              <td>175 g</td>
              <td>Yes (0.74%)</td>
            </tr>
            <tr>
              <td>Ragdoll</td>
              <td>6 kg</td>
              <td>180 g</td>
              <td>300 g</td>
              <td>Yes (0.43%)</td>
            </tr>
            <tr>
              <td>Persian</td>
              <td>4.5 kg</td>
              <td>135 g</td>
              <td>225 g</td>
              <td>Yes (0.58%)</td>
            </tr>
            <tr>
              <td>Bengal</td>
              <td>5 kg</td>
              <td>150 g</td>
              <td>250 g</td>
              <td>Yes (0.52%)</td>
            </tr>
            <tr>
              <td>Scottish Fold</td>
              <td>4 kg</td>
              <td>120 g</td>
              <td>200 g</td>
              <td>Yes (0.65%)</td>
            </tr>
            <tr>
              <td>Sphynx</td>
              <td>3.5 kg</td>
              <td>105 g</td>
              <td>175 g</td>
              <td>Yes (0.74%)</td>
            </tr>
            <tr>
              <td>Russian Blue</td>
              <td>4 kg</td>
              <td>120 g</td>
              <td>200 g</td>
              <td>Yes (0.65%)</td>
            </tr>
            <tr>
              <td>Norwegian Forest Cat</td>
              <td>6.5 kg</td>
              <td>195 g</td>
              <td>325 g</td>
              <td>Yes (0.40%)</td>
            </tr>
            <tr>
              <td>Abyssinian</td>
              <td>3.5 kg</td>
              <td>105 g</td>
              <td>175 g</td>
              <td>Yes (0.74%)</td>
            </tr>
            <tr>
              <td>Munchkin</td>
              <td>3 kg</td>
              <td>90 g</td>
              <td>150 g</td>
              <td>Yes (0.87%)</td>
            </tr>
            <tr>
              <td>American Shorthair</td>
              <td>4.5 kg</td>
              <td>135 g</td>
              <td>225 g</td>
              <td>Yes (0.58%)</td>
            </tr>
            <tr>
              <td>Burmese</td>
              <td>3.5 kg</td>
              <td>105 g</td>
              <td>175 g</td>
              <td>Yes (0.74%)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        Every breed commonly kept as a pet clears the 3% daily threshold by a wide margin with a
        modern lightweight camera. The tightest case in the table is the Munchkin at 3 kg, which
        still has 90 g of headroom at the daily limit. That leaves plenty of budget for the collar
        and any additional tag.
      </p>

      {/* ---- Count the collar itself ---- */}
      <h2>Why You Should Also Count the Collar Itself</h2>
      <p>
        The camera weight published by the manufacturer is not the weight on your cat. You need to
        add everything hanging from the cat&apos;s neck. A typical full setup looks like this:
      </p>
      <ul>
        <li>Nylon breakaway collar: 8-12 g</li>
        <li>ID tag (metal): 3-8 g</li>
        <li>AirTag in silicone holder: 11-14 g</li>
        <li>Collar camera: 20-40 g (Whiskcam is 26 g)</li>
      </ul>
      <p>
        A realistic combined load for an owner who also runs a GPS tag: nylon collar 10 g +
        Whiskcam 26 g + AirTag 11 g = 47 g. For a 4 kg cat, that&apos;s 1.18% of body weight —
        still well under the 3% daily threshold. For a 2.5 kg cat (small adult), 47 g is 1.88%,
        which is still safe but closer to the margin. If you run multiple accessories, always
        calculate the total.
      </p>

      {/* ---- Kittens ---- */}
      <h2>Kittens: Why the Rule Changes</h2>
      <p>
        Do not put a collar camera on a kitten under 2 kg. The 3% rule breaks down at that size
        for two reasons. First, kittens are still developing — their neck muscles, cervical spine,
        and coordination aren&apos;t fully built. Second, even a &quot;safe&quot; 26 g camera is
        1.3% of a 2 kg kitten, which sounds low but represents a much larger proportional load on
        a still-growing skeleton than on an adult.
      </p>
      <p>
        Wait until the kitten is at least 6 months old and reliably over 2 kg. Before that, a
        plain lightweight collar alone is the most you should put on them — and many kittens
        don&apos;t tolerate even that. If you want to capture kitten footage, a fixed room
        camera is the safer option until they grow into collar gear.
      </p>

      {/* ---- Seniors ---- */}
      <h2>Senior Cats: Tighter Threshold</h2>
      <p>
        Cats aged 10 and older often have reduced mobility, early-stage arthritis, or subtle
        cervical stiffness that isn&apos;t yet diagnosed. For these cats, tighten the daily limit
        from 3% to 2% and keep sessions short — 30 to 45 minutes rather than multi-hour wear.
      </p>
      <p>
        On a 4 kg senior cat, 2% is 80 g of total collar weight budget. That&apos;s still
        comfortably above a 26 g camera plus a collar, but it leaves less room for added
        accessories. Senior cats are also the group most likely to show early signs of discomfort
        in posture or gait, so introduce the camera gradually and check in after every session.
        If your cat has a diagnosed spinal or joint condition, consult your vet before using any
        collar accessory.
      </p>

      {/* ---- Weigh your cat ---- */}
      <h2>How to Weigh Your Cat Accurately at Home</h2>
      <p>
        Before you calculate anything, you need an accurate current weight. Three methods work,
        in order of accuracy:
      </p>
      <ol>
        <li>
          <strong>Vet visit.</strong> Most accurate. Vet scales are precise to 10 g and
          calibrated. Most vets will weigh your cat at no charge between appointments.
        </li>
        <li>
          <strong>Dedicated pet scale.</strong> A digital pet scale (often sold for puppies or
          small animals) is precise to 10-50 g and costs 25-50 USD. Worth it if you plan to track
          weight over time.
        </li>
        <li>
          <strong>Bathroom scale, two-step method.</strong> Weigh yourself. Then weigh yourself
          holding your cat. Subtract. Accurate to roughly 100-200 g depending on your scale.
        </li>
      </ol>
      <p>
        Useful trick for uncooperative cats: place the cat in their carrier, tare the scale to
        zero with the empty carrier first, then put the carrier (with cat inside) back on the
        scale. You get the cat&apos;s weight without any wrestling. Avoid weighing right after a
        meal or a litter visit, when weight swings by 100-300 g.
      </p>

      {/* ---- What happens if too heavy ---- */}
      <h2>What Happens If the Camera Is Too Heavy</h2>
      <p>
        When the total collar load exceeds the comfortable threshold, cats show it in four
        concrete ways. Watch for these during the first few sessions:
      </p>
      <ul>
        <li>
          <strong>Low posture.</strong> The cat walks with head and shoulders lower than usual,
          sometimes crouching to move. Normal for the first 2-3 minutes of a new collar; a
          problem if it persists beyond 10.
        </li>
        <li>
          <strong>Refusing to move.</strong> The cat sits or lies in one spot and won&apos;t walk.
          Not hiding, just frozen. This is a clear overload signal.
        </li>
        <li>
          <strong>Excessive grooming.</strong> Obsessive grooming around the neck or shoulders
          past the normal adjustment period suggests the cat is trying to remove a foreign load
          they can&apos;t lift off.
        </li>
        <li>
          <strong>Changed gait.</strong> Stumbling, swaying, or short stiff steps. Rare with
          properly sized cameras, but a red flag when it happens. Remove immediately.
        </li>
      </ul>
      <p>
        Most of these signs are temporary and pass within 10-15 minutes as the cat adapts. If
        they persist or worsen, the weight is wrong for that cat — either the camera is too heavy
        for their body size, or something about the fit is distributing the load poorly.
      </p>

      {/* ---- FAQ ---- */}
      <h2>Frequently Asked Questions</h2>

      <h3>Is 40 grams too heavy for a 3 kg cat?</h3>
      <p>
        40 g on a 3 kg cat is 1.33% of body weight — well under the 3% daily threshold (which
        would be 90 g). It&apos;s safe, but you&apos;re closer to the margin than with a lighter
        camera. For smaller cats under 3.5 kg, cameras in the 20-30 g range give you more
        headroom for the collar, a tag, and any other accessory.
      </p>

      <h3>Can overweight cats wear heavier cameras?</h3>
      <p>
        No. The 3% ratio is based on the cat&apos;s healthy target weight, not their current
        weight. An overweight 6 kg cat whose healthy weight is 4 kg should use the 4 kg limit
        (120 g total), not the 6 kg limit (180 g). Their skeleton and joints are sized for the
        healthy weight. Using the current weight gives a false safety margin.
      </p>

      <h3>Should I remove the camera at night?</h3>
      <p>
        Yes. Collar cameras are designed for active monitoring sessions, not continuous wear. Give
        your cat several collar-free hours daily, and always remove the camera at night and when
        the cat is fully supervised indoors. 24/7 wear causes unnecessary fur matting, potential
        skin irritation, and reduces the cat&apos;s overall comfort.
      </p>

      <h3>What&apos;s the heaviest cat collar camera currently sold?</h3>
      <p>
        Most waterproof or ruggedized collar cameras sit in the 40-60 g range. A few outdoor
        models aimed at hunting cats or small dogs reach 70-80 g. For a 4 kg cat, 70 g still
        clears the 3% threshold, but by a narrower margin — factor in the collar, tag, and any
        AirTag before buying in that range.
      </p>

      <h3>Does fur thickness affect perceived weight?</h3>
      <p>
        Not scientifically. Thick fur (Maine Coon, Persian, Norwegian Forest Cat) may distribute
        and cushion collar pressure slightly, but the gravitational load is identical. What fur
        does change is visible fit — a collar that looks loose on a fluffy cat may actually be
        correctly snug against the neck underneath. Measure under the fur, not over it.
      </p>

      {/* ---- Bottom line ---- */}
      <h2>The Bottom Line</h2>
      <p>
        For any healthy adult cat over 2.5 kg, modern lightweight collar cameras (20-40 g) are
        well within safe weight limits. The 3% daily rule gives you a simple check: multiply your
        cat&apos;s healthy weight in kg by 30 to get the total collar budget in grams. Add up the
        collar, tag, and camera — if the total is under that number, you&apos;re safe.
      </p>
      <p>
        For a deeper look at the other safety factors beyond weight, read our guide on{" "}
        <a href="/blog/are-cat-collar-cameras-safe">whether cat collar cameras are safe</a>. If
        you want to see what cats actually do while wearing one, we reviewed footage in{" "}
        <a href="/blog/what-cats-do-when-alone-at-home">what cats do when alone at home</a>. Or
        learn more about the <a href="/what-is-whiskcam">Whiskcam Original</a>, our 26 g collar
        camera built for cats and small dogs.
      </p>
    </article>
  );
}
