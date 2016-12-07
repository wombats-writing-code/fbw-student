// Authorization constants

var keyMirror = require('keymirror');

module.exports = {
  ActionTypes: keyMirror({
    SET_AUTHORIZATIONS: null
  }),
  BaseBanks: ['assessment.Bank%3AROOT%40ODL.MIT.EDU',
              'assessment.Bank%3A000000000000000000000000%40ODL.MIT.EDU',
              'assessment.Bank%3A000000000000000000000000%40bazzim.MIT.EDU'],
  StudentAuthorizationFunctions: ['assessment.AssessmentTaken%3Acreate%40ODL.MIT.EDU',
                                  'assessment.AssessmentTaken%3Alookup%40ODL.MIT.EDU',
                                  'assessment.Assessment%3Atake%40ODL.MIT.EDU',
                                  'assessment.Bank%3Alookup%40ODL.MIT.EDU',
                                  'commenting.Book%3Alookup%40ODL.MIT.EDU',
                                  'commenting.Comment%3Alookup%40ODL.MIT.EDU',
                                  'hierarchy.Hierarchy%3Alookup%40ODL.MIT.EDU',
                                  'logging.Log%3Alookup%40ODL.MIT.EDU',
                                  'repository.Asset%3Acreate%40ODL.MIT.EDU',
                                  'repository.Asset%3Adelete%40ODL.MIT.EDU',
                                  'repository.Asset%3Alookup%40ODL.MIT.EDU',
                                  'repository.Asset%3Asearch%40ODL.MIT.EDU',
                                  'repository.Repository%3Alookup%40ODL.MIT.EDU',
                                  'resource.Bin%3Alookup%40ODL.MIT.EDU',
                                  'resource.Resource%3Alookup%40ODL.MIT.EDU']
};