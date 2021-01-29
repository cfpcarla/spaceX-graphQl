import { ApolloProvider, useQuery, gql,  } from '@apollo/client';
import { apolloClient } from './apollo';
import * as React from 'react';
import { Text, View, StyleSheet, Image} from 'react-native';
import AccordionListItem from './components/AccordionListItem';
import TopBar from './components/TopBar';

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
      missionPatchSmall
    }
    site {
      name
    }
  }
}
`;

//Style
const styles = StyleSheet.create({
  container: {
    paddingTop: '5rem',
    justifyContent: 'flex-start',
    color:"#ffe4f2", 
  },
  text: {
    color: 'white',
    fontSize: 'xx-large',
    fontFamily: 'fantasy'
  },
  text2: {
    color: 'purple',
    fontSize: 'large',
    fontFamily: 'fantasy',
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
});

// Caching query results
function Rockets() {
  const { loading, error, data } = useQuery(rockets);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
  return ( 
    <>
      {data.rockets.map(eachRocket => ( 
        <AccordionListItem style={styles.text}  title={eachRocket.id} >
          <Image style={styles.tinyLogo} source={eachRocket.mission.missionPatchSmall}/>
          <Text style={styles.text2} >Mission Name: {eachRocket.mission.name}{console.log(eachRocket.mission)} </Text>
         <Text style={styles.text2}>Start Mission: {eachRocket.mission.launchDateLocal}</Text> 
         <Text style={styles.text2}>Mission Success: {eachRocket.mission.landSuccess}</Text> 
         <Text style={styles.text2}>Mission  Failure Details: {eachRocket.mission.launchFailureDetails}</Text>
         <Text style={styles.text2}>Site name: {eachRocket.site.name}</Text>
      </AccordionListItem> 
      ))}
    </>
  )
}

 //APP
const App = () => {
return (
  <View style={styles.container}>
        <View style={styles.statusBar} />
        <TopBar></TopBar>  
    <ApolloProvider client={apolloClient}>
      <Rockets />
    </ApolloProvider>
  </View>
  );
};
export default App;

// Imperial I-class Star Destroyer
const defaultStarshipId = 'c3RhcnNoaXBzOjM=';



