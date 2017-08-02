require('./env');
const express = require('express');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

app.use('/schema', express.static('schema'));
app.use('/documentation', express.static('documentation'));

middleware(app);
routes(app);

// const db = require('./models');

// db.funding_request.findOne({ where: { id: 5 }}).then(fr => {
//   fr.getOutcomes().then(o => {
//     console.log(o[0].text);
//     o[0].getActivities().then(a => {
//       console.log(a);
//     })
//   })
// })

// const Project = db.project;
// Project.create({ projectID: 'FR-MMIS-2017-01', name: 'Participant webapp to view spenddown status', state: 'Franklin' });
// Project.create({ projectID: 'FR-MMIS-2017-02', name: 'Provider claims reporting functionality', state: 'Franklin' });

// const FundingRequest = db.funding_request;
// FundingRequest.create({ requestID: 'FR-MMIS-2017-01-R01', name: 'Initial DDI request', state: 'Franklin' });
// FundingRequest.create({ requestID: 'FR-MMIS-2017-01-R02', name: 'API procurement', state: 'Franklin' });
// FundingRequest.create({ requestID: 'FR-MMIS-2017-02-R01', name: 'Initial DDI request', state: 'Franklin' });
// FundingRequest.create({ requestID: 'FR-MMIS-2017-02-R02', name: 'API procurement', state: 'Franklin' });

// const prose = db.prose;
// prose.create({ section: 'executiveSummary', text: 'Franklin Agency for Persons with Disabilities (APD) and the Agency for Health Care Administration (AHCA) will implement a Client Data Management System (CDMS) to replace the existing legacy system. This system will interface with the Franklin Medicaid Management Information System (FMMIS) through the recipient, provider, prior authorization and claims processes.' });
// prose.create({ section: 'statementOfOutcomes', text: 'The new system will collect, process, and store client and provider information in a consistent, accurate and efficient manner. It will also support electronic visit verification, which will ensure services are delivered as agreed upon and help us monitor client progress and provider performance. The system will also integrate with FMMIS for all waiver services, including electronic claims submission and tracking.' });
// prose.create({ section: 'proposedBudget', text: 'We propose to spend some money' });
// prose.create({ section: 'papdSummary', text: 'In summary, our PAPD existed and now we have this' });
// prose.create({ section: 'personnel', text: 'We\'re going to hire people!' });
// prose.create({ section: 'acquisitionsPlan', text: 'We\'re going to buy stuff!' });
// prose.create({ section: 'costAllocationEstimate', text: 'We estimate that costs will be allocated' });
// prose.create({ section: 'costBenefitAnalysis', text: 'Our analysis reveals that the costs have benefits' });
// prose.create({ section: 'proposedActivity', text: 'We propose having activities' });
// prose.create({ section: 'continuityOfOperations', text: 'We plan to keep doing stuff' });
// prose.create({ section: 'otherAssurances', text: 'We assure you that we like cookies' });

// const outcome = db.outcome;
// outcome.create({ text: 'Higher client and provider satisfaction' });
// outcome.create({ text: 'Improved fiscal sustainability' });
// outcome.create({ text: 'Fraud and abuse prevention' });
// outcome.create({ text: 'Better data and analytics' });

//
// Project.create({ projectID: 'bobs project', name: 'Bob\'s Project', state: 'Bobville' }).then(project => {
//   FundingRequest.create({ requestID: 'bob-1', name: 'First one' }).then(fr => {
//     project.setFundingRequests(fr).then(() => {
//       project.getFundingRequests().then(frs => console.log(frs[0].name))
//     })
//   });
// });

app.listen(process.env.PORT || 8000);
