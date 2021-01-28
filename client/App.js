import React, { useState } from 'react';
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import { apolloClient } from './apollo';



export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      xunda
    </ApolloProvider>
  );
}

// Imperial I-class Star Destroyer
const defaultStarshipId = 'c3RhcnNoaXBzOjM=';



