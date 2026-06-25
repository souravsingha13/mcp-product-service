# Product Domain Knowledge

## General Definitions (Glossary)
- **SKU:** Stock Keeping Unit
- **UID:** Internal Product Identifier (globally unique)
- **MCP:** Model Context Protocol
- **Atlas Search:** MongoDB Search Engine
- **Hybrid Search:** Keyword + Semantic Search

## Core Categories
- Refrigerator (Fridge)
- Air Conditioner (AC)
- Television (TV)
- Washing Machine

## Multilingual Terminology & Synonyms
The system uses the following mappings to bridge intent across languages. These should be used by the LLM to understand intent and by the search engine for expansion.

| English Concept | Bangla Equivalent | Synonyms / Variants |
| :--- | :--- | :--- |
| Refrigerator | রেফ্রিজারেটর | Fridge, Freezer, ফ্রিজ, ডিপ ফ্রিজ, Frost Fridge |
| Air Conditioner | এয়ার কন্ডিশনার | AC, এসি |
| Inverter | ইনভার্টার | Intelligent Inverter, সর্বশেষ ইন্টেলিভেন্স ইনভার্টার |
| Warranty | ওয়ারেন্টি | গ্যারান্টি, রিপ্লেসমেন্ট, Warranty Terms |
| Stock | স্টক | আছে কি না, অ্যাভেইলএবল, Availability |
| Price | দাম | মূল্য, টাকা, BDT, MRP |

## Domain Logic
- **Inverter Fridge:** Refers to refrigerators with power-saving inverter technology.
- **Direct Cool:** A specific type of refrigerator cooling (Frost).
- **UID vs SKU:** Use `uid` for internal mapping and `sellerSKU` for inventory-specific variants.
