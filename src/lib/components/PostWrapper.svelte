<script lang="ts">
  import { format } from 'date-fns';

  import type { Frontmatter } from '$lib/types/Frontmatter';
  import type { Component } from 'svelte';

  const {
    frontmatter,
    ContentBody
  }: {
    frontmatter: Frontmatter;
    ContentBody: Component;
  } = $props();

  const dateParsed = new Date(frontmatter.date);
</script>

<svelte:head>
  <title>{frontmatter.title}</title>
</svelte:head>

<div class="post-wrapper">
  <!-- Title -->
  <header class="prose-sm border-b border-app-line pb-3 md:prose-base">
    <h1 class="!my-0 font-semibold">
      {frontmatter.title}
    </h1>
    <!-- Date -->
    <p class="!mb-0 !mt-1 text-sm font-thin italic text-slate-500">
      Posted by Qateef Ahmad on {format(dateParsed, 'MMMM dd, yyyy')}
    </p>
  </header>
  <!-- Body -->
  <div class="post-body">
    <ContentBody />
  </div>
</div>

<style>

  .post-wrapper :global {
    @apply prose !max-w-none;
    @apply prose-invert;
    @apply prose-a:no-underline;
    @apply prose-headings:text-[--app-heading-color];
    @apply prose-p:leading-6 prose-p:text-[--app-text-color];
    @apply prose-li:text-[--app-text-color];

    a {
      @apply !text-yellow-400 hover:!text-yellow-500;
    }

    .math {
      @apply text-[--app-math-color];
    }

    :not(pre) > code {
      color: rgb(216, 208, 55);
      /* color: rgb(178, 172, 162); */
      background-color: rgb(24, 26, 27);
      border-color: rgb(58, 62, 65);
      @apply rounded border;
      padding: 2.56px 3.85px;
      font-size: 0.9em !important;
    }

    /* ----- Layouts ----- */

    .post-body > *:first-child {
      @apply !mt-0;
    }

    .post-body {
      @apply pt-6;
    }

    :not(pre) > code::before {
      content: '' !important;
    }
    :not(pre) > code::after {
      content: '' !important;
    }

    pre {
      @apply px-2.5 py-2;
      @apply overflow-x-auto;
    }

    pre * {
      font-style: normal !important;
    }

    .math-display {
      @apply overflow-x-auto;
      @apply px-4;
    }
  }
</style>
