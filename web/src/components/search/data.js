export const states = {
  AL: 'Alabama',
  AK: 'Alaska',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  FL: 'Florida',
  GA: 'Georgia',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersy',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PA: 'Pennsylvania',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming'
};

const actions = ['Build', 'Buy', 'Replace', 'Create', 'Design', 'Provide'];
const things = ['MMIS module', 'component', 'module', 'MMIS component', 'system', 'software', 'MMIS software', 'web application'];
const thats = ['tracks participant claims', 'holds provider data', 'tracks provider claims', 'tracks payments', 'helps participants enroll', 'shows participants their status'];
const vendors = ['Deloitte', 'Oracle', 'Microsoft', 'IBM', 'General Dynamics', 'Booz Allen Hamilton', 'CGI Federal', 'HP Enterprise Services', 'Accenture'];
const stateAbbreviations = Object.keys(states);

const randomProjects = [];
for (let i = 0; i < 150; i += 1) {
  const state = states[stateAbbreviations[Math.floor(Math.random() * 50)]];
  const vendorCount = Math.floor(Math.random() * 5) + 1;

  const vendorList = [];
  for (let j = 0; j < vendorCount; j += 1) {
    let vendor = vendors[Math.floor(Math.random() * vendors.length)];
    while (vendorList.includes(vendor)) {
      vendor = vendors[Math.floor(Math.random() * vendors.length)];
    }
    vendorList.push(vendor);
  }

  randomProjects.push({
    id: `${i + 1}`,
    name: `${actions[Math.floor(Math.random() * actions.length)]} ${things[Math.floor(Math.random() * things.length)]} that ${thats[Math.floor(Math.random() * thats.length)]}`,
    state,
    financials: {
      total: Math.round(Math.random() * 2500000000) / 100
    },
    vendors: vendorList
  });
}

export const projects = randomProjects;
// [{
//   id: '1',
//   name: 'Provide puppies to every sick child',
//   state: 'Idaho',
//   financials: {
//     total: 500000
//   },
//   vendors: ['IBM', 'Deloitte', 'PetSmart']
// }, {
//   id: '2',
//   name: 'Replace module of MMIS that tracks participants',
//   state: 'Iowa',
//   financials: {
//     total: 5000000
//   },
//   vendors: ['Deloitte', 'Microsoft', 'Oracle']
// }];

export default { states, projects };
