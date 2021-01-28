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
const rocket = gql`
  query Lauch {
    rockets{
    id
    name 
    mission {
      name
    lauchDateLocal
    landSuccess
    launchFailureDetails   
   
    } 
  }
  }
`;

//Caching query results
function Rockets({ onRocketSelected }) {
  const { loading, error, data } = useQuery(rockets);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <select name="rockets" onChange={onRocketSelected}>
      {data.mission.map(Mission => (
        <option key={rockets.id} value={rockets.name}>
           {lauch.mission_name} {lauch.lauchDateLocal} {lauch.land_success} {lauch.launchFailureDetails}
        </option>
      ))}
    </select>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '2rem',
    paddingTop: '5rem',
    justifyContent: 'flex-start',
    color:"#ffe4f2"
  },
});



//APP
const App = () => {

  return (
      <View style={styles.container}>
        <ApolloProvider client={apolloClient}>
        <AccordionListItem  title={'List Item'} >
          <Text>Some body text!</Text>
        </AccordionListItem>  
    </ApolloProvider>
      </View>
  );
};
export default App;

// Imperial I-class Star Destroyer
const defaultStarshipId = 'c3RhcnNoaXBzOjM=';



