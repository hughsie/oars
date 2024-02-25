OARS 1.0-1.2 specification
===

This specification gives the semantics for the OARS 1.0–1.2 XML format. The
structure of the format is specified in the
[accompanying XML schema](./oars-1.2.rnc).

Future versions of the format may change structure or semantics in incompatible
ways.

Version strings
---

This specification refers to OARS versions identified by the strings:
 * `oars-1.0`
 * `oars-1.1`
 * `oars-1.2`

The only difference between these versions is that versions 1.1 and 1.2 add
more content descriptor attributes over 1.0; 1.1 adds a pair of cultural
sensitivity descriptors and 1.2 adds "Mood" and "Health" categories.

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
