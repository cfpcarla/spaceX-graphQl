import { ApolloProvider, useQuery, gql,  } from '@apollo/client';
import { apolloClient } from './apollo';
import * as React from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, FlatList } from 'react-native';
import AccordionListItem from './components/AccordionListItem';
import TopBar from './components/TopBar';

//QUERY to get the rockets 
const rockets = gql`
query rockets {
  rockets {
    id
    name
    mission {
      name
      launchDateLocal
      launchSuccess
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

  const accordions = (rocket) => {
    console.log(rocket)
    return (
      <>
        <AccordionListItem style={styles.text}  title={rocket.item.name} >
          <Image style={styles.tinyLogo} source={rocket.item.mission.missionPatchSmall}/>
          <Text style={styles.text2}>Mission Name: {rocket.item.mission.name}{console.log(rocket.item.mission)} </Text>
          <Text style={styles.text2}>Start Mission: {new Date(rocket.item.mission.launchDateLocal).toString()}</Text> 
          <Text style={styles.text2}>Mission Success: {rocket.item.mission.launchSuccess ? 'Success' : 'Failure'}</Text> 
          <Text style={styles.text2}>Mission Failure Details: {rocket.item.mission.launchFailureDetails  ? rocket.item.mission.launchFailureDetails : 'N/A'}</Text>
          <Text style={styles.text2}>Site name: {rocket.item.site.name}</Text>
        </AccordionListItem> 
      </>
    )
  }
  console.log(data.rockets)
  return ( 
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data.rockets}
        renderItem={accordions}
        keyExtractor={rocket => rocket.id}
      />
    </SafeAreaView>
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



