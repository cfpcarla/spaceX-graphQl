const { RESTDataSource } = require('apollo-datasource-rest');

class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.spacexdata.com/v2/';
  }

  // Create a rocket object although it is based on a launch
  rocketReducer(launch) {
    return {
      id: launch.rocket.rocket_id,
      mission: {
        name: launch.mission_name,
        launchDateLocal: launch.launch_date_local,
        landSuccess: launch.land_success,
        launchFailureDetails: launch.launch_failure_details.reason 
      }
    }
  };

  // Group launches by rocket id
  groupRockets(launches) {
    const launchesByRocket = new Map();
    let rocketId, rocketLaunches;
    launches.forEach((launch) => {
      rocketId = launch.rocket.rocket_id;
      rocketLaunches = launchesByRocket.get(rocketId);
      if (!rocketLaunches) {
        launchesByRocket.set(rocketId, launch);
      } else {
        // To simplify the project, I'll use only one launch per rocket
        // rocketLaunches.push(launch)
      }
    })
    return launchesByRocket;
  }

  // leaving this inside the class to make the class easier to test
  launchReducer(launch) {
    return {
      id: launch.flight_number || 0,
      cursor: `${launch.launch_date_local}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch,
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
        
      },
    };
  }

  async getAllRockets() {
    const response = await this.get('launches');

    if (Array.isArray(response)) {
      const launchesPerRocket = Array.from(this.groupRockets(response).values());
      const result = launchesPerRocket.map(launch => this.rocketReducer(launch))

      return result
    } else {
      return []
    }
  }

  async getAllLaunches() {
    const response = await this.get('launches');

    // transform the raw launches to a more friendly
    return Array.isArray(response)
      ? response.map(launch => this.launchReducer(launch)) : [];
  }

  async getLaunchById({ launchId }) {
    const res = await this.get('launches', { flight_number: launchId });
    return this.launchReducer(res[0]);
  }

  async getLaunchesByIds({ launchIds }) {
    return Promise.all(
      launchIds.map(launchId => this.getLaunchById({ launchId })),
    );
  }
}

module.exports = LaunchAPI;
