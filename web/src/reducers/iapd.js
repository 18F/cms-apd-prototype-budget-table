import updeep from 'updeep';
import shape from './shape/';
import { IAPD } from '../actions';

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

export default (state = shape.request(), action) => {
  let newState = state;

  switch (action.type) {
    case IAPD.messages.UPDATE_EXECUTIVE_SUMMARY:
      newState = updeep({ executiveSummary: action.executiveSummary }, newState);
      break;

    case IAPD.messages.UPDATE_PROJECT_PLAN:
      newState = updeep({ plan: action.projectPlan }, newState);
      break;

    case IAPD.messages.UPDATE_PROJECT_MILESTONES:
      newState = updeep({ milestones: action.milestones }, newState);
      break;

    case IAPD.messages.UPDATE_BUDGET_FFY:
      newState = updeep({ budget: { [action.budget]: { ffy: action.ffy } } }, newState);
      break;

    case IAPD.messages.UPDATE_BUDGET_DDI_CATEGORY:
      {
        const categoryUpdate = { [action.category]: action.values };
        newState = updeep({ budget: { [action.budget]: { ddi: { categories: categoryUpdate } } } }, newState);

        // Update DDI totals too
        let ffp90 = 0;
        let state10 = 0;
        let ffp75 = 0;
        let state25 = 0;
        let total = 0;

        for (const category of newState.budget[action.budget].ddi.categories) {
          ffp90 += category.ffp90;
          state10 += category.state10;
          ffp75 += category.ffp75;
          state25 += category.state25;
          total += category.total;
        }

        newState = updeep({ budget: { [action.budget]: { ddi: { ffp90, state10, ffp75, state25, total } } } }, newState);
      }
      break;

    case IAPD.messages.UPDATE_BUDGET_OM_CATEGORY:
      {
        const categoryUpdate = { [action.category]: action.values };
        newState = updeep({ budget: { [action.budget]: { om: { categories: categoryUpdate } } } }, newState);

        // Update O&M totals too
        let ffp75 = 0;
        let state25 = 0;
        let ffp50 = 0;
        let state50 = 0;
        let total = 0;

        for (const category of newState.budget[action.budget].om.categories) {
          ffp75 += category.ffp75;
          state25 += category.state25;
          ffp50 += category.ffp50;
          state50 += category.state50;
          total += category.total;
        }

        newState = updeep({ budget: { [action.budget]: { om: { ffp75, state25, ffp50, state50, total } } } }, newState);
      }
      break;

    case IAPD.messages.UPDATE_BUDGET_MECH_CATEGORY:
      {
        const categoryUpdate = { [action.category]: action.values };
        newState = updeep({ budget: { [action.budget]: { mechanizedSystems: { categories: categoryUpdate } } } }, newState);

        // Update mechanized systems totals too
        let ffp50 = 0;
        let state50 = 0;
        let total = 0;

        for (const category of newState.budget[action.budget].mechanizedSystems.categories) {
          ffp50 += category.ffp50;
          state50 += category.state50;
          total += category.total;
        }

        newState = updeep({ budget: { [action.budget]: { mechanizedSystems: { ffp50, state50, total } } } }, newState);
      }
      break;

    case IAPD.messages.UPDATE_STAFFING_DIRECTOR:
      newState = updeep({ staffing: { director: action.director } }, newState);
      break;

    case IAPD.messages.UPDATE_STAFFING_KEY_STAFF:
      newState = updeep({ staffing: { keyStaff: { [action.person]: action.staff } } }, newState);
      break;

    case IAPD.messages.UPDATE_STAFFING_OTHER:
      newState = updeep({ staffing: { other: action.other } }, newState);
      break;

    case IAPD.messages.UPDATE_PAPD_SUMMARY:
      newState = updeep({ papdSummary: action.papdSummary }, newState);
      break;

    case IAPD.messages.ADD_PROJECT_OUTCOME:
      {
        const outcomes = [...newState.plan.outcomes];
        outcomes.push({
          id: randomID(),
          title: '',
          metrics: ''
        });
        newState = updeep({ plan: { outcomes } }, newState);
      }
      break;

    case IAPD.messages.ADD_PROJECT_MILESTONE:
      {
        const milestones = [...newState.milestones];
        milestones.push({
          id: randomID(),
          description: '',
          activities: '',
          associatedOutcomes: [],
          mitaAreas: [],
          cost: 0,
          defineSuccess: ''
        });
        newState = updeep({ milestones }, newState);
      }
      break;

    case IAPD.messages.ADD_BUDGET_DDI_CATEGORY:
      {
        const categories = [...newState.budget[action.budget].ddi.categories];
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
        newState = updeep({ budget: { [action.budget]: { ddi: { categories } } } }, newState);
      }
      break;

    case IAPD.messages.ADD_BUDGET_OM_CATEGORY:
      {
        const categories = [...newState.budget[action.budget].om.categories];
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
        newState = updeep({ budget: { [action.budget]: { om: { categories } } } }, newState);
      }
      break;

    case IAPD.messages.ADD_BUDGET_MECH_CATEGORY:
      {
        const categories = [...newState.budget[action.budget].mechanizedSystems.categories];
        categories.push({
          id: randomID(),
          category: '',
          inhouse: null,
          interagency: null,
          ffp50: 0,
          state50: 0,
          total: 0
        });
        newState = updeep({ budget: { [action.budget]: { mechanizedSystems: { categories } } } }, newState);
      }
      break;

    case IAPD.messages.ADD_BUDGET_FFY:
      {
        const budget = [...newState.budget];
        budget.push({
          id: randomID(),
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
        });
        newState = updeep({ budget }, newState);
      }
      break;

    case IAPD.messages.ADD_STAFF_KEY_STAFF:
      {
        const keyStaff = [...newState.staffing.keyStaff];
        keyStaff.push({
          id: randomID(),
          name: '',
          email: '',
          percentTime: 0,
          responsibilities: ''
        });
        newState = updeep({ staffing: { keyStaff } }, newState);
      }
      break;

    default:
      break;
  }

  return newState;
};
