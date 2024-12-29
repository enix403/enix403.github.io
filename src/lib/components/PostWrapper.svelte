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

<!-- <div class="max-w-full" data-css="px-5 py-4">
  <div class={clsx('mx-autod w-full', 'post-content', 'prose')} data-css="max-w-[800px] pb-40">
    <div>
      <h1 class="text-center font-semibold">
        {frontmatter.title}
      </h1>
      <p class="font-mono text-sm font-thin text-slate-500">
        {format(dateParsed, 'MMMM dd, yyyy')}
      </p>
    </div>
    <ContentBody />
  </div>
</div> -->

<div class="post-content">
  <!-- Title -->
  <h1 class="font-semibold">
    {frontmatter.title}
  </h1>
  <!-- Date -->
  <p class="font-mono text-sm font-thin text-slate-500">
    {format(dateParsed, 'MMMM dd, yyyy')}
  </p>
  <!-- Body -->
  <ContentBody />
</div>


<style>
  .post-content :global {
    /* ----- Colors ----- */
    @apply prose !max-w-none;
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
