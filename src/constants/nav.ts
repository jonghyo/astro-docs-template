/**
 * This configures the navigation sidebar.
 * All other languages follow this ordering/structure and will fall back to
 * English for any entries they haven’t translated.
 *
 * - All entries MUST include `text` and `key`
 * - Heading entries MUST include `header: true` and `type`
 * - Link entries MUST include `slug` (which excludes the language code)
 */
export default [
  { text: "はじめに", header: true, key: "introduction" },
  { text: "ガイドの目的", slug: "intro/introduction", key: "intro" },
  { text: "mBaaSについて", slug: "intro/mbaas", key: "mbaas" },

  { text: "AWS Amplify", header: true, key: "amplify" },
  { text: "AWS Amplifyについて", slug: "amplify/about", key: "amplify/about" },

  { text: "開発環境", header: true, key: "dev-environment" },
  {
    text: "ツールチェイン",
    slug: "dev-environment/toolchain",
    key: "toolchain",
  },
  { text: "開発環境の構築", slug: "dev-environment/install", key: "install" },

  { text: "開発フロー", header: true, key: "workflow" },
  { text: "開発フロー", slug: "workflow/about", key: "workflow/about" },

  { text: "フロントエンド", header: true, key: "frontend" },
  { text: "Hosting", slug: "frontend/hosting", key: "frontend/hosting" },

  { text: "バックエンド", header: true, key: "backend" },
  { text: "Auth", slug: "backend/auth", key: "backend/auth" },
  { text: "DataStore", slug: "backend/datastore", key: "backend/datastore" },
] as const;
