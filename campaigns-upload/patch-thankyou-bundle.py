"""Patch live campaigns JS: remove thank-you auto-redirect; home CTA -> main site same tab.

Downloads https://campaigns.ikigaihospitals.com/assets/index-DqrTBvj6.js
Writes ./index-DqrTBvj6.js to upload over the campaigns assets file only.
Does not touch index.html (preserves GTM) or the main domain.
"""
from __future__ import annotations

import urllib.request
from pathlib import Path

SRC = "https://campaigns.ikigaihospitals.com/assets/index-DqrTBvj6.js"
OUT = Path(__file__).resolve().parent / "index-DqrTBvj6.js"

OLD_TIMER = (
    'const Qg=3e3;function Zg(){const u=xu();return S.useEffect(()=>{'
    'const s=window.setTimeout(()=>{u("/")},Qg);return()=>window.clearTimeout(s)},[u]),'
)
NEW_TIMER = "function Zg(){return "

OLD_CTA = (
    'm.jsx(Bl,{variant:"navy",onClick:()=>u("/"),children:"Back To Homepage"}),'
    "m.jsx(Bl,{variant:\"outline-navy\",href:gt.phoneHref,children:gt.phone})"
)
NEW_CTA = (
    'm.jsx(Bl,{variant:"navy",href:"https://ikigaihospitals.com/",children:"Back To Homepage"}),'
    "m.jsx(Bl,{variant:\"outline-navy\",href:gt.phoneHref,children:gt.phone})"
)


def main() -> None:
    with urllib.request.urlopen(SRC, timeout=60) as resp:
        data = resp.read().decode("utf-8")

    if OLD_TIMER not in data:
        if "function Zg(){return " in data and 'href:"https://ikigaihospitals.com/",children:"Back To Homepage"' in data:
            OUT.write_text(data, encoding="utf-8")
            print("Already patched. Wrote", OUT)
            return
        raise SystemExit("Thank-you timer pattern not found — live bundle may have changed.")

    if OLD_CTA not in data:
        raise SystemExit("Thank-you CTA pattern not found — live bundle may have changed.")

    data = data.replace(OLD_TIMER, NEW_TIMER, 1).replace(OLD_CTA, NEW_CTA, 1)

    if "function Xg(){const u=xu();return S.useEffect(()=>{const s=window.setTimeout(()=>{u(\"/\")},Vg)" not in data:
        raise SystemExit("Safety check failed: 404 auto-redirect should remain unchanged.")

    OUT.write_text(data, encoding="utf-8")
    print("Wrote", OUT)
    print("Upload ONLY to campaigns public_html/assets/index-DqrTBvj6.js")
    print("Do not upload to ikigaihospitals.com")


if __name__ == "__main__":
    main()
