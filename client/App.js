// import React, { useState } from 'react';
import { ApolloProvider, useQuery, gql,  } from '@apollo/client';
import { apolloClient } from './apollo';
import { render } from 'react-dom';

import * as React from 'react';
import { SafeAreaView, Text, View, StyleSheet} from 'react-native';
import Constants from 'expo-constants';
import AccordionListItem from './components/AccordionListItem';
// import NavigationBar from 'react-native-navbar';


//QUERIE for get the missions 
const rockets = gql`
query rockets {
  rockets {
    id
    name
    mission {
      name
      lauchDateLocal
      landSuccess
      launchFailureDetails
    }
    site {
      name
    }
  }
}
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2rem',
    paddingTop: '5rem',
    justifyContent: 'flex-start',
    color:"#ffe4f2"
  },
});

// Caching query results
function Rockets() {
  const { loading, error, data } = useQuery(rockets);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  console.log("xunda  ",data.rockets)
  return ( 
    <>
      {data.rockets.map(eachRocket => (
        <AccordionListItem  title={eachRocket.name} >
          <Text>{eachRocket.mission.name} {eachRocket.mission.lauchDateLocal} {eachRocket.mission.landSuccess} {eachRocket.mission.launchFailureDetails} {eachRocket.site.name}</Text>
      </AccordionListItem> 
      ))}
    </>
  )
}
    
 //APP
const App = () => {

return (
  <View style={styles.container}>
    <ApolloProvider client={apolloClient}>
      <Rockets />
    </ApolloProvider>
  </View>
  );
};
export default App;

// Imperial I-class Star Destroyer
const defaultStarshipId = 'c3RhcnNoaXBzOjM=';



