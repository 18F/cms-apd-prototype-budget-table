import updeep from 'updeep';
import { IAPD, Projects, Requests } from '../actions';

const randomID = (function createRandomIDFunction() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');
  return () => {
    let id = '';
    for (let i = 0; i < 8; i += 1) {
      id += letters[Math.floor(Math.random() * letters.length)];
    }
    return id;
  };
}());

const emptyRequest = {
  id: false,
  state: '',
  status: 'Draft',
  revision: 1,
  reviewRemaining: 'N/A',
  executiveSummary: {
    problem: '',
    vision: '',
    time: 0,
    cost: 0
  },
  plan: {
    vision: '',
    outcomes: [{
      id: randomID(),
      title: '',
      metrics: ''
    }, {
      id: randomID(),
      title: '',
      metrics: ''
    }, {
      id: randomID(),
      title: '',
      metrics: ''
    }]
  },
  milestones: [{
    id: randomID(),
    description: '',
    activities: '',
    associatedOutcomes: [],
    mitaAreas: [],
    cost: 0,
    defineSuccess: ''
  }],
  budget: [{
    ffy: 0,
    ddi: {
      ffp90: 0,
      state10: 0,
      ffp75: 0,
      state25: 0,
      total: 0,
      categories: [{
        id: randomID(),
        category: 'Category I (e.g., coding & development)',
        inhouse: null,
        ffp90: 0,
        state10: 0,
        ffp75: 0,
        state25: 0,
        total: 0
      }, {
        id: randomID(),
        category: 'Category II',
        inhouse: null,
        ffp90: 0,
        state10: 0,
        ffp75: 0,
        state25: 0,
        total: 0
      }, {
        id: randomID(),
        category: 'Category III',
        inhouse: null,
        ffp90: 0,
        state10: 0,
        ffp75: 0,
        state25: 0,
        total: 0
      }, {
        id: randomID(),
        category: 'Category IV',
        inhouse: null,
        ffp90: 0,
        state10: 0,
        ffp75: 0,
        state25: 0,
        total: 0
      }]
    },
    om: {
      ffp75: 0,
      state25: 0,
      ffp50: 0,
      state50: 0,
      total: 0,
      categories: [{
        id: randomID(),
        category: 'Category I',
        inhouse: null,
        ffp75: 0,
        state25: 0,
        ffp50: 0,
        state50: 0,
        total: 0
      }, {
        id: randomID(),
        category: 'Category II',
        inhouse: null,
        ffp75: 0,
        state25: 0,
        ffp50: 0,
        state50: 0,
        total: 0
      }, {
        id: randomID(),
        category: 'Category III',
        inhouse: null,
        ffp75: 0,
        state25: 0,
        ffp50: 0,
        state50: 0,
        total: 0
      }, {
        id: randomID(),
        category: 'Category IV',
        inhouse: null,
        ffp75: 0,
        state25: 0,
        ffp50: 0,
        state50: 0,
        total: 0
      }]
    },
    mechanizedSystems: {
      ffp50: 0,
      state50: 0,
      total: 0,
      categories: [{
        id: randomID(),
        category: 'Category I',
        inhouse: null,
        ffp50: 0,
        state50: 0,
        total: 0
      }, {
        id: randomID(),
        category: 'Category II',
        inhouse: null,
        ffp50: 0,
        state50: 0,
        total: 0
      }, {
        id: randomID(),
        category: 'Category III',
        inhouse: null,
        ffp50: 0,
        state50: 0,
        total: 0
      }, {
        id: randomID(),
        category: 'Category IV',
        inhouse: null,
        ffp50: 0,
        state50: 0,
        total: 0
      }]
    }
  }],
  staffing: {
    director: {
      name: '',
      email: '',
      percentTime: 0,
      responsibilities: ''
    },
    keyStaff: [{
      name: '',
      email: '',
      percentTime: 0,
      responsibilities: ''
    }],
    other: {
      neededSkills: '',
      internalStaff: 0,
      externalStaff: 0,
      anyCostAllocated: null,
      costAllocatedStaff: 0,
      totalAllocationCosts: 0,
      costAllocationMethodologies: ''
    }
  }
};

const stateShape = {
  currentRequest: emptyRequest,
  openRequests: false,
  projects: false
};

export default function reducer(state = stateShape, action) {
  let newState = state;

  switch (action.type) {
    case IAPD.messages.UPDATE_EXECUTIVE_SUMMARY:
      newState = updeep({ currentRequest: { executiveSummary: action.executiveSummary } }, newState);
      break;

    case IAPD.messages.UPDATE_PROJECT_PLAN:
      newState = updeep({ currentRequest: { plan: action.projectPlan } }, newState);
      break;

    case IAPD.messages.UPDATE_PROJECT_MILESTONES:
      newState = updeep({ currentRequest: { milestones: action.milestones } }, newState);
      break;

    case IAPD.messages.UPDATE_BUDGET_DDI_CATEGORY:
      {
        const categoryUpdate = { [action.category]: action.values };
        newState = updeep({ currentRequest: { budget: { [action.budget]: { ddi: { categories: categoryUpdate } } } } }, newState);

        // Update DDI totals too
        let ffp90 = 0;
        let state10 = 0;
        let ffp75 = 0;
        let state25 = 0;
        let total = 0;

        for (const category of newState.currentRequest.budget[action.budget].ddi.categories) {
          ffp90 += category.ffp90;
          state10 += category.state10;
          ffp75 += category.ffp75;
          state25 += category.state25;
          total += category.total;
        }

        newState = updeep({ currentRequest: { budget: { [action.budget]: { ddi: { ffp90, state10, ffp75, state25, total } } } } }, newState);
      }
      break;

    case IAPD.messages.UPDATE_BUDGET_OM_CATEGORY:
      {
        const categoryUpdate = { [action.category]: action.values };
        newState = updeep({ currentRequest: { budget: { [action.budget]: { om: { categories: categoryUpdate } } } } }, newState);

        // Update O&M totals too
        let ffp75 = 0;
        let state25 = 0;
        let ffp50 = 0;
        let state50 = 0;
        let total = 0;

        for (const category of newState.currentRequest.budget[action.budget].om.categories) {
          ffp75 += category.ffp75;
          state25 += category.state25;
          ffp50 += category.ffp50;
          state50 += category.state50;
          total += category.total;
        }

        newState = updeep({ currentRequest: { budget: { [action.budget]: { om: { ffp75, state25, ffp50, state50, total } } } } }, newState);
      }
      break;

    case IAPD.messages.UPDATE_BUDGET_MECH_CATEGORY:
      {
        const categoryUpdate = { [action.category]: action.values };
        newState = updeep({ currentRequest: { budget: { [action.budget]: { mechanizedSystems: { categories: categoryUpdate } } } } }, newState);

        // Update mechanized systems totals too
        let ffp50 = 0;
        let state50 = 0;
        let total = 0;

        for (const category of newState.currentRequest.budget[action.budget].mechanizedSystems.categories) {
          ffp50 += category.ffp50;
          state50 += category.state50;
          total += category.total;
        }

        newState = updeep({ currentRequest: { budget: { [action.budget]: { mechanizedSystems: { ffp50, state50, total } } } } }, newState);
      }
      break;

    case IAPD.messages.ADD_PROJECT_OUTCOME:
      {
        const outcomes = [...newState.currentRequest.plan.outcomes];
        outcomes.push({
          id: randomID(),
          title: '',
          metrics: ''
        });
        newState = updeep({ currentRequest: { plan: { outcomes } } }, newState);
      }
      break;

    case IAPD.messages.ADD_PROJECT_MILESTONE:
      {
        const milestones = [...newState.currentRequest.milestones];
        milestones.push({
          id: randomID(),
          description: '',
          activities: '',
          associatedOutcomes: [],
          mitaAreas: [],
          cost: 0,
          defineSuccess: ''
        });
        newState = updeep({ currentRequest: { milestones } }, newState);
      }
      break;

    case IAPD.messages.ADD_BUDGET_DDI_CATEGORY:
      {
        const categories = [...newState.currentRequest.budget[action.budget].ddi.categories];
        categories.push({
          id: randomID(),
          category: '',
          inhouse: null,
          ffp90: 0,
          state10: 0,
          ffp75: 0,
          state25: 0,
          total: 0
        });
        newState = updeep({ currentRequest: { budget: { [action.budget]: { ddi: { categories } } } } }, newState);
      }
      break;

    case IAPD.messages.ADD_BUDGET_OM_CATEGORY:
      {
        const categories = [...newState.currentRequest.budget[action.budget].om.categories];
        categories.push({
          id: randomID(),
          category: '',
          inhouse: null,
          ffp75: 0,
          state25: 0,
          ffp50: 0,
          state50: 0,
          total: 0
        });
        newState = updeep({ currentRequest: { budget: { [action.budget]: { om: { categories } } } } }, newState);
      }
      break;

    case IAPD.messages.ADD_BUDGET_MECH_CATEGORY:
      {
        const categories = [...newState.currentRequest.budget[action.budget].mechanizedSystems.categories];
        categories.push({
          id: randomID(),
          category: '',
          inhouse: null,
          ffp50: 0,
          state50: 0,
          total: 0
        });
        newState = updeep({ currentRequest: { budget: { [action.budget]: { mechanizedSystems: { categories } } } } }, newState);
      }
      break;

    case Requests.messages.START_NEW_REQUEST:
      newState = updeep({ currentRequest: emptyRequest }, newState);
      break;

    case Projects.messages.SET_PROJECTS:
      newState = updeep({ projects: action.projects }, newState);
      break;

    case Requests.messages.SET_CURRENT_REQUEST:
      newState = updeep({ currentRequest: action.request }, newState);
      break;

    case Requests.messages.SET_OPEN_REQUESTS:
      newState = updeep({ openRequests: action.requests }, newState);
      break;

    case Requests.messages.UPDATE_COST:
      newState = updeep({ currentRequest: { costs: { [action.property]: action.value } } }, newState);
      break;

    default:
      break;
  }

  return newState;
}
