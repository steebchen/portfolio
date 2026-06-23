---
title: 'Everyone warned us about scaling a TypeScript gateway'
description: 'A competitor wished us luck with high RPS. 100 billion tokens later, the runtime was the least of our problems.'
date: '2026-06-19'
slug: 'scaling-a-typescript-gateway'
---

When we launched [LLMGateway](https://llmgateway.io), a competitor wished us luck. Friendly, with just a hint of a smirk: _"Good luck with high RPS on a TypeScript proxy."_

It's the obvious bet. TypeScript, in front of every LLM call, on the hot path of a high-throughput proxy? Bold. Go rewrite incoming.

We're now moving around 100 billion tokens a month at over \$100k in spend. Here's the part nobody wants to hear: the runtime was the least of it.

## The thesis

The hot path — take a request, forward it to a provider, stream the response back — is cheap. It's a proxy. It barely touches CPU, holds almost nothing in memory, and Node streams bytes just fine. On our bill, the compute for actually handling requests is a rounding error.

The hard, slow, expensive engineering was everywhere _else_. Every interesting problem we hit turned out to be infrastructure, not language.

Let me walk you through where the time actually went.

## Metering 100 billion tokens

You can't bill what you can't count. Every request produces usage we have to record — tokens in, tokens out, cost, latency, model, key. At 100B tokens a month that's a firehose of writes into Postgres, and the naive approach (one insert per request, inside the request) was the first thing to fall over.

So the write path became the real project:

- **We pulled writes off the request path.** The proxy's job is to answer the user. Recording usage happens after, out of band, so a busy Postgres never slows down a completion.
- **We batch.** Instead of one insert per request, we buffer and flush in bulk — far fewer round trips, far less lock contention.
- **We added the indexes we actually query on**, and dropped the ones we didn't. The wrong index on a hot write table is a tax Postgres charges on every single insert.
- **We pre-aggregate.** Per-minute and per-day rollup tables mean the dashboard reads a handful of rows instead of scanning billions.

None of that is exotic. All of it took more thought than the proxy ever did.

## Surviving a database that isn't there

Here's the line that actually matters: the gateway has to keep proxying even when Postgres is having a bad day.

If the database hiccups — failover, a slow query pile-up, a connection storm — nobody should get a failed completion because of it. So the gateway scales independently of Postgres and treats it as best-effort: usage writes queue, degrade, and catch up later. The only thing that belongs in the request path is the request. Everything else can wait.

Making the gateway resilient to its own database failing bought us more reliability than any runtime swap ever could.

## Spending other people's money safely

A gateway holds the keys to real money, and a customer's runaway loop can burn thousands of dollars in minutes if you let it. So budgets and rate limits aren't a feature — they're a safety system. Enforced on the hot path, fast enough not to slow anyone down, strict enough that "oops, infinite loop" costs cents instead of a mortgage payment.

## When a provider falls over

Upstreams degrade. A model gets slow, a region starts erroring, a provider has an incident. The gateway has to notice and fail over so the customer's call still lands somewhere that works — detect, reroute, and don't retry yourself into a thundering herd. That was its own multi-week saga.

## Why TypeScript was the right call

Here's the thing the "good luck" crowd skips: TypeScript was never the cost. It was the leverage.

Everything we build is one TypeScript monorepo — the gateway, the dashboard, the public API, the billing logic. One language, one toolchain, pnpm and turbo, one mental model. An engineer can follow a request from the Next.js dashboard through the Hono API into the gateway without ever switching context or re-learning a stack. The types are shared end to end, so a breaking change to the gateway's contract shows up as a red squiggle in the dashboard before it ever ships.

Now picture the "fast" alternative: a separate, lower-level language for the gateway alone. Congratulations, you've bought a rounding error of per-core throughput — and signed up for a second toolchain, a second set of idioms, a second deploy and on-call story, a serialization boundary between the gateway and everything it shares, and a context-switch tax every engineer pays forever. That complexity is real, permanent, and compounding. The performance it buys back is theoretical and, for a proxy, mostly irrelevant.

TypeScript handled the throughput without breaking a sweat. It never became the constraint — and staying in one language is exactly what let us pour our time into the parts that did matter: the metering, the resilience, the budgets, the failover.

The runtime everyone fixates on is a rounding error — on the bill and on the calendar. The win wasn't picking a faster language. It was _not_ fragmenting the stack to chase a number that was never the bottleneck.

"Good luck with high RPS," it turns out, had almost nothing to do with RPS.

_I'll dig into the metering pipeline, budget enforcement, and provider failover in follow-up posts._
