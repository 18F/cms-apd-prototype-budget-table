import updeep from 'updeep';
import { Requests } from '../actions';

const stateShape = {
  currentRequest: {
    id: 'FR-MMIS-2017-02-R01',
    name: '',
    costs: {
      ddiInternal: 0,
      ddiExternal: 0,
      omInternal: 0,
      omExternal: 0,
      otherInternal: 0,
      otherExternal: 0,
      otherInteragency: 0
    }
  },
  openRequests: [{
    id: 'FR-MMIS-2017-01-R01',
    name: 'State of Franklin, MMIS, FFY 2017 #1',
    costs: {
      ddiInternal: 0,
      ddiExternal: 0,
      omInternal: 0,
      omExternal: 0,
      otherInternal: 0,
      otherExternal: 0,
      otherInteragency: 0
    },
    submitters: [{
      name: 'Alexis Nikephoros',
      email: 'alexis@medicaid.franklin.us',
      phone: '555-123-4567'
    }, {
      name: 'Jordan Yafe',
      email: 'jordan@medicaid.franklin.us',
      phone: '555-123-4567'
    }],
    prose: {
      executiveSummary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas commodo massa ut nunc placerat vehicula. Aenean sit amet auctor ligula, sit amet mattis ex. Mauris tincidunt, ex ut ullamcorper elementum, massa tellus blandit lacus, dictum varius orci felis vel urna. Mauris a pretium quam. Praesent mollis mi dolor, at vulputate.',
      statementOfOutcomes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus pretium enim ac hendrerit accumsan. Maecenas ornare ante fermentum, elementum ante eget, laoreet risus. Aliquam quis sollicitudin tellus. Suspendisse enim tellus, pellentesque a turpis at, efficitur varius felis. Quisque ornare maximus tortor at blandit. Vivamus at est non diam iaculis sagittis in quis magna. Nam id est non turpis pharetra tempor. Etiam ipsum massa, tempor vitae dolor a, feugiat facilisis tortor.\n\nMaecenas at nibh scelerisque, tempor purus eget, luctus dui. Morbi sed consectetur lacus, at elementum urna. Quisque sit amet nulla in eros volutpat cursus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum at efficitur est, nec malesuada lectus. Duis at orci vitae tortor sagittis sollicitudin. Phasellus et porta felis. Quisque at vehicula eros. Nulla sit amet mollis elit, pulvinar pulvinar turpis. Sed tempor ultricies ante nec lobortis. Maecenas dictum vulputate egestas. Aliquam interdum vulputate ante.'
    }
  }]
};

export default function reducer(state = stateShape, action) {
  let newState = state;

  switch (action.type) {
    case Requests.messages.UPDATE_COST:
      newState = updeep({ currentRequest: { costs: { [action.property]: action.value } } }, newState);
      break;

    default:
      break;
  }

  return newState;
}
