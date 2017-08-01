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

export default {
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
  },
  papdSummary: {
    outcomes: '',
    expenditureStatus: ''
  }
};
