#!/bin/bash
# Downloads AliExpress review photos and converts them to WebP (400px wide)
# Run from the project root: bash scripts/download-review-photos.sh

set -e

DIR="public/images/reviews"
mkdir -p "$DIR"

IMG="https://ae01.alicdn.com/kf/"

urls=(
  "Acb3cc38ae0a24f42adaaf5da4af727e49.jpg"
  "A0ae3c1775e5d44a58499844822751752C.jpg"
  "A094674a4450244b4ab136febcb9f3613l.jpg"
  "A68225a746af44edcb3be37abb71fb743m.jpg"
  "Ad0c6504bea534e68874ef457a3af4792x.jpg"
  "Aac916ecacb7143d59f738fa04c272e40M.jpg"
  "Ae38b055b35d044ffa9ea51ca34a28d84t.jpg"
  "Ad4a46f083f7d445a9af9c73dfb266e075.jpg"
  "A40f286ca9d8a4efc9e20a2c31c2a246ba.jpg"
  "A81684bf3d30842cbba0ffd6fe00ebdd63.jpg"
  "A89097a191d2f424db43b7011ad81a1dd5.jpg"
  "A833afcb0c3d640c2bcf758be45ddd9ba7.jpg"
  "Addde68c698e647cf99dbde1ece8b4c95X.jpg"
  "A8f09c136c4f940b78198bb99918b409eh.jpg"
  "A1dc8d3194f6d45d5b1756b22041b7ca4e.jpg"
  "A06b9bc4c93ec4a22b244960997753a087.jpg"
  "A1d65efead7bb4820a8dda6c7176c28996.jpg"
  "A846e3c4d64f04a2fa22ab5129b8f7c5bL.jpg"
)

for i in "${!urls[@]}"; do
  n=$((i + 1))
  echo "[$n/${#urls[@]}] Downloading & converting review-${n}..."
  curl -sL "${IMG}${urls[$i]}" -o "$DIR/raw-${n}.jpg"
  ffmpeg -y -i "$DIR/raw-${n}.jpg" -vf "scale=400:-1" "$DIR/review-${n}.webp" 2>/dev/null
  rm "$DIR/raw-${n}.jpg"
  echo "  -> review-${n}.webp OK"
done

echo ""
echo "=== All ${#urls[@]} review photos downloaded and converted ==="
ls -la "$DIR"/*.webp
