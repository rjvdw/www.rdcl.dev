# Pangea Link Dump

## Database Design

### Idee #1 -- NoSQL (Mongo)

```
link_by_uuid:
  <UUID>: <Link>

links_by_category:
  "/ Tech / CSS / Guides":
    category_href: "https://..."
    links: { <Link> }

links_by_tag:
  Tech: { <Link> }
  CSS: { <Link> }

categories:
  "/ Tech":
    children: { "/ Tech / CSS" , "/ Tech / Frameworks" , ... }"
    href?: "https://..."

---

<Link>:
  id: <UUID>
  href: "https://..."
  description: "..."
  notes: "..."
  tags: { "..." }
  category: "/ Tech / CSS / Guides"
```

Commands:
  * *add_link*:
    * Faalt als category niet bestaat
    * Toevoegen in `link_by_uuid`
    * Toevoegen in `links_by_category`
    * Toevoegen in `links_by_tag`
  * *remove_link*:
    * Verwijderen uit `link_by_uuid`
    * Verwijderen uit `links_by_category`
    * Verwijderen uit `links_by_tag`
  * *update_link*:
    * Faalt als category niet bestaat
    * Bijwerken in `link_by_uuid`
    * Bijwerken in `links_by_category`
    * Bijwerken in `links_by_tag`
  * *add_category*:
    * Faalt als category al bestaat
    * Toevoegen in `categories` (incl evt nieuwe parents)
  * *remove_category*:
    * Faalt als er referenties bestaan in `links_by_category`
    * Verwijderen uit `categories`
  * *update_category*:
    * Faalt als nieuwe category al bestaat
    * Bijwerken in `link_by_uuid`
    * Bijwerken in `links_by_category`
    * Bijwerken in `links_by_tag`
    * Bijwerken in `categories` (incl evt nieuwe parents)
  * *rename_tag*:
    * Bijwerken in `link_by_uuid`
    * Bijwerken in `links_by_category`
    * Bijwerken in `links_by_tag`