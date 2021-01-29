// import React, { useState } from 'react';
import { ApolloProvider, useQuery, gql,  } from '@apollo/client';
import { apolloClient } from './apollo';
import * as React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import AccordionListItem from './components/AccordionListItem';
// import NavigationBar from 'react-native-navbar';


//QUERY to get the missions 
const rockets = gql`
query rockets {
  rockets {
    id
    name
    mission {
      name
      launchDateLocal
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
          <Text>Mission Name: {eachRocket.mission.name}{console.log(eachRocket.mission)} </Text>
         <Text>Launch Date: {eachRocket.mission.launchDateLocal}</Text> 
         <Text>Land Success: {eachRocket.mission.landSuccess}</Text> 
         <Text>launch Failure Details: {eachRocket.mission.launchFailureDetails}</Text>
         <Text>Site name: {eachRocket.site.name}</Text>
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



