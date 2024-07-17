<script lang="ts">
  import clsx from 'clsx';
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

<!-- ------------------------- -->

<div class="max-w-full px-5 py-4">
  <div class={clsx('mx-auto w-full max-w-[800px] pb-40', 'post-content', 'prose')}>
    <div class="mt-10">
      <!-- <h1 class="text-center font-semibold font-mono text-[#296FFD]"> -->
      <h1 class="text-center font-semibold text-[#da1ad4]">
        {frontmatter.title}
      </h1>
      <p class="font-mono text-sm font-thin text-slate-500">
        {format(dateParsed, 'MMMM dd, yyyy')}
      </p>
    </div>
    <ContentBody />
  </div>
</div>

<style>
  .post-content :global {
    /* ----- Colors ----- */
    @apply prose-invert;
    @apply prose-a:no-underline;
    @apply prose-a:text-yellow-400 hover:prose-a:text-yellow-500;
    @apply prose-headings:text-[#ffffff];
    @apply prose-p:leading-6 prose-p:text-[#E8E6E3];
    @apply prose-li:text-[#E8E6E3];

    .math {
      /* @apply text-[#f5f4f2]; */
      @apply text-[#ffffff];
    }

    :not(pre) code {
      color: rgb(216, 208, 55);
      /* color: rgb(178, 172, 162); */
      background-color: rgb(24, 26, 27);
      border-color: rgb(58, 62, 65);
      @apply rounded border;
      padding: 2.56px 3.85px;
      font-size: 0.9em !important;
    }

    /* ----- Layouts ----- */

    :not(pre) code::before {
      content: '' !important;
    }
    :not(pre) code::after {
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
