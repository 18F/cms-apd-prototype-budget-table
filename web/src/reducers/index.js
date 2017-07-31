import updeep from 'updeep';
import { IAPD, Projects, Requests } from '../actions';

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
      title: '',
      metrics: ''
    }, {
      title: '',
      metrics: ''
    }, {
      title: '',
      metrics: ''
    }]
  },
  milestones: [{
    id: 'temp-1',
    description: '',
    activities: '',
    associatedOutcome: '',
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
        category: 'Category I (e.g., coding & development)',
        inhouse: null,
        ffp90: 0,
        state10: 0,
        ffp75: 0,
        state25: 0,
        total: 0
      }, {
        category: 'Category II',
        inhouse: null,
        ffp90: 0,
        state10: 0,
        ffp75: 0,
        state25: 0,
        total: 0
      }, {
        category: 'Category III',
        inhouse: null,
        ffp90: 0,
        state10: 0,
        ffp75: 0,
        state25: 0,
        total: 0
      }, {
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
        category: 'Category I',
        inhouse: null,
        ffp75: 0,
        state25: 0,
        ffp50: 0,
        state50: 0,
        total: 0
      }, {
        category: 'Category II',
        inhouse: null,
        ffp75: 0,
        state25: 0,
        ffp50: 0,
        state50: 0,
        total: 0
      }, {
        category: 'Category III',
        inhouse: null,
        ffp75: 0,
        state25: 0,
        ffp50: 0,
        state50: 0,
        total: 0
      }, {
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
        category: 'Category I',
        inhouse: null,
        ffp50: 0,
        state50: 0,
        total: 0
      }, {
        category: 'Category II',
        inhouse: null,
        ffp50: 0,
        state50: 0,
        total: 0
      }, {
        category: 'Category III',
        inhouse: null,
        ffp50: 0,
        state50: 0,
        total: 0
      }, {
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
