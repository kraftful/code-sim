# Kraftful's GraphQL Code Sim

👋 Hello future Kraftsperson!

This repo contains a minimal GraphQL server we use as a starting point for a code sim as part of our hiring process.

If you've found this repo on your own and are curious what Kraftful is all about, check out our [website](https://www.kraftful.com/)! If you're interested in learning more, email us at [jobs@kraftful.com](mailto:jobs@kraftful.com).

Ready to get started?

## Up and running

Clone this repo and install the (few) dependencies:

```
$ git clone git@github.com:kraftful/code-sim.git
$ cd code-sim
$ yarn install
```

You should now be able to launch the GraphQL server:

```
$ yarn start
```

## Your first query

Once the server is running, you can navigate to [localhost:4000](http://localhost:4000/) where you should see the [GraphQL Playground](https://www.apollographql.com/docs/apollo-server/testing/graphql-playground/).

Try out the following query:

```
query {
  light {
    name
  }
}
```

You should get a result like:

```
{
  "data": {
    "light": {
      "name": "Reading Lamp"
    }
  }
}
```

🎉 You just ran a GraphQL query!

## Digging deeper

Experiment with what other types of queries you can perform. You can explore the schema by clicking the "Docs" tab.

Some ideas of what to try:

- Get the light's color value
- Turn the light off using the "turnOnOffLight" Mutation

## Additional Resources

There are a _ton_ of great resources online about GraphQL. Of note, the [Apollo GraphQL Tutorial](https://www.apollographql.com/docs/tutorial/introduction) and [Apollo Server](https://www.apollographql.com/docs/apollo-server/) docs are relevant to this repo. The [official GraphQL](https://graphql.org/learn/) docs also provide a helpful overview of GraphQL concepts and design decisions.
