OARS 1.0 and 1.1 specification
===

This specification gives the semantics for the OARS 1.0–1.1 XML format. The
structure of the format is specified in the
[accompanying XML schema](./oars-1.1.rnc).

Future versions of the format may change structure or semantics in incompatible
ways.

Version strings
---

This specification refers to OARS versions identified by the strings:
 * `oars-1.0`
 * `oars-1.1`

The only difference between the two is that OARS 1.1 supports more attributes
than OARS 1.0.

Semantics
---

An OARS content rating consists of zero or more content attributes. Each content
attribute has as its value the ‘intensity’ of that type of content present in
the application being described.

The following intensities are allowed:
 * `unknown`
 * `none`
 * `mild`
 * `moderate`
 * `intense`

The semantics for each intensity depend on the attribute the intensity
describes, but in all cases, `intense` is the most intense, `none` is the least
intense, and `unknown` is used to indicate that no intensity is known for that
attribute.

Each version of OARS describes a fixed set of attributes, and the content rating
for a particular application can provide values for none, some or all of those
attributes. If an attribute is not present in a content rating, its value must
be assumed to be `none`. If no content rating is provided for an application at
all, however, the value of all attributes (in any version of OARS) must be
assumed to be `unknown`.

Examples
---

```
<content_rating type="oars-1.1">
  <content_attribute id="language-profanity">none</content_attribute>
  <content_attribute id="money-purchasing">intense</content_attribute>
  <content_attribute id="sex-themes">mild</content_attribute>
</content_rating>
```

This example describes an application where `money-purchasing` is `intense`,
`sex-themes` is `mild`, and all other attributes (including, specifically,
`language-profanity`) are `none`.

It is equivalent to the following content rating:
```
<content_rating type="oars-1.1">
  <content_attribute id="money-purchasing">intense</content_attribute>
  <content_attribute id="sex-themes">mild</content_attribute>
</content_rating>
```

---

```
<content_rating type="oars-1.1"/>
```

This example describes an application where *all* attributes have value `none`.

In contrast, if the `type` were specified as `oars-1.0`, only the attributes
present in OARS 1.0 would have value `none`. The attributes only present in
later versions of the OARS specification would have value `unknown`.

---

```
<!-- No <content_rating/> element present. -->
```

This example represents some AppData which doesn’t contain a `<content_rating/>`
element. In that case, *all* attributes (from any version of the OARS
specification) have value `unknown`.

Rationale
---

Certain attributes in the specification require some explanation as to why they
are present. This list is not exhaustive and may be added to in future.

 * `sex-homosexuality`: As of 2020,
   [various countries](https://www.humandignitytrust.org/lgbt-the-law/map-of-criminalisation/)
   have laws which criminalise lesbian, gay, bisexual or transgender (LGBT)
   people. In order for software and content to be distributed in those
   countries without breaking the law, and possible reprisal, it is necessary to
   be able to tag software and content which contains LGBT references, so that
   it can be hidden in those countries.
   However, in other countries (for example, the EU), discrimination laws
   explicitly prohibit discrimination on the basis of gender or sexuality. So
   while LGBT tagging may be available in OARS data, consumers of that data must
   only apply it in countries where the law requires that.

 * `violence-desecration`: As of 2020,
   [various countries](https://en.wikipedia.org/wiki/Flag_desecration) have laws
   against desecration of flags, objects, books, bodies, places, etc. which are
   considered ‘sacred’ by particular groups of people. As above, content which
   contains desecration needs to be hidden to remain legal (and culturally
   acceptable) in those countries.
