---
title: Covariance vs Correlation
---

<script>
  import {math, display} from 'mathlifier';
</script>

<style lang="scss">
  @charset "UTF-8";
  @use 'sass:math';
  @use './variables.scss';

  hr {
    background: variables.$color-accent;
    height: 1px;
    border: 0;
  }

  /* Heading */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    // check imported weights and styles in gatsby-browser.jsx
    margin: variables.$spacing-12 0 variables.$spacing-6;
    line-height: variables.$line-height-tight;
  }

  h3,
  h4,
  h5,
  h6 {
    font-weight: variables.$font-weight-bold;
    color: variables.$color-heading;
  }

  h1 {
    margin-top: 0;
    font-weight: variables.$font-weight-black;
    font-size: variables.$font-size-6;
    font-style: italic;
    color: variables.$color-heading-black;
  }

  h2 {
    font-size: variables.$font-size-5;
    font-weight: variables.$font-weight-semibold;
    color: variables.$color-heading;
  }

  h3 {
    font-size: variables.$font-size-4;
  }

  h4 {
    font-size: variables.$font-size-3;
  }

  h5 {
    font-size: variables.$font-size-2;
  }

  h6 {
    font-size: variables.$font-size-1;
  }

  /* Prose */
  p {
    line-height: variables.$line-height-relaxed;
    $baseline-multiplier: 0.179;
    $x-height-multiplier: 0.35;
    margin: variables.$spacing-0 variables.$spacing-0 variables.$spacing-4 variables.$spacing-0;
    padding: variables.$spacing-0;
  }

  ul,
  ol {
    margin-left: variables.$spacing-0;
    margin-right: variables.$spacing-0;
    padding: variables.$spacing-0;
    margin-bottom: variables.$spacing-8;
    list-style-position: inside;
    list-style-image: none;
  }

  li p {
    display: inline;
  }

  ul li,
  ol li {
    padding-left: variables.$spacing-0;
    margin-bottom: math.div(variables.$spacing-8, 2);
  }

  li > p {
    margin-bottom: math.div(variables.$spacing-8, 2);
  }

  li *:last-child {
    margin-bottom: variables.$spacing-0;
  }

  li > ul {
    margin-left: variables.$spacing-8;
    margin-top: math.div(variables.$spacing-8, 2);
  }

  blockquote {
    color: variables.$color-theme-4;
    margin-left: calc(#{-1 + variables.$spacing-6});
    margin-right: variables.$spacing-8;
    padding: variables.$spacing-0 variables.$spacing-0 variables.$spacing-0 variables.$spacing-6;
    border-left: variables.$spacing-1 solid variables.$color-primary;
    font-size: variables.$font-size-2;
    font-style: italic;
    margin-bottom: variables.$spacing-8;
  }

  blockquote > :last-child {
    margin-bottom: variables.$spacing-0;
  }

  blockquote > ul,
  blockquote > ol {
    list-style-position: inside;
  }

  table {
    width: 100%;
    margin-bottom: variables.$spacing-8;
    border-collapse: collapse;
    border-spacing: 0.25rem;
  }

  table thead tr th {
    border-bottom: 1px solid variables.$color-accent;
  }

  /* Link */
  a {
    color: variables.$color-theme-4;
  }

  a,
  button {
    // browser will not anticipate double click so proceeds with action quicker (300 ms quicker)
    touch-action: manipulation;
  }

  button:focus,
  button:hover {
    cursor: pointer;
  }

  h1 > a {
    color: inherit;
    text-decoration: none;
  }
  h2 > a,
  h3 > a,
  h4 > a,
  h5 > a,
  h6 > a {
    text-decoration: none;
    color: inherit;
  }

  a:hover,
  a:focus {
    text-decoration: none;
  }

  figure {
    margin-bottom: variables.$spacing-6;
    padding-bottom: variables.$spacing-6;
  }

  figure figcaption {
    margin-top: variables.$spacing-2;
  }

  /* Media queries */
  @media (max-width: variables.$desktop-breakpoint) {
    h1 {
      font-size: variables.$mobile-font-size-6;
    }

    h2 {
      font-size: variables.$mobile-font-size-5;
    }

    h3 {
      font-size: variables.$mobile-font-size-4;
    }

    h4 {
      font-size: variables.$mobile-font-size-3;
    }

    h5 {
      font-size: variables.$mobile-font-size-2;
    }

    h6 {
      font-size: variables.$mobile-font-size-1;
    }

    blockquote {
      padding: variables.$spacing-0 variables.$spacing-0 variables.$spacing-0 variables.$spacing-4;
      margin-left: variables.$spacing-0;
    }
    ul,
    ol {
      list-style-position: inside;
    }
  }
</style>

# Taking String Arguments in Rust

_Posted on Tue 24 December 2019 in Code_

$f(x) = x^2$

Strings of text seem to always be a complicated topic when it comes to programming. This counts double for low-level languages which expose the programmer to the full complexity of memory management and allocation.

Rust is, obviously, one of those languages. Strings in Rust are therefore represented using two distinct types: `str` (the string slice) and `String` (the owned/allocated string). Learning how to juggle those types is something you need to do very early if you want to be productive in the language.

But even after you’ve programmed in Rust for some time, you may still trip on some more subtle issues with string handling. In this post, I will concentrate on just one common task: writing a function that takes a string argument. We’ll see that even there, we can encounter a fair number of gotchas.

## Just Reading It

Let’s start with a simple case: a function which merely reads its string argument:

```rust
fn hello(name: &str) {
    println!("Hello, {}!", name);
}
```

As you’re probably well aware, using `str` rather than `String` is the idiomatic approach here. Because a `&str` reference is essentially an address + length, it can point to any string wheresoever: a `'static` literal, a heap-allocated `String`, or any portion or substring thereof:

```rust
hello("world");
hello(&String::from("Alice"));
hello(&"Dennis Ritchie"[0..6]);
```

Contrast this with an argument of type `&String`:

```rust
fn hello(name: &String) {
    println!("Hello, {}!", name);
}
```

This mandates an actual, full-blown `String` object:

```rust
hello(&String::from("Bob"));
// (the other examples won't work)
```

There are virtually no circumstances when you would want to do this, as it potentially forces the caller to needlessly put the string on the heap. Even if you anticipate all function calls to involve actual `String` objects, the automatic Deref coercion from `&String` to `&str` should still allow you to use the more universal, `str`-based API.

## Hiding the Reference

If `rustc` can successfully turn a `&String` into `&str`, then perhaps it should also be possible to simply use `String` when that’s more convenient?

In general, this kind of “reverse Deref” doesn’t happen in Rust outside of method calls with `&self`. It seems, however, that it would sometimes be desirable; one reasonable use case involves chains of iterator adapters, most importantly `map` and `for_each`:

```rust
let strings: Vec<String> = vec!["Alice".into(), "Bob".into()];
strings.into_iter().for_each(hello);
```

Since the compiler doesn’t take advantage of `Deref` coercions when inferring closure types, their argument types have to match exactly. As a result, we often need explicit `|x| foo(x)` closures which suffer from poorer readability in long `Iterator` or `Stream`-based expressions.

We can make the above code work — and also retain the ability to make calls like `hello("Charlie");` — by using one of the built-in traits that generalize over the borrowing relationships. The one that works best for accepting string arguments is called `AsRef`:

```rust
fn hello<N: AsRef<str>>(name: N) {
    println!("Hello, {}!", name.as_ref());
}
```

Its sole method, `AsRef::as_ref`, returns a reference to the trait’s type parameter. In the case above, that reference will obviously be of type `&str`, which circles back to our initial example, one with a direct `&str` argument.

The difference is, however, that `AsRef<str>` is implemented for all interesting string types — both in their owned and borrowed versions. This obviates the need for `Deref` coercions and makes the API more convenient.

## Own It

Things get a little more complicated when the string parameter is needed for more than just reading. For storage and potential mutation, a `&str` reference is not enough: you need an actual, full-blown `String` object.

Now, you may think this is not a huge obstacle. After all, it’s pretty easy to “turn” `&str` into a `String`:

```rust
struct Greetings {
    Vec<String> names,
}

impl Greetings {
    // Don't do this!
    pub fn hello(&mut self, name: &str) {
        self.names.push(name.clone());
    }
}
```

But I strongly advise against this practice, at least in public APIs. If you expose such a function to your users, you are essentially tricking them into thinking their input will only ever be read, not copied, which has implications on both performance and memory usage.

Instead, if you need to take ownership of the resulting `String`, it is much better to indicate this in the function signature directly:

```rust
pub fn hello(&mut self, name: String) {
    self.names.push(name);
}
```

This shifts the burden of creating the `String` onto the caller, but that’s not necessarily a bad thing. On their side, the added boilerplate can be pretty minimal:

```rust
let mut greetings = Greetings::new();
greetings.hello(String::from("Dylan"));  // uhm...
greetings.hello("Eva".to_string());      // somewhat better...
greetings.hello("Frank".to_owned());     // not too bad
greetings.hello("Gene".into());          // good enough
```

While clearly indicating where the memory allocation happens.
